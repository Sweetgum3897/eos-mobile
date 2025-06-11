import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete, Point } from 'react-native-google-places-autocomplete';

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
        <View style={{ padding: 6, marginTop: 20, height: '100%' }}>
          <GooglePlacesAutocomplete
            placeholder={t('requireBirthplace')}
            query={{
              key: googlePlacesApiKey,
              language: 'en', // language of the results
            }}
            fetchDetails={true}
            isRowScrollable={true}
            enablePoweredByContainer={false}
            listViewDisplayed={false}
            onPress={(data, details = null) => {
              setBirthPlace(details?.formatted_address);
              setUTCOffset((details?.utc_offset || 0) / 60);
              setGeometry(details?.geometry.location);
              setVisible(false);
            }}
            onFail={(error) => console.error(error)}
            styles={{
              textInput: {
                borderRadius: 13,
                borderColor: 'black',
                color: '#181818',
                borderWidth: 1,
                backgroundColor: 'transparent',
              },
            }}
            textInputProps={{
              placeholderTextColor: '#181818',
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
