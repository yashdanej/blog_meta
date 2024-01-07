const dotenv = require('dotenv');
const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const passport = require('passport');
const cookieSession = require('cookie-session');
const passportSetup = require('./passport')
const cors = require('cors');
const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

// for google auth20 START
app.unsubscribe(
    cookieSession({
        name: "session",
        keys: ['cyberwolve'],
        maxAge: 24 * 60 * 60 * 100,
    })
)
// app.use(passport.initialize());
// app.use(passport.session());
app.use(cors({
    origin: ['http://localhost:3000', 'https://blog-meta.vercel.app'],  // i am doing this because of cookie request
    credentials: true,
}));
// for google auth20 START

// route setup START
const authRouter = require("./routes/auth")
const blogRouter = require("./routes/blog")
const utilRouter = require("./routes/util")
const userRouter = require("./routes/users")

app.use('/auth', authRouter.router)
app.use('/blog', blogRouter.router)
app.use('', utilRouter.router)
app.use('/user', userRouter.router)
// route setup END

// error handling START
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(500).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});
// error handling END

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Conected to backend")
    }catch (error){
        throw error;
    }
}

// mongodb connection check START
mongoose.connection.on("disconnected", () => {
    console.log("mongodb disconnected");
});

mongoose.connection.on("connected", () => {
    console.log("mongodb connected");
});
// mongodb connection check END

app.listen(process.env.PORT, () => {
    connect();
    console.log("Server started");
});