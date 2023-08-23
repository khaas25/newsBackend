var express = require("express");
var cors = require("cors");
var nodemailer = require("nodemailer");

// svttvmtiaclhabwp   -> app password
// apinews646@gmail.com

var app = express(); //library post get app.listen everything is becuase of express
app.use(express.json()); //without this you cannot make a post request
app.use(cors()); //connect front end to back end
var port = 8080;

app.post("/contact", (req, res) => {
  var userName = req.body.userName;
  var userEmail = req.body.userEmail;
  var phonenumber = req.body.phonenumber;
  var subject = req.body.subject;
  var message = req.body.message;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "apinews646@gmail.com",
      pass: "svttvmtiaclhabwp",
    },
  });

  var mailOptions = {
    from: "apinews646@gmail.com",
    to: "khaas25@gmail.com",
    subject: subject,
    html: `
    <html>
        <body>
            <h2>${userName}</h2>
            <h3>Contact info.</h3>
             <p>Email: ${userEmail}</p>
             <p>Phone Number: ${phonenumber}</p>
            <h3>Message: </h3>
            <p>${message}</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(404).send("Email not sent");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send(info.resonse);
    }
  });
});

app.listen(port, () => {
  console.log("Your api is running on port: " + port);
});
