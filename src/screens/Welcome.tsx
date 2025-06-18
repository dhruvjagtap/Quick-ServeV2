import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AuthStackParamList = {
  ProviderLogin: undefined;
  CustomerLogin: undefined;
  Home: undefined;
};

export default function Welcome() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const toCustomer = () => {
    navigation.navigate('CustomerLogin');
  };

  const toProvider = () => {
    navigation.navigate('ProviderLogin');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Quick Serve</Text>
      <Button title="Login as Customer" disabled={false} onPress={toCustomer} />
      <Button title="Login as Provider" disabled={false} onPress={toProvider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },

  heading: {
    color: '#34718F',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
  },
});
