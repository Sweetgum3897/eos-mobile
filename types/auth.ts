import { TUserFriend } from './data';
import { TMembership, TUserSettings } from './settings';

export type TPlanet = {
  id: number;
  name: string;
  sign: string;
  fullDegree: number;
  normDegree: number;
  speed: number;
  isRetro: boolean;
  house: number;
};

export type TUserInfo = {
  id?: number;
  email?: string | null;
  username?: string | null;
  phonenumber?: string | null;
  password?: string | null;
  fullname?: string | null;
  birth?: string | null;
  gender?: boolean | null;
  location?: string | null;
  birthplace?: string | null;
  natalchart?: string | null;
  sunsign?: string | null;
  moonsign?: string | null;
  rising?: string | null;
  zipcode?: string | null;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  stripeClientSecret?: string | null;
  dailyDeepCount?: number | null;
  paidAt?: Date | null;
  avatar?: string | null;
  geometryLat?: number | null;
  geometryLng?: number | null;
  utcoffset?: number | null;
  color?: string | null;
  availableMessages?: number | null;
  purchaseMembership?: boolean | null;
  membershipId?: number | null;
  activityType?: number | null;
  activityEnabled?: boolean | null;

  membership?: TMembership;
  planets?: {
    id: number;
    userId: number;
    planetId: number;
    planet: TPlanet;
  }[];
  settings?: TUserSettings[];
  friends?: TUserFriend[];
};
