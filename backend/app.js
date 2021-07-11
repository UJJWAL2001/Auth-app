if( process.env.NODE_ENV !== "production"){
    require('dotenv').config();  // if we are not in production then we can access our hidden .env file
                                 // key value paired saved in them via process.env.key_name
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const MongoDBStore = require('connect-mongo');
const User = require('./models/user');
const userRoutes = require('./routes/userRoutes');
const phoneVerifyRoutes = require('./routes/phoneVerify')

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/sukh-task'; ;

mongoose.connect(dbUrl,{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true,
    useFindAndModify : false
});

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open', () =>{
    console.log("DB Connected");
});

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
})
const secret = process.env.SECRET || 'thisshouldbeabettersecret!'

const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,   // in seconds | update session only once in 24hrs
    crypto: {
        secret
    }
});

const sessionOptions = {
    store,
    name : 'camp',
    secret,
    resave : false,
    saveUninitialized : false,
    cookie : {
        httOnly : true, // It is true by default still..... security reasons
        //secure : true, // now cookies can only be accessed through http requests .... not via some script | breaks thinds for local host 
        expire : Date.now() + 1000 * 60 * 60 * 24 * 7, // seting expire date of a week
        maxAge : 1000 * 60 * 60 * 24 * 7 // milli seconds in a week
    }
};

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ******* ROUTES *******

app.get('/',(req,res)=>{
    res.send('home');
})

app.use('/userapi',userRoutes);
app.use('/phoneapi',phoneVerifyRoutes);

app.use((err,req,res,next)=>{
    console.log(err);
    const {statusCode = 500} = err;
    if(!err.message) err.message = "Somthing went wrong!!";
    res.status(500).json({ message: 'Error connecting to db', err });
})

const port = process.env.PORT || 8000;
app.listen(port, ()=>{
    console.log(`App listening at port ${port}`);
});