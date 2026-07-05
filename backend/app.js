const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const path = require('path');
require('dotenv').config();
const mysql = require('mysql2');
const cors = require('cors');
const { Console } = require('console');
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const apiKey = process.env.API_KEY || "9b20779574aaf74d56d52a691895a888";
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,                // default SkySQL secure port
    ssl: { rejectUnauthorized: true }  // very important for SkySQL SSL
});
connection.connect((err) => {
    if (err) {
        console.error('❌ SkySqL connection failed:', err.message);
    } else {
        console.log('✅ Connected to SkySQL successfully!');
    }
});
let data = [];
async function news() {
    const apiKey = process.env.API_KEY || "9b20779574aaf74d56d52a691895a888";
    let url = `https://gnews.io/api/v4/top-headlines?lang=en&country=in&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        const result = await response.json();
        data = result; // store the full object
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}
news();
app.get('/news', (req, res) => {
    res.json(data);
})
app.post('/signin', (req, res) => {
    res.render('login')
})
app.post('/signup', (req, res) => {
    res.render('signup');
})
app.post('/home', (req, res) => {
    let signup = req.body.submitted;
    if (signup === 'Submit') {
        const username1 = req.body.username;
        const email = req.body.Email;
        const password = req.body.password;
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error('Error hashing password:', err);
                res.redirect('/signup');
                return;
            }
            else {
                let users = [[username1, email, hash]];
                connection.query('insert into users values ?', [users], (err, result) => {
                    if (err) throw err
                    console.log(result);
                    if (!err) {
                        res.render('home');
                    }
                })
            }
        });
    }
    else {
        const email = req.body.Email;
        const password = req.body.password;
        const sql = `select email,pasword from users where email='${email}'`
        connection.query(sql, (err, result) => {
            if (err) throw err
            console.log(result);
            bcrypt.compare(password,result[0].pasword, (error, result1) => {
                if (err) {
                    console.error('Error comparing password:', err);
                    res.redirect('/login');
                    return;
                }
                else {
                    if (!result[0]) {
                        // alert("There is no account");
                        console.log('There is no account');
                        res.redirect('/login');
                    }
                    else if (!result[0].email) {
                        // alert('password or email is wrong');
                        console.log('user does not exist');
                        res.redirect('/login');
                    }
                    else if (error) {
                        console.log('password is wrong');
                        res.redirect('/login');
                    }
                    else if (result[0].email === email &&result1) {
                        res.render('home');
                    }
                }
            });
        });
    }
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/signup', (req, res) => {
    res.render('signup')
})
function firstletterToUpperCase(str){
    return str.charAt(0).toUpperCase() +str.slice(1);
}
function getCategoryDetails(category){
    let categoryName = category || 'general';
    let apiCategory = categoryName;
    if (categoryName === 'world' || categoryName === 'nation') {
        apiCategory = 'general';
    }
    let category1 = firstletterToUpperCase(categoryName);
    return { categoryName, apiCategory, category1 };
}
async function renderCategoryPage(req, res, category){
    const details = getCategoryDetails(category);
    const categoryurl= `https://gnews.io/api/v4/top-headlines?category=${details.apiCategory}&lang=en&country=in&apikey=${apiKey}`;
    let response=await fetch(categoryurl);
    let result= await response.json();
    let data = result.articles || [];
    console.log(details.category1);
    res.render("newscatagories", {category1: details.category1, data});
}
app.get('/Categories',async   (req, res) => {
    let category =req.query.category || 'general';
    await renderCategoryPage(req,res,category)
});

module.exports = app;