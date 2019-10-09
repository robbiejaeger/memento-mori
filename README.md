# Memento Mori - A Reminder of Your Own Mortality

Inspired by the [WeCroak](https://www.wecroak.com/) app.

Sign up to receive push notifications at somewhat random intervals of time (between 4 and 14 days) that say "A reminder that you are going to die someday." Do with the notification what you see fit.

---

### Learning Goals

I wanted to learn about implementing the [Push API](https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications) PWA technology. So it was important to have an application that would need to send push notifications even if the app is not open and active.

I did not implement offline caching as a feature because I didn't think it made sense for this app.

### Features - In Progress

* [X] Build Express server to serve static assets
* [X] Request permission from the user for Push Notifications in the browser
* [X] Send a basic push notification activated from the browser
* [ ] Add relevant information and image to the push notification for this app
* [ ] Handle what happens when the push notification is clicked
* [ ] Add app manifest to enable PWA home screen icon

Push Service specifics:
* [X] Add VAPID public and private keys
* [X] Get subscription object from browser
* [X] POST subscriber object to the server to save
* [ ] Create JWT for push message
* [ ] Save subscription object in `app.locals` in server (for now)
* [ ] Setup DB on Express server to hold onto subscription object
