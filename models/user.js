const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl:{
    type: String,
  },
  bio: {
    type: String,
    default: "",
  },
  recipes: {
    type: Array,
  },
  upVotes: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

userSchema.post("save", async function (doc) {
  try {
    console.log("Doc : ", doc);
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: "Recipe Keeper",
      to: doc.email,
      subject: "Welcome to Recipe Keeper",
      html: `<h1>Hello ${doc.name}</h1><h2>Recipe Keeper</h2> <p>Says hi</p> <a href='https://recipekkeeper.netlify.app/'>Recipe Keeper</a>`,
    });
    console.log(info);
  } catch (error) {
    console.log(error);
  }
});

module.exports = mongoose.model("User", userSchema);
