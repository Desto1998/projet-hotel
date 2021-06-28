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
    name:'User_Session',
    secret:'123456xxx',
    saveUninitialized:false,
    resave:false,
    // cookie: { maxAge: oneDay },
    role:'',
    username:'',
    userid:'',
}));
var id_user;
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
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

console.log('Server currently listening...');

router.get('/', (req, res) => {


    if(!req.session.username) {
        res.render('login/login')
    }else{
        res.redirect('/acceuil/clients');
    }

});

router.get('/logout',(req,res) => {
    req.session.username='';
    req.session.role='';
    req.session.userid= '';
    req.session.destroy();
        res.redirect('/')
});
app.get('/register', (req, res) => {
    res.render('register')
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
row=rows;
res.render('clients', {
    row
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

                console.log(l);
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
    res.render('commande/commande',{
        id
    })
});




app.get('/receptioniste/main_courant', (req, res) => {
   let date = Date.now();
    var yesterday = new Date(new Date().setDate(new Date().getDate()-1));
    let MyDate = yesterday.toISOString().slice(0, 10);
    let toDay= new Date(date);

    
    let hier = MyDate+" 00:00:00";

   var day=toDay.toISOString().slice(0, 10)+" 00:00:00";
    
    
    var sql = "select * from client  ORDER BY id_client ASC";
    mysqlConnection.query(sql, (err, rows, fields) => {
        client = rows;
        var sql = "select * from commande    ORDER BY id_client ASC ";
        mysqlConnection.query(sql, (err, rows, fields) => {
            commande=rows;
            var sql = "select * from chambreclient ORDER BY id_client ASC";
            mysqlConnection.query(sql, (err, rows, fields) => {
                chambreclient=rows;
                var sql = "select * from commande  ORDER BY id_client ASC ";
        mysqlConnection.query(sql, (err, rows, fields) => {
            commandeh=rows;
            var sql = "select * from commande where status= '0' ORDER BY id_client ASC ";
        mysqlConnection.query(sql, (err, rows, fields) => {
            status=rows;
           // console.log(status);
           
    res.render('main_courante/index', {
        client,
        chambreclient,
        commande
        
    })
})
        });
            })
        })
    });
});









app.post('/receptioniste/main_courant', urlencodedParser, (req, res) => {
    






    let date = Date.now();
     var yesterday = new Date(new Date().setDate(new Date().getDate()-1));
     let MyDate = yesterday.toISOString().slice(0, 10);
     let toDay= new Date(date);
 
     
     let hier = MyDate+" 00:00:00";
     let hiers = MyDate+" 23:59:59";
 
     var day=req.body.date+" 00:00:00";
     var days=req.body.date+" 23:59:59"
     
     
     var sql = "select * from client where date_ajout >= '"+day+"' and date_ajout <= '"+days+"' ORDER BY id_client ASC";
     mysqlConnection.query(sql, (err, rows, fields) => {
         client = rows;
         var sql = "select * from commande where date_commande >= '"+day+"' and date_commande <= '"+days+"'  ORDER BY id_client ASC ";
         mysqlConnection.query(sql, (err, rows, fields) => {
             commande=rows;
             
             var sql = "select * from chambreclient where date >= '"+day+"' and date <= '"+days+"' ORDER BY id_client ASC";
             mysqlConnection.query(sql, (err, rows, fields) => {
                 chambreclient=rows;
                
                 var sql = "select * from commande where date_commande >= '"+hier+"' and date_commande <= '"+hiers+"'   ORDER BY id_client ASC ";
         mysqlConnection.query(sql, (err, rows, fields) => {
             commandeh=rows;
             var sql = "select * from commande where status= '0' ORDER BY id_client ASC ";
         mysqlConnection.query(sql, (err, rows, fields) => {
             status=rows;
            // console.log(status);
           
     res.render('main_courante/index', {
         client,
         chambreclient,
         commande
         
     })
 })
         });
             })
         })
     });
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
    if(req.session.role !=='' && req.session.username !='') {
        if (req.body.username != undefined && req.body.password != undefined) {
            var sql = "select * from utilisateur where nom ='" + req.body.username + "' and password = '" + req.body.password + "'";
            mysqlConnection.query(sql, (err, rows, fields) => {
                console.log(err);
                if (!err) {

                    if (rows.length == 1) {
                        id = rows[0].id_user;
                        userData= rows;
                        var sql = "select * from profil where id_user =" + id + "";
                        mysqlConnection.query(sql, (err, rows, fields) => {

                            if (!err) {
                                var role = rows[0].role;
                                if (role == 'admin') {

                                    var sql = "select * from client order by id_client asc";
                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                        client=rows;
                                        var sql = "select * from chambreclient order by id_client asc";
                                        mysqlConnection.query(sql, (err, rows, fields) => {
                                            chambre=rows;
                                            sess = req.session;
                                            req.session.username = userData[0].nom;
                                            req.session.userid = userData[0].id_user;
                                            req.session.role = role;
                                            req.userid = userData[0].id_user;
                                            console.log(req.session);
                                            res.render('client/client',{
                                                client,
                                                chambre
                                            });
                                        })
                                    })
                                }
                                if (role == 'receptioniste') {
                                    var sql = "select * from client";
                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                        client=rows;
                                        var sql = "select * from chambreclient";
                                        mysqlConnection.query(sql, (err, rows, fields) => {
                                            chambre=rows;
                                            // sess = req.session;
                                            req.session.username = userData[0].nom;
                                            req.session.role = role;
                                            req.session.userid = userData.id_user;
                                            console.log(req.session);
                                            res.render('client/client',{
                                                client,
                                                chambre
                                            });
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
    }else{
        res.redirect('/acceuil/clients')
    }

});

var id = 0;



// insert client
app.post('/receptioniste/client', urlencodedParser, [
    check('name', 'nom trop grand')
    .exists()
    .isLength({ max: 45 }),
    check('mail', 'email non valide')
    .isEmail()
    .normalizeEmail()



], (req, res) => {
    


        // var sexe;
        // if (req.body.sexe != undefined) {
        //     sexe = req.body.masculin;
        // }
        // if (req.body.feminin != undefined) {
        //     sexe = req.body.feminin;
        // }

        let date = Date.now();
        let MyDate = new Date(date);
        let day = MyDate.getDate();
        let month = MyDate.getMonth();
        let year = MyDate.getFullYear();
        let hour = MyDate.getHours();
        let minute = MyDate.getMinutes();
        let second = MyDate.getSeconds();
        let clientDate = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        //let clientD = year + "-" + month + "-" + day ;
toDay=MyDate.toISOString().slice(0, 10)+ " " + hour + ":" + minute + ":" + second;
        var sql = "select * from chambre where status = 'libre'";
        mysqlConnection.query(sql, (err, rows, fields) => {
row=rows;
//console.log(row)
if (req.body.chambre != undefined) {
   
            var sql = "insert into client values(null,'" + req.body.name + "','" + req.body.prenom + "'," + req.body.phone + "," + req.body.cni + ", '" + toDay  + "')";
            mysqlConnection.query(sql, (err, rows, fields) => {
                var sql = "select * from client where cni = " + req.body.cni + "";
            mysqlConnection.query(sql, (err, rows, fields) => {
                id=rows[0].id_client;
                var sql1 = "insert into commande values(null,'','',0,'"+0+"',"+id+",'"+toDay+"',"+0+")";
                mysqlConnection.query(sql1, (err, rows, fields) => {
        
                
                var sql = "insert into chambreclient values(null," + id + "," + req.body.chambre + ",'" + toDay + "')";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    var sql = "UPDATE `chambre` SET `status` = 'occupé' WHERE `chambre`.`id_chambre` = "+req.body.chambre+"";
                    mysqlConnection.query(sql, (err, rows, fields) => {})
                    var sql = "select * from client";
                                mysqlConnection.query(sql, (err, rows, fields) => {
                                    client=rows;
                                    var sql = "select * from chambreclient";
                                    mysqlConnection.query(sql, (err, rows, fields) => {
                                        chambre=rows;
                                res.render('client/client',{
                                    client,
                                    chambre
                                });
                                })
                            })
                })
            })
        })
    })
    }
       
/*
            var sql = "select * from client where cni = " + clientDate + "";
            mysqlConnection.query(sql, (err, rows, fields) => {
                var total = req.body.prix * req.body.nombre;
                console.log(req.body.commande);
                var sql = "insert into facture values(null,'" + req.body.commande + "'," + req.body.prix + "," + req.body.nombre + "," + total + "," + rows[0].id_client + ")";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    res.render('acceuille')


                })

            })*/


        })
    
});

/*
// insert client receptioniste
app.post('/receptioniste/client/', urlencodedParser, [
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

        let date = Date.now();
        let MyDate = new Date(date);
        let day = MyDate.getDate();
        let month = MyDate.getMonth();
        let year = MyDate.getFullYear();
        let hour = MyDate.getHours();
        let minute = MyDate.getMinutes();
        let second = MyDate.getSeconds();
        let clientDate = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        let clientchambre = year + "-" + month + "-" + day;

        var sql = "insert into client values(null,'" + req.body.name + "'," + req.body.numero + ",'" + req.body.cni + ",'" + req.body.mail + "','" + req.body.sexe + "'," + req.body.nombre + ", '" + clientDate + "')";
        mysqlConnection.query(sql, (err, rows, fields) => {

            var sql = "select * from client where cni = " + req.body.cni + "";
            mysqlConnection.query(sql, (err, rows, fields) => {
                // var total = req.body.prix * req.body.nombre;
                // console.log(req.body.commande);
                // var sql = "insert into facture values(null,'" + req.body.commande + "'," + req.body.prix + "," + req.body.nombre + "," + total + "," + rows[0].id_client + ")";
                // mysqlConnection.query(sql, (err, rows, fields) => {
                //     res.render('acceuille_admin')
                // })
                var last_isert_id = rows.insertId;
                // rows[0].id_client
                var sql = "insert into chambreclient values(null,'" + last_isert_id + "'," + req.body.id_chambre + "," + clientchambre + ")";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    res.render('acceuille_admin')


                })

            })


        })
    }
});
*/
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
    check('name', 'nom trop grand')
    .exists()
    .isLength({ max: 45 }),



], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('clients', {
            alert
        })

    } else {

        var sql = "insert into entree values(null,'" + req.body.name + "'," + req.body.prix + "," + req.body.nombre + "," + id + ")";
        mysqlConnection.query(sql, (err, rows, fields) => {


            console.log(id);


        })
    }
});






/*

app.post('/receptioniste/facture', urlencodedParser, [], (req, res) => {
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
                res.render('facture.ejs', {
                    row,
                    nom,
                    l
                })
            })
        } else {
            res.render('facture.ejs', {
                l
            })
        }
    })


    if (req.body.imp != undefined) {
        res.render('facture')
    }





    res.render('facture');
});


*/

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
    if(req.session.role ==='admin'|| req.session.role ==='receptioniste'  && req.session.username) {
        var sql = "select * from Chambre where status = " + 'occupé' + "";
        mysqlConnection.query(sql, (err, rows, fields) => {
            const row = rows;
            res.render('clients', {
                alert,
                row
            })
        });
    }else{
        res.redirect('/');
    }

});

app.post("/admin/chambreLibre/", (req, res) => {
    // var idClient = req.params.idClient;
    if(req.session.role ==='admin'|| req.session.role ==='receptioniste'  && req.session.username) {
        var sql = "select * from Chambre where status = " + 'libre' + "";
        mysqlConnection.query(sql, (err, rows, fields) => {
            const row = rows;
            res.render('clients', {
                alert,
                row
            })
        });
    }else{
        res.redirect('/');
    }

});




// pdf genered


app.get("/generateReport2/:id", (req, res) => {
    if(req.session.role ==='admin'|| req.session.role ==='receptioniste'  && req.session.username) {
         var id = req.params.id;
        var commandes;
        var infos;
        var chambres;
        var idClient = req.params.id;
        var sql1 = "select * from client where id_client = " + idClient + "";
        mysqlConnection.query(sql1, (err, rows, fields) => {
            infos = rows;
            var sql2 = "select * from commande where id_client = " + idClient + "";
            mysqlConnection.query(sql2, (err, rows, fields) => {
                commandes = rows;
                var sql3 = "select c.id_chambre, code_chambre, prix  from chambre c ,chambreclient cc,commande co where   cc.id_client = " + idClient + " and c.id_chambre = cc.id_chambre";
                // var sql = "select C.id_chambre c.prix c.codechambre from chambre c chambreclient cc where   cc.id_client = " + idClient + " and c.id_chambre = cc.id_chambre";
                // var sql = "select * from  where id_client = " + idClient + "";
                mysqlConnection.query(sql3, (err, rows, fields) => {
                    var chambres = rows;

                    res.render("htmlpdf.ejs", { infos: infos, commandes: commandes, chambres: chambres });
                })
            })
        })
    }else{
        res.redirect('/');
    }

});








// insertion commande


app.post('/receptioniste/commande/:id', urlencodedParser, [
    check('name', 'nom trop grand')
    .exists()
    .isLength({ max: 45 }),
    check('mail', 'email non valide')
    .isEmail()
    .normalizeEmail()



], (req, res) => {
    


        // var sexe;
        // if (req.body.sexe != undefined) {
        //     sexe = req.body.masculin;
        // }
        // if (req.body.feminin != undefined) {
        //     sexe = req.body.feminin;
        // }
    if(req.session.role ==='admin'|| req.session.role ==='receptioniste'  && req.session.username) {
        id=req.params.id;
        let date = Date.now();
        let MyDate = new Date(date);
        let day = MyDate.getDate();
        let month = MyDate.getMonth();
        let year = MyDate.getFullYear();
        let hour = MyDate.getHours();
        let minute = MyDate.getMinutes();
        let second = MyDate.getSeconds();
        let clientDate = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        let clientD = year + "-" + month + "-" + day ;

        console.log(req.body)

        var sql1 = "insert into commande values(null,'','"+req.body.poste+"',"+req.body.montant+",'"+0+"',"+id+",'"+clientDate+"',"+req.body.nombre+")";
        mysqlConnection.query(sql1, (err, rows, fields) => {

            var sql = "select * from client";
            mysqlConnection.query(sql, (err, rows, fields) => {
                client=rows;
                var sql = "select * from chambreclient";
                mysqlConnection.query(sql, (err, rows, fields) => {
                    chambre=rows;
                    res.render('client/client',{
                        client,
                        chambre
                    });
                })
            })
        })

    }else{
        res.redirect('/');
    }

});
app.get("/acceuil/clients",(req,res)=>{
    if(req.session.role ==='admin'|| req.session.role ==='receptioniste'  && req.session.username) {
        var sql = "select * from client";
        mysqlConnection.query(sql, (err, rows, fields) => {
            client = rows;
            var sql = "select * from chambreclient";
            mysqlConnection.query(sql, (err, rows, fields) => {
                chambre = rows;
                res.render('client/client', {
                    client,
                    chambre
                });
            })
        })
    }else{
        res.redirect('/');
    }
});
app.get("/admin/genererFacture/:id", (req, res) => {
    if(req.session.role ==='admin'|| req.session.role ==='receptioniste'  && req.session.username) {
        var id = req.params.id;
        var commandes;
        var infos;
        var chambres;
        var idClient = req.params.id;
        var sql1 = "select * from client where id_client = " + idClient + "";
        mysqlConnection.query(sql1, (err, rows, fields) => {
            infos = rows;
            // var id = rows[0].id_client;
            var factname = infos[0].email + "_" + infos[0].tel;

            var sql2 = "select * from commande where id_client = " + idClient + "";
            mysqlConnection.query(sql2, (err, rows, fields) => {
                commandes = rows;
                var sql3 = "select c.id_chambre, code_chambre, prix  from chambre c ,chambreclient cc where   cc.id_client = " + idClient + " and c.id_chambre = cc.id_chambre";
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


                    ejs.renderFile(path.join('./views', "facture.ejs"), { infos: infos, commandes: commandes, chambres: chambres }, (err, data) => {
                        // ejs.renderFile(path.join('./views/', "index.ejs"), (err, data) => {
                        if (err) {
                            res.send(err);
                        } else {
                            let options = {
                                "height": "11.25in",
                                "width": "8.5in",
                                "header": {
                                    "height": "20mm"
                                },
                                "footer": {
                                    "height": "20mm",
                                },
                            };
                            htmlPdf.create(data, options).toFile(path.join('./public/factures/', factDate + factname + ".pdf"), function(err, data) {

                                if (err) {
                                    res.send(err);
                                } else {
                                    const factPath = path.join('./public/factures/', factDate + factname + ".pdf");
                                    // res.render("factPath");
                                    // require(factPath);

                                    res.send("Facture creee avec success");
                                }
                            });
                        }
                    });
                })
            })
        })
    }else{
        res.redirect('/');
    }


})