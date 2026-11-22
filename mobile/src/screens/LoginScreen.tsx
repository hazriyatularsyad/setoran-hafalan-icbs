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
  ScrollView,
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

  const handleLogin = () => {
    if (role === 'MUHAFFIZ') {
      navigation.replace('MuhaffizStudentList');
    } else {
      navigation.replace('WaliDashboard');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Top Campus Hero */}
      <View style={styles.hero}>
        <Image
          source={require('../../assets/campus-bg.jpg')}
          style={styles.heroBg}
          resizeMode="cover"
        />
        <View style={styles.heroScrim} />
        <View style={styles.heroContent}>
          <View style={styles.logoBox}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.heroTitle}>Tahfidz ICBS</Text>
          <Text style={styles.heroSub}>Insan Cendekia Boarding School</Text>
        </View>
      </View>

      {/* Bottom Curved Login Sheet */}
      <View style={styles.sheet}>
        <ScrollView
          contentContainerStyle={styles.sheetContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.welcomeTitle}>Assalamu'alaikum</Text>
          <Text style={styles.welcomeSub}>
            Pilih peran Anda untuk masuk ke aplikasi
          </Text>

          {/* Role Switch */}
          <View style={styles.roleSwitch}>
            {(['MUHAFFIZ', 'WALI'] as const).map((r) => {
              const active = role === r;
              return (
                <TouchableOpacity
                  key={r}
                  style={[
                    styles.roleBtn,
                    active && {
                      backgroundColor:
                        r === 'MUHAFFIZ' ? COLORS.primary : COLORS.accent,
                    },
                  ]}
                  onPress={() => {
                    setRole(r);
                    setUsername(
                      r === 'MUHAFFIZ'
                        ? 'muhaffiz@icbs.sch.id'
                        : 'wali@icbs.sch.id'
                    );
                  }}
                >
                  <Text
                    style={[
                      styles.roleText,
                      active && { color: '#fff', fontWeight: '700' },
                    ]}
                  >
                    {r === 'MUHAFFIZ' ? 'Muhaffiz' : 'Wali Murid'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>Username / No. HP</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Masukkan username"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordWrap}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Masukkan password"
              placeholderTextColor="#94a3b8"
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.toggleText}>
                {showPassword ? 'Tutup' : 'Lihat'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.submitBtn,
              {
                backgroundColor:
                  role === 'MUHAFFIZ' ? COLORS.primary : COLORS.accent,
              },
            ]}
            onPress={handleLogin}
          >
            <Text style={styles.submitText}>
              Masuk sebagai {role === 'MUHAFFIZ' ? 'Muhaffiz' : 'Wali Murid'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            TA 2026/2027 • Pemantauan Hafalan Al-Qur'an
          </Text>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#064E3B' },
  hero: {
    height: '50%',
    minHeight: 320,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  heroBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  heroScrim: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(6, 78, 59, 0.72)',
  },
  heroContent: { alignItems: 'center', paddingTop: 20 },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  logo: { width: 54, height: 54 },
  heroTitle: { fontSize: 24, fontWeight: '800', color: '#fff', letterSpacing: 0.4 },
  heroSub: { fontSize: 12, color: '#FDE68A', fontWeight: '600', marginTop: 3 },

  sheet: {
    flex: 1,
    backgroundColor: '#EEF2F6',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    marginTop: -24,
    overflow: 'hidden',
  },
  sheetContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding: 20,
    paddingTop: 24,
    paddingBottom: 32,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  welcomeTitle: { fontSize: 22, fontWeight: '800', color: '#0f172a' },
  welcomeSub: { fontSize: 13, color: '#64748b', marginTop: 4, marginBottom: 18 },

  roleSwitch: {
    flexDirection: 'row',
    backgroundColor: '#EEF2F6',
    borderRadius: 16,
    padding: 5,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#94a3b8',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 4, height: 4 },
  },
  roleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  roleText: { fontSize: 13, fontWeight: '600', color: '#475569' },

  label: { fontSize: 12, fontWeight: '700', color: '#334155', marginBottom: 6 },
  input: {
    backgroundColor: '#E6EBF1',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0f172a',
    marginBottom: 10,
    shadowColor: '#94a3b8',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 2, height: 2 },
  },
  passwordWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6EBF1',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
    shadowColor: '#94a3b8',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 2, height: 2 },
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0f172a',
  },
  toggleText: { fontSize: 12, fontWeight: '700', color: '#d97706' },

  submitBtn: {
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    shadowColor: '#0f172a',
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 4, height: 6 },
  },
  submitText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  footer: {
    marginTop: 16,
    marginBottom: 14,
    textAlign: 'center',
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
  },
  neuInfoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  neuInfoCard: {
    flex: 1,
    backgroundColor: '#EEF2F6',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#94a3b8',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 4, height: 4 },
  },
  neuInfoTitle: { fontSize: 12, fontWeight: '700', color: '#1e293b' },
  neuInfoSub: { fontSize: 11, color: '#64748b', marginTop: 2 },
});
