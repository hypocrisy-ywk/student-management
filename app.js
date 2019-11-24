var express = require('express')
var router = require('./router')

var app = express()

var bodyParser = require('body-parser')

app.use('/public/',express.static('./public/'))
app.use('/node_modules/', express.static('./node_modules/'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.engine('html', require('express-art-template'))
//配置

app.use(router)  //将路由容器挂载到app上

 
app.listen(3000,function(){
    console.log('http://127.0.0.1:3000');
    
})