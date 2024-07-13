
const express = require('express')
const app=express();
require("dotenv").config();
const cors = require("cors");
const fs = require('fs');
const { login, signUp,super_login,admin_login } = require('./controllers/authControllers');
const multer = require("multer");
const path = require('path');

const generateSecretKey = require('./utils/generateSecretKey');
const secretKey = generateSecretKey();

// Define the path to the .env file
const envPath = path.resolve(__dirname, '.env');

// Read the existing .env file
let envContent = '';
if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
}

// Replace or add the SECRET_KEY variable
const envLines = envContent.split('\n');
let keyExists = false;
for (let i = 0; i < envLines.length; i++) {
    if (envLines[i].startsWith('SECRET_KEY=')) {
        envLines[i] = `SECRET_KEY=${secretKey}`;
        keyExists = true;
        break;
    }
}
if (!keyExists) {
    envLines.push(`SECRET_KEY=${secretKey}`);
}

// Write the updated content back to the .env file
fs.writeFileSync(envPath, envLines.join('\n'), 'utf8');

console.log('Secret key updated in .env file');
// if (!process.env.DB_SECRET_KEY) {
//   process.env.DB_SECRET_KEY = generateSecretKey();
//   console.log('Generated and set new secret key:', process.env.DB_SECRET_KEY);
// } else {
//   console.log('Using existing secret key:', process.env.DB_SECRET_KEY);
// }

// const secretKey = process.env.DB_SECRET_KEY;

const authenticateToken = require("./middlewares/authMiddleware");
const corsOptions = require("./middlewares/corsMiddleware");
const {

  get_members,
  add_members,
  add_employee,
  update_userdetails,
  get_department,
  add_circular,
  get_circular_data,
  get_events_data,
  get_news_data,
  remove_circular,
  remove_event,
  remove_news,
  add_admin,
  update_messages,
  get_messages,
  get_messages_admin,
  reply_message,
  get_profile,
  get_user_details_id,
  update_personal_details,
  update_profile_img,
  change_pass,
  get_replied_msg,
  update_replies,
  get_admin_replied_msg,
  edit_hero_img,
  add_hero_img,
  get_herosection

} = require("./controllers/adminControllers");

const port = 4000;
const adminController= require("./controllers/adminControllers");

// MiddleWares


app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads/',express.static('./uploads/'))
// const Routes=require('./routes/adminRoutes');

// app.use('/',Routes);

// Login Form
const storage = multer.diskStorage({    
  destination:function(req,file,cb){
      cb(null,'uploads/')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname+"-"+Date.now() + "" + path.extname(file.originalname))
  },
})

var upload = multer({ storage: storage })
app.post('/add_members',upload.single('image'),add_members);

app.post("/login", login);
app.post('/admin_login',admin_login);
app.post('/super_admin_login',super_login);
// app.post('/faculty_login',faculty_login)
// app.post('/examiner_login',examiner_login)
// Register Form
app.post("/signup", signUp);
app.post('/add_employee',add_employee)
app.post('/add_message/:user_id',update_messages)
app.post('/add_admin',add_admin)
app.post('/add_circulars/:value',upload.single('image'),add_circular)
app.post('/remove_circular/:id/:type',remove_circular)
app.post('/remove_event/:id/:type',remove_event)

app.post('/remove_news/:id/:type',remove_news)
app.get('/get_department',get_department)
app.get('/get_circular_data',get_circular_data)
app.get('/get_events_data',get_events_data)
app.get('/get_news_data',get_news_data)
app.get('/get_messages/:user_id',get_messages)
app.get('/get_user_details/:id',get_user_details_id)
app.post('/reply_message',reply_message)
app.get('/get_messages_admin',get_messages_admin)
app.post('/update_personal_details/:id',update_personal_details)
app.get('/get_members', get_members);
app.get('/get_profile/:user_id',get_profile)
app.post('/update_userdetails/:user_id',upload.single('image'),update_userdetails)
app.post('/update_user_photo/:id',upload.single('image'),update_profile_img);
app.post('/update_password/:id', change_pass)
app.post('/update_message',update_replies)
app.get('/get_replied_msg/:user_id',get_replied_msg)
app.get('/get_admin_replied_msg',get_admin_replied_msg)
app.post("/edit_hero_img/:id",upload.single('image'),edit_hero_img);
app.post('/add_hero_img',upload.single('image'),authenticateToken,add_hero_img);
app.get('/get_herosection',adminController.get_herosection)
//EditingFacultySujectMapping





// Seat Allotment




app.listen(port, () => {
  console.log("Server Is Running on PORT :", port);
});
