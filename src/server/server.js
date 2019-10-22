import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import serialize from 'serialize-javascript';

import config from 'server/config';
import { serverRenderer } from 'renderers/server';

const app = express();
app.enable('trust proxy');
app.use(morgan('common'));

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.locals.serialize = serialize;

try {
  app.locals.gVars = require('../../.reactful.json');
} catch (err) {
  app.locals.gVars = {};
}

app.get('/', async (req, res) => {
  try {
    const vars = await serverRenderer();
    res.render('index', vars);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.get('/history', async (req, res) => {
  const fileName = path.resolve(__dirname, './example.json');
  try {
    const rawdata = fs.readFileSync(fileName);
    const history = JSON.parse(rawdata);
    res.status(200).json(history);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server error ${err} at dir: ${__dirname}`);
  }
});

// FIXME: Fix the error to get correct response
app.put('/history', (req, res) => {
  const fileName = path.resolve(__dirname, './example.json');
  if (req) {
    try {
      const rawdata = fs.readFileSync(fileName);
      const history = JSON.parse(rawdata);
      history.push(req.body);
      const save = fs.writeFile(fileName, JSON.stringify(history), 'utf8', (callback) => {
        console.error(callback);
      });
      res.status(200).json(save);
    } catch (err) {
      console.error(err);
      res.status(500).send(`Server error ${err} at dir: ${__dirname}`);
    }
  }
});

app.listen(config.port, config.host, () => {
  fs.writeFileSync(
    path.resolve('.reactful.json'),
    JSON.stringify(
      { ...app.locals.gVars, host: config.host, port: config.port },
      null,
      2
    )
  );

  console.info(`Running on ${config.host}:${config.port}...`);
});
