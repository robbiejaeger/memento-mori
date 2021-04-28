# Memento Mori - A Reminder of Your Own Mortality

Inspired by the [WeCroak](https://www.wecroak.com/) app.

Sign up to receive push notifications at somewhat random intervals of time (between 4 and 14 days) that say "A reminder that you aren't going to live forever." - a reminder to make the most out of life.

<img src="./public/ui.png" alt="screenshot of UI" height="600">

---

### Learning Goals

I wanted to learn about implementing the [Push API](https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications) PWA technology. So it was important to have an application that would need to send push notifications even if the app is not open and active.

Items that were not learning goals:

* No offline caching through the service worker
* Keep file structure simple with no bundler/build tools

### Features - In Progress

* [X] Build Express server to serve static assets
* [X] Request permission from the user for Push Notifications in the browser
* [X] Send a basic push notification activated from the browser (implemented but removed from the app)
* [ ] Add relevant information and image to the push notification for this app
* [ ] Handle what happens when the push notification is clicked
* [X] Add unique identifier for user - for now it's the Google OAuth uid
* [X] Put on production to increase testing of users and devices
* [ ] Add random push notifications for clients from the server directly (not triggered externally from Postman, for instance)

Push Service specifics:
* [X] Add VAPID public and private keys
* [X] Get subscription object from browser
* [X] POST subscription object to the server to save
* [X] Save subscription object in `app.locals` in server (for now)
* [X] Setup [web-push](https://www.npmjs.com/package/web-push) library to submit a push event
* [X] Trigger push event via server endpoint (externally from Postman)
* [X] Setup persistent DB on Express server to hold onto _one_ subscription object per Google OAuth uid

Not required:

* [ ] Be able to unsubscribe from push notifications
* [ ] Add app manifest to enable PWA home screen icon
* [ ] Have a strategy for multiple devices under the same user account (how do you detect when someone is signed in if you have a subscription for that device? If they don't, how do you ask in a not annoying way?...)
