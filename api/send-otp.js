// api/send-otp.js
const nodemailer = require('nodemailer');
const emailValidator = require('email-validator');

// In-memory store for OTPs (replace this with a database in production)
const otpStore = {};

// Function to generate a 6-digit OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.body;

  // Validate the email format
  if (!email || !emailValidator.validate(email)) {
    return res.status(400).json({ message: 'Invalid email address.' });
  }

  // Generate a unique OTP
  const otp = generateOtp();

  // Store OTP in memory (this would be replaced by a database in production)
  otpStore[email] = otp;

  // Configure nodemailer to use Gmail SMTP or any email service of your choice
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like SendGrid or Mailgun
    auth: {
      user: 'talentbridge.dev11@gmail.com', // Use your email
      pass: 'uaap buef brtw urzp', // Use your email password (or app password)
    },
  });

  // Define the email content
  const mailOptions = {
    from: 'talentbridge.dev11@gmail.com', // Sender's email
    to: email, // Recipient's email
    subject: 'Your OTP for Verification',
    text: `Your OTP for verification is: ${otp}`, // OTP content
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);

    // Return the OTP sent confirmation in JSON response
    return res.status(200).json({
      message: 'OTP sent successfully.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error sending OTP. Please try again.' });
  }
};
