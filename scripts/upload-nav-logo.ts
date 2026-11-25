import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const TOKEN = 'sk7G5VlStngWaZ424K90iLqXAlRsrysXMR64SxkURyGsQNRs4rWDMYS53oqpwogFumN8CG080WG4dfRfgSkBZRMcNgW795XuoxvMDtBU8amyzxu1fMRf29HSTAEKqkQA49VAmO0Bb6RraSXOiJSU8dHpUVrnBcGejZmx68qH8ABYr8GQDuWc'
const client = createClient({ projectId: 'i0l0wd2j', dataset: 'production', apiVersion: '2024-01-01', token: TOKEN, useCdn: false })

async function main() {
  const buf = fs.readFileSync(path.join(process.env.HOME!, 'Downloads/willfow/will flowler logo.png'))
  const asset = await client.assets.upload('image', buf, { filename: 'wf-signature-white.png', contentType: 'image/png' })
  console.log(`✓ Logo uploaded → ${asset._id}`)

  await client.patch('navigation').set({
    logo: { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt: 'Will Fowler' },
  }).commit()
  console.log('✓ Navigation logo updated')
}

main().catch(e => { console.error(e); process.exit(1) })
