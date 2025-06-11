import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

import { TAppStore, TNotification, TUserInfo } from '@/types';

export const getStorageData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    return null;
  }
};

export const setStorageData = async (key: string, value: any) => {
  try {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const useAppStore = create<TAppStore>((set) => {
  return {
    currentSplashStep: 0,
    authorized: false,
    phoneNumber: '',
    formatedPhoneNumber: '',
    emailId: '',
    userInfo: {},
    notifications: [],
    visibleSetting: false,
    visibleManageSubscription: false,
    visibleStellarGuidance: false,
    loginError: false,
    showedSplashScreen: false,
    showedTooltip: false,
    typeAddFriend: '',
    chartData: {},
    keys: {},
    setAuthorized: (authorized: boolean) => set(() => ({ authorized })),
    setTooltipVisibility: async (visible: boolean) => {
      set(() => ({ showedTooltip: visible }));
      setStorageData('hidden-tooltip', visible.toString());
    },
    logout: async () => {
      try {
        await AsyncStorage.removeItem('auth');
        set(() => ({ authorized: false }));
      } catch (error) {
        console.log(error);
      }
    },
    setUserInfo: async (userInfo: TUserInfo & { accessToken?: string; refreshToken?: string }) => {
      if (userInfo.accessToken) {
        await AsyncStorage.setItem('accessToken', userInfo.accessToken);
      }

      if (userInfo.refreshToken) {
        await AsyncStorage.setItem('refreshToken', userInfo.refreshToken);
      }
      await AsyncStorage.setItem('auth', JSON.stringify(userInfo));
      set(() => ({ userInfo }));
    },
    setNotifications: (notifications: TNotification[]) => {
      set(() => ({ notifications }));
    },
    setPhoneNumber: (number: string) => {
      set(() => ({ phoneNumber: number }));
    },
    setFormatedPhoneNumber: (number: string) => {
      set(() => ({ formatedPhoneNumber: number }));
    },
    setEmailId: (id: string) => {
      set(() => ({ emailId: id }));
    },
    setNextSplashStep: () => set((state) => ({ currentSplashStep: state.currentSplashStep + 1 })),
    setVisibleSetting: (visibleSetting) => {
      set(() => ({ visibleSetting }));
    },
    setVisibleManageSubscription: (visibleManageSubscription) => {
      set(() => ({
        visibleManageSubscription,
      }));
    },
    setVisibleStellarGuidance: (visibleStellarGuidance) => {
      set(() => ({
        visibleStellarGuidance,
      }));
    },
    setLoginError: (error: boolean) => {
      set(() => ({
        loginError: error,
      }));
    },
    setShowedSplashScreen: (showed: boolean) => {
      set(() => ({
        showedSplashScreen: showed,
      }));
    },
    setTypeAddFriend: (type: string) => {
      set(() => ({
        typeAddFriend: type,
      }));
    },
    setKeys: (keys: Record<string, string>) => {
      set(() => ({
        keys,
      }));
    },
    setChartData: (chartData: Record<string, string>) => {
      set(() => ({
        chartData,
      }));
    },
  };
});
