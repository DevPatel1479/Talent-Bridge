// // const nodemailer = require('nodemailer');
// // const emailValidator = require('email-validator');

// // // Function to generate a 6-digit OTP
// // const generateOtp = () => {
// //   return Math.floor(100000 + Math.random() * 900000).toString();
// // };

// // // Main function to handle the API request
// // module.exports = async (req, res) => {
// //   // Ensure the request method is POST
// //   if (req.method !== 'POST') {
// //     return res.status(405).json({ message: 'Method Not Allowed' });
// //   }

// //   const { email } = req.body;

// //   // Validate the email format
// //   if (!email || !emailValidator.validate(email)) {
// //     return res.status(400).json({ message: 'Invalid email address.' });
// //   }

// //   // Generate a unique OTP
// //   const otp = generateOtp();

// //   // Configure nodemailer to use Gmail SMTP or any email service of your choice
// //   const transporter = nodemailer.createTransport({
// //     service: 'gmail',  // You can use other services like SendGrid or Mailgun
// //     auth: {
// //       user: 'talentbridge.dev11@gmail.com',  // Use your email
// //       pass: 'uaap buef brtw urzp',  // Use your email password (or app password)
// //     },
// //   });

// //   // Define the email content
// //   const mailOptions = {
// //     from: 'talentbridge.dev11@gmail.com',  // Sender's email
// //     to: email,  // Recipient's email
// //     subject: 'Your OTP for Verification',
// //     text: `Your OTP for verification is: ${otp}`,  // OTP content
// //   };

// //   try {
// //     // Send the email
// //     await transporter.sendMail(mailOptions);

// //     // Return the OTP sent confirmation in JSON response
// //     return res.status(200).json({
// //       message: 'OTP sent successfully.',
// //       otp: otp,  // This can be used for further verification on the client-side
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ message: 'Error sending OTP. Please try again.' });
// //   }
// // };



// const express = require('express');
// const nodemailer = require('nodemailer');
// const emailValidator = require('email-validator');

// const app = express();

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Function to generate a 6-digit OTP
// const generateOtp = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// // POST route for sending OTP email
// app.post('/send-otp', async (req, res) => {
//   const { email } = req.body;

//   // Validate the email format
//   if (!email || !emailValidator.validate(email)) {
//     return res.status(400).json({ message: 'Invalid email address.' });
//   }

//   // Generate a unique OTP
//   const otp = generateOtp();

//   // Configure nodemailer to use Gmail SMTP or any email service of your choice
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',  // You can use other services like SendGrid or Mailgun
//     auth: {
//       user: 'talentbridge.dev11@gmail.com',  // Use your email
//       pass: 'uaap buef brtw urzp',  // Use your email password (or app password)
//     },
//   });

//   // Define the email content
//   const mailOptions = {
//     from: 'talentbridge.dev11@gmail.com',  // Sender's email
//     to: email,  // Recipient's email
//     subject: 'Your OTP for Verification',
//     text: `Your OTP for verification is: ${otp}`,  // OTP content
//   };

//   try {
//     // Send the email
//     await transporter.sendMail(mailOptions);

//     // Return the OTP sent confirmation in JSON response
//     return res.status(200).json({
//       message: 'OTP sent successfully.',
//       otp: otp,  // This can be used for further verification on the client-side
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Error sending OTP. Please try again.' });
//   }
// });

// // Start the server on port 3000
// app.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });





// const express = require('express');
// const nodemailer = require('nodemailer');
// const emailValidator = require('email-validator');
// const app = express();

// app.use(express.json());

// // In-memory store for OTPs (you can replace this with a DB in production)
// const otpStore = {};

// // Function to generate a 6-digit OTP
// const generateOtp = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// // POST route for sending OTP email
// app.post('/send-otp', async (req, res) => {
//   const { email } = req.body;

//   // Validate the email format
//   if (!email || !emailValidator.validate(email)) {
//     return res.status(400).json({ message: 'Invalid email address.' });
//   }

//   // Generate a unique OTP
//   const otp = generateOtp();

//   // Store OTP in memory (this would be replaced by a database in production)
//   otpStore[email] = otp;

//   // Configure nodemailer to use Gmail SMTP or any email service of your choice
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',  // You can use other services like SendGrid or Mailgun
//     auth: {
//       user: 'talentbridge.dev11@gmail.com',  // Use your email
//       pass: 'uaap buef brtw urzp',  // Use your email password (or app password)
//     },
//   });

//   // Define the email content
//   const mailOptions = {
//     from: 'talentbridge.dev11@gmail.com',  // Sender's email
//     to: email,  // Recipient's email
//     subject: 'Your OTP for Verification',
//     text: `Your OTP for verification is: ${otp}`,  // OTP content
//   };

//   try {
//     // Send the email
//     await transporter.sendMail(mailOptions);

//     // Return the OTP sent confirmation in JSON response
//     return res.status(200).json({
//       message: 'OTP sent successfully.',
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Error sending OTP. Please try again.' });
//   }
// });

// // POST route for verifying OTP
// app.post('/verify-otp', (req, res) => {
//   const { email, otp } = req.body;

//   // Check if the email and OTP are provided
//   if (!email || !otp) {
//     return res.status(400).json({ message: 'Email and OTP are required.' });
//   }

//   // Check if the OTP exists for the given email
//   const storedOtp = otpStore[email];

//   // Verify the OTP
//   if (storedOtp === otp) {
//     // OTP is valid
//     delete otpStore[email];  // Optionally clear OTP after verification
//     return res.status(200).json({ message: 'OTP verified successfully.' });
//   } else {
//     // Invalid OTP
//     return res.status(400).json({ message: 'Invalid OTP.' });
//   }
// });

// // Start the server on port 3000
// app.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });






const nodemailer = require('nodemailer');
const emailValidator = require('email-validator');

// In-memory store for OTPs (you can replace this with a DB in production)
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
