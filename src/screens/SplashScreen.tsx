import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  CustomerLogin: undefined;
  CustomerSignUp: undefined;
  ProviderLogin: undefined;
  ProviderSignUp: undefined;
  Home: undefined;
};

// type SplashScreenProps = {
//   navigation: any;
//   route: any;
// };

export default function SplashScreen({ navigation }: any) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        navigation.replace('Welcome');
      }, 1000);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.logoText, { opacity }]}>
        Quick Serve
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#34718F',
  },
});
