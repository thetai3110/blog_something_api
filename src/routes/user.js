var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../model/user.model');

router.get('/', (req, res, next) => {
    User.find({}).then((data) => {
        res.status(200).json({
            result: 'ok',
            message: 'fetch all users successfully!',
            data: data
        });
    }).catch((err) => {
        res.status(500).json({
            result: 'failed',
            message: err,
            data: null
        });
    })
})

router.get('/:username', (req, res, next) => {
    User.findOne({ username: req.params.username }, (err, data) => {
        if (err) {
            res.status(500).json({
                result: 'failed',
                message: err,
                data: null
            });
        } else {
            if (data !== null)
                res.status(200).json({
                    result: 'ok',
                    message: `fetch user with username: ${req.params.username} successfully!`,
                    data: data
                });
            else
                res.status(404).json({
                    result: 'not found',
                    message: `can't found user with username: ${req.params.username}`,
                    data: null
                });
        }
    })
})

router.get('/delete/:id', (req, res, next) => {
    User.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.status(500).json({
                result: 'failed',
                message: `can't delete user with id: ${req.params.id} because: ${err}`
            });
        } else {
            res.status(200).json({
                result: 'ok',
                message: `delete user with id: ${req.params.id} successfully!`
            });
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
            res.status(500).json({
                result: 'failed',
                data: null,
                message: 'error is: ' + err
            });
        } else {
            res.status(200).json({
                result: 'ok',
                data: newUser,
                message: 'create new user successfully!'
            });
        }
    })
})

router.post('/modify/:id', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) {
            res.status(500).json({
                result: 'failed',
                message: 'error is: ' + err
            });
        } else {
            res.status(200).json({
                result: 'ok',
                message: `modify user with id: ${req.params.id} successfully!`
            });
        }
    })
})

module.exports = router;