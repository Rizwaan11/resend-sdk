// node --env-file=.env examples/send-email.mjs you@example.com
import { ResendSDK } from '../ts/dist/ResendSDK.js'

const to = process.argv[2]
if (!to || !process.env.RESEND_APIKEY) {
  console.error('Set RESEND_APIKEY in .env and pass a recipient address')
  process.exit(1)
}

const client = new ResendSDK({ apikey: process.env.RESEND_APIKEY })

try {
  const email = await client.Email().create({
    from: 'Acme <onboarding@resend.dev>',
    to: [to],
    subject: 'Hello from the generated Resend SDK',
    html: '<p>It works!</p>',
  })
  console.log('sent:', email.data())
} catch (err) {
  console.error('send failed:', err.message)
  process.exit(1)
}
