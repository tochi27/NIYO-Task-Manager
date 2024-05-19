const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

// Create Email Transporter
const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    from: process.env.EMAIL_USER,
  });
  console.log(process.env.EMAIL_USER);

  // Options for sending Email
  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  };

  try {
    // Send the email
    const info = await transporter.sendMail(options);
    console.log("Email sent:", info, options);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail; 
