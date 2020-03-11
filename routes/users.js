var express = require('express');
var router = express.Router();

var request = require('request-promise')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/ext', async (req, res, next) => {

  let user = await request('http://localhost/api_v1/accounts/profile/', {
    json: true,
    headers: {
      'Authorization': 'Bearer dd'
    }
  })

  res.json(jj(user))
})

module.exports = router;
