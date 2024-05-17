require('dotenv').config()
const express = require('express')
const User    = require('./users')
const router = express.Router(); 
const {jwtAuthMiddleware,generateToken} = require('../jwt')

router.get('/profile',jwtAuthMiddleware,(req,res)=>{
  res.send('This is a profile Route.')
})

router.post('/register', async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const newUser = new User({ name, username, password });
    const response = await newUser.save();

    const payload = {
      id:response.id,
      username:response.username
    }

    const token = generateToken(payload)
    console.log(JSON.stringify(payload));
    console.log("Token is :: " + token);

    res.status(201).json({ message: 'User registered successfully', newUser , token });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Username already exists' });
    } else {
      res.status(500).json({ message: 'Internal server error', error:error.message });
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    // if (!user || !(await user.comparePassword(password))) {
    //   return res.status(401).json({ error: 'Invalid username or password' });
    // }

    // Create payload for the token
    const payload = {
      id: user.id,
      username: user.username,
    };

    // Generate JWT token
    const token = generateToken(payload);

    // Send token in response
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/home', jwtAuthMiddleware ,(req,res) => {
  res.send('Home')
})



module.exports = router