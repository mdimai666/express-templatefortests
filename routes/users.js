var express = require('express');
var router = express.Router();

var axios = require('axios')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/ext', async (req, res, next) => {

  try {


    let user = await axios.get('http://localhost/api_v1/accounts/profile/', {
      json: true,
      headers: {
        'Authorization': 'Bearer dd'
      }
    })

    res.json(jj(user.data))
  } catch (error) {
    res.json(jj(error))
  }
})

module.exports = router;
