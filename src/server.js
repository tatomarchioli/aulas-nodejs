// - imports
require('dotenv-safe').load();
let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    glob = require( 'glob' ),
    path = require( 'path' ),
    expressSwagger = require('express-swagger-generator')(app),
    passport = require('passport'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session);

/* - Configuração do mongo db
* Define que a instância vai ser global e que o banco estará
* na URL definida
* */
mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true },function(error) {
    console.error(error);
});

/* - Configuração de Json
* Precisa estar antes das configurações de rota
* */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/* - Carrega as models
* */
console.log("loading models");
glob.sync( './src/models/**/*.js' ).forEach( function( file ) {
    console.log(file);
    require( path.resolve( file ) );
});
console.log("models loaded");


/* - Configuração de Sessions
* Precisa estar antes das configurações de rota
* */
require('./auth')(passport);
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave: false,
    saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());


/* - Carrega as rotas
* */
console.log("loading routes");
glob.sync( './src/routes/**/*.js' ).forEach( function( file ) {
    console.log(file);
    let router = require(path.resolve( file ));
    app.use("/v1",router);
});
console.log("routes loaded");

/* - Swagger
* */
let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options);



/* - Middleware
* Intercepta certos eventos após a configuração das rotas
* */
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});


/* - Inicia o servidor*/
app.listen(port);
console.log('Service started on port: ' + port);
