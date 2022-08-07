import nodemailer from "nodemailer";

export const sendMail = async (to: string, html: string) => {
  const testAccount = await nodemailer.createTestAccount();

  console.log("TEST ACCOUNT ", { testAccount });

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: "Ho sy binh dev",
    to,
    subject: "Change password",
    html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
