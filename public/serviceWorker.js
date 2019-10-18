self.addEventListener('push', function(event) {
  const title = event.data.text();

  event.waitUntil(
    self.registration.showNotification(title, {
      body: 'Do what is important to you.',
      icon: './skull-192px.png'
    })
  );
});
