const express = require('express') // ใชง้าน module express 
const app = express() // สรา้งตวัแปร app เป็น instance ของ express 
const path = require('path') // เรยีกใชง้าน path module 
const createError = require('http-errors') // เรยีกใชง้าน http-errors module 
const port = 3000 // port     
// สว่นของการใชง้าน router module ต่างๆ  
const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')
const dashboardRouter = require('./routes/dashboard')
// view engine setup 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', {
    delimiter: '?'
});
// app.set('env','production')

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(express.static(path.join(__dirname, 'public')))
// เรียกใชง้าน indexRouter 
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/me', dashboardRouter)
// ทาํงานทุก request ทเ่ีขา้มา  
app.use(function (req, res, next) {
    var err = createError(404)
    next(err)
})
// สว่นจดัการ error 
app.use(function (err, req, res, next) {
    // กาํหนด response local variables      
    res.locals.pageData = {
        title: 'Error Page'
    }
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    // กาํหนด status และ render หน้า error page     
    res.status(err.status || 500) // ถา้มี status หรอืถา้ไมม่ใีชเ้ป็น 500     
    res.render('pages/error')
})
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})