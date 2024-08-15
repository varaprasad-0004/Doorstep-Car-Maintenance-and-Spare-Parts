import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';

import address from './Routers/address.js';
import service from './Routers/service.js';
import login from './Routers/login.js';
import addtocart from './Routers/cart.js';
import dynamicform from './Routers/dynamicform.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://buddanavaraprasad:MVdDKXcTAc5IMdH4@cluster0.ci86jca.mongodb.net/Cluster0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB', err);
});


app.listen(5005, () => {
    console.log("Connected to Database & Listening to localhost 5005");
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "dynocarcarez@gmail.com",
    pass: 'zuti kvfw edop fyba'
  }
});

const OTPModel = mongoose.model('OTP', {
  email: String,
  otp: String
});

app.post('/send-otp', (req, res) => {
  const { email } = req.body;

  // Basic email validation
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: "buddanavaraprasad@gmail.com",
    to: email,
    subject: 'Your OTP for Verification',
    html: `<p style="font-size: 16px;">Dear user,</p>
           <p style="font-size: 16px;">Thank you for using our service. Your One-Time Password (OTP) for verification is: </p>
           <h1 margin-left: 50px>${otp}</h1>
           <p style="font-size: 16px;">Please use this OTP to complete the verification process.</p>
           <p style="font-size: 16px;">If you did not request this OTP, please ignore this message.</p>
           <p style="font-size: 16px;">Best regards,<br/>The DYNO Car Care Team</p>`
  };  
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.status(500).send('Failed to send OTP');
    } else {
      console.log('Email sent: ' + info.response);

      // Save OTP to database
      const otpData = new OTPModel({
        email: email,
        otp: otp.toString() // Convert to string for consistency
      });

      otpData.save()
        .then(() => {
          res.status(200).send('OTP sent successfully');
        })
        .catch(error => {
          console.error('Error saving OTP to database:', error);
          res.status(500).send('Failed to send OTP');
        });
    }
  });
});

app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  OTPModel.findOne({ email: email, otp: otp })
    .then((otpData) => {
      if (!otpData) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }

      // OTP is valid, you can do further processing here if needed
      // For example, marking the OTP as used or expired in the database

      return res.status(200).json({ message: 'OTP verified successfully' });
    })
    .catch((error) => {
      console.error('Error verifying OTP:', error);
      return res.status(500).json({ message: 'Failed to verify OTP' });
    });
});


app.use('/', address);

app.use('/', dynamicform)

app.use('/', login)

app.use('/', addtocart)
  
app.use('/', service)

app.use('/', (req, res, next) => {
    res.send('Hi, Dude');
});