import { groq } from 'next-sanity'

export const homepageQuery = groq`*[_type == "homepage"][0]{
  hero{
    name,
    subtitleItems,
    heroImage{ asset->{url, _id}, alt },
    quoteText,
    quoteAuthor
  },
  about{
    portraitImage{ asset->{url, _id}, alt },
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
      image{ asset->{url, _id}, alt },
      linkHref
    }
  },
  pianoStudio{
    logoImage{ asset->{url, _id}, alt },
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
    backgroundImage{ asset->{url, _id}, alt }
  }
}`

export const navigationQuery = groq`*[_type == "navigation"][0]{
  items[]{ label, href }
}`
