import { apiKey, tpaApiUrl } from '.';

export type MatchInfo = {
  key: string;
  comp_level: string;
  set_number: number;
  match_number: number;
  alliances: {
    red: {
      score: number;
      team_keys: string[];
      surrogate_team_keys: string[];
      dq_team_keys: string[];
    };
    blue: {
      score: number;
      team_keys: string[];
      surrogate_team_keys: string[];
      dq_team_keys: string[];
    };
  };
  winning_alliance: 'red' | 'blue';
  event_key: string;
  time: number;
  actual_time: number;
  predicted_time: number;
  post_result_time: number;
  score_breakdown: { _: number }; // todo fix
  videos: {
    type: string;
    key: string;
  }[];
};

export const getMatch = async (matchKey: string) => {
  console.log('fetching event matches for ', matchKey);

  const res = await fetch(`${tpaApiUrl}/match/${matchKey}`, {
    method: 'GET',
    headers: {
      'X-TBA-Auth-Key': apiKey,
    },
  });

  const resp = (await res.json()) as MatchInfo;
  console.log('got event matches for ', matchKey, 'matches');
  return resp;
};
