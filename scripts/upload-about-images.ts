import { createClient } from '@sanity/client'
import fs from 'fs'

const TOKEN = 'sk7G5VlStngWaZ424K90iLqXAlRsrysXMR64SxkURyGsQNRs4rWDMYS53oqpwogFumN8CG080WG4dfRfgSkBZRMcNgW795XuoxvMDtBU8amyzxu1fMRf29HSTAEKqkQA49VAmO0Bb6RraSXOiJSU8dHpUVrnBcGejZmx68qH8ABYr8GQDuWc'
const client = createClient({ projectId: 'i0l0wd2j', dataset: 'production', apiVersion: '2024-01-01', token: TOKEN, useCdn: false })

async function upload(filePath: string, filename: string) {
  const buf = fs.readFileSync(filePath)
  const asset = await client.assets.upload('image', buf, { filename, contentType: 'image/jpeg' })
  console.log(`✓ Uploaded ${filename} → ${asset._id}`)
  return asset._id
}

async function main() {
  // 1. Portrait (left side)
  const portraitId = await upload(
    '/Users/mehedihasan/Downloads/willfow/wills-single-iamge.jpg',
    'wills-portrait.jpg'
  )
  const homepage = await client.fetch(`*[_type == "homepage"][0]{ _id }`)
  await client.patch(homepage._id)
    .set({
      'about.portraitImage': {
        _type: 'image',
        asset: { _type: 'reference', _ref: portraitId },
        alt: 'Will Fowler',
      },
    })
    .commit()
  console.log('✓ Portrait image updated')

  // 2. Choir of Man (middle large card)
  const choirId = await upload(
    '/Users/mehedihasan/Downloads/willfow/CHOIR-MAN-MAESTOR-PNG.jpg',
    'choir-of-man-maestro-new.jpg'
  )
  await client.patch('work-choir-of-man')
    .set({
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: choirId },
        alt: 'Will Fowler as Maestro in The Choir of Man',
      },
    })
    .commit()
  console.log('✓ Choir of Man image updated')

  // 3. SIFF (top right card)
  const siffId = await upload(
    '/Users/mehedihasan/Downloads/willfow/WILL-FESTIVAL-CO-DIRECTOR.jpg',
    'will-siff-co-director.jpg'
  )
  await client.patch('work-siff')
    .set({
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: siffId },
        alt: 'Will Fowler — Stamford International Film Festival Co-Director',
      },
    })
    .commit()
  console.log('✓ SIFF image updated')

  // 4. Green Room (bottom right card)
  const greenroomId = await upload(
    '/Users/mehedihasan/Downloads/willfow/WILL-FOWLER-ARTISITIC-DIRECTOR.jpg',
    'will-greenroom-artistic-director.jpg'
  )
  await client.patch('work-greenroom')
    .set({
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: greenroomId },
        alt: 'Will Fowler — Green Room Music Summer Camp Artistic Director',
      },
    })
    .commit()
  console.log('✓ Green Room image updated')

  console.log('\n✅ All 4 images uploaded and patched.')
}

main().catch(e => { console.error(e); process.exit(1) })
