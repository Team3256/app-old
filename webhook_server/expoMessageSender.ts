import { Expo, ExpoPushErrorTicket } from 'expo-server-sdk';
import { ExpoPushMessage } from 'expo-server-sdk';
let expo = new Expo({
  accessToken: 'EXP_ACCESS_TOKEN',
});

// A function to remove people that no longer have the app from the database.
export function removeInvalidTokens(tickets: ExpoPushErrorTicket[]) {
  if (tickets[0].details?.error === 'DeviceNotRegistered') {
    // Find the token that caused the error
    // @ts-ignore
    const token = tickets[0].message?.to;
    // Remove the token from the database
    // db.removeToken(token);
  }
}

// A function to send one message to a lot of users using the Expo push notification service.
export function broadcast(message: string) {
  // get the push tokens from the database
  // let pushTokens = db.getPushTokens(); or something like that
  let pushTokens = ['ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]'];
  let messages: ExpoPushMessage[] = []; // Define the type as ExpoPushMessage[]
  messages.push({
    to: pushTokens,
    sound: 'default',
    body: message,
    data: { withSome: 'data' },
  });
  let chunks = expo.chunkPushNotifications(messages);
  let tickets: any[] = [];
  // Add your code here
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        // @ts-ignore
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();
  removeInvalidTokens(tickets);
}
