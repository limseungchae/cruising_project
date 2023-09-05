const express = require('express');
const Eats = require("../models/Eats");
const Mem = require("../models/Mem");
const router = express.Router();
const path = require('path');

router.get('/', async (req, res) => {
    let eno = req.query.eno;
    let food = new Eats().show(eno).then(sig=>sig)
    if(req.session.userid){
        let mem = new Mem().detailOne(req.session.userid).then(mem=>mem)
        res.render('detail', {title: '며깨고',food: await food, mem: await mem});
    }else{res.render('detail', {title: '며깨고',food: await food});}
});

router.get('/roulette', (req, res) => {
    res.render('roulette', {title: '며깨고'})
});

router.get('/ladder', (req, res) => {
    res.render('ladder', {title: '며깨고'})
});

router.get('/coupon', (req, res) => {
    res.render('coupon', {title: '며깨고'})
});


module.exports = router;
