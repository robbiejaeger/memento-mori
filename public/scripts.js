const notifyBtn = document.querySelector('#notify-me');
const applicationServerPublicKey = 'BC55I1Q9r_xqe9M0forl3l8bRqRPWa2fY43uaZS45ikGGrhOmwuKhhBQV2Ycv89f0vP48_TFur3Vs7rf9p93m0I'; // VAPID public key

notifyBtn.addEventListener('click', function() {
  if ('Notification' in window && navigator.serviceWorker) {
    requestNotificationsPermission();
    console.log(Notification.permission)

    if (Notification.permission === 'granted') {
      subscribeUser();
      sendNotification();
    }
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./serviceWorker.js')
      .then(function(reg) {
        console.log('Service worker successfully registered');
      })
      .catch(function(err) {
        console.error('Service worker failed to register:', err);
      });
  });
}

function requestNotificationsPermission() {
  Notification.requestPermission(function(status) {
    // Status is "denied", "granted", or "default"
    // "default" means they did not select Allow or Block
    console.log('Notification status is:', status);
  });
}

function sendNotification() {
  navigator.serviceWorker.getRegistration()
    .then(function(reg) {
      const notificationOptions = {
        body: 'Body text'
      };

      reg.showNotification('Hello', notificationOptions);
    });
}

function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function(reg) {

      reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerPublicKey
      }).then(function(sub) {
        console.log('Subscription object:', sub);
      }).catch(function(e) {
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied');
        } else {
          console.error('Unable to subscribe to push', e);
        }
      });
    })
  }
}