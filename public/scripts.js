const notifyBtn = document.querySelector('#notify-me');

notifyBtn.addEventListener('click', function() {
  if ('Notification' in window && navigator.serviceWorker) {
    requestNotificationsPermission();

    console.log(Notification.permission)
    if (Notification.permission === 'granted') {
      sendNotification();
    }
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./serviceWorker.js')
      .then(function(reg) {
        console.log('Service worker succeefully registered');
      })
      .catch(function(err) {
        console.log('Service worker failed to register:', err);
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