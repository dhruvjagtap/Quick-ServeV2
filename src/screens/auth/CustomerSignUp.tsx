import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
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
  Home: undefined;
};

export default function CustomerSignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  const handleSignUp = async () => {
    if (loading) return;

    setLoading(true);
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password's doesn't match");
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      await userCredential.user.updateProfile({
        displayName: firstName + ' ' + lastName,
      });

      await firestore().collection('users').doc(userCredential.user.uid).set(
        {
          firstName,
          lastName,
          email,
          role: 'customer',
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true },
      );

      navigation.replace('Home');
    } catch (error: any) {
      console.log('Error creating account: ', error);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Email already in use. Please try another email.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid email format. Please enter a valid email.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Password is too weak. Please choose a stronger password.');
      } else {
        Alert.alert('An unexpected error occurred. Please try again later.');
      }
    }

    setLoading(false);
  };
  const login = () => {
    navigation.navigate('CustomerLogin');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.heading}>Customer Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter first name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter last name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <Ionicons
          name={showPassword ? 'eye-off' : 'eye'}
          style={styles.icon}
          size={20}
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm password"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Ionicons
          name={showConfirmPassword ? 'eye-off' : 'eye'}
          style={styles.icon}
          size={20}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </View>
      <Button
        title={loading ? 'Signing up...' : 'Sign Up'}
        onPress={handleSignUp}
        disabled={loading}
      />
      <TouchableOpacity onPress={login}>
        <Text style={styles.text}>Already have an Account ? Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  heading: {
    marginBottom: 30,
    fontSize: 24,
    color: '#34718F',
    fontWeight: '600',
  },

  input: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    height: 50,
    width: '100%',
    borderColor: '#34718F',
  },
  passwordContainer: {
    height: 50,
    borderWidth: 2,
    marginBottom: 30,
    borderRadius: 10,
    paddingHorizontal: 15,
    width: '100%',
    borderColor: '#34718F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    paddingHorizontal: 8,
    color: '#34718F',
  },

  text: {
    color: '#34718F',
  },
});
