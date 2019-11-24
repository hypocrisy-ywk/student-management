var fs = require('fs')

var express = require('express')

var student = require('./student')

var router = express.Router()

router.get('/', function (req, res) {
    fs.readFile('./db.json', function (err, data) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.render("index.html", {
            students: JSON.parse(data).students
        })
    })
})

router.get('/students/new' , function(req , res){
    res.render('new.html')
})

router.post('/students/new' , function(req , res){
    student.save(req.body ,function(err){
        if(err){
            return res.status(500).send('server error')
        }
        res.redirect('/')
    })
})

router.get('/students/edit' , function(req , res){
    student.findById(parseInt(req.query.id) , function(err , student){
        if(err){
            return res.status(500).send('server error')
        }
        res.render('edit.html' , {
            student:student
        })
    })
})

router.post('/students/edit' , function(req , res){
    student.updateById(req.body , function(err){
        if (err) {
            return res.status(500).send('server error')
        }
        res.redirect('/')
    })
})

router.get('/students/delete' , function(req , res){
    student.deleteById(req.query.id, function (err) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.redirect('/')
    })
})

module.exports = router