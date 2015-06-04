if(!(process.env.AWS_ACCESS_KEY && process.env.AWS_SECRET_ACCESS_KEY)) throw new Error('AWS_ACCESS_KEYs not defined on proccess.env')
var access = {AWSAccessKeyID : process.env.AWS_ACCESS_KEY, AWSSecretKey : process.env.AWS_SECRET_ACCESS_KEY}

nodemailer = require('nodemailer').createTransport('SES', access)

sendMailTo = function(to, msg, subject, attachments, callback){
  var message = {
    to : to, from : 'revmobmailer@revmob.com', replyTo : to, subject : subject, text : msg
  }
  if(attachments) message.attachments = attachments
  nodemailer.sendMail(message, function(err){
    if(err) log('email not sent due to error: '+ err + '\n\nSubject: ' + subject + '\nMessage: '+ msg)
    callback(err)
  })
}