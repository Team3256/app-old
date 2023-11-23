import fastify from 'fastify';
import {
  AllMessageDataTypes,
  BroadcastMessageData,
  PingMessageData,
  UpcomingMatchMessageData,
  VerificationMessageData,
  WebhookMessage,
} from './messageTypes';
import { broadcast } from './expoMessageSender';
import { sendToWebhook } from './discordWebhookSender';

const app = fastify({ logger: true });

// @ts-ignore
app.post('/webhook', async (request: any, reply: any) => {
  const webhookMessage = request.body as WebhookMessage<AllMessageDataTypes>;

  // Based on the message_type, you can perform different actions
  switch (webhookMessage.message_type) {
    case 'verification':
      console.log(typeof webhookMessage);
      // Type cast the message data to the correct type
      const verificationData =
        webhookMessage.message_data as unknown as WebhookMessage<VerificationMessageData>;
      console.log('TBA Webhook Key: ' + verificationData.message_data.verification_key);
      process.exit(0);
      break;
    case 'ping':
      const pingData = webhookMessage.message_data as unknown as WebhookMessage<PingMessageData>;
      console.log(
        'Ping received at ' +
          pingData.message_data.title +
          ' with desc ' +
          pingData.message_data.desc
      );
      break;
    case 'broadcast':
      const broadcastData =
        webhookMessage.message_data as unknown as WebhookMessage<BroadcastMessageData>;
      console.log(
        'Broadcast received at ' +
          broadcastData.message_data.title +
          ' with desc ' +
          broadcastData.message_data.desc +
          ' and url ' +
          broadcastData.message_data.url
      );

      break;
    case 'upcoming_match':
      const upcomingMatchData =
        webhookMessage.message_data as unknown as WebhookMessage<UpcomingMatchMessageData>;
      console.log(
        'Upcoming Match: ' +
          upcomingMatchData.message_data.match_key +
          ' at ' +
          upcomingMatchData.message_data.predicted_time
      );
      broadcast(
        'Upcoming Match: ' +
          upcomingMatchData.message_data.match_key +
          ' at ' +
          upcomingMatchData.message_data.predicted_time
      );
      sendToWebhook(
        'Upcoming Match: ' +
          upcomingMatchData.message_data.match_key +
          ' @ ' +
          upcomingMatchData.message_data.predicted_time,
        new URL(
          'https://discord.com/api/webhooks/626821215352520714/1k04D4X6TSAa58QpEZ0r7ae9AVxbXdvzqhJVEs4AxwmktpQa24Q3LWZUQu9Zi9dNNkBp'
        )
      );
      break;
    // Add remaining cases for other message types, not planned for now.
    default:
      // Handle unknown message type.
      app.log.error('Unknown message type', webhookMessage.message_type);
      break;
  }

  // Reply with a success status code
  return reply.status(200).send({ status: 'ok' });
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    app.log.info(`server listening on 0.0.0.0:3000`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
