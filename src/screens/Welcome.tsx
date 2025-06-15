import { View, Text } from 'react-native';
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
    <View>
      <Text>Welcome to Quick Serve</Text>
      <Button title="Login as Customer" disabled={false} onPress={toCustomer} />
      <Button title="Login as Provider" disabled={false} onPress={toProvider} />
    </View>
  );
}
