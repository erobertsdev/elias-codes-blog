const passport = require('passport');
const mongoose = require('mongoose');
const Post = mongoose.model('posts');

const date = new Date(),
	months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

module.exports = (app) => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: [ 'profile', 'email' ]
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
		res.redirect('/');
	});

	app.get('/', function(req, res) {
		Post.find({ category: 'coding' }, (err, posts) => {
			if (err) console.log(err);
			if (req.user) {
				res.render('index', { posts, currentUser: req.user.name.replace(/\s.*/, '') });
			} else {
				res.render('index', { posts, currentUser: 'Login' });
			}
		}).sort({ _id: -1 });
	});

	app.get('/it', function(req, res) {
		Post.find({ category: 'it' }, (err, posts) => {
			if (err) console.log(err);
			if (req.user) {
				res.render('it', { posts, currentUser: req.user.name.replace(/\s.*/, '') });
			} else {
				res.render('it', { posts, currentUser: 'Login' });
			}
		}).sort({ _id: -1 });
	});

	app.get('/other', function(req, res) {
		Post.find({ category: 'other' }, (err, posts) => {
			if (err) console.log(err);
			if (req.user) {
				res.render('other', { posts, currentUser: req.user.name.replace(/\s.*/, '') });
			} else {
				res.render('other', { posts, currentUser: 'Login' });
			}
		}).sort({ _id: -1 });
	});

	app.get('/submit', (req, res) => {
		if (req.isAuthenticated() && req.user.email === 'eliroberts9@gmail.com') {
			res.render('submit');
		} else {
			res.render('login');
		}
	});
	app.post('/submit', (req, res) => {
		const blogPost = new Post({
			date: `${months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`,
			title: req.body.title,
			body: req.body.body,
			category: req.body.category,
			hashtags: req.body.hashtags,
			comments: [ {} ],
			meta: { favorites: 0 }
		});
		blogPost.save();
		res.redirect('/');
	});

	app.get('/login', function(req, res) {
		res.render('login');
	});
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/tos', (req, res) => {
		res.render('tos');
	});
};
