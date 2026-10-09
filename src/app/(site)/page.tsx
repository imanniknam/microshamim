import { HeroSection } from "@/components/sections/HeroSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { LearnLoopSection } from "@/components/sections/LearnLoopSection";
import { SpacesSection } from "@/components/sections/SpacesSection";
import { ModelShowcase } from "@/components/sections/ModelShowcase";
import { ContentStudioSection } from "@/components/sections/ContentStudioSection";
import { CoworkingSection } from "@/components/sections/CoworkingSection";
import { GrowthJourney } from "@/components/sections/GrowthJourney";
import { AudiencePaths } from "@/components/sections/AudiencePaths";
import { SkillCloud } from "@/components/sections/SkillCloud";
import { EventsSection } from "@/components/sections/EventsSection";
import { IntentSelector } from "@/components/sections/IntentSelector";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { getHome } from "@/lib/server/data";

export default function Home() {
  const h = getHome();
  return (
    <>
      <HeroSection h={h} />
      <ExperienceSection h={h} />
      <LearnLoopSection h={h} />
      <SpacesSection h={h} />
      <ModelShowcase h={h} />
      <ContentStudioSection h={h} />
      <CoworkingSection h={h} />
      <GrowthJourney h={h} />
      <AudiencePaths h={h} />
      <SkillCloud h={h} />
      <EventsSection h={h} />
      <IntentSelector h={h} />
      <FinalCTA h={h} />
    </>
  );
}
