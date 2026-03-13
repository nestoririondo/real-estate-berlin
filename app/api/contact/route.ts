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
      text: [
        `Name: ${name}`,
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
