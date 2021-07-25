const mysql = require('mysql');
const express = require('express');
const htmlPdf = require('html-pdf');
const fs = require('fs');
const ejs = require('ejs');
var path = require('path');

// const cookierParser = require('cookie-parser');
const session = require('express-session');
const router = express.Router();
const { check, validatorResult, validationResult } = require('express-validator');
//const methodeOverride = require(methode-Override);
var app = express();
var sess;
const bodyParser = require('body-parser');
const { info } = require('console');

app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));
//app.use(methodeOverride('_methode'))
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    name: 'User_Session',
    secret: '123456xxx',
    saveUninitialized: false,
    resave: false,
    // cookie: { maxAge: oneDay },
    role: '',
    username: '',
    userid: '',
}));
var id_user;
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
/*
    password: 'Hostire1.', //Hostire1.
    database: 'hotels' //hotels
*/
    password: '',
    database: 'hotels'

});
mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server is running at port no : 3000');
});



// app.listen(3000, () => console.log('Express server is running at port no : 3000'));


// const http = require('http');

// http.createServer(function(req, res) {
//     // res.writeHead(200, { 'Content-Type': 'text/plain' });
//     // res.end('Hello World\n');
// }).listen(process.env.PORT || 3000);

function base(imageP) {
    let png = fs.readFileSync(imageP);
    return new Buffer.from(png).toString('base64')
}

//console.log(base(imageP));

console.log('Server currently listening...');

router.get('/', (req, res) => {


    if (!req.session.username) {
        res.render('login/login')
    } else {
        res.redirect('/acceuil/clients');
    }

});

router.get('/logout', (req, res) => {
    req.session.username = '';
    req.session.role = '';
    req.session.userid = '';
    req.session.destroy();
    res.redirect('/')
});
app.get('/register', (req, res) => {
    res.render('register')
});

app.get('/receptioniste/client/autre_entree', (req, res) => {
    res.render('entree')
});
app.get('/receptioniste/client/autre_sortie', (req, res) => {
    res.render('sorti')
});



app.use('/', router);
app.get('/delete', (req, res) => {
    res.render('delete')
});
app.get('/authentification', (req, res) => {

    res.render('authentification', {
        requette: 'error'
    })
});
app.get('/receptioniste/client', (req, res) => {
    var sql = "select * from chambre where status = 'libre'";
    mysqlConnection.query(sql, (err, rows, fields) => {
        row = rows;
        var alert;
        res.render('enregistrer/index', {
            row,
            alert
        })
    })
});

app.get('/admin/client', (req, res) => {
    res.render('clients_admin')
});

app.get('/receptioniste/facture', (req, res) => {
    var nom;
    var row;
    var sql = "select * from facture ";
    mysqlConnection.query(sql, (err, rows, fields) => {


        row = rows;
        var l = rows.length;
        if (l >= 1) {
            var sql = "select nom from client ";
            mysqlConnection.query(sql, (err, rows, fields) => {


                nom = rows;
                var l = rows.length;

                res.render('facture.ejs', {
                    row,
                    nom,
                    l
                })
            })
        } else {
            res.render('facture_admin.ejs', {
                l
            })
        }
    })

});

app.get('/admin/facture_admin', (req, res) => {
    var nom;
    var row;
    var sql = "select * from facture ";
    mysqlConnection.query(sql, (err, rows, fields) => {

        row = rows;
        var l = rows.length;


        if (l >= 1) {
            var sql = "select nom from client ";
            mysqlConnection.query(sql, (err, rows, fields) => {


                nom = rows;

                // console.log(l);
                res.render('facture_admin.ejs', {
                    row,
                    nom,
                    l
                })
            })
        } else {
            res.render('facture_admin.ejs', {
                l
            })
        }
    })

});

app.get("/receptioniste/commande/:id", (req, res) => {
    var id = req.params.id;
    res.render('commande/commande', {
        id
    })
});

app.get('/receptioniste/main_courant', (req, res) => {
    let date = Date.now();
    var yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    let MyDate = yesterday.toISOString().slice(0, 10);
    let toDay = new Date(date);


    let hier = MyDate + " 00:00:00";
    let hiers = MyDate + " 23:59:59";

    var day = toDay.toISOString().slice(0, 10) + " 00:00:00";

    var alert;
    var sql = "select * from client  ORDER BY id_client DESC";
    mysqlConnection.query(sql, (err, rows, fields) => {
        client = rows;
        var sql = "select c.lieu,c.nombre,c.montant,c.id_client from commande c,client cl where c.id_client=cl.id_client   ORDER BY id_client DESC ";
        mysqlConnection.query(sql, (err, rows, fields) => {
            commande = rows;
            var sql = "select ch.prix,c.id_chambre,c.id_client from chambreclient c, chambre ch where c.id_chambre=ch.id_chambre ORDER BY id_client DESC";
            mysqlConnection.query(sql, (err, rows, fields) => {
                chambreclient = rows;
                var sql = "select * from commande where date_commande>='" + hier + "' and date_ajout<='" + hiers + "'  ORDER BY id_client DESC ";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    commandeh = rows;
                    var sql = "select * from facture  ORDER BY id_client DESC ";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        facture = rows;
                        var sql = "select * from commande where status= '0' ORDER BY id_client DESC ";
                        mysqlConnection.query(sql, (err, rows, fields) => {
                            status = rows;
                            // console.log(status);

                            res.render('main_courante/index', {
                                client,
                                chambreclient,
                                commande,
                                facture,
                                commandeh,
                                alert

                            })
                        })
                    });
                })
            })
        })
    });
});


