// In-memory store for OTPs (you can replace this with a DB in production)
const otpStore = {};

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, otp } = req.body;

  // Check if the email and OTP are provided
  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required.' });
  }

  // Check if the OTP exists for the given email
  const storedOtp = otpStore[email];

  // Verify the OTP
  if (storedOtp === otp) {
    // OTP is valid
    delete otpStore[email];  // Optionally clear OTP after verification
    return res.status(200).json({ message: 'OTP verified successfully.' });
  } else {
    // Invalid OTP
    return res.status(400).json({ message: 'Invalid OTP.' });
  }
};
