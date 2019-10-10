self.addEventListener('push', function(event) {
  // var options = {
  //   body: event
  // };
  event.waitUntil(
    self.registration.showNotification('Push from server!')
  );
});