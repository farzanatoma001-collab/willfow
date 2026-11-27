import { createClient } from '@sanity/client'
import fs from 'fs'

const TOKEN = 'sk7G5VlStngWaZ424K90iLqXAlRsrysXMR64SxkURyGsQNRs4rWDMYS53oqpwogFumN8CG080WG4dfRfgSkBZRMcNgW795XuoxvMDtBU8amyzxu1fMRf29HSTAEKqkQA49VAmO0Bb6RraSXOiJSU8dHpUVrnBcGejZmx68qH8ABYr8GQDuWc'
const client = createClient({ projectId: 'i0l0wd2j', dataset: 'production', apiVersion: '2024-01-01', token: TOKEN, useCdn: false })

async function main() {
  const buf = fs.readFileSync('/Users/mehedihasan/Downloads/willfow/wills-single-iamge-3.jpg')
  const asset = await client.assets.upload('image', buf, { filename: 'wills-portrait-3.jpg', contentType: 'image/jpeg' })
  console.log('✓ Uploaded →', asset._id)
  const doc = await client.fetch(`*[_type == "homepage"][0]{ _id }`)
  await client.patch(doc._id)
    .set({ 'about.portraitImage': { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt: 'Will Fowler' } })
    .commit()
  console.log('✓ Portrait updated')
}

main().catch(e => { console.error(e); process.exit(1) })
