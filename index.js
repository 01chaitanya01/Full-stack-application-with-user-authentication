import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

connect();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  otp: String, // Added OTP field to user schema
});

const User = mongoose.model("User", userSchema);

// Configure session middleware
app.use(
  session({
    secret: process.env.AUTHENTICATION_SECRET_KEY, // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to 'true' for HTTPS in production
      maxAge: 3600000, // Session expiration time (in milliseconds), e.g., 1 hour
    },
  })
);

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(401).json({ success: false, message: "User not authenticated" });
};

// Routes
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.json({ message: "User already registered" });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });
      await newUser.save();
      req.session.userId = newUser._id; // Store user ID in the session

      // Create a transporter object with Gmail SMTP configuration
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD,
        },
      });

      // Set up email data
      const mailOptions = {
        from: 'chaitanya01choudhari01@gmail.com',
        to: email, // Sending email to the registered user
        subject: 'Registration Successful',
        text: `Dear ${name},\n\nThank you for registering with our website!\n\nWe look forward to serving you.\n\nBest regards,\nThe Team`,
        html: `<p>Dear ${name},</p><p>Thank you for registering with our website!</p><p>We look forward to serving you.</p><p>Best regards,</p><p>The Team</p>`,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error occurred:');
          console.log(error.message);
          return;
        }
        console.log('Email sent successfully!');
        console.log('Message ID: ', info.messageId);
      });

      res.json({
        message: "Successfully registered, please login now.",
        user: newUser,
      });
    }
  } catch (error) {
    res.json({ message: "An error occurred" });
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (email === "" || password === "") {
      res.json({ success: false, message: `Please enter email and password` });
    } else {
      if (user) {
        if (password === user.password) {
          req.session.userId = user._id; // Store user ID in the session
          res.json({ success: true, message: `Login Successful ${user.name}`, user: user });
        } else {
          res.json({ success: false, message: "Password didn't match" });
        }
      } else {
        res.json({ success: false, message: "User not registered" });
      }
    }
  } catch (error) {
    res.json({ success: false, message: "An error occurred" });
  }
});

app.post("/application", async (req, res) => {
  const { name, email, number, age, state, city, college, branch } = req.body;
  console.log( name, email, number, age, state, city, college, branch )
  try {
    // Find the existing user by email
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.json({ success: false, message: "User not found" });
    }

    // Update the existing user data
    existingUser.name = name.toString();
    existingUser.number = number.toString();
    existingUser.age = age.toString();
    existingUser.state = state.toString();
    existingUser.city = city.toString();
    existingUser.college = college.toString();
    existingUser.branch = branch.toString();

    await existingUser.save();

    res.json({
      success: true,
      message: "Successfully submitted user Application form",
      user: existingUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: `An error occurred: ${error.message}` });
  }
});




app.post("/forget-password", async (req, res) => {
  const { email } = req.body;

  if (email) {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.json({ success: false, message: "User not found" });
      }

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
      user.otp = otp.toString();
      await user.save();

      // Create a transporter object with Gmail SMTP configuration
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'chaitanya01choudhari01@gmail.com',
          pass: 'ugzclirwkewnyivl',
        },
      });

      // res.json({ success: true, message: "please wait " });

      // Set up email data
      const mailOptions = {
        from: 'StreamLine IT Services and Training',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`,
        html: `<p>Your OTP for password reset is: ${otp}</p>`,
      };

      // res.json({ success: true, message: "please wait " });

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error occurred:');
          console.log(error.message);
          return res.json({ success: false, message: "Failed to send OTP email" });
        }
        res.json({ success: true, message: "OTP sent successfully" });
        console.log(`Email sent successfully! ${otp}`);
        console.log('Message ID: ', info.messageId);
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An error occurred" });
    }
  } else {
    res.json({ success: false, message: "please enter email" });
  }
});


app.post("/update-password", async (req, res) => {
  const { otp: otpFromRequest, password } = req.body;

  if (otpFromRequest && password) {
    try {
      const user = await User.findOne({ otp: otpFromRequest });
      // const userId = user._id;
      // console.log(userId);
      if (!user) {
        return res.json({ success: false, message: "OTP is not correct" });
      } else {
        // if (user) {
        if (otpFromRequest === user.otp) {
          user.otp = "";
          await user.save();
          user.password = password;
          await user.save();
          return res.json({ success: true, message: "Password updated successfully" });
          // } else {
          //   res.json({ success: false, message: "OTP is not correct" });
          // }
        } else {
          res.json({ success: false, message: "User not authenticated" });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An error occurred" });
    }
  } else {
    res.json({ success: false, message: "please enter otp and password" });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.json({ success: true, message: "Logout Successful" });
  });
});

app.get("/homepage", isAuthenticated, (req, res) => {
  res.json({ success: true, message: "Welcome to the protected homepage!" });
});

app.listen(9002, () => {
  console.log("Backend started at port 9002");
});
