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
app.set('view engine', 'ejs');
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

    password: '', //Hostire1.
    database: 'hotel' //hotels
        /*
        password: 'Hostire1',
        database: 'hotel'
        */

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
app.get('/bilan', (req, res) => {
    let date = Date.now();
    var yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    let MyDate = yesterday.toISOString().slice(0, 10);
    let toDay = new Date(date);


    let hier = MyDate + " 00:00:00";
    let hiers = MyDate + " 23:59:59";
    var sql = "select * from sortie ORDER BY date DESC";
    mysqlConnection.query(sql, (err, rows, fields) => {
        sorti = rows;
        var sql = "select * from sortie where date>='" + hier + "' and date<='" + hiers + "'  ORDER BY id_sortie DESC";
        mysqlConnection.query(sql, (err, rows, fields) => {
            sortih = rows;
            var sql = "select * from entree ORDER BY date DESC";
            mysqlConnection.query(sql, (err, rows, fields) => {
                entree = rows;
                var sql = "select * from entree where date>='" + hier + "' and date<='" + hiers + "'  ORDER BY id_entree DESC";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    entreeh = rows;

                    res.render('bilan/bilan', {
                        sorti,
                        entree,
                        sortih,
                        entreeh
                       


                    })

                })
            })
        })
    })
});
app.post('/bilan', urlencodedParser, [check('date', 'inserer la date')
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


        var sql = "select * from sortie";
        mysqlConnection.query(sql, (err, rows, fields) => {
            sorti = rows;
            var sql = "select * from sortie where data>='" + hier + "' and date<='" + hiers + "'  ORDER BY id_sortie DESC";
            mysqlConnection.query(sql, (err, rows, fields) => {
                sortih = rows;
                var sql = "select * from entree";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    entree = rows;
                    var sql = "select * from entree where data>='" + hier + "' and date<='" + hiers + "'  ORDER BY id_entree DESC";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        entreeh = rows;

                        res.render('bilan/bilan', {
                            sorti,
                            entree,
                            sortih,
                            entreeh,
                            alert


                        })

                    })
                })
            })
        })


    } else {
        let date = Date.now();
        var yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        let MyDate = yesterday.toISOString().slice(0, 10);
        let toDay = new Date(date);


        var f = new String(req.body.date)
        var h = f.slice(8, 10) - 1;
        let hier = f.slice(0, 7) + "-" + h + " 00:00:00";
        let hiers = f.slice(0, 7) + "-" + h + " 23:59:59";

        var day = req.body.date + " 00:00:00";
        var days = req.body.date + " 23:59:59"
        var sql = "select * from sortie where date >= '" + day + "' and date <= '" + days + "' ORDER BY id_sortie DESC";
        mysqlConnection.query(sql, (err, rows, fields) => {
            sorti = rows;

            var sql = "select * from entree where date >= '" + day + "' and date <= '" + days + "'  ORDER BY id_entree DESC ";
            mysqlConnection.query(sql, (err, rows, fields) => {
                entree = rows;

                var sql = "select * from sortie where date >= '" + hier + "' and date <= '" + hiers + "'   ORDER BY id_sortie DESC ";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    sortih = rows;
                    var sql = "select * from commande where date >= '" + hier + "' and date <= '" + hiers + "'   ORDER BY id_entree DESC ";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        entreeh = rows;

                        res.render('bilan/bilan', {
                            sorti,
                            entree,
                            sortih,
                            entreeh

                        })
                    })
                })
            })
        });
    }
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

