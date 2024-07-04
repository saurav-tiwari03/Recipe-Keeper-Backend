const User = require('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async(req,res ) => {
  try {
    const {name,userName,email,password} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
      console.log('User already exists')
      res.status(401).json({
        success: false,
        message:'User already exists'
      })
      return;
    }
    const userNameRegisterd = await User.findOne({userName});
    if(userNameRegisterd){
      console.log('Choose a unique username')
      res.status(401).json({
        success: false,
        message:'Please enter a unique username'
      })
      return;
    }
    const hashedPassword = await bcrypt.hash(password,10)
    console.log('User signed up successfully')
    const user = await User.create({name,userName,email,password:hashedPassword});
    let payload = {
      id:user._id,
      name:user.name,
      email:user.email
    }
    let token = jwt.sign(payload,"saurav",{expiresIn:'1d'});
    res.status(200).json({
      success: true,
      token:token,
      message:"User signed up successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message:'Error while signing up'
    })
  }
}

exports.login = async(req,res) => {
  try {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
      console.log('User not found')
      res.status(404).json({
        success: false,
        message: 'User not found in the database'
      });
      return;
    }
    const isMatch = await bcrypt.compare(password,user.password );
    if(isMatch){
      const payload = {
        id:user._id,
        name:user.name,
        email:user.email
      }
      let token = jwt.sign(payload,"saurav",{expiresIn:'1d'})
      console.log('User logged in successfully')
      res.status(200).json({
        success:true,
        token:token,
        message: 'User logged in successfully'
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Password does not match'
      });
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message:'Error while logging in'
    })
  }
}