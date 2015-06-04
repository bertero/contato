app.get("/home", function(req, res){
  res.render("admin/home.ejs")
})

app.post("/admin/blockUserId/update", function(req, res){
  if(req.body.userid){
    var query = { _id : req.body.userid}
    updateUser(req, res, query)
  }
  else {
    var query = { email : req.body.email}
    updateUser(req, res, query)
  }
})


var updateUser = function (req, res, query){
  Users.findOne(query, function(err, user){
    if(isOk(err)){
      if(user._id){
        if (user.blocked){
          res.send("User already blocked")
        } else {
          blockUserByAdmin(req, user._id, function(err){
            if(!err){
              var msg = "User blocked via /admin/blockUserId " + user._id + " " + user.email
              sendTech(msg, msg, function(err){
                if(isOk(err)) res.send("<h3>User " + user.first_name + " " + user.last_name + " blocked</h3>")
                else res.send(400)
              })
            }
            else {
              res.send("There was a problem blocking the user. Try again.")
            }
          })
        }
      }
    }
    else {
      res.send("User not found")
    }
  })
}


function blockUserByAdmin(req, userId, callback){
  var blockReason = {
    reason:'User blocked via /admin/blockUserId',
    date: now(),
    information: req.body.reason
  }
  blockUser(userId, blockReason, callback, null, req.body.forceBlock)
}