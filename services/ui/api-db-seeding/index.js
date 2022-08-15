const mysql = require('mysql2');
const fs = require('fs');
const path = require("path");
const bcrypt = require('bcryptjs');

// require('dotenv').config();
require('dotenv-extended').config();

seedQuery = fs.readFileSync(path.join(__dirname + '/seed.sql'), {
	encoding: 'utf-8'
});

const connection = mysql.createConnection({
	host: process.env.LAGOON_API_DB_HOST,
	user: process.env.LAGOON_API_DB_USERNAME,
	password: process.env.LAGOON_API_DB_PASSWORD,
	database: process.env.LAGOON_API_DB_DATABASE,
	multipleStatements: true
});

connection.connect();

// Generate random password for initial admin user
const psw = Math.random().toString(36).substring(2);
const hash = bcrypt.hashSync(psw, 10);

console.log('Running seeding...');

// Run seed query
connection.query(seedQuery, (err, results, fields) => {
	if (err) {
		throw err;
	}

	console.log('SQL seed completed!');
	connection.end();
});