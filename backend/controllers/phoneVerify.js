if( process.env.NODE_ENV !== "production"){
    require('dotenv').config();  // if we are not in production then we can access our hidden .env file
                                 // key value paired saved in them via process.env.key_name
}

const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)


module.exports.sendOTP = (req,res) => {
    if (req.params.phoneNumber) {
       client
       .verify
       .services(process.env.SERVICE_ID)
       .verifications
       .create({
           to: `+${req.params.phoneNumber}`,
           channel: 'sms' 
       })
       .then(data => {
           res.status(200).send({
               message: "Verification is sent!!",
               phonenumber: req.params.phoneNumber,
               data
           })
       }) 
    } else {
       res.status(400).send({
           message: "Wrong phone number :(",
           phonenumber: req.params.phoneNumber,
           data
       })
    }
}

module.exports.checkOTP = (req, res) => {
    console.log(req.params)
    if (req.params.phoneNumber && (req.params.code).length === 6) {
        client
            .verify
            .services(process.env.SERVICE_ID)
            .verificationChecks
            .create({
                to: `+${req.params.phoneNumber}`,
                code: req.params.code
            })
            .then(data => {
                if (data.status === "approved") {
                    res.status(200).send({
                        message: "User is Verified!!",
                        data
                    })
                } else {
                    res.status(400).send({
                        message: "Wrong phone number or code :(",
                        phonenumber: req.params.phoneNumber
                    })
                }
            })
    } else {
        res.status(400).send({
            message: "Wrong phone number or code :(",
            phonenumber: req.params.phoneNumber
        })
    }
}