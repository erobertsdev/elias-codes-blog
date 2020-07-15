require('dotenv').config();
require('./models/User');
require('./models/Post');
require('./services/passport');
const express = require('express'),
	bodyParser = require('body-parser'),
	ejs = require('ejs'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	cookieSession = require('cookie-session'),
	validator = require('validator');

const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		keys: [ process.env.COOKIE_KEY ]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

mongoose
	.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(console.log('Connected successfully to MongoDB'))
	.catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT);
