const notifyBtn = document.querySelector('#notify-me');
const authContainer = document.getElementById('firebaseui-auth-container');
const remindMeBtn = document.getElementById('remind-me');
const userWelcomeMsg = document.getElementById('user-welcome');
const userInfoMsg = document.getElementById('user-info-message');
const loginBtn = document.getElementById('login');

const applicationServerPublicKey = 'BC55I1Q9r_xqe9M0forl3l8bRqRPWa2fY43uaZS45ikGGrhOmwuKhhBQV2Ycv89f0vP48_TFur3Vs7rf9p93m0I'; // VAPID public key

notifyBtn.addEventListener('click', function() {
  if ('Notification' in window && navigator.serviceWorker) {
    requestNotificationsPermission();
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./serviceWorker.js')
      .then(function(reg) {
        console.log('Service worker successfully registered.');
      })
      .catch(function(err) {
        console.error('Service worker failed to register:', err);
      });
  });
}

function requestNotificationsPermission() {
  Notification.requestPermission()
    .then(function(result) {
      console.log('Notification permission:', Notification.permission);
      if (result === 'granted') {
        subscribeUser();
      }
    })
    .catch(function(err) {
      console.error('Something went wrong with notification permission request:', err);
    });
}

function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function(reg) {

      reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerPublicKey
      }).then(function(subscription) {
        const uid = getUidForLoggedInUser();
        submitOrUpdateSubscriptionOnServer(uid, subscription);
        console.log('Subscription object:', subscription);
      }).catch(function(err) {
        if (Notification.permission === 'denied') {
          userInfoMsg.textContent = 'This page has notifications disabled. Turn notificaions on.';
          console.warn('Permission for notifications was denied');
        } else {
          userInfoMsg.textContent = 'Unable to subscribe to notifications for this device.';
          console.error('Unable to subscribe to push:', err);
        }
      });
    });
  }
}

function submitOrUpdateSubscriptionOnServer(uid, subscription) {
  fetch('/subscriptions', {
    method: 'POST',
    body: JSON.stringify({ uid, subscription }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(message) { console.log(message); });
      userInfoMsg.textContent = 'Your device has been signed up to be reminded!';
    } else {
      response.json().then(function(message) { console.log('Error:', message); });
      userInfoMsg.textContent = 'Something went wrong with your reminder...';
    }
  })
  .catch(function(err) {
    console.error('Posting subscription failed:', err);
  });
}
