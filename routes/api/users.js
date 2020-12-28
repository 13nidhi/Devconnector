const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
//this is validation we are using for checking fields work fine not be empty
// and it goes in 2nd para. of our post method
const gravatar = require('gravatar'); 
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

//@route   POST api/users 
//@desc    Register user (we are registering the user)
//@access  Public

router.post('/', [
    check('name', 'Name is required')
    .not()
    .isEmpty(),
    check('email', 'Please include a valid eamil').isEmail(),
    check(
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
    // see  if user exists                                                      
    let user = await User.findOne({ email });

    if (user) {
        return res.status(400).json({ error: [{ msg: 'User already exist'}] });
    }
     // get  users gravatar
     const avatar = gravatar.url(email, {
         s: '200',
         r: 'pg',
         d: 'mm'  
     })

     user = new User({ 
         name,
         email,
         avatar,
         password
     });
    // Encrypt password (we are encrupting password)
     const salt = await bcrypt.genSalt(10);

     user.password = await bcrypt.hash(password, salt); 

     // save user to database
     await user.save();

    // Return  jsonwebtoken
    const payload = {
        user: {  
            id: user.id
        }
    }

        jwt.sign(
            payload, 
            config.get('jwtSecret'), 
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

        } catch(err) {
            console.log(err.message);
            res.status(500).send('Server error');    
    }
     
});

module.exports = router;

// in this we are sign in the user