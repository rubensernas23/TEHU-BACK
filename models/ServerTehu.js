const express = require("express");
const cors = require("cors");
const https = require('https');
const http = require('http');
const fs = require('fs');
const mosca = require('mosca');
const brokerReady = require("../broker/on.ready");
const db = require("../db/connection");


class ServerTehu {
  constructor() {
    this.app = express();
    this.mosca = new mosca.Server({
      port: process.env.PORT2
    });
    this.port = process.env.PORT;

    this.user = "/user";
    this.rolPath = "/rol";
    this.login = "/login";
    this.company = "/company";
    this.cluster = "/cluster";
    this.device = "/device";
    this.temperature = "/temperature";

    // modelos
    this.dbConnection();
    // middlewares, son los mediadores
    this.middlewares();
    // Rutas de aplicacion
    this.routes();
    this.broker();
  }

  async dbConnection() {
    try {
      await db.authenticate();
    } catch (error) {
      console.log(error);
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use(this.user, require("../routes/user.routes"));
    this.app.use(this.rolPath, require("../routes/rol.routes"));
    this.app.use(this.login, require("../routes/login.routes"));
    this.app.use(this.company, require("../routes/company.routes"));
    this.app.use(this.cluster, require("../routes/cluster.routes"));
    this.app.use(this.device, require("../routes/device.routes"));
    this.app.use(this.temperature, require("../routes/temperature.routes"));
  }

  broker() {
    //console.log("this.mosca", this.mosca);
    brokerReady(this.mosca);
  }

  start() {
    // Configuración de certificados
    const privateKey = fs.readFileSync('ssl/key.pem', 'utf8');
    const certificate = fs.readFileSync('ssl/certificado.pem', 'utf8');

    const credentials = {
      key: privateKey,
      cert: certificate,
    };

    // Creación de servidores HTTP y HTTPS
    const httpApp = express();
  /*   httpApp.get('*', (req, res) => {
      res.redirect(`https://${req.headers.host}${req.url}`);
    }); */
    http.createServer(httpApp).listen(8081);

    const httpsServer = https.createServer(credentials, this.app);
    
    //httpsServer.listen(this.port, () => {
    this.app.listen(this.port, () => {
      console.log(`Servidor HTTPS escuchando en el puerto ${this.port}!`);
    });
  }
}

module.exports = ServerTehu;
