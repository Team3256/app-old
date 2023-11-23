import fetch from 'node-fetch';

export function sendToWebhook(message: string, webhookURL: URL): void {
  const data = {
    content: message,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  fetch(webhookURL, options)
    .then((res: any) => res.json())
    .then((res: any) => console.log(res));
}