// app.get('/admin/client', (req, res) => {
//     res.render('clients_admin')
// });
//
// app.get('/receptioniste/facture', (req, res) => {
//     var nom;
//     var row;
//     var sql = "select * from facture ";
//     mysqlConnection.query(sql, (err, rows, fields) => {
//
//
//         row = rows;
//         var l = rows.length;
//         if (l >= 1) {
//             var sql = "select nom from client ";
//             mysqlConnection.query(sql, (err, rows, fields) => {
//
//
//                 nom = rows;
//                 var l = rows.length;
//
//                 res.render('facture.ejs', {
//                     row,
//                     nom,
//                     l
//                 })
//             })
//         } else {
//             res.render('facture_admin.ejs', {
//                 l
//             })
//         }
//     })
//
// });



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
            var sql = "select ch.prix,c.id_chambre,c.id_client,ch.status from chambreclient c, chambre ch where c.id_chambre=ch.id_chambre ORDER BY id_client DESC";
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
            var sql = "select * from chambre INNER JOIN chambreclient ON   chambre.id_chambre = chambreclient.id_chambre order by id_client asc";
            // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
            // AND client.id_client = chambreclient.id_client;";
            mysqlConnection.query(sql, (err, rows, fields) => {
                chambre = rows;
                var sql = "select * from chambre order by id_chambre asc";
                mysqlConnection.query(sql, (err, rows, fields) => {
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
                var sql = "select * from chambre INNER JOIN chambreclient ON   chambre.id_chambre = chambreclient.id_chambre order by id_client asc";
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



// app.get('/client/rechercher', (req, res) => {
//     var cni = req.query.rechercher;
//
//
//     var sql = "SELECT * FROM client WHERE client.cni = " + cni + "";
//     mysqlConnection.query(sql, (err, rows, fields) => {
//         var Infos = rows;
//         var alert;
//         // res.json({msg: 'success', data: Infos});
//         res.json({ Infos, alert });
//         // return res.end(JSON.stringify(Infos));
//     });
// });


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
            
          
            if (typeof infos!= 'undefined') {
                var sql = "SELECT * FROM infosclient WHERE id_client = " + infos[0].id_client + "";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    infosclient = rows;
                   
                var sql = "select * from chambre where status = 'libre'";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    row = rows;
                    res.render('enregistrer/modifier', {
                        row,
                        infos,
                        infosclient,
                        alert
                    });


                });
            });
            } else {
                var sql = "select * from chambre where status = 'libre'";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    row = rows;
                    res.render('enregistrer/erreurs');
                })
            }
        })
      
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

        var f = new String(req.body.date)
        var h = f.slice(8, 10) - 1;
        let hier = f.slice(0, 7) + "-" + h + " 00:00:00";
        let hiers = f.slice(0, 7) + "-" + h + " 23:59:59";

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
                                // if (role == 'admin') {
                                    // console.log('addmin'); exit();
                                    req.session.username = userData[0].nom;
                                    req.session.userid = userData[0].id_user;
                                    req.session.role = role;
                                    var sql = "select * from client order by id_client asc";
                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                        client = rows;
                                        var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                                        // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                                        // AND client.id_client = chambreclient.id_client;";

                                        mysqlConnection.query(sql, (err, rows, fields) => {
                                            chambre = rows;
                                            var sql = "select * from chambre order by id_chambre asc";
                                            mysqlConnection.query(sql, (err, rows, fields) => {
                                                sess = req.session;
                                                chambrec = rows;
                                                var message = '';
                                                if (req.session.role == 'admin') {
                                                    res.render('client/admin_client', {
                                                        client,
                                                        chambre,
                                                        chambrec,
                                                        message
                                                    });
                                                }
                                                if (req.session.role == 'receptioniste') {
                                                    res.render('client/client', {
                                                        client,
                                                        chambre,
                                                        chambrec,
                                                        message
                                                    });
                                                }
                                                    // console.log(req.session);

                                            })
                                        })
                                    })
                                // }
                                // if (role == 'receptioniste') {
                                //     req.session.username = userData[0].nom;
                                //     req.session.userid = userData[0].id_user;
                                //     req.session.role = role;
                                //     var sql = "select * from client order by id_client asc";
                                //     mysqlConnection.query(sql, (err, rows, fields) => {
                                //         client = rows;
                                //         var sql = "select * from chambre INNER JOIN chambreclient ON   chambre.id_chambre = chambreclient.id_chambre where chambreclient.status = 1 order by id_client asc";
                                //         // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                                //         // AND client.id_client = chambreclient.id_client;";
                                //         mysqlConnection.query(sql, (err, rows, fields) => {
                                //             chambre = rows;
                                //             var sql = "select * from chambre order by id_chambre asc";
                                //             mysqlConnection.query(sql, (err, rows, fields) => {
                                //                 sess = req.session;
                                //                 chambrec = rows;
                                //                 var message = '';
                                //                 // console.log(req.session);
                                //                 res.render('client/client', {
                                //                     client,
                                //                     chambre,
                                //                     chambrec,
                                //                     message
                                //                 });
                                //             })
                                //         })
                                //     })
                                // }
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
app.post('/receptioniste/client/ajouter', urlencodedParser, [
    check('nom', 'le nom minimun 3 lettre')
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
    .isLength({ min: 8, max: 14 }),



], (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
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
        console.log(req.body);
        let date = Date.now();
        let Days = new Date(date);

        let hour = Days.getHours();
        let minute = Days.getMinutes();
        let second = Days.getSeconds();
        var compt =0;
        const PRIX =[];
        var IDCHAMBRE =[];
        const TPRIX =[req.body.montant];
        const TIDCHAMBRE = [ req.body.chambre];
        let tch=0;
        TIDCHAMBRE.forEach(ch => {
            IDCHAMBRE[compt] = ch[compt];
            compt ++;
            tch++;
        });
        compt =0;
        let tp =0;
        TPRIX.forEach(ch => {
                tp ++;
            PRIX[compt] = ch[compt];
            compt ++;
        });
        console.log(PRIX, IDCHAMBRE);
		
        //let clientD = year + "-" + month + "-" + day ;
        toDay = Days.toISOString().slice(0, 10) + " " + hour + ":" + minute + ":" + second;

        var nbchambre = PRIX.length;
        var nbmontant = IDCHAMBRE.length;
        const userid = req.session.userid; console.log(nbchambre,nbmontant);

        var sql  = "SELECT * FROM client WHERE cni = " + req.body.cni + "";
                mysqlConnection.query(sql, (err, rows, fields) => {
var infos=rows;

if ( infos.length>= 1) {
    console.log('cni verifier');
    

                    console.log(req.body.chambre)
                    if (req.body.chambre.length>2) {
                        console.log(req.body.chambre.length);
                        const alert = errors.array()
                        var sql = "select * from chambre where status = 'libre'";
                        mysqlConnection.query(sql, (err, rows, fields) => {
                            row = rows;
                            res.render('enregistrer/errors', {
                                row,
                                alert
                            })
                        })
                    }else if(req.body.chambre.length<=2){

                        console.log(infos[0].id_client)
                        if (req.body.date_arrive<=req.body.date_depart) {
            
        
                            var sql="UPDATE `infosclient` SET  `destination` = '" + req.body.destination + "',`transport` ='" + req.body.transport + "', `nbpersonne` = " + req.body.nbpersonne + ", `date_arrive` = '" + req.body.date_arrive + "', `date_depart` = '" + req.body.date_depart + "' WHERE `infosclient`.`id_client` = "+infos[0].id_client+"";
mysqlConnection.query(sql, (err, rows, fields) => {
  var  id_client= infos[0].id_client;
    var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values(" + req.session.userid + ",'enregistrement  client : "+ req.body.nom +" nationalite : " + req.body.prenom + " CNI : " + req.body.cni + "',"+id_client+","+null+","+null+","+null+","+null+","+null+",'" + toDay + "')";
                    mysqlConnection.query(sql, (err, rows, fields) => {})
                    const insertid = id_client;              
                                        
                                
                                
                               
                                var i=0;
                             
                                  
                              
                                
                                    req.body.chambre.forEach(r=>{
                                        var sql = "select * from chambre where id_chambre = "  + req.body.chambre[i]+ " ";
                                       
                                        mysqlConnection.query(sql, (err, rows, fields) => {
                                            if(rows.length>=1){
                                           
                                            if (rows[0].categorie === 'chambre standart') {
                                                if (i<=req.body.montant.length) {
                                                    i=i-1;
                                                }
                                                if (req.body.montant[i] >= 15000) {
                                                    var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date) values( "  + insertid + "," + req.body.chambre[i] + ",'" + 1 + "'," + req.body.montant[i] + ",'" + toDay +  "')";
                                                    console.log(sql);
                                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                                        var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values(" + req.session.userid + ",'enregistrement  chambre',"+null+","+null+","+null+","+null+","+null+","+req.body.chambre[i]+",'" + toDay + "')";
                                                        mysqlConnection.query(sql, (err, rows, fields) => {})
                                            })
                                                    var sql = "UPDATE  chambre SET status = 'occupé' WHERE id_chambre = " +  req.body.chambre[i] ;
                                                    console.log(sql);
                                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                                       
                                                    })
                                                   
                                                } else {
                                                    
                                                    var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date) values( "  + insertid + "," + req.body.chambre[i] + ",\'' + 1 + '\'," + req.montant.body[i] + ",'" + toDay +  "')";
                                                    console.log(sql);
                                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                                        var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values(" + req.session.userid + ",'enregistrement  chambre',"+null+","+null+","+null+","+null+","+null+","+req.body.chambre[i]+",'" + toDay + "')";
                                                             mysqlConnection.query(sql, (err, rows, fields) => {})
                                            })
                                                    var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + req.body.chambre[i] + "";
                                                    console.log(sql);
                                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                                       
                                                    })
                                                }
                                            }
                                            
                                            if (rows[0].categorie === 'chambre confort' ) {
                                                
                                                if (i<=req.body.montant.length) {
                                                    i=i-1;
                                                }
                                                console.log(i);
                                                 if (req.body.montant[i] >= 20000) {
                                                     
                                                     var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date) values( "  + insertid + "," + req.body.chambre[i] + ",'" + 1 + "'," + req.body.montant[i] + ",'" + toDay +  "')";
                                                    
                                                     mysqlConnection.query(sql, (err, rows, fields) => {
                                                       
                                                        
                                                        var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values(" + req.session.userid + ",'enregistrement  chambre',"+null+","+null+","+null+","+null+","+null+","+req.body.chambre[i]+",'" + toDay + "')";
                                                             mysqlConnection.query(sql, (err, rows, fields) => {})
                                                        
                                                     })
                                                     var sql = "UPDATE chambre SET status = 'occupé' WHERE id_chambre =" + req.body.chambre[i] ;
                                                     mysqlConnection.query(sql, (err, rows, fields) => {})
                                                 } else {
                                                     var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date) values( "  + insertid + "," + req.body.chambre[i] + ",'" + 0 + "'," + req.body.montant[i] + ",'" + toDay +  "')";
                                                    
                                                     mysqlConnection.query(sql, (err, rows, fields) => {
                                                        var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values(" + req.session.userid + ",'enregistrement  chambre',"+null+","+null+","+null+","+null+","+null+","+req.body.chambre[i]+",'" + toDay + "')";
                                                        mysqlConnection.query(sql, (err, rows, fields) => {})
                                                     })
                                                     var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + req.body.chambre[i] + "";
                                                    
                                                     mysqlConnection.query(sql, (err, rows, fields) => {})
                                                 }
                                             }
                                            // && rows[0].id_chambre == IDCHAMBRE[i]
                                            if (rows[0].categorie === 'salle de reunion' ) {
                                                if (i<=req.body.montant.length) {
                                                    i=i-1;
                                                }
                                                if (req.body.montant[i] == 35000 || req.body.montant[i] == 150000) {
                                                    var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date) values( "  + insertid + "," + req.body.chambre[i] + ",'" + 1 + "'," + req.body.montant[i] + ",'" + toDay +  "')";
                                                   
                                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                                       
                                                        var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values(" + req.session.userid + ",'enregistrement  chambre',"+null+","+null+","+null+","+null+","+null+","+req.body.chambre[i]+",'" + toDay + "')";
                                                        mysqlConnection.query(sql, (err, rows, fields) => {})
                                                    })
                                                    var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + req.body.chambre[i] + "";
                                                    
                                                    mysqlConnection.query(sql, (err, rows, fields) => {})
                                                } else {
                                                    var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date) values( "  + insertid + "," + req.body.chambre[i] + ",'" + 0 + "'," + req.body.montant[i] + ",'" + toDay +  "')";
                                                   
                                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                                        var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values(" + req.session.userid + ",'enregistrement  chambre',"+null+","+null+","+null+","+null+","+null+","+req.body.chambre[i]+",'" + toDay + "')";
                                                             mysqlConnection.query(sql, (err, rows, fields) => {})
                                                    })
                                                    var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + req.body.chambre[i] + "";
                                                   
                                                    mysqlConnection.query(sql, (err, rows, fields) => {})
                                                }
                                            }
                    
                                            if (rows[0].categorie === 'suite') {
                                                if (i<=req.body.montant.length) {
                                                    i=i-1;
                                                }
                                                if (req.body.montant[i] >= 35000) {
                                                    var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date) values( "  + insertid + "," + req.body.chambre[i] + ",'" + 1 + "'," + req.body.montant[i] + ",'" + toDay +  "')";
                                                  
                                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                                        var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values(" + req.session.userid + ",'enregistrement  chambre',"+null+","+null+","+null+","+null+","+null+","+req.body.chambre[i]+",'" + toDay + "')";
                                                             mysqlConnection.query(sql, (err, rows, fields) => {})
                                            })
                                                    var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + req.body.chambre[i] + "";
                                                   
                                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                                        
                                                    })
                                                } else {
                                                    var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date) values( "  + insertid + "," + req.body.chambre[i] + ",'" + 0 + "'," + req.body.montant[i] + ",'" + toDay +  "')";
                                                   
                                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                                        var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values(" + req.session.userid + ",'enregistrement  chambre',"+null+","+null+","+null+","+null+","+null+","+req.body.chambre[i]+",'" + toDay + "')";
                                                        mysqlConnection.query(sql, (err, rows, fields) => {})
                                            })
                                                    var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + req.body.chambre[i] + "";
                                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                                       
                                                    })
                                                }
                                            }
                                        }
                                        })
                                        i=i+1;
                                    
                                    })
                                
                
                                
                                   
                               
                                        if (req.session.role === 'admin') {
                                            
                                            var message = 'client enregitré avec succès';
                                            var sql = "select * from client order by id_client asc";
                                            mysqlConnection.query(sql, (err, rows, fields) => {
                                                client = rows;
                                                var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                
                                                mysqlConnection.query(sql, (err, rows, fields) => {
                                                    chambre = rows;
                                                    var sql = "select * from chambre order by id_chambre asc";
                                                    mysqlConnection.query(sql, (err, rows, fields) => {
                
                                                        chambrec = rows;
                                                        var message = '';
                                                        // console.log(req.session);
                                                        res.render('client/admin_client', {
                                                            client,
                                                            chambre,
                                                            chambrec,
                                                            message
                                                        });
                                                    })
                                                })
                                            })
                                        }
                                        if (req.session.role === 'receptionniste') {
                                            var message = 'client enregitré avec succès';
                                            var sql = "select * from client order by id_client asc";
                                            mysqlConnection.query(sql, (err, rows, fields) => {
                                                client = rows;
                                                var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                
                
                                                mysqlConnection.query(sql, (err, rows, fields) => {
                                                    chambre = rows;
                                                    var sql = "select * from chambre order by id_chambre asc";
                                                    mysqlConnection.query(sql, (err, rows, fields) => {
                
                                                        chambrec = rows;
                                                        // console.log(req.session);
                                                        res.render('client/client', {
                                                            client,
                                                            chambre,
                                                            chambrec,
                                                            message
                                                        });
                                                    })
                                                })
                                            })
                                        }
                                    })
                        }else{
                            var sql = "select * from chambre where status = 'libre'";
                            mysqlConnection.query(sql, (err, rows, fields) => {
                                row = rows;
                                var alert;
                                res.render('enregistrer/error', {
                                    row,
                                    alert
                                })
                            })
                        }
                        
                    }


}else{
    console.log('cni pas verifier');
    console.log(req.body.chambre)
    if (req.body.chambre.length>2) {
        console.log(req.body.chambre.length)
        const alert = errors.array()
        var sql = "select * from chambre where status = 'libre'";
        mysqlConnection.query(sql, (err, rows, fields) => {
            row = rows;
            res.render('enregistrer/errors', {
                row,
                alert
            })
        })
    }else if(req.body.chambre.length<=2){
        console.log(req.body.chambre.length)
        if (req.body.date_arrive<=req.body.date_depart) {
            
        
            var sql = "insert into client(nom,prenom,tel,cni,date_del,lieu_del,date_nais,lieu_nais,date_ajout) values( '"  + req.body.nom + "','" + req.body.prenom + "', "+ req.body.phone + "," + req.body.cni + ",'" + req.body.date_del + "','" + req.body.lieu_del + "','" + req.body.date_nais + "','" + req.body.lieu_nais + "','" + toDay + "')";
            let statut = 0;
            mysqlConnection.query(sql, (err, rows, fields) => {
                
                
                var sql = "select * from client order by id_client asc";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    var id_client=0;
                    rows.forEach(r=>{
id_client=r.id_client;
                    })
                    const insertid = id_client;
                    var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values(" + req.session.userid + ",'enregistrement  client : "+ req.body.nom +" nationalite : " + req.body.prenom + " CNI : " + req.body.cni + "',"+id_client+","+null+","+null+","+null+","+null+","+null+",'" + toDay + "')";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                       
                        
                
                var sql = "insert into infosclient(pays,nationalite,profession,destination,transport,nbpersonne,date_arrive,date_depart,date_ajout,id_client) values( '" + req.body.pays + "','" + req.body.nationalite + "','" + req.body.profession + "','" + req.body.destination + "','" + req.body.transport + "'," + req.body.nbpersonne + ",'" + req.body.date_arrive + "','" + req.body.date_depart + "','" + toDay + "',"+ insertid +  ")";
                mysqlConnection.query(sql, (err, rows, fields) => {
                   
                    var sql = "select * from infosclient order by id_infosclient asc";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    var id_infos=0;
                    rows.forEach(r=>{
id_infos=r.id_infosclient;
                    })
                    var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values(" + req.session.userid + ",'enregistrement infos client : "+ req.body.pays +" nationalite : " + req.body.nationalite + " profession : " + req.body.profession + "',null,null,null,null,"+id_infos+",null,'" + toDay + "')";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                   
                })
            })
        })
               
                var i=0;
             
                  
              
                
                    req.body.chambre.forEach(r=>{
                        var sql = "select * from chambre where id_chambre = "  + req.body.chambre[i]+ " ";
                       
                        mysqlConnection.query(sql, (err, rows, fields) => {
                            if(rows.length>=1){
                           
                            if (rows[0].categorie === 'chambre standart') {
                                if (i<=req.body.montant.length) {
                                    i=i-1;
                                }
                                if (req.body.montant[i] >= 15000) {
                                    var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date) values( "  + insertid + "," + req.body.chambre[i] + ",'" + 1 + "'," + req.body.montant[i] + ",'" + toDay +  "')";
                                    console.log(sql);
                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                        var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values(" + req.session.userid + ",'enregistrement  chambre',"+null+","+null+","+null+","+null+","+null+","+req.body.chambre[i]+",'" + toDay + "')";
                                        mysqlConnection.query(sql, (err, rows, fields) => {})
                            })
                                    var sql = "UPDATE  chambre SET status = 'occupé' WHERE id_chambre = " +  req.body.chambre[i] ;
                                    console.log(sql);
                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                       
                                    })
                                   
                                } else {
                                    
                                    var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date) values( "  + insertid + "," + req.body.chambre[i] + ",\'' + 1 + '\'," + req.montant.body[i] + ",'" + toDay +  "')";
                                    console.log(sql);
                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                        var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values(" + req.session.userid + ",'enregistrement  chambre',"+null+","+null+","+null+","+null+","+null+","+req.body.chambre[i]+",'" + toDay + "')";
                                             mysqlConnection.query(sql, (err, rows, fields) => {})
                            })
                                    var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + req.body.chambre[i] + "";
                                    console.log(sql);
                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                       
                                    })
                                }
                            }
                            
                            if (rows[0].categorie === 'chambre confort' ) {
                                
                                if (i<=req.body.montant.length) {
                                    i=i-1;
                                }
                                console.log(i);
                                 if (req.body.montant[i] >= 20000) {
                                     
                                     var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date) values( "  + insertid + "," + req.body.chambre[i] + ",'" + 1 + "'," + req.body.montant[i] + ",'" + toDay +  "')";
                                    
                                     mysqlConnection.query(sql, (err, rows, fields) => {
                                       
                                        
                                        var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values(" + req.session.userid + ",'enregistrement  chambre',"+null+","+null+","+null+","+null+","+null+","+req.body.chambre[i]+",'" + toDay + "')";
                                             mysqlConnection.query(sql, (err, rows, fields) => {})
                                        
                                     })
                                     var sql = "UPDATE chambre SET status = 'occupé' WHERE id_chambre =" + req.body.chambre[i] ;
                                     mysqlConnection.query(sql, (err, rows, fields) => {})
                                 } else {
                                     var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date) values( "  + insertid + "," + req.body.chambre[i] + ",'" + 0 + "'," + req.body.montant[i] + ",'" + toDay +  "')";
                                    
                                     mysqlConnection.query(sql, (err, rows, fields) => {
                                        var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values(" + req.session.userid + ",'enregistrement  chambre',"+null+","+null+","+null+","+null+","+null+","+req.body.chambre[i]+",'" + toDay + "')";
                                        mysqlConnection.query(sql, (err, rows, fields) => {})
                                     })
                                     var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + req.body.chambre[i] + "";
                                    
                                     mysqlConnection.query(sql, (err, rows, fields) => {})
                                 }
                             }
                            // && rows[0].id_chambre == IDCHAMBRE[i]
                            if (rows[0].categorie === 'salle de reunion' ) {
                                if (i<=req.body.montant.length) {
                                    i=i-1;
                                }
                                if (req.body.montant[i] == 35000 || req.body.montant[i] == 150000) {
                                    var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date) values( "  + insertid + "," + req.body.chambre[i] + ",'" + 1 + "'," + req.body.montant[i] + ",'" + toDay +  "')";
                                   
                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                       
                                        var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values(" + req.session.userid + ",'enregistrement  chambre',"+null+","+null+","+null+","+null+","+null+","+req.body.chambre[i]+",'" + toDay + "')";
                                        mysqlConnection.query(sql, (err, rows, fields) => {})
                                    })
                                    var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + req.body.chambre[i] + "";
                                    
                                    mysqlConnection.query(sql, (err, rows, fields) => {})
                                } else {
                                    var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date) values( "  + insertid + "," + req.body.chambre[i] + ",'" + 0 + "'," + req.body.montant[i] + ",'" + toDay +  "')";
                                   
                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                        var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values(" + req.session.userid + ",'enregistrement  chambre',"+null+","+null+","+null+","+null+","+null+","+req.body.chambre[i]+",'" + toDay + "')";
                                             mysqlConnection.query(sql, (err, rows, fields) => {})
                                    })
                                    var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + req.body.chambre[i] + "";
                                   
                                    mysqlConnection.query(sql, (err, rows, fields) => {})
                                }
                            }
    
                            if (rows[0].categorie === 'suite') {
                                if (i<=req.body.montant.length) {
                                    i=i-1;
                                }
                                if (req.body.montant[i] >= 35000) {
                                    var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date) values( "  + insertid + "," + req.body.chambre[i] + ",'" + 1 + "'," + req.body.montant[i] + ",'" + toDay +  "')";
                                  
                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                        var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values(" + req.session.userid + ",'enregistrement  chambre',"+null+","+null+","+null+","+null+","+null+","+req.body.chambre[i]+",'" + toDay + "')";
                                             mysqlConnection.query(sql, (err, rows, fields) => {})
                            })
                                    var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + req.body.chambre[i] + "";
                                   
                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                        
                                    })
                                } else {
                                    var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date) values( "  + insertid + "," + req.body.chambre[i] + ",'" + 0 + "'," + req.body.montant[i] + ",'" + toDay +  "')";
                                   
                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                        var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values(" + req.session.userid + ",'enregistrement  chambre',"+null+","+null+","+null+","+null+","+null+","+req.body.chambre[i]+",'" + toDay + "')";
                                        mysqlConnection.query(sql, (err, rows, fields) => {})
                            })
                                    var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + req.body.chambre[i] + "";
                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                       
                                    })
                                }
                            }
                        }
                        })
                        i=i+1;
                    
                    })
                

                
                   
               
                        if (req.session.role === 'admin') {
                            
                            var message = 'client enregitré avec succès';
                            var sql = "select * from client order by id_client asc";
                            mysqlConnection.query(sql, (err, rows, fields) => {
                                client = rows;
                                var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";

                                mysqlConnection.query(sql, (err, rows, fields) => {
                                    chambre = rows;
                                    var sql = "select * from chambre order by id_chambre asc";
                                    mysqlConnection.query(sql, (err, rows, fields) => {

                                        chambrec = rows;
                                        var message = '';
                                        // console.log(req.session);
                                        res.render('client/admin_client', {
                                            client,
                                            chambre,
                                            chambrec,
                                            message
                                        });
                                    })
                                })
                            })
                        }
                        if (req.session.role === 'receptionniste') {
                            var message = 'client enregitré avec succès';
                            var sql = "select * from client order by id_client asc";
                            mysqlConnection.query(sql, (err, rows, fields) => {
                                client = rows;
                                var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";


                                mysqlConnection.query(sql, (err, rows, fields) => {
                                    chambre = rows;
                                    var sql = "select * from chambre order by id_chambre asc";
                                    mysqlConnection.query(sql, (err, rows, fields) => {

                                        chambrec = rows;
                                        // console.log(req.session);
                                        res.render('client/client', {
                                            client,
                                            chambre,
                                            chambrec,
                                            message
                                        });
                                    })
                                })
                            })
                        }
                   
            })
        })
            })
        }else{
            var sql = "select * from chambre where status = 'libre'";
            mysqlConnection.query(sql, (err, rows, fields) => {
                row = rows;
                var alert;
                res.render('enregistrer/error', {
                    row,
                    alert
                })
            })
        }
        
    }
        
        }
    })
    }

});
//modifer client
app.post('/receptioniste/client/modifier', urlencodedParser, [
    check('nom', 'le nom minimun 3 lettre')
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
    .isLength({ min: 8, max: 14 }),
    check('id_client', '')
    .exists(),



], (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
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
        const PRIX = req.body.montant;
        const IDCHAMBRE = req.body.chambre;
        //let clientD = year + "-" + month + "-" + day ;
        toDay = Days.toISOString().slice(0, 10) + " " + hour + ":" + minute + ":" + second;
        var nbchambre = req.body.chambre.length;
        var nbmontant = req.body.montant.length;
        const userid = req.session.userid;
        if (nbchambre === nbchambre && nbchambre > 0) {
            const insertid = req.body.id_client;
            var sql = "update  client set nom=  " + '\'' + req.body.nom + '\'' + " where id_client = " + '\'' + insertid + '\'' + ")";
            let statut = 0;
            mysqlConnection.query(sql, (err, rows, fields) => {
                console.log(err);

                statut++;
                for (var i = 0; i < nbchambre; i++) {
                    var sql = "select * from chambre where id_chambre = " + IDCHAMBRE[i] + "";
                    
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        if (rows[0].categorie === 'chambre standart' && rows[0].id_chambre == IDCHAMBRE[i]) {
                            statut++;
                            if (PRIX[i] >= 15000) {
                                var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date , id_user) values( " + '\'' + insertid + '\',\'' + IDCHAMBRE[i] + '\',\'' + 1 + '\',\'' + PRIX[i] + '\',\'' + toDay + '\',\'' + userid + '\'' + ")";
                                mysqlConnection.query(sql, (err, rows, fields) => {})
                                var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + IDCHAMBRE[i] + "";
                                mysqlConnection.query(sql, (err, rows, fields) => {})
                            } else {
                                var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date , id_user) values( " + '\'' + insertid + '\',\'' + IDCHAMBRE[i] + '\',\'' + 0 + '\',\'' + PRIX[i] + '\',\'' + toDay + '\',\'' + userid + '\'' + ")";
                                mysqlConnection.query(sql, (err, rows, fields) => {})
                                var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + IDCHAMBRE[i] + "";
                                mysqlConnection.query(sql, (err, rows, fields) => {})
                            }
                        }
                        if (rows[0].categorie === 'chambre confort' && rows[0].id_chambre == IDCHAMBRE[i]) {
                            if (PRIX[i] >= 20000) {
                                var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date , id_user) values( " + '\'' + insertid + '\',\'' + IDCHAMBRE[i] + '\',\'' + 1 + '\',\'' + PRIX[i] + '\',\'' + toDay + '\',\'' + userid + '\'' + ")";
                                mysqlConnection.query(sql, (err, rows, fields) => {})
                                var sql = "UPDATE chambre SET status = 'occupé' WHERE id_chambre =" + '\'' + IDCHAMBRE[i] + '\'' + "";
                                mysqlConnection.query(sql, (err, rows, fields) => {})
                            } else {
                                var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date , id_user) values( " + '\'' + insertid + '\',\'' + IDCHAMBRE[i] + '\',\'' + 0 + '\',\'' + PRIX[i] + '\',\'' + toDay + '\',\'' + userid + '\'' + ")";
                                mysqlConnection.query(sql, (err, rows, fields) => {})
                                var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + IDCHAMBRE[i] + "";
                                mysqlConnection.query(sql, (err, rows, fields) => {})
                            }
                        }
                        if (rows[0].categorie === 'salle de reunion' && rows[0].id_chambre == IDCHAMBRE[i]) {
                            if (PRIX[i] == 35000 || PRIX[i] == 150000) {
                                var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date , id_user) values( " + '\'' + insertid + '\',\'' + IDCHAMBRE[i] + '\',\'' + 1 + '\',\'' + PRIX[i] + '\',\'' + toDay + '\',\'' + userid + '\'' + ")";
                                mysqlConnection.query(sql, (err, rows, fields) => {})
                                var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + IDCHAMBRE[i] + "";
                                mysqlConnection.query(sql, (err, rows, fields) => {})
                            } else {
                                var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date , id_user) values( " + '\'' + insertid + '\',\'' + IDCHAMBRE[i] + '\',\'' + 0 + '\',\'' + PRIX[i] + '\',\'' + toDay + '\',\'' + userid + '\'' + ")";
                                mysqlConnection.query(sql, (err, rows, fields) => {})
                                var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + IDCHAMBRE[i] + "";
                                mysqlConnection.query(sql, (err, rows, fields) => {})
                            }
                        }

                        if (rows[0].categorie === 'suite' && rows[0].id_chambre == IDCHAMBRE[i]) {
                            if (PRIX[i] >= 35000) {
                                var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date , id_user) values( " + '\'' + insertid + '\',\'' + IDCHAMBRE[i] + '\',\'' + 1 + '\',\'' + PRIX[i] + '\',\'' + toDay + '\',\'' + userid + '\'' + ")";
                                mysqlConnection.query(sql, (err, rows, fields) => {})
                                var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + IDCHAMBRE[i] + "";
                                mysqlConnection.query(sql, (err, rows, fields) => {})
                            } else {
                                var sql = "insert into chambreclient(id_client, id_chambre, status_ch,montant,date , id_user) values( " + '\'' + insertid + '\',\'' + IDCHAMBRE[i] + '\',\'' + 0 + '\',\'' + PRIX[i] + '\',\'' + toDay + '\',\'' + userid + '\'' + ")";
                                mysqlConnection.query(sql, (err, rows, fields) => {})
                                var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = " + IDCHAMBRE[i] + "";
                                mysqlConnection.query(sql, (err, rows, fields) => {})
                            }
                        }
                        var sql = "select * from client order by id_client asc";
                        mysqlConnection.query(sql, (err, rows, fields) => {
                            let client = rows;
                            var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                            // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                            // AND client.id_client = chambreclient.id_client;";

                            mysqlConnection.query(sql, (err, rows, fields) => {
                                let chambre = rows;
                                var sql = "select * from chambre order by id_chambre asc";
                                mysqlConnection.query(sql, (err, rows, fields) => {
                                    sess = req.session;
                                    let chambrec = rows;
                                    var message = 'Effectué avec succés';
                                    if (req.session.role == 'admin') {
                                        res.render('client/admin_client', {
                                            client,
                                            chambre,
                                            chambrec,
                                            message
                                        });
                                    }
                                    if (req.session.role == 'receptioniste') {
                                        res.render('client/client', {
                                            client,
                                            chambre,
                                            chambrec,
                                            message
                                        });
                                    }
                                    // console.log(req.session);

                                })
                            })
                        })
                        // if (req.session.role === 'admin') {
                        //     var message = 'client enregitré avec succès';
                        //     var sql = "select * from client ORDER BY id_client ASC";
                        //     mysqlConnection.query(sql, (err, rows, fields) => {
                        //         client = rows;
                        //         var sql = "select * from chambre INNER JOIN chambreclient ON   chambre.id_chambre = chambreclient.id_chambre  ORDER BY id_client ASC";
                        //         mysqlConnection.query(sql, (err, rows, fields) => {
                        //             chambre = rows;
                        //             res.render('client/admin_client', {
                        //                 client,
                        //                 chambre,
                        //                 message
                        //             });
                        //         })
                        //     })
                        // }
                        // if (req.session.role === 'receptionniste') {
                        //     var sql = "select * from client ORDER BY id_client ASC";
                        //     var message = 'client enregitré avec succès';
                        //     mysqlConnection.query(sql, (err, rows, fields) => {
                        //         client = rows;
                        //         var sql = "select * from chambre INNER JOIN chambreclient ON   chambre.id_chambre = chambreclient.id_chambre  ORDER BY id_client ASC";
                        //         mysqlConnection.query(sql, (err, rows, fields) => {
                        //             chambre = rows;
                        //             res.render('client/admin_client', {
                        //                 client,
                        //                 chambre,
                        //                 message
                        //             });
                        //         })
                        //     })
                        // }
                    })

                }
            })
        } else {
            res.send("Vous avez mal saise les champs du formulaire")
        }

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
    check('montant', 'entrer un montant')
    .exists()
    .isLength({ min: 3 }),
    check('poste', 'entrer un montant')
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
        toDay = Days.toISOString().slice(0, 10);
        Tdivers =0, Tlinge = 0; Tbar = 0; TpetitD = 0; Trestaurant =0;
        var sql = "select * from entree where date='"+toDay+"'";
        mysqlConnection.query(sql, (err, rows, fields) => {
var prix=new Number(req.body.montant);

            if (rows.length>=1) {
                var id=rows[0].id_entree;
                rows.forEach(r=>{
                   
                        
                        var prix1=new Number(r.prix);

                switch (req.body.poste ) {
                   
                    case 'Restaurant':
                        Trestaurant =r.restaurant+prix;
                        var sql= "UPDATE `entree` SET  `restaurant` = " + Trestaurant + " WHERE `entree`.`date`= '" + toDay  + "'";
           mysqlConnection.query(sql, (err, rows, fields) => {
            var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values('" + req.session.userid + "','enregistrement  commande "+req.body.poste+" montant "+req.body.montant+"',"+null+","+null+","+null+","+id+","+null+","+null+",'" + toDay + "')";
            mysqlConnection.query(sql, (err, rows, fields) => {
                var sql = "select * from client order by id_client asc";
            mysqlConnection.query(sql, (err, rows, fields) => {
                client = rows;
                var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                // AND client.id_client = chambreclient.id_client;";

                mysqlConnection.query(sql, (err, rows, fields) => {
                    chambre = rows;
                    var sql = "select * from chambre order by id_chambre asc";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        sess = req.session;
                        chambrec = rows;
                        var message = '';
                        // console.log(req.session);
                        if (req.session.role == 'admin') {
                            res.render('client/admin_client', {
                                client,
                                chambre,
                                chambrec,
                                message
                            });
                        }
                        if (req.session.role == 'receptioniste') {
                            res.render('client/client', {
                                client,
                                chambre,
                                chambrec,
                                message
                            });
                        }
                        // res.render('client/admin_client', {
                        //     client,
                        //     chambre,
                        //     chambrec,
                        //     message
                        // });
                    })
                })
            })
            })
           })
                        break;
                        case 'Hebergement':
                            TpetitD =r.hebergement+prix;
                            var sql= "UPDATE `entree` SET  `hebergement` = " + TpetitD + " WHERE `entree`.`date`= '" + toDay  + "'";
           mysqlConnection.query(sql, (err, rows, fields) => {
            var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values('" + req.session.userid + "','enregistrement  commande "+req.body.poste+" montant "+req.body.montant+"',"+null+","+null+","+null+","+id+","+null+","+null+",'" + toDay + "')";
            mysqlConnection.query(sql, (err, rows, fields) => {
                var sql = "select * from client order by id_client asc";
            mysqlConnection.query(sql, (err, rows, fields) => {
                client = rows;
                var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                // AND client.id_client = chambreclient.id_client;";

                mysqlConnection.query(sql, (err, rows, fields) => {
                    chambre = rows;
                    var sql = "select * from chambre order by id_chambre asc";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        sess = req.session;
                        chambrec = rows;
                        var message = '';
                        // console.log(req.session);
                        if (req.session.role == 'admin') {
                            res.render('client/admin_client', {
                                client,
                                chambre,
                                chambrec,
                                message
                            });
                        }
                        if (req.session.role == 'receptioniste') {
                            res.render('client/client', {
                                client,
                                chambre,
                                chambrec,
                                message
                            });
                        }
                        // res.render('client/admin_client', {
                        //     client,
                        //     chambre,
                        //     chambrec,
                        //     message
                        // });
                    })
                })
            })
            })
           })
                            break;
                    case 'Bar':
                        Tbar = r.bar+prix;
                        var sql= "UPDATE `entree` SET  `bar` = " + Tbar + " WHERE `entree`.`date`= '" + toDay  + "'";
           mysqlConnection.query(sql, (err, rows, fields) => {
            var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values('" + req.session.userid + "','enregistrement  commande "+req.body.poste+" montant "+req.body.montant+"',"+null+","+null+","+null+","+id+","+null+","+null+",'" + toDay + "')";
            mysqlConnection.query(sql, (err, rows, fields) => {
                var sql = "select * from client order by id_client asc";
            mysqlConnection.query(sql, (err, rows, fields) => {
                client = rows;
                var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                // AND client.id_client = chambreclient.id_client;";

                mysqlConnection.query(sql, (err, rows, fields) => {
                    chambre = rows;
                    var sql = "select * from chambre order by id_chambre asc";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        sess = req.session;
                        chambrec = rows;
                        var message = '';
                        // console.log(req.session);
                        if (req.session.role == 'admin') {
                            res.render('client/admin_client', {
                                client,
                                chambre,
                                chambrec,
                                message
                            });
                        }
                        if (req.session.role == 'receptioniste') {
                            res.render('client/client', {
                                client,
                                chambre,
                                chambrec,
                                message
                            });
                        }
                        // res.render('client/admin_client', {
                        //     client,
                        //     chambre,
                        //     chambrec,
                        //     message
                        // });
                    })
                })
            })
            })
           })
                        break;
                   
                    case 'Divers':
                        Tdivers = r.divers+prix;
                        var sql= "UPDATE `entree` SET  `divers` = " + Tdivers + " WHERE `entree`.`date`= '" + toDay  + "'";
           mysqlConnection.query(sql, (err, rows, fields) => {
            var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values('" + req.session.userid + "','enregistrement  commande "+req.body.poste+" montant "+req.body.montant+"',"+null+","+null+","+null+","+id+","+null+","+null+",'" + toDay + "')";
            mysqlConnection.query(sql, (err, rows, fields) => {
                var sql = "select * from client order by id_client asc";
            mysqlConnection.query(sql, (err, rows, fields) => {
                client = rows;
                var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                // AND client.id_client = chambreclient.id_client;";

                mysqlConnection.query(sql, (err, rows, fields) => {
                    chambre = rows;
                    var sql = "select * from chambre order by id_chambre asc";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        sess = req.session;
                        chambrec = rows;
                        var message = '';
                        // console.log(req.session);
                        if (req.session.role == 'admin') {
                            res.render('client/admin_client', {
                                client,
                                chambre,
                                chambrec,
                                message
                            });
                        }
                        if (req.session.role == 'receptioniste') {
                            res.render('client/client', {
                                client,
                                chambre,
                                chambrec,
                                message
                            });
                        }
                        // res.render('client/admin_client', {
                        //     client,
                        //     chambre,
                        //     chambrec,
                        //     message
                        // });
                    })
                })
            })
            })
           })
                        break;
                    default: Tdivers =0, Tlinge = 0; Tbar = 0; TpetitD = 0; Trestaurant =0;
                }
           
            })
            
           
        }else{
            switch (req.body.poste ) {
                    
                case 'Restaurant':
                    Trestaurant =+prix;
                    break;
                case 'Bar':
                    Tbar = prix;;
                    break;
                    case 'Hebergement':
                        TpetitD =prix;
                        break;
                case 'Divers':
                    Tdivers = prix;;
                    break;
                default: Tdivers =0, Tlinge = 0; Tbar = 0; TpetitD = 0; Trestaurant =0;
            }
        
            var sql = "insert into entree(bar,restaurant,divers,hebergement,date) values(" + Tbar + "," + Trestaurant + "," + Tdivers + ","+TpetitD+",'" + toDay + "')";
            mysqlConnection.query(sql, (err, rows, fields) => {
                var sql = "select * from entree order by id_entree asc";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    var id_entree=0;
                    rows.forEach(r=>{
    id_entree=r.id_entree;
                    })
                    var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values('" + req.session.userid + "','enregistrement  commande "+req.body.poste+" montant "+req.body.montant+"',"+null+","+null+","+null+","+id_entree+","+null+","+null+",'" + toDay + "')";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                var sql = "select * from client order by id_client asc";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    client = rows;
                    var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                    // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                    // AND client.id_client = chambreclient.id_client;";
    
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        chambre = rows;
                        var sql = "select * from chambre order by id_chambre asc";
                        mysqlConnection.query(sql, (err, rows, fields) => {
                            sess = req.session;
                            chambrec = rows;
                            var message = '';
                            // console.log(req.session);
                            if (req.session.role == 'admin') {
                                res.render('client/admin_client', {
                                    client,
                                    chambre,
                                    chambrec,
                                    message
                                });
                            }
                            if (req.session.role == 'receptioniste') {
                                res.render('client/client', {
                                    client,
                                    chambre,
                                    chambrec,
                                    message
                                });
                            }
                            // res.render('client/admin_client', {
                            //     client,
                            //     chambre,
                            //     chambrec,
                            //     message
                            // });
                        })
                    })
                })
            })
        })
    })
        
        }
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
        toDay = Days.toISOString().slice(0, 10);



        Tdivers =0, Tlinge = 0; Tbar = 0; TpetitD = 0; Trestaurant =0;
        var sql = "select * from sortie where date='"+toDay+"'";
        mysqlConnection.query(sql, (err, rows, fields) => {
var prix=new Number(req.body.montant);

            if (rows.length>=1) {
                var id=rows[0].id_entree;
                rows.forEach(r=>{
               
                   
                        
                        
                switch (req.body.poste ) {
                    
                    case 'Restaurant':
                        Trestaurant =r.restaurant+prix;
                        var sql= "UPDATE `sortie` SET  `restaurant` = " + Trestaurant + " WHERE `sortie`.`date`= '" + toDay  + "'";
           mysqlConnection.query(sql, (err, rows, fields) => {
            var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values('" + req.session.userid + "','enregistrement  commande "+req.body.poste+" montant "+req.body.montant+"',"+null+","+null+","+null+","+id+","+null+","+null+",'" + toDay + "')";
            mysqlConnection.query(sql, (err, rows, fields) => {
                var sql = "select * from client order by id_client asc";
            mysqlConnection.query(sql, (err, rows, fields) => {
                client = rows;
                var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                // AND client.id_client = chambreclient.id_client;";

                mysqlConnection.query(sql, (err, rows, fields) => {
                    chambre = rows;
                    var sql = "select * from chambre order by id_chambre asc";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        sess = req.session;
                        chambrec = rows;
                        var message = '';
                        // console.log(req.session);
                        if (req.session.role == 'admin') {
                            res.render('client/admin_client', {
                                client,
                                chambre,
                                chambrec,
                                message
                            });
                        }
                        if (req.session.role == 'receptioniste') {
                            res.render('client/client', {
                                client,
                                chambre,
                                chambrec,
                                message
                            });
                        }
                        // res.render('client/admin_client', {
                        //     client,
                        //     chambre,
                        //     chambrec,
                        //     message
                        // });
                    })
                })
            })
            })
           })
                        break;
                        case 'Hebergement':
                            TpetitD =r.hebergement+prix;
                            var sql= "UPDATE `sortie` SET  `hebergement` = " + TpetitD + " WHERE `sortie`.`date`= '" + toDay  + "'";
           mysqlConnection.query(sql, (err, rows, fields) => {
            var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values('" + req.session.userid + "','enregistrement  commande "+req.body.poste+" montant "+req.body.montant+"',"+null+","+null+","+null+","+id+","+null+","+null+",'" + toDay + "')";
            mysqlConnection.query(sql, (err, rows, fields) => {
                var sql = "select * from client order by id_client asc";
            mysqlConnection.query(sql, (err, rows, fields) => {
                client = rows;
                var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                // AND client.id_client = chambreclient.id_client;";

                mysqlConnection.query(sql, (err, rows, fields) => {
                    chambre = rows;
                    var sql = "select * from chambre order by id_chambre asc";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        sess = req.session;
                        chambrec = rows;
                        var message = '';
                        // console.log(req.session);
                        if (req.session.role == 'admin') {
                            res.render('client/admin_client', {
                                client,
                                chambre,
                                chambrec,
                                message
                            });
                        }
                        if (req.session.role == 'receptioniste') {
                            res.render('client/client', {
                                client,
                                chambre,
                                chambrec,
                                message
                            });
                        }
                        // res.render('client/admin_client', {
                        //     client,
                        //     chambre,
                        //     chambrec,
                        //     message
                        // });
                    })
                })
            })
            })
           })
                            break;
                    case 'Bar':
                        Tbar = r.bar+prix;
                        var sql= "UPDATE `sortie` SET  `bar` = " + Tbar + " WHERE `sortie`.`date`= '" + toDay  + "'";
           mysqlConnection.query(sql, (err, rows, fields) => {
            var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values('" + req.session.userid + "','enregistrement  commande "+req.body.poste+" montant "+req.body.montant+"',"+null+","+null+","+null+","+id+","+null+","+null+",'" + toDay + "')";
            mysqlConnection.query(sql, (err, rows, fields) => {
                var sql = "select * from client order by id_client asc";
            mysqlConnection.query(sql, (err, rows, fields) => {
                client = rows;
                var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                // AND client.id_client = chambreclient.id_client;";

                mysqlConnection.query(sql, (err, rows, fields) => {
                    chambre = rows;
                    var sql = "select * from chambre order by id_chambre asc";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        sess = req.session;
                        chambrec = rows;
                        var message = '';
                        // console.log(req.session);
                        if (req.session.role == 'admin') {
                            res.render('client/admin_client', {
                                client,
                                chambre,
                                chambrec,
                                message
                            });
                        }
                        if (req.session.role == 'receptioniste') {
                            res.render('client/client', {
                                client,
                                chambre,
                                chambrec,
                                message
                            });
                        }
                        // res.render('client/admin_client', {
                        //     client,
                        //     chambre,
                        //     chambrec,
                        //     message
                        // });
                    })
                })
            })
            })
           })
                        break;
                    case 'Charge':
                        Tlinge =r.charge+prix;
                        var sql= "UPDATE `sortie` SET  `charge` = " + Tlinge + " WHERE `sortie`.`date`= '" + toDay  + "'";
           mysqlConnection.query(sql, (err, rows, fields) => {
            var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values('" + req.session.userid + "','enregistrement  commande "+req.body.poste+" montant "+req.body.montant+"',"+null+","+null+","+null+","+id+","+null+","+null+",'" + toDay + "')";
            mysqlConnection.query(sql, (err, rows, fields) => {
                var sql = "select * from client order by id_client asc";
            mysqlConnection.query(sql, (err, rows, fields) => {
                client = rows;
                var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                // AND client.id_client = chambreclient.id_client;";

                mysqlConnection.query(sql, (err, rows, fields) => {
                    chambre = rows;
                    var sql = "select * from chambre order by id_chambre asc";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        sess = req.session;
                        chambrec = rows;
                        var message = '';
                        // console.log(req.session);
                        if (req.session.role == 'admin') {
                            res.render('client/admin_client', {
                                client,
                                chambre,
                                chambrec,
                                message
                            });
                        }
                        if (req.session.role == 'receptioniste') {
                            res.render('client/client', {
                                client,
                                chambre,
                                chambrec,
                                message
                            });
                        }
                        // res.render('client/admin_client', {
                        //     client,
                        //     chambre,
                        //     chambrec,
                        //     message
                        // });
                    })
                })
            })
            })
           })
                        break;
                    case 'Divers':
                        Tdivers = r.divers+prix;
                        var sql= "UPDATE `sortie` SET  `divers` = " + Tdivers + " WHERE `sortie`.`date`= '" + toDay  + "'";
           mysqlConnection.query(sql, (err, rows, fields) => {
            var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values('" + req.session.userid + "','enregistrement  commande "+req.body.poste+" montant "+req.body.montant+"',"+null+","+null+","+null+","+id+","+null+","+null+",'" + toDay + "')";
            mysqlConnection.query(sql, (err, rows, fields) => {
                var sql = "select * from client order by id_client asc";
            mysqlConnection.query(sql, (err, rows, fields) => {
                client = rows;
                var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                // AND client.id_client = chambreclient.id_client;";

                mysqlConnection.query(sql, (err, rows, fields) => {
                    chambre = rows;
                    var sql = "select * from chambre order by id_chambre asc";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        sess = req.session;
                        chambrec = rows;
                        var message = '';
                        // console.log(req.session);
                        if (req.session.role == 'admin') {
                            res.render('client/admin_client', {
                                client,
                                chambre,
                                chambrec,
                                message
                            });
                        }
                        if (req.session.role == 'receptioniste') {
                            res.render('client/client', {
                                client,
                                chambre,
                                chambrec,
                                message
                            });
                        }
                        // res.render('client/admin_client', {
                        //     client,
                        //     chambre,
                        //     chambrec,
                        //     message
                        // });
                    })
                })
            })
            })
           })
                        break;
                    default: Tdivers =0, Tlinge = 0; Tbar = 0; TpetitD = 0; Trestaurant =0;
                }
            
           
            })
           
        }else{
            switch (req.body.poste ) {
                    
                case 'Restaurant':
                    Trestaurant =prix;
                    break;
                case 'Hebergement':
                    TpetitD =prix;
                    break;
                case 'Bar':
                    Tbar = prix;;
                    break;
                case 'Charge':
                    Tlinge =prix;;
                    break;
                case 'Divers':
                    Tdivers = prix;;
                    break;
                default: Tdivers =0, Tlinge = 0; Tbar = 0; TpetitD = 0; Trestaurant =0;
            }
            var sql = "insert into sortie(bar,restaurant,charge,divers,hebergement,date) values(" +  Tbar + "," +  Trestaurant + "," +  Tlinge + "," +  Tdivers + ","+TpetitD+",'" + toDay + "')";
            mysqlConnection.query(sql, (err, rows, fields) => {
                var sql = "select * from entree order by id_entree asc";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    var id_entree=0;
                    rows.forEach(r=>{
    id_entree=r.id_entree;
                    })
                    var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values('" + req.session.userid + "','enregistrement  commande "+req.body.poste+" montant "+req.body.montant+"',"+null+","+null+","+null+","+id_entree+","+null+","+null+",'" + toDay + "')";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                var sql = "select * from client order by id_client asc";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    client = rows;
                    var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                    // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                    // AND client.id_client = chambreclient.id_client;";
    
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        chambre = rows;
                        var sql = "select * from chambre order by id_chambre asc";
                        mysqlConnection.query(sql, (err, rows, fields) => {
                            sess = req.session;
                            chambrec = rows;
                            var message = '';
                            // console.log(req.session);
                            if (req.session.role == 'admin') {
                                res.render('client/admin_client', {
                                    client,
                                    chambre,
                                    chambrec,
                                    message
                                });
                            }
                            if (req.session.role == 'receptioniste') {
                                res.render('client/client', {
                                    client,
                                    chambre,
                                    chambrec,
                                    message
                                });
                            }
                            // res.render('client/admin_client', {
                            //     client,
                            //     chambre,
                            //     chambrec,
                            //     message
                            // });
                        })
                    })
                })
            })
        })
    })
        
        }
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
                                    // phantomPath: phantomjs.path,
                                    filename: './public/factures/' + factname + ".pdf",
                                    format: 'A4',
                                    orientation: 'portrait',
                                    type: "pdf",
                                    timeout: 30000,
                                    border: "0",
                                    quality: "75"
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

