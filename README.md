# www.davetbo.ai

A personal portfolio site built with Next.js 16, React 19, and Tailwind CSS, deployed as a static site on AWS (S3 + CloudFront).

## Project structure

```
frontend/               # Next.js application
├── src/
│   ├── app/            # Pages and layout (App Router)
│   ├── components/     # Section components (hero, about, expertise, etc.)
│   └── ...
├── public/             # Static assets (images, favicon, OG image)
├── tailwind.config.ts
└── package.json
cloudformation.yaml     # AWS infrastructure (S3 + CloudFront)
install_simple.sh       # Deploy script (CloudFormation + AWS CLI)
install_cdk.sh          # Deploy script (CDK — alternative, requires Python + Docker)
infra/                  # CDK infrastructure (used by install_cdk.sh)
```

### Components

Each section of the single-page site is its own component:

| Component | Purpose |
|-----------|---------|
| `hero.tsx` | Full-width hero with name, title, tagline |
| `about-section.tsx` | Bio and profile photo |
| `highlights-section.tsx` | Featured work / press links |
| `expertise-section.tsx` | Skills and domain expertise |
| `writing-section.tsx` | Blog posts and articles |
| `projects-section.tsx` | Project showcase |
| `connect-section.tsx` | Contact / social links |
| `fade-in.tsx` | Intersection Observer scroll animation wrapper |
| `header.tsx` | Sticky navigation header |
| `footer.tsx` | Site footer |

---

## Getting started locally

### Prerequisites

- Node.js 18+
- Yarn (enabled via corepack: `corepack enable`)

### Run the dev server

```bash
cd frontend
yarn install
yarn dev
```

The site runs at `http://localhost:3001`.

### Build for production

```bash
cd frontend
yarn build
```

This produces a static export in `frontend/out/`.

---

## Deploying to AWS

The site is a static export — just HTML, CSS, JS, and images served from S3 behind CloudFront. No server required.

### AWS costs

This is one of the cheapest ways to host a website on AWS. There are no servers, containers, or load balancers — just storage and a CDN.

| Component | Free tier (first 12 months) | After free tier |
|---|---|---|
| **S3 storage** | 5 GB free | ~$0.023/GB/month |
| **S3 requests** | 20,000 GET free | $0.0004 per 1,000 GET |
| **CloudFront** | 1 TB transfer + 10M requests free | $0.085/GB + $0.01 per 10,000 requests |
| **Route53** (optional) | — | $0.50/month per hosted zone |
| **ACM certificate** | Always free | Always free |

**Estimated monthly costs:**

| Scenario | S3 | CloudFront | Route53 | Total |
|---|---|---|---|---|
| **Minimal** (just deployed, near-zero traffic) | < $0.01 | $0.00 | $0.50 | **~$0.50/mo** |
| **10,000 visitors/mo** (~50,000 requests, ~2 GB transfer) | < $0.05 | ~$0.20 | $0.50 | **~$0.75/mo** |
| **100,000 visitors/mo** (~500,000 requests, ~20 GB transfer) | < $0.10 | ~$1.75 | $0.50 | **~$2.35/mo** |

Without a custom domain (no Route53), the minimal cost is effectively **$0/month** within the free tier and **pennies/month** after. The site's static export is ~2 MB total, so S3 storage cost is negligible.

There are two deployment paths:

| | `install_simple.sh` | `install_cdk.sh` |
|---|---|---|
| **Requirements** | AWS CLI, Node.js | AWS CLI, Node.js, Python, Docker, CDK CLI |
| **How it works** | CloudFormation template + `aws s3 sync` | CDK with Docker-based build bundling |
| **Best for** | Forks and new users | Maintainer / advanced customization |

### Simple path (recommended)

#### Prerequisites

- [AWS CLI v2](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) installed and configured (`aws configure`)
- Node.js 18+ and Yarn

#### First deploy

Create the AWS infrastructure and deploy the site in one command:

```bash
./install_simple.sh -c
```

This creates an S3 bucket and CloudFront distribution via CloudFormation, builds the frontend, uploads it, and invalidates the CDN cache.

#### With a custom domain

```bash
./install_simple.sh -d
```

You'll be prompted for your domain name and ACM certificate ARN. The certificate must be in `us-east-1` (CloudFront requirement). After the stack deploys, point your DNS to the CloudFront distribution.

#### Subsequent deploys

After the stack exists, just run without flags to rebuild and deploy:

```bash
./install_simple.sh
```

#### Tear down

```bash
./install_simple.sh -D
```

