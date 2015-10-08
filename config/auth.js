module.exports = {

  'facebookAuth': {
    'clientID': process.env.FACEBOOK_CLIENT_ID,
    'clientSecret': process.env.FACEBOOK_CLIENT_SECRET,
    'callbackURL': process.env.FACEBOOK_CALLBACK_URL
  },

  'twitterAuth' : {
    'consumerKey': process.env.TWITTER_CONSUMER_KEY,
    'consumerSecret': process.env.TWITTER_CONSUMER_SECRET,
    'callbackURL': process.env.TWITTER_CALLBACK_URL
  }

};