app.get('/client/detail', (req, res) => {
    var id = req.query.id;

    // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client AND client.id_client = chambreclient.id_client and client.id_client = "+id+"";
    var sql = "select c.id_chambre, ch.categorie, ch.prix from chambreclient c,chambre ch where c.id_client=" + id + " and c.id_chambre=ch.id_chambre ORDER BY id_client ASC";
    mysqlConnection.query(sql, (err, rows, fields) => {
        chambreclient = rows;

        var Tchambre = 0;
        rows.forEach(row => {
            Tchambre = Tchambre + row.prix;
        })
        var sql1 = "SELECT  commande.* FROM  commande WHERE commande.id_client = " + id + "";
        mysqlConnection.query(sql1, (err, rows, fields) => {
            // var Infos = rows;
            var i = 0;

            var Tlinge = 0;
            var Trestaurant = 0;
            var TpetitD = 0;
            var Tbar = 0;
            var Tdivers = 0;

            var Total = 0;
            rows.forEach(row => {
                var lieu = new String(row.lieu);
                // var d = row.id_chambre;
                if (lieu == 'Bar') {
                    Tbar = Tbar + row.montant * row.nombre;
                }
                if (lieu == 'Restaurant') {
                    Trestaurant = Trestaurant + row.montant * row.nombre;
                }
                if (lieu == 'Linge') {
                    Tlinge = Tlinge + row.montant * row.nombre;
                }

                if (lieu == 'Petit dejeune') {
                    TpetitD = TpetitD + row.montant * row.nombre;
                }
                if (lieu == 'Divers') {
                    Tdivers = Tdivers + row.montant * row.nombre;
                }
                i = i + 1;
            });
            Total = Tlinge + Tchambre + TpetitD + Tbar + Trestaurant + Tdivers;
            // console.log(Infos);
            // res.json({msg: 'success', data: Infos});
            var sql = "SELECT  chambreclient.id_chambre FROM chambreclient WHERE   chambreclient.id_client  = " + id + "";
            mysqlConnection.query(sql, (err, rows, fields) => {
                var Infos = rows;
                res.json({ Infos, Total, Tlinge, Tchambre, TpetitD, Tbar, Trestaurant, Tdivers });
                // return res.end(JSON.stringify(Infos));
            });

        });
    })
});



app.post('/client/modifier', urlencodedParser, [], (req, res) => {
    var id = req.body.id_client;
    var sql = "SELECT * FROM client WHERE cni = " + cni + "";
    mysqlConnection.query(sql, (err, rows, fields) => {
        infos = rows;
        if ((infos[0] != undefined)) {
            var sql = "select * from chambre where status = 'libre'";
            mysqlConnection.query(sql, (err, rows, fields) => {
                row = rows;
                res.render('enregistrer/modifier', {
                    row,
                    infos
                });

            });
        } else {
            res.render('enregistrer/erreurs');

        }


    });
});




app.post('/receptioniste/client/Liberer', urlencodedParser, [check('numero', 'inserer le numero')
.exists()
.isLength({ min: 1 }),


], (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
    //return res.status(422).jsonp(errors.array())
    const alert = errors.array()
    var sql = "select * from client order by id_client asc";
                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                        client = rows;
                                        var sql = "select * from chambreclient order by id_client asc";
                                        // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                                        // AND client.id_client = chambreclient.id_client;";
                                        mysqlConnection.query(sql, (err, rows, fields) => {
                                            chambre = rows;
                                            var sql = "select * from chambre order by id_chambre asc";
                                            mysqlConnection.query(sql, (err, rows, fields) => {
                                            sess = req.session;
                                            chambrec = rows;
                                            req.session.username = userData[0].nom;
                                            req.session.userid = userData[0].id_user;
                                            req.session.role = role;
                                            req.userid = userData[0].id_user;
                                            // console.log(req.session);
                                            res.render('client/client', {
                                                client,
                                                chambre,
                                                chambrec,
                                                alert
                                            });
                                        })
                                    })
                                })
} else {
    var sql = "update chambre set status = 'libre' where id_chambre=" + req.body.numero + " ";
    mysqlConnection.query(sql, (err, rows, fields) => {
        var sql = "select * from client order by id_client asc";
        mysqlConnection.query(sql, (err, rows, fields) => {
            client = rows;
            var sql = "select * from chambreclient order by id_client asc";
            // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
            // AND client.id_client = chambreclient.id_client;";
            mysqlConnection.query(sql, (err, rows, fields) => {
                chambre = rows;
                var sql = "select * from chambre order by id_chambre asc";
                mysqlConnection.query(sql, (err, rows, fields) => {
                sess = req.session;
                chambrec = rows;
               
                // console.log(req.session);
                res.render('client/client', {
                    client,
                    chambre,
                    chambrec
                });
            })
        })
    })
    })
}
});



app.get('/client/rechercher', (req, res) => {
    var cni = req.query.rechercher;


    var sql = "SELECT * FROM client WHERE client.cni = " + cni + "";
    mysqlConnection.query(sql, (err, rows, fields) => {
        var Infos = rows;
        var alert;
        // res.json({msg: 'success', data: Infos});
        res.json({ Infos, alert });
        // return res.end(JSON.stringify(Infos));
    });
});


app.post('/client/rechercher', urlencodedParser, [check('rechercher', 'inserer la cni')
    .exists()
    .isLength({ min: 3 }),


], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        var sql = "select * from chambre where status = 'libre'";
        mysqlConnection.query(sql, (err, rows, fields) => {
            row = rows;

            res.render('enregistrer/index', {
                alert,
                row
            });

        })
    } else {
        var cni = req.body.rechercher;

        var sql = "SELECT * FROM client WHERE cni = " + cni + "";
        mysqlConnection.query(sql, (err, rows, fields) => {
            infos = rows;
            var alert;

            if (infos.length >= 1) {
                var sql = "select * from chambre where status = 'libre'";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    row = rows;
                    res.render('enregistrer/modifier', {
                        row,
                        infos,
                        alert
                    });


                });
            } else {
                var sql = "select * from chambre where status = 'libre'";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    row = rows;
                    res.render('enregistrer/erreurs');
                })


            }




        });
    }
});

