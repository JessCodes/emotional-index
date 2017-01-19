var apn = require('apn');

// Set up apn with the APNs Auth Key
var apnProvider = new apn.Provider({
     token: {
        key: 'APNsAuthKey_B44W63EW8S.p8', // Path to the key p8 file
        keyId: 'B44W63EW8S', // The Key ID of the p8 file (available at https://developer.apple.com/account/ios/certificate/key)
        teamId: 'UM82D7D5C8', // The Team ID of your Apple Developer Account (available at https://developer.apple.com/account/#/membership/)
    },
    production: false // Set to true if sending a notification to a production iOS app
});

// Enter the device token from the Xcode console
var deviceToken = 'C3A08AC07080F28F0E0CBBAB7ACD6877ED4A8FF104D27A94138BB3C18EDBF520';

// Prepare a new notification
var notification = new apn.Notification();

// Specify your iOS app's Bundle ID (accessible within the project editor)
notification.topic = 'com.tokatlys-tantilizers.emotional-index-iOS';

// Set expiration to 1 hour from now (in case device is offline)
notification.expiry = Math.floor(Date.now() / 1000) + 3600;

// Set app badge indicator
notification.badge = 3;

// Play ping.aiff sound when the notification is received
notification.sound = 'ping.aiff';

// Display the following message (the actual notification text, supports emoji)
notification.alert = "A programmer is a person who fixes a problem that you don't know you have, in a way you don't understand.";

// Send any extra payload data with the notification which will be accessible to your app in didReceiveRemoteNotification
notification.payload = {id: 123};

// Actually send the notification
apnProvider.send(notification, deviceToken).then(function(result) {
    // Check the result for any failed devices
    console.log(result);
});
