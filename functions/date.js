function daysAgo(){
  return (environment == 'development' || environment == 'local') ? 0 : 0
}

todayDate = function(){
  var today = new Date()
  return new Date(today.setDate(today.getDate() - daysAgo()))
}

twoDigits = function(d){
  var str = "" + d
  var pad = "00"
  return pad.substring(0, pad.length - str.length) + str
}

dateToStrf = function(d){
  var day = d.getUTCDate()
  var month = d.getUTCMonth() + 1
  var year = d.getUTCFullYear()
  var dateStr = year + "-" + twoDigits(month) + "-" + twoDigits(day)
  return dateStr
}

getLastDaysArray = function(daysAgo){
  var array = []
  for(var count = daysAgo; count > 0; count--){
    var day = new Date(todayDate().setDate(todayDate().getDate() - count))
    array.push(dateToStrf(day))
  }
  return array
}