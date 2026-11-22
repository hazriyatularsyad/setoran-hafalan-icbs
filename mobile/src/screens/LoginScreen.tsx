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
import { COLORS } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [role, setRole] = useState<'MUHAFFIZ' | 'WALI'>('MUHAFFIZ');
  const [username, setUsername] = useState('muhaffiz@icbs.sch.id');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = () => {
    if (role === 'MUHAFFIZ') {
      navigation.replace('MuhaffizStudentList');
    } else {
      navigation.replace('WaliDashboard');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Background */}

      {/* Brand Header */}
      <View style={styles.brandHeader}>
        <View style={styles.logoBadge}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logoSmall}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.brandTitle}>Tahfidz ICBS</Text>
        <Text style={styles.brandSub}>Insan Cendekia Boarding School</Text>
      </View>

      {/* Frosted Glass Card */}
      <View style={styles.glassCard}>
        {/* Role Segmented Switch */}
        <View style={styles.roleSwitch}>
          {(['MUHAFFIZ', 'WALI'] as const).map((r) => (
            <TouchableOpacity
              key={r}
              style={[styles.roleTab, role === r && styles.roleTabActive]}
              onPress={() => {
                setRole(r);
                setUsername(r === 'MUHAFFIZ' ? 'muhaffiz@icbs.sch.id' : 'wali@icbs.sch.id');
              }}
            >
              <Text style={[styles.roleText, role === r && styles.roleTextActive]}>
                {r === 'MUHAFFIZ' ? 'Muhaffiz' : 'Wali Murid'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.cardTitle}>Masuk ke Akun</Text>

        <Text style={styles.label}>Username / No. HP</Text>
        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Masukkan username"
            placeholderTextColor="rgba(255,255,255,0.45)"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Masukkan password"
            placeholderTextColor="rgba(255,255,255,0.45)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.toggleText}>{showPassword ? 'Tutup' : 'Lihat'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.rememberRow}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
            {rememberMe && <Text style={styles.checkMark}>✓</Text>}
          </View>
          <Text style={styles.rememberText}>Ingat saya di perangkat ini</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.loginBtn,
            { backgroundColor: role === 'MUHAFFIZ' ? COLORS.primary : COLORS.secondary },
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.loginBtnText}>
            Masuk sebagai {role === 'MUHAFFIZ' ? 'Muhaffiz' : 'Wali Murid'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#042F2E',
    padding: 20,
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: 22,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  logoSmall: { width: 48, height: 48 },
  brandTitle: { fontSize: 22, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  brandSub: { fontSize: 12, color: '#FDE68A', fontWeight: '600', marginTop: 2 },

  glassCard: {
    width: '100%',
    maxWidth: 370,
    padding: 22,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  roleSwitch: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 18,
  },
  roleTab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 9,
    alignItems: 'center',
  },
  roleTabActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  roleText: { fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.75)' },
  roleTextActive: { color: '#042F2E', fontWeight: '700' },

  cardTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 14 },
  label: { fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,0.8)', marginBottom: 6 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 14,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  input: { flex: 1, paddingVertical: 11, color: '#fff', fontSize: 14 },
  toggleText: { fontSize: 12, fontWeight: '700', color: '#FACC15' },

  rememberRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  checkMark: { color: '#fff', fontSize: 11, fontWeight: '800' },
  rememberText: { color: 'rgba(255,255,255,0.85)', fontSize: 12 },

  loginBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
