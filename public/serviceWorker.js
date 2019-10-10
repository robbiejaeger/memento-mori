self.addEventListener('push', function(event) {
  event.waitUntil(
    self.registration.showNotification('Push from the server!')
  );
});
