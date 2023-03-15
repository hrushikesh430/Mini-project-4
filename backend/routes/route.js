
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

const cookieParser = require("cookie-parser");
// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser);


const login = require('../controllers/login');
const register = require('../controllers/register')

//login
router.get('/login',login.getLogin);
router.post('/login',login.postLogin);

//register
router.get('/register',register.getRegister);
router.post('/register',register.postRegister)

module.exports = router;   