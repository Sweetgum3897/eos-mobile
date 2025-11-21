import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete, Point } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';

import { TextWrapper } from '@/components/ui';
import { useAppStore } from '@/store';

export const SearchLocation = ({
  visible,
  setVisible,
  setBirthPlace,
  setUTCOffset,
  setGeometry,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setBirthPlace: (birthPlace?: string) => void;
  setUTCOffset: (utcOffset?: number) => void;
  setGeometry: (geometry?: Point) => void;
}) => {
  const { googlePlacesApiKey } = useAppStore((state) => state.keys);
  const { t } = useTranslation();

  const [location, setLocation] = useState<Region | null>(null);
  const [address, setAddress] = useState('');

  const handlePlaceSelect = (data: any, details: any | null) => {
    if (!details || !details.geometry) return;

    const { lat, lng } = details.geometry.location;
    console.log('details in googlepalces: ', lat, lng);

    setAddress(details.formatted_address);

    setLocation({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}
      transparent={true}
      statusBarTranslucent={true}
    >
      <View
        style={{
          backgroundColor: '#F8F2EA',
          padding: 10,
          paddingTop: 30,
          flex: 1,
        }}
      >
        <View>
          <TextWrapper style={{ paddingLeft: 5, color: 'black', fontSize: 20 }}>
            {t('searchYourLocation')}
          </TextWrapper>
          <TouchableOpacity
            style={{ position: 'absolute', right: 10, top: 10 }}
            onPress={() => setVisible(false)}
          >
            <MaterialCommunityIcons name="window-close" size={22} color="#757b93" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <GooglePlacesAutocomplete
            keyboardShouldPersistTaps="always"
            placeholder="Search"
            fetchDetails={true}
            onPress={handlePlaceSelect}
            minLength={2}
            debounce={300}
            currentLocation={false}
            enablePoweredByContainer={false}
            predefinedPlaces={[]}
            timeout={200}
            keepResultsAfterBlur={true}
            textInputProps={{
              onBlur: () => {
                console.warn('Blur');
              },
            }}
            query={{
              key: 'AIzaSyD2_WtpeE19mJhmdNIZjAXVKTIHktD4Z1I',
              language: 'en',
              location: '37.7749,-122.4194', // e.g., San Francisco
              radius: 30000,
            }}
            styles={{
              container: {
                position: 'absolute',
                top: 50,
                width: '100%',
                zIndex: 1,
              },
              listView: {
                backgroundColor: 'white',
              },
            }}
          />
          {address ? (
            <Image
              source={
                `https://maps.googleapis.com/maps/api/staticmap?center=` +
                address +
                `&zoom=12&size=400x300&key=AIzaSyD2_WtpeE19mJhmdNIZjAXVKTIHktD4Z1I`
              }
              style={{ width: 400, height: 300 }}
            />
          ) : null}
        </View>
      </View>
    </Modal>
  );
};
