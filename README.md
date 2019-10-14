# Memento Mori - A Reminder of Your Own Mortality

Inspired by the [WeCroak](https://www.wecroak.com/) app.

Sign up to receive push notifications at somewhat random intervals of time (between 4 and 14 days) that say "A reminder that you are going to die someday." Do with the notification what you see fit.

---

### Learning Goals

I wanted to learn about implementing the [Push API](https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications) PWA technology. So it was important to have an application that would need to send push notifications even if the app is not open and active.

Items that were not learning goals:

* I did not implement offline caching as a feature because I didn't think it made sense for this app
* Keep file structure simple with no bundler/build tools (at least for now)

### Features - In Progress

* [X] Build Express server to serve static assets
* [X] Request permission from the user for Push Notifications in the browser
* [X] Send a basic push notification activated from the browser (implemented but removed from the app)
* [ ] Add relevant information and image to the push notification for this app
* [ ] Handle what happens when the push notification is clicked
* [ ] Add unique identifier for user (maybe through OAuth...)
* [ ] Put on production to increase testing of users and devices
* [ ] Add random push notifications for clients from the server directly (not triggered externally from Postman, for instance)

Push Service specifics:
* [X] Add VAPID public and private keys
* [X] Get subscription object from browser
* [X] POST subscription object to the server to save
* [X] Save subscription object in `app.locals` in server (for now)
* [X] Setup [web-push](https://www.npmjs.com/package/web-push) library to submit a push event
* [X] Trigger push event via server endpoint (externally from Postman)
* [ ] Setup persistent DB on Express server to hold onto subscription object

Not required:

* [ ] Be able to unsubscribe from push notifications
* [ ] Add app manifest to enable PWA home screen icon
* [ ] Have a strategy for multiple devices under the same user account (how do you detect when someone is signed in if you have a subscription for that device? If they don't, how do you ask in a not annoying way?...)
