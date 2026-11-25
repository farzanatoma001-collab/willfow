import { groq } from 'next-sanity'

export const homepageQuery = groq`*[_type == "homepage"][0]{
  hero{
    name,
    subtitleItems,
    heroImage{ asset, alt },
    quoteText,
    quoteAuthor
  },
  about{
    portraitImage{ asset, alt },
    taglineLines,
    bio,
    aboutLinkLabel,
    aboutLinkHref
  },
  selectedWork{
    sectionTitle,
    workItems[]->{
      _id,
      title,
      role,
      image{ asset, alt },
      logoImage{ asset, alt },
      linkHref
    }
  },
  pianoStudio{
    logoImage{ asset, alt },
    title,
    tagline,
    description,
    ctaLabel,
    ctaHref
  },
  contactCta{
    heading,
    subtext,
    ctaLabel,
    ctaHref,
    backgroundImage{ asset, alt }
  }
}`

export const navigationQuery = groq`*[_type == "navigation"][0]{
  items[]{ label, href }
}`
