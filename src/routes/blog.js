var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Blog = require('../model/blog.model');

router.get('/', (req, res, next) => {
    Blog.find({}).then((data) => {
        res.status(200).send({ message: 'fetch all blogs successed!', data: data });
    }).catch((err) => {
        res.status(500).send({ message: err, data: [] });
    })
})

router.get('/:id', (req, res, next) => {
    Blog.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({ message: err, data: {} });
        } else {
            if (data !== null)
                res.status(200).json({ message: `fetch blog with id: ${req.params.id} successed!`, data: data });
            else
                res.status(404).json({ message: `can't found blog with id: ${req.params.id}`, data: null });
        }
    })
})

router.get('/delete/:id', (req, res, next) => {
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.status(500).json({ message: `can't delete blog with id: ${req.params.id} because: ${err}` });
        } else {
            res.status(200).json({ message: `delete blog with id: ${req.params.id} successed!` });
        }
    })
})

router.post('/create', (req, res, next) => {
    const newBlog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    newBlog.save((err) => {
        if (err) {
            res.json({
                result: 'failed',
                data: {},
                message: 'error is ' + err
            });
        } else {
            res.json({
                result: 'ok',
                data: newBlog,
                message: 'create new blog successed!'
            });
        }
    })
})

router.post('/modify/:id', (req, res, next) => {
    Blog.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) {
            res.json({
                result: 'failed',
                message: 'error is ' + err
            });
        } else {
            res.json({
                result: 'ok',
                message: `modify blog with id: ${req.params.id} successed!`
            });
        }
    })
})

module.exports = router;