import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { GlassPanel } from '../components/GlassPanel';
import { COLORS } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('muhaffiz@icbs.sch.id');
  const [password, setPassword] = useState('123456');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.bgOrb1} />
      <View style={styles.bgOrb2} />
      <GlassPanel style={styles.card}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Tahfidz ICBS</Text>
        <Text style={styles.subtitle}>Insan Cendekia Boarding School</Text>

        <TextInput
          placeholder="Username / No. HP / Email"
          placeholderTextColor="#64748b"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#64748b"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.replace('MuhaffizStudentList')}
        >
          <Text style={styles.btnText}>Masuk sebagai Muhaffiz</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.replace('WaliDashboard')}
        >
          <Text style={styles.btnText}>Masuk sebagai Wali Murid</Text>
        </TouchableOpacity>
      </GlassPanel>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    padding: 20,
  },
  bgOrb1: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(5, 150, 105, 0.25)',
    top: -40,
    left: -60,
  },
  bgOrb2: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(29, 78, 216, 0.2)',
    bottom: -40,
    right: -40,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  logo: { width: 84, height: 84, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.primary },
  subtitle: { fontSize: 13, color: COLORS.secondary, marginBottom: 20 },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    color: COLORS.textDark,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  secondaryBtn: {
    width: '100%',
    backgroundColor: COLORS.secondary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
