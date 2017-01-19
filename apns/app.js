var apn = require('apn');

// Set up apn with the APNs Auth Key
var apnProvider = new apn.Provider({
     token: {
        key: 'apns.p8', // Path to the key p8 file
        keyId: 'ABCDE12345', // The Key ID of the p8 file (available at https://developer.apple.com/account/ios/certificate/key)
        teamId: 'ABCDE12345', // The Team ID of your Apple Developer Account (available at https://developer.apple.com/account/#/membership/)
    },
    production: false // Set to true if sending a notification to a production iOS app
});

// Enter the device token from the Xcode console
var deviceToken = '5311839E985FA01B56E7AD74444C0157F7F71A2745D0FB50DED665E0E882';

// Prepare a new notification
var notification = new apn.Notification();

// Specify your iOS app's Bundle ID (accessible within the project editor)
notification.topic = 'my.bundle.id';

// Set expiration to 1 hour from now (in case device is offline)
notification.expiry = Math.floor(Date.now() / 1000) + 3600;

// Set app badge indicator
notification.badge = 3;

// Play ping.aiff sound when the notification is received
notification.sound = 'ping.aiff';

// Display the following message (the actual notification text, supports emoji)
notification.alert = 'Hello World \u270C';

// Send any extra payload data with the notification which will be accessible to your app in didReceiveRemoteNotification
notification.payload = {id: 123};

// Actually send the notification
apnProvider.send(notification, deviceToken).then(function(result) {
    // Check the result for any failed devices
    console.log(result);
});
