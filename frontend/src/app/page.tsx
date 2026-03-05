import HeroSection from "@/components/hero";
import AboutSection from "@/components/about-section";
import HighlightsSection from "@/components/highlights-section";
import ExpertiseSection from "@/components/expertise-section";
import WritingSection from "@/components/writing-section";
import ProjectsSection from "@/components/projects-section";
import ConnectSection from "@/components/connect-section";
import FadeIn from "@/components/fade-in";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FadeIn><AboutSection /></FadeIn>
      <FadeIn><HighlightsSection /></FadeIn>
      <FadeIn><ExpertiseSection /></FadeIn>
      <FadeIn><WritingSection /></FadeIn>
      <FadeIn><ProjectsSection /></FadeIn>
      <FadeIn><ConnectSection /></FadeIn>
    </main>
  );
}
