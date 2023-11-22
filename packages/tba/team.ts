import { apiKey, tpaApiUrl } from '.';

export type TeamInfo = {
  key: string;
  team_number: number;
  nickname: string;
  name: string;
  city: string;
  state_prov: string;
  country: string;
};
export const getTeamInfo = async (number: number) => {
  const res = await fetch(`${tpaApiUrl}/team/frc${number}/simple`, {
    method: 'GET',
    headers: {
      'X-TBA-Auth-Key': apiKey,
    },
  });

  return (await res.json()) as TeamInfo;
};

export type TeamStatus = {
  qual: {
    num_teams: number;
    ranking: {
      matches_played: number;
      qual_average: number;
      sort_orders: number[];
      record: {
        losses: number;
        wins: number;
        ties: number;
      };
      rank: number;
      dq: number;
      team_key: string;
    };
    sort_order_info: {
      precision: number;
      name: string;
    }[];
    status: string;
  };
  alliance: {
    name: string;
    number: number;
    backup: {
      out: string;
      in: string;
    };
    pick: number;
  };
  playoff: {
    level: string;
    current_level_record: {
      losses: number;
      wins: number;
      ties: number;
    };
    record: {
      losses: number;
      wins: number;
      ties: number;
    };
    status: string;
    playoff_average: number;
  };
  alliance_status_str: string;
  playoff_status_str: string;
  overall_status_str: string;
  next_match_key: string;
  last_match_key: string;
};

export type TeamEventResponse = {
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
  start_date: string; // yyyy-mm-dd
  end_date: string; // yyyy-mm-dd
  year: number;
};
export const getTeamEvents = async (number: number, year: number) => {
  const res = await fetch(`${tpaApiUrl}/team/frc${number}/events/${year}/simple`, {
    method: 'GET',
    headers: {
      'X-TBA-Auth-Key': apiKey,
    },
  });

  return (await res.json()) as TeamEventResponse[];
};

export const getTeamStatuses = async (eventKey: string) => {
  const res = await fetch(`${tpaApiUrl}/event/${eventKey}/teams/statuses`, {
    method: 'GET',
    headers: {
      'X-TBA-Auth-Key': apiKey,
    },
  });
  return (await res.json()) as { [key: string]: TeamStatus };
};

// export const getTeamEPAForEvent = async (number: number, eventKey: string): Promise<TeamEventEPAInfo> => {
//     const res = await fetch(`${statboticsApiUrl}/team_event/${number}/${eventKey}`, {
//         method: GET,
//     });
//
//     return (await res.json()) as TeamEventEPAInfo;
// };

export type TeamEventEPAInfo = {
  team: number;
  year: number;
  event: string;
  offseason: boolean;
  team_name: string;
  event_name: string;
  state: string;
  country: string;
  type: number;
  week: number;
  status: string;
  epa_start: number;
  epa_pre_playoffs: number;
  epa_end: number;
  epa_mean: number;
  epa_max: number;
  epa_diff: number;
  auto_epa_start: number;
  auto_epa_pre_playoffs: number;
  auto_epa_end: number;
  auto_epa_mean: number;
  auto_epa_max: number;
  teleop_epa_start: number;
  teleop_epa_pre_playoffs: number;
  teleop_epa_end: number;
  teleop_epa_mean: number;
  teleop_epa_max: number;
  endgame_epa_start: number;
  endgame_epa_pre_playoffs: number;
  endgame_epa_end: number;
  endgame_epa_mean: number;
  endgame_epa_max: number;
  rp_1_epa_start: number;
  rp_1_epa_end: number;
  rp_1_epa_mean: number;
  rp_1_epa_max: number;
  rp_2_epa_start: number;
  rp_2_epa_end: number;
  rp_2_epa_mean: number;
  rp_2_epa_max: number;
  wins: number;
  losses: number;
  ties: number;
  count: number;
  winrate: number;
  qual_wins: number;
  qual_losses: number;
  qual_ties: number;
  qual_count: number;
  rps: number;
  rps_per_match: number;
  rank: number;
  num_teams: number;
};
