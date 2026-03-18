"""S3 + CloudFront static site construct for SPA hosting."""
from typing import List
from aws_cdk import (
    Duration,
    RemovalPolicy,
    aws_s3 as s3,
    aws_cloudfront as cloudfront,
    aws_cloudfront_origins as origins,
    aws_certificatemanager as acm,
    aws_route53 as route53,
    aws_route53_targets as route53_targets,
)
from constructs import Construct


class StaticSitePrivateS3(Construct):
    """Private S3 bucket served via CloudFront with OAC.

    Creates:
    - Private S3 bucket (BLOCK_ALL, auto_delete_objects)
    - CloudFront distribution with S3 origin via OAC
    - 404 → index.html SPA error response
    - Optional custom domain(s) with ACM cert and Route53 records
    """

    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        domain_names: List[str] | None = None,
        extra_cloudfront_domains: List[str] | None = None,
        hosted_zone_id: str = "",
        hosted_zone_name: str = "",
        certificate_arn: str = "",
    ) -> None:
        super().__init__(scope, construct_id)

        domain_names = domain_names or []
        extra_cloudfront_domains = extra_cloudfront_domains or []
        # All domains go on the CloudFront distribution, but only domain_names
        # get Route53 records. extra_cloudfront_domains have DNS managed externally.
        all_cloudfront_domains = domain_names + extra_cloudfront_domains

        # S3 bucket for frontend assets
        self.bucket = s3.Bucket(
            self,
            "SiteBucket",
            block_public_access=s3.BlockPublicAccess.BLOCK_ALL,
            removal_policy=RemovalPolicy.DESTROY,
            auto_delete_objects=True,
        )

        # S3 origin for frontend
        frontend_origin = origins.S3BucketOrigin.with_origin_access_control(
            self.bucket,
        )

        # Build distribution kwargs conditionally based on custom domain
        distribution_kwargs = {
            "default_behavior": cloudfront.BehaviorOptions(
                origin=frontend_origin,
                viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                cache_policy=cloudfront.CachePolicy.CACHING_OPTIMIZED,
                compress=True,
            ),
            "default_root_object": "index.html",
            "error_responses": [
                cloudfront.ErrorResponse(
                    http_status=404,
                    response_http_status=200,
                    response_page_path="/index.html",
                    ttl=Duration.seconds(0),
                ),
                cloudfront.ErrorResponse(
                    http_status=403,
                    response_http_status=200,
                    response_page_path="/index.html",
                    ttl=Duration.seconds(0),
                ),
            ],
        }

        if all_cloudfront_domains and certificate_arn:
            certificate = acm.Certificate.from_certificate_arn(
                self, "Certificate",
                certificate_arn,
            )
            distribution_kwargs["domain_names"] = all_cloudfront_domains
            distribution_kwargs["certificate"] = certificate

        self.distribution = cloudfront.Distribution(
            self,
            "Distribution",
            **distribution_kwargs,
        )

        # Create Route53 records for each domain
        if domain_names and hosted_zone_id and hosted_zone_name:
            hosted_zone = route53.HostedZone.from_hosted_zone_attributes(
                self, "HostedZone",
                hosted_zone_id=hosted_zone_id,
                zone_name=hosted_zone_name,
            )

            for i, dn in enumerate(domain_names):
                suffix = "" if i == 0 else str(i)
                route53.ARecord(
                    self, f"AliasRecord{suffix}",
                    zone=hosted_zone,
                    record_name=dn,
                    target=route53.RecordTarget.from_alias(
                        route53_targets.CloudFrontTarget(self.distribution),
                    ),
                )
                route53.AaaaRecord(
                    self, f"AliasRecordV6{suffix}",
                    zone=hosted_zone,
                    record_name=dn,
                    target=route53.RecordTarget.from_alias(
                        route53_targets.CloudFrontTarget(self.distribution),
                    ),
                )
