import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const NotificationScreen = () => {
  const { t } = useTranslation();
  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
      }}
    >
      <View style={{ ...styles.Wrapper, marginTop: 10 }}>
        <View
          style={{
            width: '100%',
            paddingLeft: 20,
            //   paddingVertical: 8,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity onPress={navigation.goBack}>
            <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 18,
              fontWeight: '500',
              marginLeft: 24,
            }}
          >
            {t('pushNotifications')}
          </Text>
        </View>

        <View style={styles.Wrapper}>
          <Text style={styles.title}>{t('acceptUshNotification')}</Text>
          <Text style={styles.nofication}>{t('findOutWhenFriendsAdd')}</Text>
          <Text style={styles.button} onPress={() => router.push('/login')}>
            {t('turnOnNotification')}
          </Text>
          <Text
            style={{ ...styles.button, marginTop: 24, borderColor: '#FFFFFF' }}
            onPress={() => router.push('/reset-password')}
          >
            {t('skip')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  Wrapper: {
    paddingHorizontal: 10,
    marginTop: 34,
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 400,
    textAlign: 'center',
  },
  nofication: {
    marginTop: 24,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 300,
    textAlign: 'center',
  },

  Input: {
    width: 74,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFF00',
    borderWidth: 1,
  },
  button: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderRadius: 10,
    borderColor: '#FDE74D',
    borderWidth: 0.7,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 400,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 60,
    width: 328,
  },
});
