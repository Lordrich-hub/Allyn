import { NextResponse } from 'next/server'

const sendEmail = async ({ to, subject, html }: { to: string; subject: string; html: string }) => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY')
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Allyn <no-reply@allyn.co.uk>',
      to: [to],
      subject,
      html,
    }),
  })

  if (!response.ok) {
    throw new Error('Email request failed')
  }
}

const sendSms = async ({ to, body }: { to: string; body: string }) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const fromNumber = process.env.TWILIO_FROM_NUMBER

  if (!accountSid || !authToken || !fromNumber) {
    throw new Error('Missing TWILIO_* environment variables')
  }

  const authHeader = Buffer.from(`${accountSid}:${authToken}`).toString('base64')
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      From: fromNumber,
      To: to,
      Body: body,
    }).toString(),
  })

  if (!response.ok) {
    throw new Error('SMS request failed')
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const {
      email,
      phone,
      channelEmail,
      channelSms,
      vendorName,
      serviceName,
      bookingDate,
      bookingTime,
    } = payload

    const subject = 'Allyn booking confirmation'
    const html = `
      <div style="font-family: Arial, sans-serif;">
        <h2>Your booking is confirmed</h2>
        <p><strong>Vendor:</strong> ${vendorName}</p>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Date:</strong> ${bookingDate}</p>
        <p><strong>Time:</strong> ${bookingTime}</p>
        <p>We will send you reminders as your appointment approaches.</p>
      </div>
    `

    const smsBody = `Allyn booking confirmed: ${vendorName} (${serviceName}) on ${bookingDate} at ${bookingTime}.`

    if (channelEmail && email) {
      await sendEmail({ to: email, subject, html })
    }

    if (channelSms && phone) {
      await sendSms({ to: phone, body: smsBody })
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    return NextResponse.json({ error: 'Unable to send notifications' }, { status: 500 })
  }
}
