/**
 * Seed script: uploads all images to Sanity and creates homepage content.
 * Run with: npx tsx scripts/seed.ts
 */
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const TOKEN = 'sk7G5VlStngWaZ424K90iLqXAlRsrysXMR64SxkURyGsQNRs4rWDMYS53oqpwogFumN8CG080WG4dfRfgSkBZRMcNgW795XuoxvMDtBU8amyzxu1fMRf29HSTAEKqkQA49VAmO0Bb6RraSXOiJSU8dHpUVrnBcGejZmx68qH8ABYr8GQDuWc'

const client = createClient({
  projectId: 'i0l0wd2j',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
})

const IMAGES_DIR = path.join(process.env.HOME!, 'Downloads/willfow/optimised')

async function uploadImage(filename: string, label: string) {
  const filePath = path.join(IMAGES_DIR, filename)
  console.log(`Uploading ${label}...`)
  const buffer = fs.readFileSync(filePath)
  const ext = path.extname(filename).toLowerCase().slice(1)
  const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png'
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: mimeType,
  })
  console.log(`  ✓ ${label} → ${asset._id}`)
  return asset._id
}

function imageRef(assetId: string) {
  return { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
}

async function main() {
  console.log('\n=== Uploading images to Sanity ===\n')

  const [
    heroId,
    portraitId,
    choirPerfId,
    teachId,
    siffPortraitId,
    studioLogoId,
    ctaBgId,
  ] = await Promise.all([
    uploadImage('will5566.jpg', 'Hero image (leather jacket)'),
    uploadImage('will3006.jpg', 'About portrait (blue sweater)'),
    uploadImage('choir-of-man-performance.jpg', 'Choir of Man performance'),
    uploadImage('teach.jpg', 'Teaching / Green Room'),
    uploadImage('will2616.jpg', 'SIFF portrait'),
    uploadImage('Main Logo.png', 'Piano Studio logo'),
    uploadImage('stage-lights.jpg', 'Contact CTA background'),
  ])

  console.log('\n=== Creating Work Items ===\n')

  const choirItem = await client.createOrReplace({
    _id: 'work-choir-of-man',
    _type: 'workItem',
    title: 'The Choir of Man',
    role: 'Maestro',
    order: 1,
    image: { ...imageRef(choirPerfId), alt: 'Will Fowler in The Choir of Man' },
  })
  console.log('  ✓ Choir of Man work item')

  const siffItem = await client.createOrReplace({
    _id: 'work-siff',
    _type: 'workItem',
    title: 'Stamford International Film Festival',
    role: 'Festival Co-Director',
    order: 2,
    image: { ...imageRef(siffPortraitId), alt: 'Will Fowler — Stamford International Film Festival' },
  })
  console.log('  ✓ SIFF work item')

  const greenRoomItem = await client.createOrReplace({
    _id: 'work-greenroom',
    _type: 'workItem',
    title: 'Greenroom Music Summer Camp',
    role: 'Artistic Director',
    order: 3,
    image: { ...imageRef(teachId), alt: 'Will Fowler teaching at Greenroom Music Summer Camp' },
  })
  console.log('  ✓ Green Room work item')

  console.log('\n=== Creating Navigation ===\n')

  await client.createOrReplace({
    _id: 'navigation',
    _type: 'navigation',
    items: [
      { _key: 'nav-profile', label: 'PROFILE', href: '/profile' },
      { _key: 'nav-work', label: 'WORK', href: '/work' },
      { _key: 'nav-educator', label: 'EDUCATOR', href: '/educator' },
      { _key: 'nav-connect', label: 'CONNECT', href: '/connect' },
    ],
  })
  console.log('  ✓ Navigation')

  console.log('\n=== Creating Homepage Document ===\n')

  await client.createOrReplace({
    _id: 'homepage',
    _type: 'homepage',
    hero: {
      name: 'WILL FOWLER',
      subtitleItems: ['ACTOR-MUSICIAN', 'MUSICAL DIRECTOR', 'CREATIVE', 'EDUCATOR'],
      heroImage: { ...imageRef(heroId), alt: 'Will Fowler in leather jacket' },
      quoteText: '"A tour de force on the keys."',
      quoteAuthor: 'JEFF GOLDBLUM',
    },
    about: {
      portraitImage: { ...imageRef(portraitId), alt: 'Will Fowler portrait' },
      taglineLines: ['PERFORMER.', 'MUSICIAN.', 'CREATIVE.'],
      bio: 'Will Fowler is a British musician, actor-musician and musical director working across theatre, live performance and education.',
      aboutLinkLabel: 'ABOUT',
      aboutLinkHref: '/profile',
    },
    selectedWork: {
      sectionTitle: 'SELECTED WORK',
      workItems: [
        { _key: 'ref-choir', _type: 'reference', _ref: choirItem._id },
        { _key: 'ref-siff', _type: 'reference', _ref: siffItem._id },
        { _key: 'ref-greenroom', _type: 'reference', _ref: greenRoomItem._id },
      ],
    },
    pianoStudio: {
      logoImage: { ...imageRef(studioLogoId), alt: 'The Will Fowler Studio logo' },
      title: 'THE WILL FOWLER PIANO STUDIO',
      tagline: 'piano / keys tuition',
      description:
        'Private and online tuition for all levels, from beginners to ABRSM Grade 5 and beyond, with a focus on technique, musicianship and exam success.',
      ctaLabel: 'LEARN MORE',
      ctaHref: '/educator',
    },
    contactCta: {
      heading: "LET'S WORK TOGETHER.",
      subtext: 'Bookings, collaborations and teaching enquiries.',
      ctaLabel: 'CONNECT',
      ctaHref: '/connect',
      backgroundImage: { ...imageRef(ctaBgId), alt: 'Will Fowler on stage' },
    },
  })
  console.log('  ✓ Homepage document')

  console.log('\n✅ All done! Sanity is fully seeded.\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
