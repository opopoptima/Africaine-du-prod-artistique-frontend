import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { clientEmail, subject, htmlContent } = await request.json();

    if (!clientEmail || !subject || !htmlContent) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Your App <noreply@your-verified-domain.com>', // Must be verified
      to: ['recipient@example.com'], 
      subject,
      html: htmlContent,
      reply_to: clientEmail, // ← key: replies go to client's email
    });

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Email failed' }, { status: 500 });
  }
}