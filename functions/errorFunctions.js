isOk = function (err, callback, shouldLog, extraInfo){
  if(!err) return true
  else {
    if(shouldLog){
      if (extraInfo) log("Error: " + extraInfo)
      logTrace(err)
    }

    if(callback && typeof callback == 'function') return callback(err)
    else if(callback && typeof(callback) != 'function') throw new Error('isOk(err, callback) callback must be a function')
    else return false
  }
}

isOkWithMail = function(err, callback, extraInfo, email){
  if(!err) return true
  else{
    if (extraInfo) log("Error: " + extraInfo)
    var localStackTraceString = logTrace(err)

    var text = 'Error: ' + err.message + '\n' + JSON.stringify(err) + '\n' + localStackTraceString
    if (extraInfo) text += '\n\nExtra Info: ' + extraInfo
    sendMailTo(email || 'tech@revmob.com', text, '[dataScience/recommender] ERROR - ' + strftime("%b-%d-%Y"), null, function(err){})

    if(callback && typeof callback == 'function') return callback(err)
    else if(callback && typeof(callback) != 'function') throw new Error('isOk(err, callback) callback must be a function')
    else return false
  }
}