app.post('/receptioniste/main_courant/', urlencodedParser, [check('date', 'inserer la date')
    .exists()
    .isLength({ min: 10 }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        let date = Date.now();
        var yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        let MyDate = yesterday.toISOString().slice(0, 10);
        let toDay = new Date(date);


        let hier = MyDate + " 00:00:00";
        let hiers = MyDate + " 23:59:59";

        var day = toDay.toISOString().slice(0, 10) + " 00:00:00";


        var sql = "select * from client  ORDER BY id_client DESC";
        mysqlConnection.query(sql, (err, rows, fields) => {
            client = rows;
            var sql = "select c.lieu,c.nombre,c.montant,c.id_client from commande c,client cl where c.id_client=cl.id_client   ORDER BY id_client DESC ";
            mysqlConnection.query(sql, (err, rows, fields) => {
                commande = rows;
                var sql = "select ch.prix,c.id_chambre,c.id_client from chambreclient c, chambre ch where c.id_chambre=ch.id_chambre ORDER BY id_client DESC";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    chambreclient = rows;
                    var sql = "select * from commande where date_commande>='" + hier + "' and date_ajout<='" + hiers + "'  ORDER BY id_client DESC ";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        commandeh = rows;
                        var sql = "select * from facture  ORDER BY id_client DESC ";
                        mysqlConnection.query(sql, (err, rows, fields) => {
                            facture = rows;
                            var sql = "select * from commande where status= '0' ORDER BY id_client DESC ";
                            mysqlConnection.query(sql, (err, rows, fields) => {
                                status = rows;
                                // console.log(status);

                                res.render('main_courante/index', {
                                    client,
                                    chambreclient,
                                    commande,
                                    facture,
                                    commandeh,
                                    alert

                                })
                            })
                        });
                    })
                })
            })
        });


    } else {
        let date = Date.now();
        var yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        let MyDate = yesterday.toISOString().slice(0, 10);
        let toDay = new Date(date);


        let hier = MyDate + " 00:00:00";
        let hiers = MyDate + " 23:59:59";

        var day = req.body.date + " 00:00:00";
        var days = req.body.date + " 23:59:59"


        var sql = "select * from client where date_ajout >= '" + day + "' and date_ajout <= '" + days + "' ORDER BY id_client DESC";
        mysqlConnection.query(sql, (err, rows, fields) => {
            client = rows;

            var sql = "select * from commande where date_commande >= '" + day + "' and date_commande <= '" + days + "'  ORDER BY id_client DESC ";
            mysqlConnection.query(sql, (err, rows, fields) => {
                commande = rows;
                console.log(day)
                var sql = "select c.id_chambre,c.id_client,ch.prix from chambreclient c, chambre ch where date >= '" + day + "' and date <= '" + days + "' and c.id_chambre=ch.id_chambre ORDER BY id_client DESC";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    chambreclient = rows;

                    var sql = "select * from commande where date_commande >= '" + hier + "' and date_commande <= '" + hiers + "'   ORDER BY id_client DESC ";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        commandeh = rows;
                        var sql = "select * from commande where status= '0' ORDER BY id_client DESC ";
                        mysqlConnection.query(sql, (err, rows, fields) => {
                            status = rows;
                            var sql = "select * from facture  ORDER BY id_client DESC ";
                            mysqlConnection.query(sql, (err, rows, fields) => {
                                facture = rows
                                res.render('main_courante/index', {
                                    client,
                                    chambreclient,
                                    commande,
                                    commandeh,
                                    facture

                                })
                            })
                        });
                    })
                })
            })
        });
    }
});

app.post('/login', urlencodedParser, [
    check('username', 'nom trop grand')
    .exists()
    .isLength({ max: 45 }),
    check('password', 'password minimun 4 lettres')
    .exists()
    .isLength({ min: 4 })



], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        var requette = "Erreur de mot de passe ou login";

        res.render('login/login', {
            alert,
            requette

        })
    }
    var id = 0;
    if (req.session.role !== '' && req.session.username != '') {
        if (req.body.username != undefined && req.body.password != undefined) {
            var sql = "select * from utilisateur where nom ='" + req.body.username + "' and password = '" + req.body.password + "'";
            mysqlConnection.query(sql, (err, rows, fields) => {
                // console.log(err);
                if (!err) {

                    if (rows.length == 1) {
                        id = rows[0].id_user;
                        userData = rows;
                        var sql = "select * from profil where id_user =" + id + "";
                        mysqlConnection.query(sql, (err, rows, fields) => {

                            if (!err) {
                                var role = rows[0].role;
                                if (role == 'admin') {

                                    var sql = "select * from client order by id_client asc";
                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                        client = rows;
                                        var sql = "select * from chambreclient order by id_client asc";
                                        // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                                        // AND client.id_client = chambreclient.id_client;";
                                        mysqlConnection.query(sql, (err, rows, fields) => {
                                            chambre = rows;
                                            var sql = "select * from chambre order by id_chambre asc";
                                            mysqlConnection.query(sql, (err, rows, fields) => {
                                            sess = req.session;
                                            chambrec = rows;
                                            req.session.username = userData[0].nom;
                                            req.session.userid = userData[0].id_user;
                                            req.session.role = role;
                                            req.userid = userData[0].id_user;
                                            // console.log(req.session);
                                            res.render('client/client', {
                                                client,
                                                chambre,
                                                chambrec
                                            });
                                        })
                                    })
                                })
                                }
                                if (role == 'receptioniste') {
                                    var sql = "select * from client order by id_client asc";
                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                        client = rows;
                                        var sql = "select * from chambreclient order by id_client asc";
                                        // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                                        // AND client.id_client = chambreclient.id_client;";
                                        mysqlConnection.query(sql, (err, rows, fields) => {
                                            chambre = rows;
                                            var sql = "select * from chambre order by id_chambre asc";
                                            mysqlConnection.query(sql, (err, rows, fields) => {
                                            sess = req.session;
                                            chambrec = rows;
                                            req.session.username = userData[0].nom;
                                            req.session.userid = userData[0].id_user;
                                            req.session.role = role;
                                            req.userid = userData[0].id_user;
                                            // console.log(req.session);
                                            res.render('client/client', {
                                                client,
                                                chambre,
                                                chambrec
                                            });
                                        })
                                    })
                                })
                                }
                                //res.send(rows);
                            } else
                                res.render('login/login')

                        })
                    } else {
                        var requette;
                        res.render('login/login', {
                            requette: 'error'
                        })
                    }
                } else
                    res.render('login/login')
            })
        } else {
            var requette;
            res.render('login/login', {
                requette: 'error'
            })
        }
    } else {
        res.redirect('/acceuil/clients')
    }

});

