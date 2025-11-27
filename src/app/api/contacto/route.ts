import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { nombre, apellido, email, asunto, mensaje } = await req.json();

    // Validaciones básicas
    if (!nombre || !apellido || !email || !asunto || !mensaje) {
      return NextResponse.json(
        { ok: false, message: 'Faltan datos del formulario' },
        { status: 400 }
      );
    }

    const { data, error: resendError } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ??
        'Web Discomef <onboarding@resend.dev>', // 👈 asegurate de que en .env tengas algo así
      to: 'info@discomef.com.ar', // mail donde querés recibir
      subject: `Nuevo mensaje desde la web: ${asunto}`,
      text: `
Formulario "ESCRÍBINOS"

Nombre: ${nombre} ${apellido}
Email: ${email}

Asunto:
${asunto}

Mensaje:
${mensaje}
      `,
      html: `
        <h2>Nuevo mensaje desde el formulario "ESCRÍBINOS"</h2>
        <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje.replace(/\n/g, '<br />')}</p>
      `,
    });

    // ⚠️ si Resend falla, viene en resendError (no se lanza excepción)
    if (resendError) {
      console.error('Error de Resend:', resendError);
      return NextResponse.json(
        { ok: false, message: 'Error al enviar el correo (Resend)' },
        { status: 500 }
      );
    }

    console.log('Email enviado correctamente:', data);

    return NextResponse.json({
      ok: true,
      message: 'Correo enviado correctamente',
    });
  } catch (error) {
    console.error('Error al enviar mail de contacto:', error);
    return NextResponse.json(
      { ok: false, message: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