Empties the S3 bucket and deletes the CloudFormation stack.

### CDK path (alternative)

If you prefer AWS CDK, the `infra/` directory contains CDK apps for the backend (Cognito auth) and frontend (S3 + CloudFront). This path supports **dev** and **prod** environments:

```bash
# Copy and configure CDK context
cp infra/backend/cdk.json.example infra/backend/cdk.json
cp infra/frontend/cdk.json.example infra/frontend/cdk.json
# Edit infra/frontend/cdk.json with your domain, hosted zone, and certificate ARN
```

**Dev environment** (Cognito auth-protected):

```bash
# First time: deploy backend (Cognito) + frontend
./install_cdk.sh -ya

# Subsequent frontend-only deploys
./install_cdk.sh -yf
```

The dev environment uses `stage=dev` from `cdk.json`, which enables Cognito authentication via the [AWS Amplify Authenticator](https://ui.docs.amplify.aws/react/connected-components/authenticator). The dev site (e.g. `www-dev.example.com`) is password-protected so you can preview changes before going public.

**Prod environment** (public, no auth):

```bash
# Override context for prod — pass your prod domain
cd infra/backend && source .venv/bin/activate && cd ../frontend
cdk deploy --all --require-approval never \
  -c stage=prod \
  -c domain_name=www.example.com \
  -c hosted_zone_id=YOUR_ZONE_ID \
  -c hosted_zone_name=example.com \
  -c certificate_arn=arn:aws:acm:us-east-1:ACCOUNT:certificate/CERT_ID
```

When `stage=prod`, the auth gate is disabled and the site is publicly accessible.

Requires Python 3.9+, Docker, and the AWS CDK CLI (`npm install -g aws-cdk`).

---

## Using this as a template

This repo is designed to be forked and customized. Here's how to make it your own:

### Quick start

1. Fork/clone the repo
2. Edit the section components in `frontend/src/components/` with your own content
3. Replace `frontend/public/profile.jpg` with your photo
4. Update metadata in `frontend/src/app/layout.tsx` (title, description, OG tags)
5. Replace `frontend/public/og-image.png` with your own social preview image
6. Deploy with `./install_simple.sh -c`

### Design system

The site uses:
- **Plus Jakarta Sans** — headings and body text
- **Merriweather** — serif accent font (available via CSS variable `--font-merriweather`)
- **Tailwind CSS** — utility-first styling
- Color tokens defined as CSS variables in `globals.css`

### What to remove

- `frontend/src/components/DevAuthGate.tsx` — Amplify Authenticator gate for pre-launch previews. Delete it and remove the `<DevAuthGate>` wrapper from `layout.tsx`. You can also remove `aws-amplify` and `@aws-amplify/ui-react` from `package.json`.
- `infra/` and `install_cdk.sh` — CDK infrastructure (only needed if you prefer CDK over the CloudFormation template)

---

## For AI coding agents

This repo is a good starting point for helping a user build a personal portfolio site. Here's what you need to know:

### Architecture

- **Next.js 16** with App Router and static export (`output: "export"` in `next.config.mjs`)
- **React 19** with server components (hydrated client-side after static export)
- **Tailwind CSS 3** for styling
- **Single-page layout** — all sections rendered on one page with scroll-based navigation
- **`FadeIn` wrapper** — uses Intersection Observer for scroll-triggered animations
- No backend, no API routes, no database — pure static site

### How to customize for a new user

1. **Content**: Each section is a self-contained component in `frontend/src/components/`. Edit the JSX directly — there's no CMS or data layer.
2. **Styling**: Colors and fonts are configured in `frontend/src/app/globals.css` and `frontend/tailwind.config.ts`. The design uses CSS variables for theming.
3. **Metadata**: SEO and OG tags live in `frontend/src/app/layout.tsx`. Update the `metadata` export.
4. **Assets**: Images go in `frontend/public/`. The OG image should be 1200x630px.

### Adding new sections

Create a new component in `frontend/src/components/`, then add it to `frontend/src/app/page.tsx` wrapped in `<FadeIn>`:

```tsx
<FadeIn><YourNewSection /></FadeIn>
```

Add a nav link in `header.tsx` if needed.

### Deployment

Use `install_simple.sh` — it handles the full build and deploy pipeline:

```bash
./install_simple.sh -c    # first time: create stack + deploy
./install_simple.sh       # subsequent: rebuild + deploy + invalidate cache
./install_simple.sh -D    # tear down
```

No Docker, CDK, or Python required. Just AWS CLI and Node.js.