var id = 0;

// insert client
app.post('/receptioniste/client', urlencodedParser, [
    check('name', 'le nom minimun 3 lettre')
    .exists()
    .isLength({ min: 3 }),
    check('prenom', 'le prenom minimun 3 lettre')
    .exists()
    .isLength({ min: 3 }),
    check('cni', 'entrer la cni')
    .exists()
    .isLength({ min: 5 }),
    check('phone', 'entrer le numéro de téléphone 9 chiffres')
    .exists()
    .isLength({ min: 9, max: 9 }),



], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        var sql = "select * from chambre where status = 'libre'";
        mysqlConnection.query(sql, (err, rows, fields) => {
            row = rows;
            res.render('enregistrer/index', {
                row,
                alert
            })
        })
    } else {
        let date = Date.now();

        let Days = new Date(date);



        let hour = Days.getHours();
        let minute = Days.getMinutes();
        let second = Days.getSeconds();

        //let clientD = year + "-" + month + "-" + day ;
        toDay = Days.toISOString().slice(0, 10) + " " + hour + ":" + minute + ":" + second;
        var sql = "select * from client";
        mysqlConnection.query(sql, (err, rows, fields) => {
            row = rows;
            var bol = false;
            //console.log(row)
            row.forEach(r => {
                if (r.cni == req.body.cni) {
                    bol = true;
                }
            })
            if (bol == false) {
                var sql = "insert into client values(null,'" + req.body.name + "','" + req.body.prenom + "'," + req.body.phone + "," + req.body.cni + ", '" + toDay + "')";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    var sql = "select * from client where cni = " + req.body.cni + "";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        id = rows[0].id_client;

                        var sql1 = "insert into facture values(null," + 0 + "," + 0 + "," + 0 + "," + id + ")";
                        mysqlConnection.query(sql1, (err, rows, fields) => {})
                        for (var i = 0; i < req.body.chambre.length; i++) {
                            var sql = "insert into chambreclient values(null," + id + "," + req.body.chambre[i] + ",'" + toDay + "')";
                            mysqlConnection.query(sql, (err, rows, fields) => {})
                        }
                        for (var i = 0; i < req.body.chambre.length; i++) {
                            var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + req.body.chambre[i] + "";
                            mysqlConnection.query(sql, (err, rows, fields) => {})
                        }
                        var sql = "select * from client order by id_client asc";
                        mysqlConnection.query(sql, (err, rows, fields) => {
                            client = rows;
                            var sql = "select * from chambreclient order by id_client asc";
                            mysqlConnection.query(sql, (err, rows, fields) => {
                                chambre = rows;
                                res.render('client/client', {
                                    client,
                                    chambre
                                });
                            })


                        })
                    })
                })
            } else {

                var sql = "select * from client where cni = " + req.body.cni + "";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    id = rows[0].id_client;


                    for (var i = 0; i < req.body.chambre.length; i++) {
                        var sql = "insert into chambreclient values(null," + id + "," + req.body.chambre[i] + ",'" + toDay + "')";
                        mysqlConnection.query(sql, (err, rows, fields) => {})
                    }
                    for (var i = 0; i < req.body.chambre.length; i++) {
                        var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + req.body.chambre[i] + "";
                        mysqlConnection.query(sql, (err, rows, fields) => {})
                    }
                    var sql = "select * from client order by id_client asc";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        client = rows;
                        var sql = "select * from chambreclient order by id_client asc";
                        mysqlConnection.query(sql, (err, rows, fields) => {
                            chambre = rows;
                            res.render('client/client', {
                                client,
                                chambre
                            });
                        })


                    })
                })
            }

        })
    }

});


