// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const passport = require('passport');

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.CLIENT_ID,
//             clientSecret: process.env.SECRET_ID,
//             callbackURL: '/auth/google/callback',
//             scope: ['profile', 'email']
//         }
//     )
// )
// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.SECRET_ID,
//     callbackURL: '/auth/google/callback',
//     scope: ['profile', 'email']
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     //   return cb(err, user);
//     // });
//     callback(null, profile);
//   }
// ));

// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// passport.deserializeUser((user, done) => {
//     done(null, user);
// });