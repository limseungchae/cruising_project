const passport = require('passport');
const kakao = require('./kakaoStrategy');
const Mem = require('../models/Mem');

module.exports = () => {
  passport.serializeUser((user, done) => {
    return done(null, user.email);
  });
  passport.deserializeUser(async (email, done) => {
    try {
      const user = await Mem.isEmailExist( email );
      return done(null, user);
    } catch (err) {
      console.error(err);
      return done(err);
    }
  });


  kakao();
};