app.post('/admin/client', urlencodedParser, [
    check('name', 'nom trop grand')
    .exists()
    .isLength({ max: 45 }),
    check('mail', 'email non valide')
    .isEmail()
    .normalizeEmail()



], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return res.status(422).jsonp(errors.array())
        const alert = errors.array()

        //var chambre= new String(req.body.select);;
        var sql = "select * from chambre ";
        mysqlConnection.query(sql, (err, rows, fields) => {
            const row = rows;
            res.render('clients', {
                alert,
                row

            })
        })

    } else {

        var sql = "select * from chambre ";
        mysqlConnection.query(sql, (err, rows, fields) => {

            rows.forEach(row => {
                var status = new String(row.status);
                var d = row.id_chambre;
                if (status == 'libre') {
                    if (req.body.libre != undefined) {
                        var sql = "update chambre set status = 'occupé' where id_chambre=" + d + " ";
                        mysqlConnection.query(sql, (err, rows, fields) => {

                        })

                    }
                }
                if (status == 'occupé') {
                    if (req.body.libre != undefined) {

                        var sql = "update chambre set status = 'libre' where id_chambre=" + d + " ";
                        mysqlConnection.query(sql, (err, rows, fields) => {



                        })

                    }
                }
            });

        })

        var sexe;
        if (req.body.masculin != undefined) {
            sexe = req.body.masculin;
        }
        if (req.body.feminin != undefined) {
            sexe = req.body.feminin;
        }

        var sql = "insert into client values(null,'" + req.body.name + "'," + req.body.numero + "," + req.body.cni + ",'" + req.body.mail + "','" + sexe + "','" + req.body.commande + "'," + req.body.prix + "," + req.body.nombre + ")";
        mysqlConnection.query(sql, (err, rows, fields) => {

            var sql = "select * from client where cni = " + req.body.cni + "";
            mysqlConnection.query(sql, (err, rows, fields) => {
                // var total = req.body.prix * req.body.nombre;
                // console.log(req.body.commande);
                // var sql = "insert into facture values(null,'" + req.body.commande + "'," + req.body.prix + "," + req.body.nombre + "," + total + "," + rows[0].id_client + ")";
                // mysqlConnection.query(sql, (err, rows, fields) => {
                //     res.render('acceuille_admin')
                // })
                var last_isert_id = rows[0].id_client;
                var sql = "insert into chambreclient values(null,'" + last_isert_id + "'," + rows[0].id_client + "," + req.body.nombre + "," + total + "," + rows[0].id_client + ")";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    res.render('acceuille_admin')
                })
            })

        })
    }
});



app.post('/receptioniste/client/autre_entree', urlencodedParser, [
    check('montant', 'entrer un montan')
    .exists()
    .isLength({ min: 3 }),
    check('poste', 'entrer un montan')
    .exists()
    .isLength({ min: 3 }),

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('clients', {
            alert
        })

    } else {
        let date = Date.now();

        let Days = new Date(date);



        let hour = Days.getHours();
        let minute = Days.getMinutes();
        let second = Days.getSeconds();

        //let clientD = year + "-" + month + "-" + day ;
        toDay = Days.toISOString().slice(0, 10) + " " + hour + ":" + minute + ":" + second;

        var sql = "insert into entree values(null,'" + req.body.poste + "'," + req.body.montant+ ",'" + toDay + "')";
        mysqlConnection.query(sql, (err, rows, fields) => {
            var sql = "select * from client order by id_client asc";
            mysqlConnection.query(sql, (err, rows, fields) => {
                client = rows;
                var sql = "select * from chambreclient order by id_client asc";
                // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                // AND client.id_client = chambreclient.id_client;";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    chambre = rows;
                    var sql = "select * from chambre order by id_chambre asc";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                    sess = req.session;
                    chambrec = rows;
                   
                    // console.log(req.session);
                    res.render('client/client', {
                        client,
                        chambre,
                        chambrec
                    });
                })
            })
        })
        })
    }
});

app.post('/admin/facture_admin', urlencodedParser, [], (req, res) => {

    var nom;
    var row;
    var sql = "select * from facture ";
    mysqlConnection.query(sql, (err, rows, fields) => {


        row = rows;
        var l = rows.length;
        if (l >= 1) {
            var sql = "select nom from client ";
            mysqlConnection.query(sql, (err, rows, fields) => {


                nom = rows;


                res.render('facture_admin.ejs', {
                    row,
                    nom,
                    l
                })
            })
        } else {
            res.render('facture_admin.ejs', {
                l
            })
        }
    })

    if (req.body.mod != undefined) {

    }

    if (req.body.sup != undefined) {
        var sql = "select * from facture where id_facture = " + req.body.sup + "";
        mysqlConnection.query(sql, (err, rows, fields) => {
            var id = rows[0].id_client;
            console.log(id);
            var sql = "delete from facture where id_facture = " + req.body.sup + " ";
            mysqlConnection.query(sql, (err, rows, fields) => {
                console.log(id);
                var sql = "delete from client where id_client = " + id + "";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    res.render('facture_admin')
                })

            })

        })

    }

});




app.post('/receptioniste/client/autre_sortie', urlencodedParser, [
    check('montant', 'entrer un montan')
    .exists()
    .isLength({ min: 3 }),
    check('poste', 'entrer un montan')
    .exists()
    .isLength({ min: 3 }),

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('clients', {
            alert
        })

    } else {
        let date = Date.now();

        let Days = new Date(date);



        let hour = Days.getHours();
        let minute = Days.getMinutes();
        let second = Days.getSeconds();

        //let clientD = year + "-" + month + "-" + day ;
        toDay = Days.toISOString().slice(0, 10) + " " + hour + ":" + minute + ":" + second;

        var sql = "insert into sortie values(null,'" + req.body.poste + "'," + req.body.montant+ ",'" + toDay + "')";
        mysqlConnection.query(sql, (err, rows, fields) => {
            var sql = "select * from client order by id_client asc";
            mysqlConnection.query(sql, (err, rows, fields) => {
                client = rows;
                var sql = "select * from chambreclient order by id_client asc";
                // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                // AND client.id_client = chambreclient.id_client;";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    chambre = rows;
                    var sql = "select * from chambre order by id_chambre asc";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                    sess = req.session;
                    chambrec = rows;
                   
                    // console.log(req.session);
                    res.render('client/client', {
                        client,
                        chambre,
                        chambrec
                    });
                })
            })
        })
        })
    }
});

