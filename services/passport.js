require('dotenv').config();
const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then((existingUser) => {
				if (existingUser) {
					// we already have a record with given profile ID
					done(null, existingUser);
				} else {
					//  no user with this ID, make a new record
					new User({
						googleId: profile.id,
						name: profile.displayName,
						email: profile.emails[0].value
					})
						.save()
						.then((user) => done(null, user));
				}
			});
		}
	)
);
