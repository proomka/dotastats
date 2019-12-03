const passport = require('passport-steam');

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/auth/steam/return',
    realm: 'http://localhost:3000/',
    apiKey: '96052A3EEBB5D5C651487BB56C5D5FA7'
  },
  function(identifier, profile, done) {
    User.findByOpenID({ openId: identifier }, function (err, user) {
      return done(err, user);
    });
  }
));

app.get('/auth/steam',
    passport.authenticate('steam'),
    function(req, res) {
        // The request will be redirected to Steam for authentication, so
        // this function will not be called.
    });

app.get('/auth/steam/return',
    passport.authenticate('steam', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });
