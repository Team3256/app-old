export type WebhookMessage<T> = {
  message_type: string;
  message_data: T;
};

export type VerificationMessageData = {
  verification_key: string;
};

export type PingMessageData = {
  title: string;
  desc: string;
};

export type BroadcastMessageData = {
  title: string;
  desc: string;
  url?: string;
};

export type MatchKeyData = {
  match_key: string;
};

export type EventKeyData = {
  event_key: string;
};

export type UpcomingMatchMessageData = {
  event_key: string;
  match_key: string;
  event_name: string;
  team_keys: string[];
  scheduled_time?: number;
  predicted_time?: number;
  webcast?: Webcast;
};

export type MatchScoreMessageData = {
  event_key: string;
  match_key: string;
  event_name: string;
  match: Match;
};

export type MatchVideoMessageData = {
  event_key: string;
  match_key: string;
  event_name: string;
  match: Match;
};

export type StartingCompLevelMessageData = {
  event_key: string;
  event_name: string;
  comp_level: string;
  scheduled_time?: number;
};

export type AllianceSelectionMessageData = {
  event_key: string;
  event_name: string;
  event: EventFRC;
};

export type AwardsPostedMessageData = {
  event_key: string;
  event_name: string;
  awards: Award[];
};

export type ScheduleUpdatedMessageData = {
  event_key: string;
  event_name: string;
  first_match_time?: number;
};

// Supporting types
export type Webcast = {
  type: string;
  channel: string;
};

export type Match = {
  comp_level: string;
  match_number: number;
  videos: Video[];
  time_string?: string;
  set_number: number;
  key: string;
  time?: number;
  score_breakdown?: any;
  alliances: {
    blue: ScoreDetail;
    red: ScoreDetail;
  };
  event_key: string;
};

export type Video = {
  key: string;
  type: string;
};

export type ScoreDetail = {
  score: number;
  teams: string[];
};

export type EventFRC = {
  key: string;
  website?: string;
  official: boolean;
  end_date: string;
  name: string;
  short_name: string;
  facebook_eid?: null;
  event_district_string?: string;
  venue_address: string;
  event_district?: number;
  location?: string;
  event_code: string;
  year: number;
  webcast: Webcast[];
  alliances: Alliance[];
  event_type_string?: string;
  start_date: string;
  event_type: number;
};

export type Award = {
  event_key: string;
  award_type: number;
  name: string;
  recipient_list: Recipient[];
  year: number;
};

export type Recipient = {
  team_number?: number;
  awardee?: string;
};

export type Alliance = {
  declines: string[];
  picks: string[];
};

// Utility export type which combines all message data types
export type AllMessageDataTypes =
  | VerificationMessageData
  | PingMessageData
  | BroadcastMessageData
  | UpcomingMatchMessageData
  | MatchScoreMessageData
  | MatchVideoMessageData
  | StartingCompLevelMessageData
  | AllianceSelectionMessageData
  | AwardsPostedMessageData
  | ScheduleUpdatedMessageData;
