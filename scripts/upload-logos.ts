import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const TOKEN = 'sk7G5VlStngWaZ424K90iLqXAlRsrysXMR64SxkURyGsQNRs4rWDMYS53oqpwogFumN8CG080WG4dfRfgSkBZRMcNgW795XuoxvMDtBU8amyzxu1fMRf29HSTAEKqkQA49VAmO0Bb6RraSXOiJSU8dHpUVrnBcGejZmx68qH8ABYr8GQDuWc'
const IMAGES_DIR = path.join(process.env.HOME!, 'Downloads/willfow')

const client = createClient({
  projectId: 'i0l0wd2j',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
})

async function upload(filename: string, label: string) {
  const buf = fs.readFileSync(path.join(IMAGES_DIR, filename))
  const ext = path.extname(filename).slice(1).toLowerCase()
  const mime = ext === 'png' ? 'image/png' : 'image/jpeg'
  const asset = await client.assets.upload('image', buf, { filename, contentType: mime })
  console.log(`  ✓ ${label} → ${asset._id}`)
  return asset._id
}

async function main() {
  console.log('\n=== Uploading logos ===\n')
  const choirLogoId = await upload('com logo.jpeg', 'Choir of Man logo')
  const grmscLogoId = await upload('GRMSC Logo Vector.png', 'Green Room logo')

  console.log('\n=== Attaching logos to work items ===\n')

  await client.patch('work-choir-of-man').set({
    logoImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: choirLogoId },
      alt: 'The Choir of Man',
    },
  }).commit()
  console.log('  ✓ Choir of Man logo attached')

  await client.patch('work-greenroom').set({
    logoImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: grmscLogoId },
      alt: 'Greenroom Music Summer Camp',
    },
  }).commit()
  console.log('  ✓ Green Room logo attached')

  console.log('\n✅ Done\n')
}

main().catch(e => { console.error(e); process.exit(1) })
