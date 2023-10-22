export function requestClientPermissions() {
  // Permissions must be requested from inside a user gesture, like a button.
  // Solution: intersitial page with a button to request permissions
  // https://stackoverflow.com/questions/60038191/why-does-notification-requestpermission-need-to-be-called-from-a-user-gesture

  // Permissions to request
  // Notification - user paging / queuing / etc
  // Push - link to notifications
  // Badging API - show a badge on the app icon
  // Background Sync - sync data in the background?
  // Media Session API - Pit Display (music controls)

  if (typeof window !== "undefined") {
    if ("Notification" in window) {
      Notification.requestPermission()
        .then((result) => {
          if (result === "granted") {
            console.log("Notification permission granted");
            new Notification("Thanks for subscribing!");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            console.log("Notification permission denied");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}

export function checkClientPermissions() {
  if (typeof window !== "undefined") {
    if ("Notification" in window) {
      return Notification.permission === "granted";
    }
  }
  return true;
}
