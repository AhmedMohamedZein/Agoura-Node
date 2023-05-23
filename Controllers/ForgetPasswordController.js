const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const mongoose = require('mongoose');
const user = require('../Models/User');

class ForgetPasswordController {
  constructor(User) {
    this.User = User;
    this.sendOTP = this.sendOTP.bind(this);
    this.verifyOTP = this.verifyOTP.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  async sendOTP(req, res) {
    try {
      const email = req.body.email;
      console.log(email);
      // Check if the user with the given email exists
      const userr = await user.findOne({ email: email }).exec();
      console.log(userr);
      if (!userr) {
        throw new Error('User not found');
        
      }
      

      // Generate an OTP and save it to the user's record in the database
      const otp = speakeasy.totp({
        secret: process.env.OTP_SECRET,
        digits: 6,
        step: 300,
      });

      user.otp = otp;
      await user.save();

      // Send the OTP to the user's email address
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

     mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Your OTP for password reset',
        text: `Your one-time password is: ${otp}`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }

  async verifyOTP(req, res) {
    try {
      const { email, otp } = req.body;
      // Check if the user with the given email exists
      const user = await this.User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      // Verify the OTP
      const isOTPValid = speakeasy.totp.verify({
        secret: process.env.OTP_SECRET,
        token: otp,
        digits: 6,
        step: 300,
      });

      if (!isOTPValid) {
        throw new Error('Invalid OTP');
      }

      // Generate a reset token and save it to the user's record in the database
      const resetToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );

      user.resetToken = resetToken;
      await user.save();

      res.status(200).json({ resetToken: resetToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }

  async resetPassword(req, res) {
    try {
      const { resetToken, newPassword } = req.body;
      // Verify the reset token
      const decodedToken = jwt.verify(resetToken, process.env.JWT_SECRET);

      // Find the user by ID and reset their password
      const user = await this.User.findById(decodedToken.userId);
      if (!user) {
        throw new Error('User not found');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetToken = null;
      await user.save();

      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
}

module.exports = new ForgetPasswordController();