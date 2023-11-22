// docs: https://www.thebluealliance.com/apidocs/v3
export const tpaApiUrl = 'https://www.thebluealliance.com/api/v3';
export const statboticsApiUrl = 'https://api.statbotics.io/v2';
export const apiKey = process.env.TBA_API_KEY || "whoops! shouldn't see this!";
if (!apiKey || apiKey.includes('whoops')) {
  throw new Error('no TBA API key found');
}
