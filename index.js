const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser')
const logger = require('pino')();
const config = require('./conf/config.json');

logger.info('starting Rest service');

const usr = process.env.MONGO_ROOT_USERNAME
const psw = process.env.MONGO_ROOT_PASSWORD

// Connection URL
const url = `mongodb://${usr}:${psw}@${config.mongo_url}`;
// Database Name
const dbName = 'mydb';
const collName = 'mycoll';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  logger.info("Connected successfully to db");
  const db = client.db(dbName);
  const collection = db.collection(collName);

  const app = express();
  app.use(bodyParser.json())
  const port = 3000

  app.get('/', async (req, res) => {
    logger.info('Received get');
    res.send(await collection.find().toArray());
  });

  app.post('/', async (req, res) => {
    logger.info('Received post');
    const {body} = req;
    await collection.insertOne(body);
    res.send('ok')
  });

  app.listen(port)

});
