import { client } from '@/sanity/lib/client'
import { homepageQuery, navigationQuery } from '@/sanity/lib/queries'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import PianoStudioSection from '@/components/PianoStudioSection'
import ContactCtaSection from '@/components/ContactCtaSection'

export const instant = false

export default async function HomePage() {
  const [homepage, navigation] = await Promise.all([
    client.fetch(homepageQuery),
    client.fetch(navigationQuery),
  ])

  const navItems = navigation?.items

  return (
    <main>
      <HeroSection
        name={homepage?.hero?.name}
        subtitleItems={homepage?.hero?.subtitleItems}
        heroImage={homepage?.hero?.heroImage}
        quoteText={homepage?.hero?.quoteText}
        quoteAuthor={homepage?.hero?.quoteAuthor}
        navItems={navItems}
      />

      <AboutSection
        portraitImage={homepage?.about?.portraitImage}
        taglineLines={homepage?.about?.taglineLines}
        bio={homepage?.about?.bio}
        aboutLinkLabel={homepage?.about?.aboutLinkLabel}
        aboutLinkHref={homepage?.about?.aboutLinkHref}
        selectedWorkTitle={homepage?.selectedWork?.sectionTitle}
        workItems={homepage?.selectedWork?.workItems}
      />

      <div className="grid md:grid-cols-2">
        <PianoStudioSection
          logoImage={homepage?.pianoStudio?.logoImage}
          title={homepage?.pianoStudio?.title}
          tagline={homepage?.pianoStudio?.tagline}
          description={homepage?.pianoStudio?.description}
          ctaLabel={homepage?.pianoStudio?.ctaLabel}
          ctaHref={homepage?.pianoStudio?.ctaHref}
        />

        <ContactCtaSection
          heading={homepage?.contactCta?.heading}
          subtext={homepage?.contactCta?.subtext}
          ctaLabel={homepage?.contactCta?.ctaLabel}
          ctaHref={homepage?.contactCta?.ctaHref}
          backgroundImage={homepage?.contactCta?.backgroundImage}
        />
      </div>
    </main>
  )
}
