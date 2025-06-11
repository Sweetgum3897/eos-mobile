export type TMembershipService = {
  title: string;
  description: string;
};

export type TMembership = {
  id: number;
  name: string;
  unitAmount: string;
  currency: string;
  recurring: string;
  priceId: string;
  active: boolean;
  discountAmount: number;
  membershipServices: TMembershipService[];
};

export type TSetting = {
  id: number;
  title: string;
};

export type TUserSettings = {
  id: number;
  enable: boolean;
  userId: number;
  settingId: number;

  setting: TSetting;
};
