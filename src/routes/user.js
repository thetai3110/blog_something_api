var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../model/user.model');

router.get('/', (req, res, next) => {
    User.find({}).then((data) => {
        res.status(200).send({ message: 'fetch all users successed!', data: data });
    }).catch((err) => {
        res.status(500).send({ message: err, data: [] });
    })
})

router.get('/:username', (req, res, next) => {
    User.findOne({ username: req.params.username }, (err, data) => {
        if (err) {
            res.status(500).json({ message: err, data: {} });
        } else {
            if (data !== null)
                res.status(200).json({ message: `fetch user with id: ${req.params.username} successed!`, data: data });
            else
                res.status(404).json({ message: `can't found user with id: ${req.params.username}`, data: null });
        }
    })
})

router.get('/delete/:id', (req, res, next) => {
    User.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.status(500).json({ message: `can't delete user with id: ${req.params.id} because: ${err}` });
        } else {
            res.status(200).json({ message: `delete user with id: ${req.params.id} successed!` });
        }
    })
})

router.post('/create', (req, res, next) => {
    const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    newUser.save((err) => {
        if (err) {
            res.json({
                result: 'failed',
                data: {},
                message: 'error is ' + err
            });
        } else {
            res.json({
                result: 'ok',
                data: newUser,
                message: 'create new user successed!'
            });
        }
    })
})

router.post('/modify/:id', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) {
            res.json({
                result: 'failed',
                message: 'error is ' + err
            });
        } else {
            res.json({
                result: 'ok',
                message: `modify user with id: ${req.params.id} successed!`
            });
        }
    })
})

module.exports = router;