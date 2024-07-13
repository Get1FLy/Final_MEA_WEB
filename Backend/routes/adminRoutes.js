const express = require('express');
const app = express();
const multer = require("multer");
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');
const conn = require('../models/adminDB');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());
app.use(express.json());

const adminControllers = require('../controllers/adminControllers');
// const storage = multer.diskStorage({    
//     destination:function(req,file,cb){
//         cb(null,'../uploads/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname+"-"+Date.now() + "" + path.extname(file.originalname)+".jpg")
//     },
// })

const storage = multer.diskStorage({    
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename: (req, file, cb) => {
        const newFileName = Date.now()+"_"+Math.floor(1000+Math.random() * 9000) + path.extname(file.originalname);
        cb(null, newFileName);
    },
});
  
//   const upload = multer({ 
//     storage: storage, 
// });


const upload = multer({ storage: storage });






app.post('/add_data', upload.array('images'), adminControllers.add_data);
app.post('/add_category',upload.array('images') ,adminControllers.add_category);
app.post('/upload_image/:product_data',upload.array('image') ,adminControllers.update_img)
app.post('/upload_image_cat/:category_data',upload.array('image') ,adminControllers.update_img_cat)
app.post('/add_herosection_images',upload.array('images') ,adminControllers.add_hero_section);

// /add_herosection_images


// app.post('/add_data',upload.single('image') ,(req,res)=>{
//     try {
//         console.log(req.file);
//         res.send({msg:"File received success"});
//     } catch (error) {
//         console.log(error);
//     }
// });
app.post('/send_email',adminControllers.send_email)
app.post('/admin_login',adminControllers.admin_login)
app.get('/view_doc/:filename',adminControllers.get_img)
app.get('/get_add_cart_products/:uid',adminControllers.get_addded_cart_data)
app.get('/get_herosection',adminControllers.get_herosection)
app.get('/get_address_saved/:uid',adminControllers.get_saved_address)
app.post('/remove_cart/:product_id/:user_id',adminControllers.remove_cart)
app.get('/get_product_details/:product_id',adminControllers.get_product_data)


// /get_admin_bills/${order_id}
// app.get('/get_admin_bills/:order_id',adminControllers)
app.get('/get_category_details/:id',adminControllers.get_cat_data)
app.get('/get_admin_bills/:order_date/:order_time/:uid',adminControllers.get_bills_data)
app.get('/get_user_data/:uid',adminControllers.get_user_data)
app.get('/get_reviews',adminControllers.get_reviews)
app.post('/delete_category_data/:id',adminControllers.delete_category)
app.post('/delete_heroimage/:id',adminControllers.heroimg)
app.get('/getproducts_by_search/:name',adminControllers.search_by_product)
app.get('/get_ordered_list',adminControllers.get_ordered_list)
app.get('/get_order_status',adminControllers.get_order_data)
app.get('/get_stock_count',adminControllers.get_stock_count)
app.get('/get_order_history/:uid',adminControllers.get_order_history)
app.post('/confirm_order',adminControllers.confirm_order) 
app.post('/confirm_order_admin',adminControllers.confirm_order_admin)   
app.post('/confirm_order_direct',adminControllers.confirm_order_direct)
app.post('/place_order',adminControllers.place_order)
app.post('/place_order_direct',adminControllers.place_order_direct)
app.post('/update_status/:order_id/:uid/:product_id/:status_id/:quantity',adminControllers.update_status)
app.post('/update_stock/:product_id/:quantity',adminControllers.update_stock)
app.post('/update_product/:product_id',adminControllers.update_product)

app.post('/update_delivery_charges/:order_id/:charges',adminControllers.update_delivery_charges)

app.post('/update_paid_status/:paid_id/:order_id',adminControllers.update_paid_status)
app.post('/update_category/:cat_id',adminControllers.update_category)

app.get('/get_category_data',adminControllers.get_category_data)
app.get('/get_review_data/id',adminControllers.getreviewdata)
app.post('/update_user_data/:uid',adminControllers.update_user_data)
app.post('/save_review/:uid',adminControllers.save_review)
app.post('/delete_product/:product_id',adminControllers.delete_product)
app.post('/login',adminControllers.user_login)
app.post('/sendOtp',adminControllers.sendOtp)
app.post('/verify_otp',adminControllers.verifyOtp)
app.get("/getproductslist/:id",adminControllers.getData);
app.get('/get_admin_review',adminControllers.get_admin_review)

app.get('/getUserInfoByPhone/:phone',adminControllers.getUserInfoByPhone)

app.post('/add_visit',adminControllers.add_visit)

app.get('/get_visit_count',adminControllers.get_visit)
app.get("/getproductslist",adminControllers.get_product);
app.get("/order_products",adminControllers.order_products);
app.post('/admin_review',adminControllers.admin_review)
app.get('/get_reviews/:product_id',adminControllers.get_reviews)
app.get('/get_place_order/:uid/:product_id',adminControllers.get_place_order)
app.post("/added_in_card",adminControllers.added_in_card);
app.post("/isValidLogin",adminControllers.isValidLogin);

app.post("/register",adminControllers.register);
app.post('/admin_user_register',adminControllers.admin_user_register)
app.post("/delete",adminControllers.deleteData);
app.post("/filterProducts",adminControllers.filterProducts);

app.post("/toUpdate",adminControllers.updateData);
app.post('/delete_order/:order_id',adminControllers.delete_order)

app.post('/update_address/:uid',adminControllers.update_address)
app.post('/update_password/:uid',adminControllers.update_password)
app.post('/update_personal_details/:uid',adminControllers.update_personal_details)

app.post("/addToCart",adminControllers.addToCart);
app.post("/BookOrders",adminControllers.BookOrders);
app.get('/getproducts/:product_id',adminControllers.getproductbyId);
app.post('/add_to_cart/:product_id/:count/:total_price/:user_id',adminControllers.addtocart)
app.get('/get_cart_count/:user_id',adminControllers.get_cart_count)
app.post("/saveUpdate",upload.single('image'),adminControllers.saveUpdateData);


module.exports = app;
