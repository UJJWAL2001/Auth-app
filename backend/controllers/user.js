const User = require('../models/user');

module.exports.registerUser = async (req,res) => {
    console.log(req.body);
    const { user , password } = req.body;
    console.log(user)
    const newUser = new User(user);
    console.log(newUser)
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, err=>{  // logins user after registration
        if(err) return next(err);
        // req.flash('success','Welcome to the Campgrounds');
    res.status(200).json(registeredUser); 
    });
}


module.exports.loginUser = async (req,res) =>{
    const user = req.user;
    res.status(200).json({user, message:'logged in success'});
};

module.exports.logout = (req,res)=>{
    req.logout();
    // req.flash('success','See you soon!!');
    res.status(200).json({message:'logged out'});
}