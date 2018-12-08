require('dotenv').config();
const mysql = require('mysql');
const util = require('util');

const Car = require('./car.js');
const User = require('./user.js');

global.db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    insecureAuth: true
});

global.db.query = util.promisify(global.db.query);

const car = new Car;
//car.load(1);
//car.loadAll();
//car.id = 45;
//car.user_id = 70;
//car.model = 'Tesla';
//car.year = 2018;
//car.save();
//car.delete(18);
const user = new User;
//user.load(5);
//user.loadAll();
//user.id = 100;
//user.first_name = 'Bill';
//user.last_name = 'Gates';
//user.age = '50';
//user.gender = 'M';
//user.save();
//user.delete(16);