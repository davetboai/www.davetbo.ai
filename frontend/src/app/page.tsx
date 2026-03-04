import HeroSection from "@/components/hero";
import AboutSection from "@/components/about-section";
import ExpertiseSection from "@/components/expertise-section";
import WritingSection from "@/components/writing-section";
import ProjectsSection from "@/components/projects-section";
import ConnectSection from "@/components/connect-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <WritingSection />
      <ProjectsSection />
      <ConnectSection />
    </main>
  );
}
