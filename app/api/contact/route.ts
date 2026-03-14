import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const POST = async (request: NextRequest) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { name, email, phone, message, service } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: "Real Estate in Berlin <info@realestateinberlin.nestoririondo.com>",
      to: "hello@nestoririondo.com",
      replyTo: email,
      subject: `New enquiry from ${name}${service ? ` — ${service}` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:580px;margin:0 auto;color:#111">
          <div style="background:#b8983f;padding:24px 32px;border-radius:4px 4px 0 0">
            <p style="margin:0;color:#fff;font-size:12px;letter-spacing:0.15em;text-transform:uppercase">Real Estate in Berlin</p>
            <h1 style="margin:8px 0 0;color:#fff;font-size:22px;font-weight:600">New Enquiry</h1>
          </div>
          <div style="background:#fafafa;padding:32px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 4px 4px">
            <table style="width:100%;border-collapse:collapse">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;width:110px;color:#666;font-size:13px;vertical-align:top">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;font-weight:600">${name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:13px;vertical-align:top">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px"><a href="mailto:${email}" style="color:#b8983f">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:13px;vertical-align:top">Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px"><a href="tel:${phone}" style="color:#b8983f">${phone}</a></td>
              </tr>` : ""}
              ${service ? `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:13px;vertical-align:top">Service</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px">${service}</td>
              </tr>` : ""}
            </table>
            <div style="margin-top:24px">
              <p style="margin:0 0 8px;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.1em">Message</p>
              <div style="background:#fff;border:1px solid #e5e5e5;border-radius:4px;padding:16px 20px;font-size:14px;line-height:1.7;white-space:pre-wrap">${message}</div>
            </div>
            <p style="margin:24px 0 0;font-size:12px;color:#999">Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
      text: [
        `New enquiry from ${name}`,
        ``,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        service ? `Service: ${service}` : null,
        ``,
        `Message:`,
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
};

export { POST };
