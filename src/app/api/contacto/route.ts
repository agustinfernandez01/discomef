import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // ⬇️ AHORA LEEMOS FORM DATA, NO JSON
    const form = await req.formData();

    const nombre = form.get('nombre')?.toString() ?? '';
    const apellido = form.get('apellido')?.toString() ?? '';
    const email = form.get('email')?.toString() ?? '';
    const asunto = form.get('asunto')?.toString() ?? '';
    const mensaje = form.get('mensaje')?.toString() ?? '';

    // Archivo opcional
    const archivo = form.get('archivo') as File | null;

    // Validaciones básicas
    if (!nombre || !apellido || !email || !asunto || !mensaje) {
      return NextResponse.json(
        { ok: false, message: 'Faltan datos del formulario' },
        { status: 400 }
      );
    }

    // Adjuntos para Resend (si hay archivo)
    const attachments: { filename: string; content: string }[] = [];

    if (archivo && archivo.size > 0) {
      const arrayBuffer = await archivo.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      attachments.push({
        filename: archivo.name || 'archivo.pdf',
        content: buffer.toString('base64'),
      });
    }

    const { data, error: resendError } = await resend.emails.send({
      from: `Web Discomef <${process.env.RESEND_FROM_EMAIL}>`,
      to: 'info@discomef.com.ar',
      replyTo: email,
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
      attachments: attachments.length ? attachments : undefined,
    });

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
