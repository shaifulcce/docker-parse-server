Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});



Parse.Cloud.define("SendMailToRestaurant", function (request, response) {
  const nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dealsonear@gmail.com',
      pass: 'openPassword'
    }
  });
  const mailOptions = {
    from: '"Deal So Near" <welcome@dealsonear.com>', // sender address
    to: `${request.params.email}`,
    cc: `${request.params.emailToUs}`,
    subject: `${request.params.subject}`,
    html: `${request.params.text}`, // html body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      response.error("Uh oh, something went wrong");
    else
      response.success("Email sent to !  " + mailList);
  }),
  {
    success: function (httpResponse) {
      console.log(httpResponse);
      response.success("Email sent !  " + mailList);
    },
  error: function (httpResponse) {
    console.error(httpResponse);
    response.error("Uh oh, something went wrong");
  }}
});




Parse.Cloud.define("SendMailToUser", function (request, response) {
  const nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dealsonear@gmail.com',
      pass: 'openPassword'
    }
  });
  const mailOptions = {
    from: '"Deal So Near" <welcome@dealsonear.com>', // sender address
    to: `${request.params.email}`, // list of receivers
    subject: `${request.params.subject}`, // Subject line
    html: `${request.params.text}`, // html body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      response.error("Uh oh, something went wrong");
    else
      response.success("Email sent!");
  }),
  {
    success: function (httpResponse) {
      console.log(httpResponse);
      response.success("Email sent!");
    },
  error: function (httpResponse) {
    console.error(httpResponse);
    response.error("Uh oh, something went wrong");
  }}
});


Parse.Cloud.define("ResetPassword", function (request, response) {
  const nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dealsonear@gmail.com',
      pass: 'openPassword'
    }
  });
  const mailOptions = {
    from: '"Deal So Near" <welcome@dealsonear.com>', // sender address
    to: `${request.params.email}`, // list of receivers
    subject: `${request.params.subject}`, // Subject line
    html: `${request.params.text}`, // html body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      response.error("Uh oh, something went wrong");
    else
      response.success("Email sent!");
  }),
    {
      success: function (httpResponse) {
        console.log(httpResponse);
        response.success("Email sent!");
        const query = new Parse.Query(Parse.User);
        query.equalTo("email", request.params.email);
        query.first({
          success: (object) => {
            query.set('temp_pass', request.params.pin).save();
            query.set('temp_password_time', new Date()).save();
          }
        })
      },
      error: function (httpResponse) {
        console.error(httpResponse);
        response.error("Uh oh, something went wrong");
      }
    }
});
