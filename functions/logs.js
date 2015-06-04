var strftime = require('strftime')

log = function(message, details){
  var fileNameLineNumber = ""
  var dateTime = strftime("%Y-%m-%d %H:%M:%S:%L") + ' -'
  if(!details){
    var stacklist = (new Error()).stack.split('\n')
    var parseError = stacklist[2].split('/')
    fileNameLineNumber = parseError[parseError.length - 1] + " -"
  }
  if(typeof message == 'string'){
    console.log(dateTime, fileNameLineNumber, message)
  }
  else {
    console.log(dateTime, fileNameLineNumber)
    console.log(message)
  }
  return dateTime + fileNameLineNumber + "\n" + JSON.stringify(message)
}

logTrace = function(err){
  if(environment == 'local'){
    console.trace(err)
  }
  else {
    if(typeof err == 'string'){
      console.trace(strftime("%Y-%m-%d %H:%M:%S") + ' - ' + err)
    }
    else if(Object.prototype.toString.call(err) === '[object Array]'){
      if(err.length){
        console.trace(err[0] + strftime("%Y-%m-%d %H:%M:%S"))
      }
      else {
        log(strftime("%Y-%m-%d %H:%M:%S"))
        console.trace(err)
      }
    }
    else {
      log(strftime("%Y-%m-%d %H:%M:%S"))
      console.trace(err)
    }
  }
  var localTrace = new Error()
  return err.stack + localTrace.stack
}