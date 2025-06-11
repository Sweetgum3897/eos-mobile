import { PaymentSheetError, useStripe } from '@stripe/stripe-react-native';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { cancelMembership, getMemberships, storeMembership } from '@/actions';
import {
  cancelStripeSubscription,
  createStripeCustomer,
  createStripeSubscription,
} from '@/actions';
import {
  CollapsibleItem,
  CustomAlertModal,
  CustomConfirmModal,
  ModalWrapper,
  TextWrapper,
} from '@/components';
import { useAppStore } from '@/store';
import { TMembership } from '@/types';

const closeIcon = '../assets/svg/home/closeIcon.svg';
const nextIcon1 = '../assets/svg/home/nextIcon1.svg';

export const StellarGuidence = ({ close }: { close: () => void }) => {
  const { t } = useTranslation();

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [clientSecret, setClientSecret] = useState<string | undefined>();
  const [initializedPaymentSheet, setInitializedPaymentSheet] = useState(false);

  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const windowWidth = Dimensions.get('screen').width;

  const userInfo = useAppStore((state) => state.userInfo);
  const setUserInfo = useAppStore((state) => state.setUserInfo);
  const keys = useAppStore((state) => state.keys);
  const [visible, setVisible] = useState(true);
  const [membership, setMembership] = useState<TMembership | null>(null);
  const [memberships, setMemberships] = useState<TMembership[]>([]);

  const _close = () => {
    setVisible(!visible);
  };

  const handleSubscribeClientSecret = async () => {
    if (!userInfo.id) {
      return;
    }

    let stripeCustomerId = userInfo.stripeCustomerId;
    if (!stripeCustomerId) {
      const response = await createStripeCustomer();
      stripeCustomerId = response.data.id;
    }

    if (!stripeCustomerId) {
      setModalText(t('failedToCreateSubscription'));
      setVisibleModal(true);
      return;
    }

    if (!membership) {
      setModalText(t('Select a membership'));
      setVisibleModal(true);
      return;
    }

    if (!membership.priceId) {
      setModalText(t('priceDoesNotExist'));
      setVisibleModal(true);
      return;
    }

    if (!userInfo.stripeClientSecret) {
      const response = await createStripeSubscription(membership?.priceId).catch((error) => {
        return error.response;
      });

      if (response.data.clientSecret) {
        setClientSecret(response.data.clientSecret);
      }
    } else {
      setClientSecret(userInfo.stripeClientSecret);
    }
  };

  const handleSubscription = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      if (error.code === PaymentSheetError.Failed) {
        setModalText(error.message);
        setVisibleModal(true);
      } else if (error.code === PaymentSheetError.Canceled) {
        setModalText(error.message);
        setVisibleModal(true);
      }
    } else {
      setModalText(t('paymentSucceeded'));
      setVisibleModal(true);
      if (!membership) {
        return;
      }
      const response = await storeMembership(membership.id);
      if (response.status === 200 || response.status === 201) {
        setUserInfo({
          ...userInfo,
          membership,
        });
      }
    }
  };

  const fetchMemberships = async () => {
    try {
      const result = await getMemberships();
      if (result.data) {
        setMemberships(result.data);
        if (result.data.length > 0) {
          setMembership(
            result.data.find(
              (membership: TMembership) => membership.id === userInfo.membershipId,
            ) || result.data[0],
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  useEffect(() => {
    if (membership) {
      handleSubscribeClientSecret();
    }
  }, [membership]);

  useEffect(() => {
    const initializePaymentSheet = async () => {
      if (!clientSecret) {
        setInitializedPaymentSheet(false);
        return;
      }
      const { error } = await initPaymentSheet({
        merchantDisplayName: t('eosSubscription'),
        paymentIntentClientSecret: clientSecret,
        returnURL: 'stripe-example://payment-sheet',
        // Set `allowsDelayedPaymentMethods` to true if your business handles
        // delayed notification payment methods like US bank accounts.
        allowsDelayedPaymentMethods: true,
      });

      if (error) {
        setInitializedPaymentSheet(false);
      } else {
        setInitializedPaymentSheet(true);
      }
    };

    initializePaymentSheet();
  }, [clientSecret, initPaymentSheet]);

  return (
    <ModalWrapper visible={visible} onClose={close}>
      <ScrollView
        overScrollMode="never"
        style={{
          width: windowWidth,
        }}
      >
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 80,
            paddingBottom: 120,
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              borderRadius: 14,
              borderWidth: 3,
              borderColor: 'black',
              backgroundColor: '#F8F2EA',
              ...Styles.shadow,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                position: 'relative',
                alignItems: 'center',
                padding: 8,
                backgroundColor: '#181818',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            >
              <TouchableOpacity
                style={{ position: 'absolute', left: 10, top: 14 }}
                onPress={() => _close()}
              >
                <Image source={require(closeIcon)} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
              <TextWrapper style={{ color: 'white', fontSize: 24 }}>
                {t('stellarGuidancePass')}
              </TextWrapper>
            </View>
            <View
              style={{
                flexDirection: 'column',
                padding: 8,
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  position: 'relative',
                  width: '100%',
                }}
              >
                <TextWrapper
                  style={{
                    fontSize: 30,
                    color: 'black',
                    textAlign: 'center',
                    padding: 5,
                  }}
                >{`$${membership?.unitAmount}${(membership?.discountAmount || 0) > 0 ? `(${membership?.discountAmount}% saved)` : ''}`}</TextWrapper>

                {memberships
                  .filter((item) => item.id !== membership?.id)
                  .map((membership, ind) => (
                    <TouchableOpacity
                      key={ind}
                      style={{
                        width: 100,
                        height: 45,
                        padding: 5,
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                        backgroundColor: '#464646',
                        borderWidth: 1,
                        borderColor: 'black',
                        position: 'absolute',
                        right: -30,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => setMembership(membership)}
                    >
                      <TextWrapper style={{ color: 'white', fontSize: 16 }}>
                        {t(membership.name || '')}
                      </TextWrapper>
                    </TouchableOpacity>
                  ))}
              </View>

              <TextWrapper
                style={{
                  fontSize: 16,
                  color: 'black',
                  textAlign: 'center',
                  padding: 5,
                }}
              >
                {t(membership?.name || '')}
              </TextWrapper>
              <View style={{ flexDirection: 'column' }}>
                {membership?.membershipServices.map((item, key) => {
                  return <CollapsibleItem text={item.title} key={key} content={item.description} />;
                })}
              </View>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  borderRadius: 30,
                  borderColor: 'black',
                  borderWidth: 1,
                  flexDirection: 'row',
                  backgroundColor: '#464646',
                  padding: 10,
                  alignItems: 'center',
                  paddingHorizontal: 60,
                }}
                disabled={!initializedPaymentSheet || userInfo?.membershipId === membership?.id}
                onPress={() => handleSubscription()}
              >
                <TextWrapper
                  style={{
                    color: userInfo?.membershipId === membership?.id ? '#bdc1c6' : 'white',
                    fontSize: 18,
                    paddingHorizontal: 5,
                  }}
                >
                  {userInfo?.membershipId === membership?.id ? t('subscribed') : t('subscribe')}
                </TextWrapper>
                <Image source={require(nextIcon1)} style={{ width: 30, height: 18 }} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setVisibleConfirmModal(true)}
                disabled={!userInfo?.membershipId}
              >
                <TextWrapper
                  style={{
                    color: !userInfo?.membershipId ? '#e3794a' : 'red',
                    padding: 10,
                    textAlign: 'center',
                    fontSize: 16,
                  }}
                >
                  {t('cancelAnytime')}
                </TextWrapper>
              </TouchableOpacity>
            </View>
            <View
              style={{
                padding: 8,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <TextWrapper
                style={{
                  textDecorationLine: 'underline',
                  fontSize: 19,
                  color: 'black',
                }}
              >
                {t('termsOfService')}
              </TextWrapper>
              <TextWrapper
                style={{
                  textDecorationLine: 'underline',
                  fontSize: 19,
                  color: 'black',
                }}
              >
                {t('privacyPolicy')}
              </TextWrapper>
            </View>
          </View>
        </View>
      </ScrollView>
      <CustomAlertModal
        isVisible={visibleModal}
        onBackdropPress={() => setVisibleModal(false)}
        text={modalText}
      />
      <CustomConfirmModal
        isVisible={visibleConfirmModal}
        text={t('wantToCancelCurrentSubscription')}
        cancelButtonHandler={() => setVisibleConfirmModal(false)}
        confirmButtonHandler={() => {
          setVisibleConfirmModal(false);
          if (userInfo.id) {
            cancelStripeSubscription().then((data) => {
              if (data.status === 200) {
                setModalText(t('canceledYourSubscription'));
                setVisibleModal(true);
                setUserInfo({
                  ...userInfo,
                  membership: undefined,
                  membershipId: undefined,
                });

                cancelMembership();
              }
            });
          }
        }}
      />
    </ModalWrapper>
  );
};

const Styles = StyleSheet.create({
  shadow: {
    boxShadow: '5px 5px 1px 0px rgba(0, 0, 0, 0.6)',
    elevation: 8,
  },
});
