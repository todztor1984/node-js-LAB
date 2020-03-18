const express = require('express') 
const router = express.Router() 
const { validation } = require('../validator/users')   
router.route('/')     
    .all((req, res, next) => {
          // ตวัแปรที่กําหนดดว้ย res.locals คือค่าจะส่งไปใชง้านใน template         
          res.locals.pageData = {             
            title:'Login Page'         
        }         
        // ค่าที่จะไปใชง้าน ฟอร์ม ใน template          
        res.locals.user = {             
            email:'',             
            password:''         
        }         
        // กําหนดหนา้ที่ render กรณี error ไม่ผ่านการตรวจสอบขอ้มูล         
        req.renderPage = "pages/login"         
        next()     
    })     
    .get((req, res, next) => {          
        res.render('pages/login')         
    })     
    .post(validation(), (req, res, next) => {          
        // ผ่านการรวจสอบ ลิ้งคไ์ปหนา้ /me         
        res.redirect('/me')     
    })   
    module.exports = router