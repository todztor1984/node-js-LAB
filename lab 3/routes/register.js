const express = require('express') 
const router = express.Router() 
const { validation } = require('../validator/register')   
router.route('/')     
    .all((req, res, next) => {          
        // ตวัแปรที่กําหนดดว้ย res.locals คือค่าจะส่งไปใชง้านใน template         
        res.locals.pageData = {             
            title:'Register Page'         
        }         
        // ค่าที่จะไปใชง้าน ฟอร์ม ใน template          
        res.locals.user = {             
            name:'',             
            email:'',             
            password:'',             
            confirm_password:''         }         
            // กําหนดหนา้ที่ render กรณี error ไม่ผ่านการตรวจสอบขอ้มูล         
            req.renderPage = "pages/register"                
            next()     
    })     
    .get((req, res, next) => {          
        res.render('pages/register')     
    })     
    .post(validation(), (req, res, next) => {          
        // เมื่อสมคัรสมาชิก ผ่านการรวจสอบ ลิ้งคไ์ปหนา้ /me         
        res.redirect('/me')     
    })   
module.exports = router