app.post('/admin/facture_admin', urlencodedParser, [], (req, res) => {

    var nom;
    var row;
    var sql = "select * from facture ";
    mysqlConnection.query(sql, (err, rows, fields) => {


        row = rows;
        var l = rows.length;
        if (l >= 1) {
            var sql = "select nom from client ";
            mysqlConnection.query(sql, (err, rows, fields) => {


                nom = rows;


                res.render('facture_admin.ejs', {
                    row,
                    nom,
                    l
                })
            })
        } else {
            res.render('facture_admin.ejs', {
                l
            })
        }
    })

    if (req.body.mod != undefined) {

    }

    if (req.body.sup != undefined) {
        var sql = "select * from facture where id_facture = " + req.body.sup + "";
        mysqlConnection.query(sql, (err, rows, fields) => {
            var id = rows[0].id_client;
            console.log(id);
            var sql = "delete from facture where id_facture = " + req.body.sup + " ";
            mysqlConnection.query(sql, (err, rows, fields) => {
                console.log(id);
                var sql = "delete from client where id_client = " + id + "";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    res.render('facture_admin')
                })

            })

        })

    }

});

app.post('/delete', urlencodedParser, (req, res) => {

    var sql = "delete from employee where EmpID = ?";

    mysqlConnection.query(sql, [req.body.id], (err, rows, fields) => {
        if (!err) {

            res.render('delete', {
                title: 'data saved',
                message: 'data saved seccessfully'
            })
        } else
            console.log(err);

    })
});

app.post("/admin/chambreVide/", (req, res) => {
    // var idClient = req.params.idClient;
    if (req.session.role === 'admin' || req.session.role === 'receptioniste' && req.session.username) {
        var sql = "select * from Chambre where status = " + 'occupé' + "";
        mysqlConnection.query(sql, (err, rows, fields) => {
            const row = rows;
            res.render('clients', {
                alert,
                row
            })
        });
    } else {
        res.redirect('/');
    }

});

app.post("/admin/chambreLibre/", (req, res) => {
    // var idClient = req.params.idClient;
    if (req.session.role === 'admin' || req.session.role === 'receptioniste' && req.session.username) {
        var sql = "select * from Chambre where status = " + 'libre' + "";
        mysqlConnection.query(sql, (err, rows, fields) => {
            const row = rows;
            res.render('enregistrer/index', {
                alert,
                row
            })
        });
    } else {
        res.redirect('/');
    }

});




// pdf genered



app.get("/generateReport2/:id", (req, res) => {
    if (req.session.role === 'admin' || req.session.role === 'receptioniste' && req.session.username) {
        var id = req.params.id;
        let date = Date.now();
        let MyDate = new Date(date);
        let day = MyDate.getDate();
        let month = MyDate.getMonth();
        let year = MyDate.getFullYear();
        let hour = MyDate.getHours();
        let minute = MyDate.getMinutes();
        let second = MyDate.getSeconds();


        var sql = "select * from client where id_client=" + id + " ORDER BY id_client ASC";
        mysqlConnection.query(sql, (err, rows, fields) => {
            client = rows;
            factname = client[0].nom;
            var sql = "select c.id_chambre, ch.categorie, ch.prix from chambreclient c,chambre ch where c.id_client=" + id + " and c.id_chambre=ch.id_chambre ORDER BY id_client ASC";
            mysqlConnection.query(sql, (err, rows, fields) => {
                chambreclient = rows;

                var Tchambre = 0;
                rows.forEach(row => {
                    Tchambre = Tchambre + row.prix;
                })
                var sql1 = "SELECT  commande.* FROM  commande WHERE commande.id_client = " + id + "";
                mysqlConnection.query(sql1, (err, rows, fields) => {
                    // var Infos = rows;
                    var i = 0;

                    var Tlinge = 0;
                    var Trestaurant = 0;
                    var TpetitD = 0;
                    var Tbar = 0;
                    var Tdivers = 0;

                    var Total = 0;
                    rows.forEach(row => {
                        var lieu = new String(row.lieu);
                        // var d = row.id_chambre;
                        if (lieu == 'Bar') {
                            Tbar = Tbar + row.montant * row.nombre;
                        }
                        if (lieu == 'Restaurant') {
                            Trestaurant = Trestaurant + row.montant * row.nombre;
                        }
                        if (lieu == 'Linge') {
                            Tlinge = Tlinge + row.montant * row.nombre;
                        }

                        if (lieu == 'Petit dejeune') {
                            TpetitD = TpetitD + row.montant * row.nombre;
                        }
                        if (lieu == 'Divers') {
                            Tdivers = Tdivers + row.montant * row.nombre;
                        }
                        i = i + 1;
                    });
                    Total = Tlinge + Tchambre + TpetitD + Tbar + Trestaurant + Tdivers;
                    // console.log(Infos);
                    // res.json({msg: 'success', data: Infos});
                    var sql = "SELECT  chambreclient.id_chambre FROM chambreclient WHERE   chambreclient.id_client  = " + id + "";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        var Infos = rows;
                        ejs.renderFile(path.join('./views', "facture.ejs"), {
                            client: client,
                            commande: commande,
                            Infos: Infos,
                            factname: factname,
                            Infos,
                            Total,
                            Tlinge,
                            Tchambre,
                            TpetitD,
                            Tbar,
                            Trestaurant,
                            Tdivers
                        }, (err, data) => {
                            // ejs.renderFile(path.join('./views/', "index.ejs"), (err, data) => {
                            if (err) {
                                res.send(err);
                            } else {
                                var phantomjs = require('phantomjs');
                                var options = {
                                    phantomPath: phantomjs.path,
                                    filename: './public/factures/' + factname + ".pdf",
                                    format: 'A4',
                                    orientation: 'portrait',
                                    type: "pdf",
                                    timeout: 30000
                                };
                                // var options = {
                                //     phantomPath: __dirname + "/pathToNodeModules/phantomjs/bin/phantomjs",
                                //     filename: './public/factures/'+ factname + ".pdf",
                                //     format: 'A4',
                                //     orientation: 'portrait',
                                //     type: "pdf",
                                //     timeout: 30000
                                // };
                                htmlPdf.create(data, options).toFile(path.join('./public/factures/', factname + ".pdf"), function(err, data) {

                                    if (err) {
                                        res.send(err);
                                    } else {
                                        const factPath = path.join('./public/factures/', factname + ".pdf");
                                        // res.render("factPath");
                                        // require(factPath);

                                        res.render('htmlpdf', {
                                            Infos,
                                            Total,
                                            Tlinge,
                                            Tchambre,
                                            TpetitD,
                                            Tbar,
                                            Trestaurant,
                                            Tdivers,
                                            factname,
                                            id


                                        })
                                    }
                                });
                            }
                        });
                        // return res.end(JSON.stringify(Infos));
                    });

                });
            })
        })

        //let clientD = year + "-" + month + "-" + day ;
        toDay = MyDate.toISOString().slice(0, 10) + " " + hour + ":" + minute + ":" + second;
        let imageP = path.resolve('public', 'image/Logo-atitle-hotel.png');

        var sql = "select * from client where id_client=" + id + " ORDER BY id_client ASC";
        mysqlConnection.query(sql, (err, rows, fields) => {
            client = rows;
            factname = client[0].nom;
            var sql = "select * from commande where  id_client=" + id + "  ORDER BY id_client ASC ";
            mysqlConnection.query(sql, (err, rows, fields) => {
                commande = rows;
                // console.log(commande)
                var sql = "select c.id_chambre, ch.categorie, ch.prix from chambreclient c,chambre ch where c.id_client=" + id + " and c.id_chambre=ch.id_chambre ORDER BY id_client ASC";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    chambreclient = rows;

                    var sql = "select * from facture where id_client=" + id + " ORDER BY id_client ASC";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        facture = rows;


                        // console.log(status);


                    })
                });
            })
        })

    } else {
        res.redirect('/');
    }

});

