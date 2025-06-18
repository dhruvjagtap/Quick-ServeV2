import { createStackNavigator } from '@react-navigation/stack';
import CustomerDrawerNavigator from './CustomerDrawerNavigator';
import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SplashScreen from '../screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

type role = 'customer' | 'provider';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [role, setRole] = useState<'customer' | 'provider' | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      setUser(user);

      if (user) {
        const userDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();
        const data = userDoc.data();
        if (data?.role === 'customer' || data?.role === 'provider') {
          setRole(data.role);
        }
      }
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) {
    return <SplashScreen navigation={{ replace: () => {} }} />; // fallback for initial check
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {initializing ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : user && role ? (
          <Stack.Screen name="AppStack">
            {() => <AppStack role={role} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// i am creating service app in which providers can provide local services like plumbing etc
// so what in my app flow is splash screen -> welcome screen with two login buttons customer or provider -> login page
// as selected -> home screen the problem is after login of user if user press back they again
//  navigates to welcom page and i want to avoid that after successful login user should navigate
//  to Home page on their roles stored in firestore both the home page are same for both users but
//  only key difference is that the side drawer content is different can you help me to design i
// have also created a custom navbar with a menu button on click the drawer should be
