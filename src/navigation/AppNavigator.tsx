import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import Welcome from '../screens/Welcome';
import CustomerLogin from '../screens/auth/CustomerLogin';
import ProviderLogin from '../screens/auth/ProviderLogin';
import CustomerSignUp from '../screens/auth/CustomerSignUp';
import ProviderSignUp from '../screens/auth/ProviderSignUp';
import Home from '../screens/Home';
import { NavigationContainer } from '@react-navigation/native';

type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  CustomerLogin: undefined;
  CustomerSignUp: undefined;
  ProviderLogin: undefined;
  ProviderSignUp: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="CustomerLogin" component={CustomerLogin} />
        <Stack.Screen name="ProviderLogin" component={ProviderLogin} />
        <Stack.Screen name="CustomerSignUp" component={CustomerSignUp} />
        <Stack.Screen name="ProviderSignUp" component={ProviderSignUp} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
