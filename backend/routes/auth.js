const express = require('express');
const passport = require('passport');
const { Register, Login, Logout } = require('../controller/auth');
const router = express.Router();

router
    .post('/register', Register)
    .post('/login', Login)
    .post('/logout', Logout)

    // google
    .get('/google/callback',
    passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/login/failed',
    }))

    .get('/login/success', (req, res) => {
        if(req.user){
            res.status(200).json({
                error: false,
                message: 'Successfully Logged In',
                user: req.user,
            })
        }else{
            res.status(403).json({error: true, message: 'Not Authorized'})
        }
    })

    .get('/login/failed', (req, res) => {
        res.status(401).json({
            error: true,
            message: 'Log in failure',
        })
    })

    .get('/google', passport.authenticate('google', ['profile', ' email']))

    .get('logout', (req, res) => {
        req.logout();
        res.redirect(process.env.CLIENT_URL)
    })

exports.router = router;