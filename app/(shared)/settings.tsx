import { useNavigation } from 'expo-router';

import { Settings } from '@/sections';

export default function SettingsScreen() {
  const navigation = useNavigation();
  return <Settings close={() => navigation.goBack()} />;
}
