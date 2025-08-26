import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    // Configure ton SMTP (ici Gmail par ex.)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, // ton email
        pass: process.env.MAIL_PASS  // mot de passe ou App Password
      }
    });

    try {
      await transporter.sendMail({
        from: email,
        to: process.env.MAIL_USER,   // l’adresse où tu reçois les mails
        subject: `Nouveau message de ${name}`,
        text: message
      });

      res.status(200).json({ success: true, message: "Message envoyé !" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}
