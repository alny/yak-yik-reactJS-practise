var ProfileController = require('./ProfileController')
var Promise = require('bluebird')


module.exports = {
  currentUser: function(req){


    return new Promise(function(resolve, reject){
      if(req.session == null){
        reject({message: 'User not logged in'}, null)
        return
      }
      if(req.session.user == null){
        reject({message: 'User not logged in'}, null)
        return
      }
      ProfileController.findById(req.session.user, function(err, result){
        if(err){
          reject(err)
          return
        }
          resolve(result)
      })
    })
  }
}
