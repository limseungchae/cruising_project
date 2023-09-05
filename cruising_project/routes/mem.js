const express = require("express");
const router = express.Router();
const path = require('path');
const Mem = require('../models/Mem');
const dbconfig  = require('../dbconfig')
const axios = require('axios');
const Hash = require('../models/Hash');
const passport = require("passport");



//const passport = require('passport');
//const dbconfig = require("../dbconfig");
//const Mem = require("./Mem");





////////////////////////
router.get('/join', (req, res) => {
    res.render('join', {title: '회원가입', recaptcha: dbconfig.recaptcha});
});

router.post('/join',async (req, res, next) => {
    let {email, passwd, name, phone, nick, bth} = req.body;
    let secretKey = dbconfig.recaptcha.secretkey ;
    let recaptchaResponse = req.body['g-recaptcha-response'];
    let verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;
    let isHuman = await axios.post(verificationURL).then(response => response.data.success);
    console.log('isHuman--',isHuman)
    let hshpwd = await Hash.hashPassword(passwd); // 암호를 해시화 함
    if(isHuman){
        await new Mem(email, hshpwd, name, phone, nick, bth).insert();
    }
    res.redirect(303, '/');

});

router.get('/login', (req, res) => {
    res.render('login', {title: '회원로그인'});
});

///////////////////////////
router.post('/login', async (req, res) => {
    let { email, passwd } = req.body;
    let viewName = '/member/loginfail';

    let isLogin = new Mem().login(email, passwd).then(result => result);

    //console.log(await isLogin);
    if (await isLogin > 0) {
        viewName = '/member/myinfo';
        req.session.userid = email;  // 아이디를 세션변수로 등록
    }

    res.redirect(303, viewName);
});


//////////////////////////
router.get('/logout', (req, res) => {
    req.session.destroy(() => req.session);

    res.redirect(303, '/');
});

router.get('/myinfo', async (req, res) => {
    if (req.session.userid) {  // 세션변수 userid가 존재한다면
        let member = new Mem().selectOne(req.session.userid)
            .then(mb => mb);

        res.render('myinfo',
            {title: '회원정보', mb: await member});
    } else {
        res.redirect(303, '/');

    }
});

router.get('/check-email', async (req, res) => {
    try {
        const email = req.query.email;
        const member = await Mem.isEmailExist(email);
        console.log('member--',member)
        console.log('member-2-',await Mem.isEmailExist(email))
        res.json({ exists: !!member });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
});
///////////////////////

// Kakao login route
router.get('/kakao', passport.authenticate('kakao'));

// Kakao login callback route
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: 'http://13.125.199.59:4000/#'
}), (req, res) => {
    req.session.userid = req.user.email
    res.redirect('http://13.125.199.59:4000/#');
});




module.exports = router;
