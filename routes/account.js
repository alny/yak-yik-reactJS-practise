var express = require('express');
var router = express.Router();
var ProfileController = require('../controllers/ProfileController')
var AccountController = require('../controllers/AccountController')

var bcrypt = require('bcryptjs')



router.get('/:action', function(req, res, next){
  var action = req.params.action

  if(action == 'logout'){
    req.session.reset()
    res.json({
      confirmation: 'success',
      message: 'Bye'
    })
  }


  if(action == 'currentuser'){
    AccountController.currentUser(req)
    .then(function(result){
      res.json({
        confirmation: 'success',
        user: result
      })
    })
    .catch(function(err){
      res.json({
        confirmation: 'fail',
        message: err.message
      })
    })
  }
})

router.post('/:action', function(req, res, next){

    var action = req.params.action

    if(action == 'register'){
      ProfileController.create(req.body, function(err, result){
        if(err) {
          console.log('ERR: ' +err)
          res.json({
              confirmation: 'fail',
              message: err.message
          })
          return
        }
        req.session.user = result._id
        res.json({
          confirmation: 'success',
          user: result
        })
      })
    }


    if(action == 'login'){
      ProfileController.find({username: req.body.username}, function(err, results){
        if(err) {
          console.log('ERR: ' +err)
          res.json({
              confirmation: 'success',
              message: err.message
          })
          return
        }
        if(results.length == 0){
          res.json({
            confirmation: 'fail',
            message: 'Username does not Exist - Check your spelling'
          })
          return
        }

        var profile = results[0]
        var isPasswordCorrect = bcrypt.compareSync(req.body.password, profile.password)
        if(isPasswordCorrect == false){
          res.json({
            confirmation: 'fail',
            message: 'Wrong Password'
          })
          return
        }

        req.session.user = profile._id

          res.json({
            confirmation: 'success',
            user: profile
          })
      })
    }
})



module.exports = router
