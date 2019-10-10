const express = require('express');
const app = express();
require('dotenv').config();

const webpush = require('web-push');
webpush.setVapidDetails(
  `mailto:${process.env.EMAIL}`,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);
app.locals.subscription = {};

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(express.json());

app.post('/subscriptions', (request, response) => {
  const { subscription } = request.body;
  app.locals.subscription = subscription;

  return response.status(201).json({ subscription });
});

app.get('/sendapush', (request, response) => {
  webpush.sendNotification(app.locals.subscription, 'A reminder of your mortality')
    .then(function(serviceResponse) {
      if (serviceResponse.statusCode === 201) {
        return response.status(200).json({ serviceResponse });
      } else {
        return response.status(500).json({ serviceResponse });
      }
    })
    .catch(function(err) {
      return response.status(500).json({ err });
    })
});

app.listen(app.get('port'), () => {
  console.log(`Practice web push server running on http://localhost:${app.get('port')}`);
});
