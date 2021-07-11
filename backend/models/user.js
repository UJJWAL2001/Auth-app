const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = Schema({
    firstName:{
        type: String,
        required: true
    },
    middleName:{
        type: String,
    },
    LastName:{
        type: String,
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pinCode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    attachment: {
        type: String
    }

})

userSchema.plugin(passportLocalMongoose, {usernameField : "email"});

module.exports = mongoose.model('User',userSchema);