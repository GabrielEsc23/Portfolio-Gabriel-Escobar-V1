// src/pages/api/contact.ts
import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    let nombre = "";
    let email = "";
    let asunto = "";
    let mensaje = "";

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      nombre = body.nombre?.trim() || "";
      email = body.email?.trim() || "";
      asunto = body.asunto?.trim() || "";
      mensaje = body.mensaje?.trim() || "";
    } else {
      const formData = await request.formData();
      nombre = (formData.get("nombre") as string)?.trim() || "";
      email = (formData.get("email") as string)?.trim() || "";
      asunto = (formData.get("asunto") as string)?.trim() || "";
      mensaje = (formData.get("mensaje") as string)?.trim() || "";
    }

    // Validaciones de seguridad
    if (!nombre || nombre.length < 2) {
      return new Response(
        JSON.stringify({ success: false, error: "Por favor ingresa tu nombre completo." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: "Por favor ingresa una dirección de correo válida." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!asunto) {
      asunto = "Consulta desde el Portafolio Web";
    }

    if (!mensaje || mensaje.length < 5) {
      return new Response(
        JSON.stringify({ success: false, error: "El mensaje debe contener al menos 5 caracteres." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Obtener variables de entorno (compatibles con Node y Vercel)
    const gmailUser = import.meta.env.GMAIL_USER || process.env.GMAIL_USER;
    const gmailPass = import.meta.env.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD;
    const toEmail = import.meta.env.CONTACT_TO_EMAIL || process.env.CONTACT_TO_EMAIL || gmailUser || "gabrielescobar283@gmail.com";

    if (!gmailUser || !gmailPass) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "El servicio de correo aún no está configurado con GMAIL_APP_PASSWORD en el archivo .env.",
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    // Configurar transporte SMTP de Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass.replace(/\s+/g, ""), // Limpiar espacios de la clave de 16 caracteres
      },
    });

    const fechaActual = new Date().toLocaleString("es-EC", {
      timeZone: "America/Guayaquil",
      dateStyle: "full",
      timeStyle: "short",
    });

    // Plantilla HTML de correo estilo gaceta
    const htmlContent = `
      <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; background-color: #f5efe1; border: 2px solid #2e261f; padding: 24px; color: #1c1714;">
        <div style="border-bottom: 2px solid #2e261f; padding-bottom: 12px; margin-bottom: 20px; text-align: center;">
          <span style="font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #8a3324; font-weight: bold;">
            ★ THE DEVELOPER GAZETTE • DESPACHO DE CONTACTO ★
          </span>
          <h1 style="font-size: 24px; margin: 6px 0; text-transform: uppercase;">Nuevo Mensaje Recibido</h1>
          <span style="font-size: 12px; color: #5c4a3b;">Fecha de emisión: ${fechaActual}</span>
        </div>

        <div style="background-color: #f7f2e4; border: 1px solid #3d332a; padding: 16px; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="font-weight: bold; width: 120px; padding: 4px 0;">Remitente:</td>
              <td style="padding: 4px 0;">${nombre}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 4px 0;">Correo:</td>
              <td style="padding: 4px 0;"><a href="mailto:${email}" style="color: #8a3324; font-weight: bold;">${email}</a></td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 4px 0;">Asunto:</td>
              <td style="padding: 4px 0;">${asunto}</td>
            </tr>
          </table>
        </div>

        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 14px; text-transform: uppercase; font-family: monospace; color: #8a3324; border-bottom: 1px solid #3d332a; padding-bottom: 4px; margin-bottom: 10px;">
            Mensaje / Despacho:
          </h3>
          <div style="font-size: 15px; line-height: 1.6; white-space: pre-wrap; background: #ffffff; padding: 16px; border-left: 4px solid #8a3324;">
${mensaje}
          </div>
        </div>

        <div style="border-top: 1px solid #3d332a; padding-top: 12px; text-align: center; font-family: monospace; font-size: 11px; color: #786452;">
          <p>Para responder a este mensaje, simplemente responde directamente a este correo.</p>
          <span>The Developer Gazette • Portafolio de Gabriel Escobar</span>
        </div>
      </div>
    `;

    // Enviar el correo
    await transporter.sendMail({
      from: `"The Developer Gazette" <${gmailUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Gazette Portafolio] ${asunto} — de ${nombre}`,
      text: `Nuevo mensaje de ${nombre} (${email}):\n\nAsunto: ${asunto}\nFecha: ${fechaActual}\n\nMensaje:\n${mensaje}`,
      html: htmlContent,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "¡Despacho editorial transmitido con éxito! Gabriel ha recibido tu mensaje.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error al enviar correo:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Ocurrió un error inesperado al enviar el despacho.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
