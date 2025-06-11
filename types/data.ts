import { TUserInfo } from './auth';

export type TAppData = {
  showedSplashScreen?: boolean;
};

export type TKeys = {
  stripePublishableKey?: string;
  googlePlacesApiKey?: string;
  imageServer?: string;
  contactEmail?: string;
  contactWebPage?: string;
};

export type TNotification = {
  id: number;
  title: string;
  type: number;
  content: string;
  createdAt: string;
  createdBy: number;
};

export type TFriend = {
  id: number | null;
  email: string | null;
  phonenumber: string | null;
  username: string | null;
  sunsign: string | null;
  moonsign: string | null;
  rising: string | null;
  birth: string | null;
};

export type TUserFriend = {
  id: number;
  userId: number;
  friendId: number;
  accepted: boolean;

  friend?: TFriend;
};

export type TAppStore = {
  currentSplashStep: number;
  authorized: boolean;
  phoneNumber: string;
  formatedPhoneNumber: string;
  emailId: string;
  userInfo: TUserInfo;
  notifications: TNotification[];
  visibleSetting: boolean;
  visibleManageSubscription: boolean;
  visibleStellarGuidance: boolean;
  loginError: boolean;
  showedSplashScreen: boolean;
  showedTooltip: boolean;
  typeAddFriend: string;
  chartData: Record<string, any>;
  keys: TKeys;
  logout: () => void;
  setAuthorized: (authorized: boolean) => void;
  setNotifications: (notifications: TNotification[]) => void;
  setTooltipVisibility: (visible: boolean) => void;
  setUserInfo: (userInfo: TUserInfo) => void;
  setPhoneNumber: (number: string) => void;
  setFormatedPhoneNumber: (number: string) => void;
  setEmailId: (id: string) => void;
  setNextSplashStep: () => void;
  setVisibleSetting: (value: boolean) => void;
  setVisibleManageSubscription: (value: boolean) => void;
  setVisibleStellarGuidance: (value: boolean) => void;
  setLoginError: (error: boolean) => void;
  setShowedSplashScreen: (showed: boolean) => void;
  setTypeAddFriend: (type: string) => void;
  setKeys: (keys: TKeys) => void;
  setChartData: (chartData: Record<string, any>) => void;
};

export type TDescription = { title: string; description: string };

export type TLPContent = {
  title: string;
  content: {
    title: string;
    description: {
      text: string;
      li?: string[];
    }[];
  }[];
};
