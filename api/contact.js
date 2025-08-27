import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { name, email, pack, message } = req.body;

  // Transporteur SMTP via Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER, // ton adresse Gmail
      pass: process.env.MAIL_PASS  // mot de passe d’application généré
    }
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,          // l’expéditeur (l’utilisateur)
      to: process.env.MAIL_USER,             // toi, la boîte de réception
      subject: `Nouveau message via le site - ${pack || "Sans pack"}`,
      text: `
Nom : ${name}
Email : ${email}
Pack : ${pack || "Non précisé"}

Message :
${message}
      `
    });

    res.status(200).json({ success: true, message: "Message envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur envoi mail:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
