import nodemailer from "nodemailer";

const sendEmail = async (to, Subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      email: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    Subject,
    html,
  };
  await transporter.sendMail(mailOptions);
};
