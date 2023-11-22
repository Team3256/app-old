import { apiKey, tpaApiUrl } from '.';
import { type TeamInfo } from './team';

export const getEventTeams = async (eventKey: string) => {
  const res = await fetch(`${tpaApiUrl}/event/${eventKey}/teams/simple`, {
    method: 'GET',
    headers: {
      'X-TBA-Auth-Key': apiKey,
    },
  });

  return (await res.json()) as TeamInfo[];
};

export type EventInfo = {
  key: string;
  name: string;
  event_code: string;
  event_type: number;
  district: {
    abbreviation: string;
    display_name: string;
    key: string;
    year: number;
  };
  city: string;
  state_prov: string;
  country: string;
  start_date: string;
  end_date: string;
  year: number;
};
export const getEventInfo = async (eventKey: string): Promise<EventInfo> => {
  const res = await fetch(`${tpaApiUrl}/event/${eventKey}/simple`, {
    method: 'GET',
    headers: {
      'X-TBA-Auth-Key': apiKey,
    },
  });

  return (await res.json()) as EventInfo;
};

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

export const getEventMatches = async (eventKey: string) => {
  console.log('fetching event matches for ', eventKey);

  const res = await fetch(`${tpaApiUrl}/event/${eventKey}/matches`, {
    method: 'GET',
    headers: {
      'X-TBA-Auth-Key': apiKey,
    },
  });

  const resp = (await res.json()) as MatchInfo[];
  console.log('got event matches for ', eventKey, resp.length, 'matches');
  return resp;
};
