const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(express.json());

app.locals.subscription = {};

app.post('/subscriptions', (request, response) => {
  const { subscription } = request.body;
  app.locals.subscription = subscription;

  return response.status(201).json({ subscription });
});

app.listen(app.get('port'), () => {
  console.log(`Practice web push server running on http://localhost:${app.get('port')}`);
});