app.post('/receptioniste/commande/', urlencodedParser, [
    check('poste', 'entrer le service')
    .exists()
    .isLength({ min: 3 }),
    check('montant', 'entrer le montant')
    .exists()
    .isLength({ min: 3 }),
    check('nombre', 'entrer le nombre')
    .exists()




], (req, res) => {
    id = req.body.id_client ;
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
            let toDay = Days.toISOString().slice(0, 10) + " " + hour + ":" + minute + ":" + second;

            

            if (req.body.poste !== 'reglement') {


                var sql1 = "insert into commande(nom_commande,lieu,montant,id_client,date_commande,nombre) values('"+ req.body.poste +"','" + req.body.poste + "'," + req.body.montant + "," + req.body.id_client + ",'" + clientDate + "'," + req.body.nombre + ")";

                mysqlConnection.query(sql1, (err, rows, fields) => {
                    var s = 0;
                    var sql = "select * from commande order by id_commande asc";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        var id_comande=0;
                        rows.forEach(r=>{
                            id_comande=r.id_commande;
                        })
                        
                        var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values('" + req.session.userid + "','enregistrement  commande "+req.body.poste+" montant "+req.body.montant+"',"+null+","+id_comande+","+null+","+null+","+null+","+null+",'" + toDay + "')";
                        mysqlConnection.query(sql, (err, rows, fields) => {

                    var sql = "select * from commande where id_client=" + req.body.id_client + " ORDER BY id_client ASC";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        console.log(err,rows);
                        commande = rows;

                        var sql = "select * from facture where id_client=" + req.body.id_client + " ORDER BY id_client ASC";
                        console.log(sql);
                        mysqlConnection.query(sql, (err, rows, fields) => {
                            console.log(err,rows);

                            if (rows.length !== 1) {

                                commande.forEach(elt => {
                                    s = s + (elt.montant * elt.nombre);
                                })
                                var sql1 = "insert into facture(reporte,reglement,total,id_client) values(" + s + "," + 0 + "," + s + "," + req.body.id_client + ")";
                                console.log(sql1);
                                mysqlConnection.query(sql1, (err, rows, fields) => {
                                    console.log(err,rows);
                                    var message = 'Effectué succès';
                                    // if (req.session.role === 'admin') {
                                    //
                                    //
                                    //     var sql = "select * from client order by id_client asc";
                                    //     mysqlConnection.query(sql, (err, rows, fields) => {
                                    //         client = rows;
                                    //         var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                                    //
                                    //         mysqlConnection.query(sql, (err, rows, fields) => {
                                    //             chambre = rows;
                                    //             var sql = "select * from chambre order by id_chambre asc";
                                    //             mysqlConnection.query(sql, (err, rows, fields) => {
                                    //
                                    //                 chambrec = rows;
                                    //                 var message = '';
                                    //                 // console.log(req.session);
                                    //                 res.render('client/admin_client', {
                                    //                     client,
                                    //                     chambre,
                                    //                     chambrec,
                                    //                     message
                                    //                 });
                                    //             })
                                    //         })
                                    //     })
                                    // }
                                    // if (req.session.role === 'receptionniste') {
                                    //     var message = 'client enregitré avec succès';
                                    //     var sql = "select * from client order by id_client asc";
                                    //     mysqlConnection.query(sql, (err, rows, fields) => {
                                    //         client = rows;
                                    //         var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                                    //
                                    //
                                    //         mysqlConnection.query(sql, (err, rows, fields) => {
                                    //             chambre = rows;
                                    //             var sql = "select * from chambre order by id_chambre asc";
                                    //             mysqlConnection.query(sql, (err, rows, fields) => {
                                    //
                                    //                 chambrec = rows;
                                    //                 var message = '';
                                    //                 // console.log(req.session);
                                    //                 res.render('client/admin_client', {
                                    //                     client,
                                    //                     chambre,
                                    //                     chambrec,
                                    //                     message
                                    //                 });
                                    //             })
                                    //         })
                                    //     })
                                    // }
                                    var sql = "select * from client order by id_client asc";
                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                        let client = rows;
                                        var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                                        // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                                        // AND client.id_client = chambreclient.id_client;";

                                        mysqlConnection.query(sql, (err, rows, fields) => {
                                            let chambre = rows;
                                            var sql = "select * from chambre order by id_chambre asc";
                                            mysqlConnection.query(sql, (err, rows, fields) => {
                                                sess = req.session;
                                                let chambrec = rows;
                                                if (req.session.role == 'admin') {
                                                    res.render('client/admin_client', {
                                                        client,
                                                        chambre,
                                                        chambrec,
                                                        message
                                                    });
                                                }
                                                if (req.session.role == 'receptioniste') {
                                                    res.render('client/client', {
                                                        client,
                                                        chambre,
                                                        chambrec,
                                                        message
                                                    });
                                                }
                                                // console.log(req.session);

                                            })
                                        })
                                    })
                                })
                            } else {
                                var s = 0;

                                var sql = "select * from commande where id_client=" + req.body.id_client + " ORDER BY id_client ASC";
                                mysqlConnection.query(sql, (err, rows, fields) => {
                                    commande = rows;

                                    var sql1 = "SELECT * FROM `facture` where id_client=" + req.body.id_client  + "";
                                    mysqlConnection.query(sql1, (err, rows, fields) => {
                                        commande.forEach(elt => {
                                            s = s + (elt.montant * elt.nombre);
                                        })
                                        reg = s + rows[0].reporter;
                                        to = s + rows[0].total;
                                        // console.log(rows);
                                        var sql1 = "UPDATE `facture` SET `reporter` = " + reg + ", `total` = " + to + " WHERE `facture`.`id_client`= " + req.body.id_client  + "";
                                        mysqlConnection.query(sql1, (err, rows, fields) => {
                                            var message = 'client enregitré avec succès';
                                            // if (req.session.role === 'admin') {
                                            //
                                            //
                                            //     var sql = "select * from client order by id_client asc";
                                            //     mysqlConnection.query(sql, (err, rows, fields) => {
                                            //         client = rows;
                                            //         var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                                            //
                                            //         mysqlConnection.query(sql, (err, rows, fields) => {
                                            //             chambre = rows;
                                            //             var sql = "select * from chambre order by id_chambre asc";
                                            //             mysqlConnection.query(sql, (err, rows, fields) => {
                                            //
                                            //                 chambrec = rows;
                                            //                 var message = '';
                                            //                 // console.log(req.session);
                                            //                 res.render('client/admin_client', {
                                            //                     client,
                                            //                     chambre,
                                            //                     chambrec,
                                            //                     message
                                            //                 });
                                            //             })
                                            //         })
                                            //     })
                                            // }
                                            // if (req.session.role === 'receptionniste') {
                                            //     var message = 'client enregitré avec succès';
                                            //     var sql = "select * from client order by id_client asc";
                                            //     mysqlConnection.query(sql, (err, rows, fields) => {
                                            //         client = rows;
                                            //         var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                                            //
                                            //
                                            //         mysqlConnection.query(sql, (err, rows, fields) => {
                                            //             chambre = rows;
                                            //             var sql = "select * from chambre order by id_chambre asc";
                                            //             mysqlConnection.query(sql, (err, rows, fields) => {
                                            //
                                            //                 chambrec = rows;
                                            //                 var message = '';
                                            //                 // console.log(req.session);
                                            //                 res.render('client/admin_client', {
                                            //                     client,
                                            //                     chambre,
                                            //                     chambrec,
                                            //                     message
                                            //                 });
                                            //             })
                                            //         })
                                            //     })
                                            // }
                                            var sql = "select * from client order by id_client asc";
                                            mysqlConnection.query(sql, (err, rows, fields) => {
                                                let client = rows;
                                                var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                                                // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                                                // AND client.id_client = chambreclient.id_client;";

                                                mysqlConnection.query(sql, (err, rows, fields) => {
                                                    let chambre = rows;
                                                    var sql = "select * from chambre order by id_chambre asc";
                                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                                        sess = req.session;
                                                        let chambrec = rows;
                                                        if (req.session.role == 'admin') {
                                                            res.render('client/admin_client', {
                                                                client,
                                                                chambre,
                                                                chambrec,
                                                                message
                                                            });
                                                        }
                                                        if (req.session.role == 'receptioniste') {
                                                            res.render('client/client', {
                                                                client,
                                                                chambre,
                                                                chambrec,
                                                                message
                                                            });
                                                        }
                                                        // console.log(req.session);

                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            }
                        })
                    })
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
                        var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values('" + req.session.userid + "','enregistrement  commande "+req.body.poste+" montant "+req.body.montant+"',"+null+","+0+","+null+","+null+","+null+","+null+",'" + toDay + "')";

                        // var sql = "insert into log(id_user, action, id_client,id_commande,id_sortie,id_entree,id_infos,id_chambre,created_at) values(null,'" + req.session.userid + "','enregistrement  commande "+req.body.poste+" montant "+req.body.montant+"',"+null+","+id_comande+","+null+","+null+","+null+","+null+",'" + toDay + "')";

                        mysqlConnection.query(sql, (err, rows, fields) => {
                        let message ="Effectué avec succès";
                            var sql = "select * from client order by id_client asc";
                            mysqlConnection.query(sql, (err, rows, fields) => {
                                let client = rows;
                                var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
                                // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
                                // AND client.id_client = chambreclient.id_client;";

                                mysqlConnection.query(sql, (err, rows, fields) => {
                                    let chambre = rows;
                                    var sql = "select * from chambre order by id_chambre asc";
                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                        sess = req.session;
                                        let chambrec = rows;
                                        if (req.session.role == 'admin') {
                                            res.render('client/admin_client', {
                                                client,
                                                chambre,
                                                chambrec,
                                                message
                                            });
                                        }
                                        if (req.session.role == 'receptioniste') {
                                            res.render('client/client', {
                                                client,
                                                chambre,
                                                chambrec,
                                                message
                                            });
                                        }
                                        // console.log(req.session);

                                    })
                                })
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
        // let message = '';
        var sql = "select * from client order by id_client asc";
        mysqlConnection.query(sql, (err, rows, fields) => {
           let client = rows;
            var sql = "select chambre.*, chambreclient.*  from chambre, chambreclient where   chambre.id_chambre = chambreclient.id_chambre  order by id_client asc";
            // var sql = "SELECT client.*, commande.*, chambreclient.id_chambre FROM client, commande, chambreclient WHERE client.id_client = commande.id_client
            // AND client.id_client = chambreclient.id_client;";

            mysqlConnection.query(sql, (err, rows, fields) => {
               let chambre = rows;
                var sql = "select * from chambre order by id_chambre asc";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    sess = req.session;
                    let chambrec = rows;
                    var message = '';
                    if (req.session.role == 'admin') {
                        res.render('client/admin_client', {
                            client,
                            chambre,
                            chambrec,
                            message
                        });
                    }
                    if (req.session.role == 'receptioniste') {
                        res.render('client/client', {
                            client,
                            chambre,
                            chambrec,
                            message
                        });
                    }
                    // console.log(req.session);

                })
            })
        })
    } else {
        res.redirect('/');
    }
});
// app.get("/admin/acceuil", (req, res) => {
//     if (req.session.role === 'admin') {
//         var sql = "select * from client ORDER BY id_client ASC";
//         mysqlConnection.query(sql, (err, rows, fields) => {
//             client = rows;
//             var sql = "select * from chambre INNER JOIN chambreclient ON   chambre.id_chambre = chambreclient.id_chambre  ORDER BY id_client ASC";
//             mysqlConnection.query(sql, (err, rows, fields) => {
//                 chambre = rows;
//                 var message = '';
//                 res.render('client/admin_client', {
//                     client,
//                     chambre,
//                     message
//                 });
//             })
//         })
//     } else {
//         res.redirect('/');
//     }
// });
app.get("/admin/blocker", (req, res) => {
    var id_client = req.query.id_client;
    var id_cc = req.query.id_cc;
    // var id_ch = req.query.id;
    if (req.session.role === 'admin') {
        const userid = req.session.userid;
        id_cc.forEach(id => {
            var data = '';
            var sql = "update chambreclient set status_ch=0 " + ' ' + " where id_client = " + id_client + ' ' + " and idchambreClient = " + id + " ";
            mysqlConnection.query(sql, (err, rows, fields) => {
                data = rows;
                var sql = "insert into log(id_user, action, id_client,id_chambre) values('" + req.session.userid + "','Blocker la commande'" + ',' + id_client + ','+ id+  ")";

                mysqlConnection.query(sql, (err, rows, fields) => {
                    // data = rows;

                })
            })

        });

        res.json('success');

    } else {
        res.send('');
    }
});
app.get("/admin/valider", (req, res) => {
    var id_client = req.query.id_client;
    var id_cc = req.query.id_cc;
    if (req.session.role === 'admin') {
        const userid = req.session.userid;
        id_cc.forEach(id => {
            var data = '';
            var sql = "update chambreclient set status_ch=1 " + ' ' + " where id_client = " + id_client + ' ' + " and idchambreClient = " + id + " ";

            mysqlConnection.query(sql, (err, rows, fields) => {

                data = rows;
                var sql = "insert into log(id_user, action, id_client,id_chambre) values('" + req.session.userid + "','Blocker la commande'" + ',' + id_client + ','+ id+  ")";

                mysqlConnection.query(sql, (err, rows, fields) => {
                    // data = rows;

                })
            })

        });

        res.json('success');

    } else {
        res.send('');
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