// insertion commande

app.post('/receptioniste/commande/:id', urlencodedParser, [
    check('poste', 'entrer le service')
    .exists()
    .isLength({ min: 3 }),
    check('montant', 'entrer le montant')
    .exists()
    .isLength({ min: 3 }),
    check('nombre', 'entrer le nombre')
    .exists()




], (req, res) => {
    id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return res.status(422).jsonp(errors.array())
        const alert = errors.array()

        res.render('commande/commande', {

            alert,
            id
        })

    } else {
        if (req.session.role === 'admin' || req.session.role === 'receptioniste' && req.session.username) {

            let date = Date.now();

            let Days = new Date(date);



            let hour = Days.getHours();
            let minute = Days.getMinutes();
            let second = Days.getSeconds();

            //let clientD = year + "-" + month + "-" + day ;

            let clientDate = Days.toISOString().slice(0, 10) + " " + hour + ":" + minute + ":" + second;

            console.log(req.body.length);


            if (req.body.poste !== 'reglement') {


                var sql1 = "insert into commande values(null,'','" + req.body.poste + "'," + req.body.montant + ",'" + 0 + "'," + id + ",'" + clientDate + "'," + req.body.nombre + ")";
                mysqlConnection.query(sql1, (err, rows, fields) => {

                    var s = 0;

                    var sql = "select * from commande where id_client=" + id + " ORDER BY id_client ASC";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        commande = rows;

                        var sql = "select * from facture where id_client=" + id + " ORDER BY id_client ASC";
                        mysqlConnection.query(sql, (err, rows, fields) => {
                            if (rows.length !== 1) {

                                commande.forEach(elt => {
                                    s = s + (elt.montant * elt.nombre);
                                })
                                var sql1 = "insert into facture values(null," + s + "," + 0 + "," + s + "," + id + ")";
                                mysqlConnection.query(sql1, (err, rows, fields) => {

                                    var sql = "select * from client ORDER BY id_client ASC";
                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                        client = rows;
                                        var sql = "select * from chambreclient ORDER BY id_client ASC";
                                        mysqlConnection.query(sql, (err, rows, fields) => {
                                            chambre = rows;
                                            res.render('client/client', {
                                                client,
                                                chambre
                                            });
                                        })
                                    })
                                })
                            } else {
                                var s = 0;

                                var sql = "select * from commande where id_client=" + id + " ORDER BY id_client ASC";
                                mysqlConnection.query(sql, (err, rows, fields) => {
                                    commande = rows;

                                    var sql1 = "SELECT * FROM `facture` where id_client=" + id + "";
                                    mysqlConnection.query(sql1, (err, rows, fields) => {
                                        commande.forEach(elt => {
                                            s = s + (elt.montant * elt.nombre);
                                        })
                                        reg = s + rows[0].reporter;
                                        to = s + rows[0].total;
                                        // console.log(rows);
                                        var sql1 = "UPDATE `facture` SET `reporter` = " + reg + ", `total` = " + to + " WHERE `facture`.`id_client`= " + id + "";
                                        mysqlConnection.query(sql1, (err, rows, fields) => {

                                            var sql = "select * from client ORDER BY id_client ASC";
                                            mysqlConnection.query(sql, (err, rows, fields) => {
                                                client = rows;
                                                var sql = "select * from chambreclient ORDER BY id_client ASC";
                                                mysqlConnection.query(sql, (err, rows, fields) => {
                                                    chambre = rows;
                                                    res.render('client/client', {
                                                        client,
                                                        chambre
                                                    });
                                                })
                                            })
                                        })
                                    })
                                })
                            }
                        })
                    })

                })
            } else {

                var sql1 = "SELECT * FROM `facture` where id_client=" + id + "";
                mysqlConnection.query(sql1, (err, rows, fields) => {

                    var x = Number(req.body.montant);


                    s = x + rows[0].reglement;

                    var sql1 = "UPDATE `facture` SET `reglement` = " + s + ", `total` = " + (rows[0].total - x) + " WHERE `facture`.`id_client`= " + id + "";
                    mysqlConnection.query(sql1, (err, rows, fields) => {

                        var sql = "select * from client ORDER BY id_client ASC";
                        mysqlConnection.query(sql, (err, rows, fields) => {
                            client = rows;
                            var sql = "select * from chambreclient ORDER BY id_client ASC";
                            mysqlConnection.query(sql, (err, rows, fields) => {
                                chambre = rows;
                                res.render('client/client', {
                                    client,
                                    chambre
                                });
                            })
                        })
                    })
                })
            }
        } else {
            res.redirect('/');
        }
    }
});
app.get("/acceuil/clients", (req, res) => {
    if (req.session.role === 'admin' || req.session.role === 'receptioniste' && req.session.username) {
        var sql = "select * from client ORDER BY id_client ASC";
        mysqlConnection.query(sql, (err, rows, fields) => {
            client = rows;
            var sql = "select * from chambreclient ORDER BY id_client ASC";
            mysqlConnection.query(sql, (err, rows, fields) => {
                chambre = rows;
                res.render('client/client', {
                    client,
                    chambre
                });
            })
        })
    } else {
        res.redirect('/');
    }
});
app.get("/admin/genererFacture/:id", (req, res) => {
    if (req.session.role === 'admin' || req.session.role === 'receptioniste' && req.session.username) {
        var id = req.query.id;
        // var id = req.params.id;
        var commandes;
        var infos;
        var chambres;
        // var idClient = req.params.id;
        var idClient = req.query.id;
        var sql1 = "select * from client where id_client = " + idClient + "";
        mysqlConnection.query(sql1, (err, rows, fields) => {
            client = rows;
            // var id = rows[0].id_client;
            var factname = client[0].nom;

            var sql2 = "select * from commande where id_client = " + idClient + "";
            mysqlConnection.query(sql2, (err, rows, fields) => {
                commande = rows;
                var sql3 = "select c.id_chambre, ch.categorie, ch.prix from chambreclient c,chambre ch where c.id_client=" + id + " and c.id_chambre=ch.id_chambre ORDER BY id_client ASC";;
                // var sql = "select C.id_chambre c.prix c.codechambre from chambre c chambreclient cc where   cc.id_client = " + idClient + " and c.id_chambre = cc.id_chambre";
                // var sql = "select * from  where id_client = " + idClient + "";
                mysqlConnection.query(sql3, (err, rows, fields) => {
                    var chambres = rows;
                    let date = Date.now();
                    let MyDate = new Date(date);
                    let day = MyDate.getDate();
                    let month = MyDate.getMonth();
                    let year = MyDate.getFullYear();
                    let hour = MyDate.getHours();
                    let minute = MyDate.getMinutes();
                    let second = MyDate.getSeconds();
                    let factDate = day + "_" + month + "_" + year + "__" + hour + "h_" + minute + "min_" + second;
                    let imageP = path.resolve('public', 'image/Logo-atitle-hotel.png');




                    ejs.renderFile(path.join('./views', "facture.ejs"), { client: client, commande: commande, chambreclient: chambreclient, factname: factname, image: base(imageP) }, (err, data) => {
                        // ejs.renderFile(path.join('./views/', "index.ejs"), (err, data) => {
                        if (err) {
                            res.send(err);
                        } else {
                            var phantomjs = require('phantomjs');
                            var options = {
                                phantomPath: phantomjs.path,
                                filename: './public/factures/' + factname + ".pdf",
                                format: 'A4',
                                orientation: 'portrait',
                                type: "pdf",
                                timeout: 30000
                            };
                            // var options = {
                            //     phantomPath: __dirname + "/pathToNodeModules/phantomjs/bin/phantomjs",
                            //     filename: './public/factures/'+ factname + ".pdf",
                            //     format: 'A4',
                            //     orientation: 'portrait',
                            //     type: "pdf",
                            //     timeout: 30000
                            // };



                            htmlPdf.create(data, options).toFile(path.join('./public/factures/', factname + ".pdf"), function(err, data) {


                                if (err) {
                                    res.send(err);
                                } else {
                                    const factPath = path.join('./public/factures/', factname + ".pdf");
                                    // res.render("factPath");
                                    // require(factPath);
                                    // res.setHeader('Content-Type', 'application/pdf')
                                    // res.setHeader('Content-Disposition', 'inline;filename='+factname+'.pdf')
                                    //
                                    pdffulname = factname + factDate + '.pdf';
                                    // console.log(pdffulname);
                                    res.json({ pdffulname });
                                    // res.json({  Infos,Total , Tlinge , Tchambre , TpetitD , Tbar , Trestaurant,Tdivers});

                                    // res.send("Facture creee avec success");
                                }
                            });
                        }
                    });
                })
            })
        })
    } else {
        res.redirect('/');
    }
});