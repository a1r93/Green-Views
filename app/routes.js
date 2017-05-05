var fs = require('fs');
'use strict';
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'greenviewsbelgium@gmail.com',
        pass: 'Channel2012'
    }
});

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        var file = fs.readFileSync("./views/base.html", "UTF8");
        res.status(200).send(file);
    });

    app.get('/admin', isLoggedIn, function(req, res) {
        var file = fs.readFileSync("./views/adminzone.html", "UTF8");
        res.status(200).send(file);
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // Login page
    app.get('/login', function(req, res) {
        var file = fs.readFileSync("./views/login.html", "UTF8");
        res.status(200).send(file);
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/admin',
        failureRedirect : '/login',
        failureFlash : true
    }));

    app.post('/picture', function(req, res, next) {
        var dataString = req.body.img;
        var name = req.body.name;

        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
            res.status(401).send("Format invalide");
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');

        var imageBuffer = response;
        fs.writeFile('./views/images-gallery/' + name, imageBuffer.data, function(err) {
            if (err) {
                throw new Error(err);
            }
        });
        res.status(200).send('Fini');
    })

    app.post('/contact', function(req, res, next) {
        let name = req.body.name;
        let email = req.body.email;
        let phone = req.body.phone;
        let comment = req.body.comment;

        if (name == "" || name == undefined) {
            res.status(401).send("Veuillez entrer un nom");
        } else if (email == "" || email == undefined) {
            res.status(401).send("Veuillez entrer une adresse mail");
        } else if (phone == "" || phone == undefined) {
            res.status(401).send("Veuillez entrer un numéro de téléphone");
        } else if (comment == "" || comment == undefined) {
            res.status(401).send("Veuillez entrer un commentaire");
        } else {
            // setup email data with unicode symbols
            let mailOptions = {
                from: '"' + req.body.name + '" <' + req.body.email + '>', // sender address
                to: 'greenviewsbelgium@gmail.com', // list of receivers
                subject: 'Contact de ' + req.body.name + ' depuis le site green views', // Subject line
                html: '<p style="font-size: 16px;">' + req.body.comment + '<br /><br />' + req.body.name + '<br/>Téléphone: ' + req.body.phone + '<br/>Adresse mail: ' + req.body.email + '</p>' // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });
            res.status(200).send("Vôtre message à bien été envoyé");
        }
    });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
