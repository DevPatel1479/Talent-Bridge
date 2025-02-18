const express = require('express');
const nodemailer = require('nodemailer');
const emailValidator = require('email-validator');
require('dotenv').config();  // Load environment variables from .env file

const app = express();
app.use(express.json()); // To parse JSON bodies

// In-memory store for OTPs (you can replace this with a DB in production)
const otpStore = {};

// Function to generate a 6-digit OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Endpoint to send OTP
app.post('/api/otp', async (req, res) => {
  const { email } = req.body;

  // Validate the email format
  if (!email || !emailValidator.validate(email)) {
    return res.status(400).json({ message: 'Invalid email address.' });
  }

  // Generate a unique OTP
  const otp = generateOtp();

  // Store OTP in memory (this would be replaced by a DB in production)
  otpStore[email] = otp;

  const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can use other services like SendGrid or Mailgun
    auth: {
      user: 'talentbridge.dev11@gmail.com',  // Use your email
      pass: 'uaap buef brtw urzp',  // Use your email password (or app password)
    },
  });

  // Define the email content
  const mailOptions = {
    from: 'talentbridge.dev11@gmail.com',  // Sender's email
    to: email,  // Recipient's email
    subject: 'Your OTP for Verification',
    text: `Your OTP for verification is: ${otp}`,  // OTP content
  };
  // Configure nodemailer transporter to use Gmail SMTP
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,  // From .env file
//       pass: process.env.EMAIL_PASS,  // From .env file
//     },
//   });

//   // Define the email content
//   const mailOptions = {
//     from: process.env.EMAIL_USER, // Sender's email
//     to: email, // Recipient's email
//     subject: 'Your OTP for Verification',
//     text: `Your OTP for verification is: ${otp}`, // OTP content
//   };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success message
    return res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error sending OTP. Please try again.' });
  }
});

// Endpoint to verify OTP
app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  // Check if the email and OTP are provided
  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required.' });
  }

  // Check if the OTP exists for the given email
  const storedOtp = otpStore[email];

  // Verify the OTP
  if (storedOtp === otp) {
    // OTP is valid, delete OTP after verification
    delete otpStore[email];
    return res.status(200).json({ message: 'OTP verified successfully.' });
  } else {
    // Invalid OTP
    return res.status(400).json({ message: 'Invalid OTP.' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
