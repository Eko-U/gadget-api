const express = require('express')


const router = express.Router()

router.route('/').get(function (req, res, next) {
  console.log('looking user')
})


module.exports = router