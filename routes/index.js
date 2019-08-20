var express = require('express');
var router = express.Router();

const env = process.env.NODE_ENV || "development";
const config = require('../config/config.json')[env];
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/email/send', function (req, res) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: config.transporter
  });

  var body = `<p>Name: ${req.body.name}</p><p>Email: ${req.body.email}</p>`;
  body += `<p>phone: ${req.body.number}</p><p>Company: ${req.body.company}</p>`;
  body += `<p>message: ${req.body.message}</p>`;

  transporter.sendMail(
    {
      from: config.transporter.user,
      to: config.recipient,
      subject: 'Next Tech Point: New Message from ' + req.body.name,
      html: body
    },
    function (err, info) {
      if (err) {
        res.status(400).send({ status: 400, messsage: err.message });
        console.log(err)
      } else{
        res.status(200).send({ status: 200, messsage: 'Email sent successfully' });
        console.log(info);
      }
    }
  )


});

module.exports = router;
