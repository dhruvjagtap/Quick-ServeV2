import { createStackNavigator } from '@react-navigation/stack';
import CustomerDrawerNavigator from './CustomerDrawerNavigator';
import ProviderDrawerNavigator from './ProviderDrawerNavigator';

const Stack = createStackNavigator();

export default function AppStack({
  role,
}: {
  role: 'customer' | 'provider' | string;
}) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MainApp"
        component={
          role == 'customer' ? CustomerDrawerNavigator : ProviderDrawerNavigator
        }
      />
    </Stack.Navigator>
  );
}
