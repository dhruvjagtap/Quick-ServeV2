import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/Welcome';
import CustomerLogin from '../screens/auth/CustomerLogin';
import ProviderLogin from '../screens/auth/ProviderLogin';
import CustomerSignUp from '../screens/auth/CustomerSignUp';
import ProviderSignUp from '../screens/auth/ProviderSignUp';
const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="CustomerLogin" component={CustomerLogin} />
      <Stack.Screen name="ProviderLogin" component={ProviderLogin} />
      <Stack.Screen name="CustomerSignUp" component={CustomerSignUp} />
      <Stack.Screen name="ProviderSignUp" component={ProviderSignUp} />
    </Stack.Navigator>
  );
}
