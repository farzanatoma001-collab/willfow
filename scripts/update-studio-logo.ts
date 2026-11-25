import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const TOKEN = 'sk7G5VlStngWaZ424K90iLqXAlRsrysXMR64SxkURyGsQNRs4rWDMYS53oqpwogFumN8CG080WG4dfRfgSkBZRMcNgW795XuoxvMDtBU8amyzxu1fMRf29HSTAEKqkQA49VAmO0Bb6RraSXOiJSU8dHpUVrnBcGejZmx68qH8ABYr8GQDuWc'

const client = createClient({ projectId: 'i0l0wd2j', dataset: 'production', apiVersion: '2024-01-01', token: TOKEN, useCdn: false })

async function main() {
  // Upload the wide banner logo (7 (1).png)
  const buf = fs.readFileSync(path.join(process.env.HOME!, 'Downloads/willfow/7 (1).png'))
  const asset = await client.assets.upload('image', buf, { filename: 'wf-studio-banner.png', contentType: 'image/png' })
  console.log(`✓ Banner logo uploaded → ${asset._id}`)

  // Update homepage pianoStudio.logoImage
  await client.patch('homepage').set({
    'pianoStudio.logoImage': {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: 'The Will Fowler Studio logo',
    },
  }).commit()
  console.log('✓ Homepage pianoStudio.logoImage updated to banner version')
}

main().catch(e => { console.error(e); process.exit(1) })
