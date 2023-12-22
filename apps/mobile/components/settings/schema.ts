import { deepFreeze } from '../../utils/deepFreeze';

export const SettingsSchemaVersion = 1;

export enum PushNotificationSound {
  default = 'Default',
  chime = 'Chime',
  special_chime_f1 = 'Chime (1)', // The f1 radio chime
  special_chime_otv = 'Chime (2)', // OfflineTV's chime
  none = 'None',
}

export type UserSettingsSchema = {
  pushNotificationsGlobal: boolean;
  pushNotificationsSound: PushNotificationSound;
  pushNotifications: {
    upcomingMatches: boolean;
    allianceSelection: boolean;
    matchScorePublish: boolean;
    upcomingScouting: boolean;
    pageNotifications: boolean;
    accountNotifications: boolean;
  };
  darkMode: boolean;
  _meta: {
    version: number; // Schema version. Increment when changing schema.
  };
};

export const DefaultUserSettings: Readonly<UserSettingsSchema> = {
  pushNotificationsGlobal: true,
  pushNotificationsSound: PushNotificationSound.default,
  pushNotifications: {
    upcomingMatches: true,
    allianceSelection: true,
    matchScorePublish: true,
    upcomingScouting: true,
    pageNotifications: true,
    accountNotifications: true,
  },
  darkMode: false,
  _meta: {
    version: SettingsSchemaVersion,
  },
};

if (process.env.NODE_ENV !== 'production') {
  deepFreeze(DefaultUserSettings);

  // Check that DefaultUserSettings is actually immutable
  DefaultUserSettings.pushNotifications.upcomingMatches = false;
  if (!DefaultUserSettings.pushNotifications.upcomingMatches) {
    throw new Error('DefaultUserSettings is not immutable!');
  }
}
