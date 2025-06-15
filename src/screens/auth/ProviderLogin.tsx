import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type AuthStackParamList = {
  CustomerLogin: undefined;
  CustomerSignUp: undefined;
  ProviderSignUp: undefined;
  Home: undefined;
};

export default function ProviderLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  const handleLogin = async () => {
    if (loading) return;

    if (!email || !password) {
      Alert.alert('Please fill in all fields');
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const uid = userCredential.user.uid;

      const userDoc = await firestore().collection('user').doc(uid).get();

      if (!userDoc.exists) {
        Alert.alert('User data not found');
        setLoading(false);
        return;
      }

      const userData = userDoc.data();

      if (userData?.role === 'provider') {
        Alert.alert(
          'Login Successful',
          `Welcome back, ${userCredential.user.displayName?.split(' ')[0]}`,
        );
        navigation.replace('Home');
      } else {
        Alert.alert('Access Denied', 'You are not authorized as a customer.');
        await auth().signOut(); // Optional: Sign them out
      }
    } catch (error: any) {
      console.log('Login error:', error);
      Alert.alert('Login Failed', error.message || 'Something went wrong.');
    }

    setLoading(false);
  };

  const toSignUp = () => {
    navigation.navigate('ProviderSignUp');
  };

  const handleForgetPassword = () => {
    console.log('forget Password');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.heading}>Provider Login</Text>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
        />
        <Ionicons
          name={showPassword ? 'eye-off' : 'eye'}
          size={20}
          style={styles.icon}
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>
      <TouchableOpacity onPress={handleForgetPassword}>
        <Text style={styles.text}>Forget Password</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} disabled={loading} />
      </View>
      <TouchableOpacity style={styles.toggleContainer} onPress={toSignUp}>
        <Text style={styles.text}>Don't have an account ? Sign in </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  heading: {
    color: '#34718F',
    fontWeight: '600',
    fontSize: 24,
    marginBottom: 30,
    alignSelf: 'center',
  },

  input: {
    width: '100%',
    fontSize: 16,
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#34718F',
    marginBottom: 20,
    paddingHorizontal: 15,
  },

  passwordContainer: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#34718F',
    height: 50,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  passwordInput: {
    flex: 1,
    fontSize: 16,
  },

  icon: {
    color: '#34718F',
    paddingHorizontal: 8,
  },
  text: {
    color: '#34718F',
    paddingHorizontal: 5,
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    alignSelf: 'center',
    paddingLeft: 50,
  },
  toggleContainer: {
    alignSelf: 'center',
  },
});
