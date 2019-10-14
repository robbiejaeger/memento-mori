const express = require('express');
const app = express();
require('dotenv').config();

// 
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(express.json());

// Web Push
const webpush = require('web-push');
webpush.setVapidDetails(
  `mailto:${process.env.EMAIL}`,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);
app.locals.subscription = {};

// Knex
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

// Endpoints
app.post('/subscriptions', (request, response) => {
  const { uid, subscription } = request.body;
  
  // Check if google auth uid exists
  database('subscriptions').where({ google_auth_uid: uid })
    .then(function(subscriptions) {
      // If the uid exists, replace the subscrption object
      if (subscriptions.length) {
        database('subscriptions')
          .where({ google_auth_uid: uid })
          .update('subscription', JSON.stringify(subscription))
          .then(function() {
            return response.status(200).json({message: 'Subscription updated'});
          })
          .catch(function(err) {
            return response.status(500).json({ err });      
          });
      } else {
        database('subscriptions')
          .insert({google_auth_uid: uid, subscription})
          .then(function(subscription) {
            return response.status(201).json({message: 'New subscription created'})
          })
          .catch(function(err) {
            return response.status(500).json({ err });      
          });
      }
    })
    .catch(function(err) {
      return response.status(500).json({ err });
    })
});

app.post('/sendapush', (request, response) => {
  const { uid } = request.body;

  database('subscriptions')
    .where({google_auth_uid: uid})
    .then(function(user) {
      if (user.length) {
        const subscription = JSON.parse(user[0].subscription);
        return sendPush(request, response, subscription);
      } else {
        return response.status(404).json({ error: `Could not find subscription with uid: ${uid}`});
      }
    })
    .catch(function(err) {
      return response.status(500).json({ err });
    });  
});

function sendPush(request, response, subscription) {
  webpush.sendNotification(subscription, 'A reminder of your mortality')
    .then(function(serviceResponse) {
      if (serviceResponse.statusCode === 201) {
        return response.status(200).json({ serviceResponse });
      } else {
        return response.status(500).json({ serviceResponse });
      }
    })
    .catch(function(err) {
      return response.status(500).json({ err });
    });
}

app.listen(app.get('port'), () => {
  console.log(`Practice web push server running on http://localhost:${app.get('port')}`);
});
