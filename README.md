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

### User Flow

New User - First Time to Page:

1. They see the title of the page, a summary of what it is, the option to login (why they need to login)
2. Login through Google OAuth
3. They see a button to get notifications, the browser asks them if they want to allow notifications, and based on that answer they are signed up or notified that they need to allow notifications...
