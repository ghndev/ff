import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { db } from '@/db'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    )
  }

  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400
    })
  }

  const { id } = evt.data
  const eventType = evt.type
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
  console.log('Webhook body:', body)

  try {
    if (eventType === 'user.created' || eventType === 'user.updated') {
      const { id: clerkId, email_addresses, username } = evt.data

      if (email_addresses && email_addresses.length > 0) {
        await db.user.upsert({
          where: { clerkId },
          update: {
            email: email_addresses[0].email_address,
            username: username as string
          },
          create: {
            clerkId,
            email: email_addresses[0].email_address,
            username: username as string
          }
        })
        console.log(`User ${clerkId} upserted successfully`)
      } else {
        console.error('No email address provided for user')
      }
    } else if (eventType === 'user.deleted') {
      const { id: clerkId } = evt.data
      await db.user.delete({
        where: { clerkId }
      })
      console.log(`User ${clerkId} deleted successfully`)
    }
  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response('Error processing webhook', { status: 500 })
  }

  return new Response('', { status: 200 })
}
