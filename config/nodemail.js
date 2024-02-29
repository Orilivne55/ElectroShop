const nodemailer = require("nodemailer");
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SEND_EMAIL,
    pass: process.env.PASS_SEND_EMAIL,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMail = async ( user ,subject ,text) => {
  const mailOptions = {
    from: `"Elrctricis" , ${process.env.EMAIL_SEND_EMAIL}`, 
    to: user.email,
    subject: subject, 
    text: text, 
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email has been sent");
  } catch (error) {
    console.error(error);
  }
};

module.exports = {sendMail}







