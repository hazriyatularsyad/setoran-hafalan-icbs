import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { GlassPanel } from '../components/GlassPanel';
import { COLORS } from '../theme';

type DetailRouteProp = RouteProp<RootStackParamList, 'StudentDetail'>;
type NavProp = NativeStackNavigationProp<RootStackParamList, 'StudentDetail'>;

export default function StudentDetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const navigation = useNavigation<NavProp>();
  const { studentId } = route.params;
  const [flipped, setFlipped] = useState(false);

  const student = {
    nis: '2026  0108  0042',
    full_name: 'Ahmad Hasyim',
    class_name: '8A',
    dormitory: 'Asrama Umar bin Khattab',
    total_juz: 12,
    current_muhaffiz_name: 'Ust. Budi Santoso',
    wali_name: 'Bpk. Rizal',
    qr_id: `ICBS-20260108004${studentId}`,
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Kembali</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>Profil Santri</Text>
        <View style={{ width: 60 }} />
      </View>

      <Pressable onPress={() => setFlipped(!flipped)} style={styles.cardWrapper}>
        <GlassPanel style={styles.creditCard}>
          {!flipped ? (
            <View style={styles.cardFace}>
              <View style={styles.cardHeader}>
                <View style={styles.chip} />
                <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
              </View>
              <Text style={styles.nis}>{student.nis}</Text>
              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.name}>{student.full_name}</Text>
                  <Text style={styles.info}>{student.class_name} • {student.dormitory}</Text>
                </View>
                <View style={styles.juzBadge}>
                  <Text style={styles.juzText}>{student.total_juz} Juz</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.cardFace}>
              <Text style={styles.backLabel}>INFORMASI HALAQAH</Text>
              <Text style={styles.backValue}>Muhaffiz: {student.current_muhaffiz_name}</Text>
              <Text style={styles.backValue}>Wali Murid: {student.wali_name}</Text>
              <Text style={styles.backValue}>Status: Santri Aktif</Text>
              <Text style={styles.qrText}>QR ID: {student.qr_id}</Text>
            </View>
          )}
        </GlassPanel>
        <Text style={styles.flipHint}>Ketuk kartu untuk membalik</Text>
      </Pressable>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddSetoran', { studentId })}
      >
        <Text style={styles.addButtonText}>+ Tambah Setoran</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ecfdf5', alignItems: 'center' },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  backText: { color: COLORS.secondary, fontWeight: '600', fontSize: 15 },
  topTitle: { fontSize: 17, fontWeight: '700', color: COLORS.textDark },
  cardWrapper: { marginTop: 24, alignItems: 'center', width: '90%', maxWidth: 360 },
  creditCard: {
    width: '100%',
    height: 210,
    padding: 20,
    backgroundColor: 'rgba(5, 150, 105, 0.88)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  cardFace: { flex: 1, justifyContent: 'space-between' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chip: { width: 42, height: 30, borderRadius: 6, backgroundColor: COLORS.accent },
  logo: { width: 40, height: 40 },
  nis: { color: '#fff', fontSize: 18, fontWeight: '700', letterSpacing: 2 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  name: { color: '#fff', fontSize: 17, fontWeight: '700' },
  info: { color: 'rgba(255,255,255,0.85)', fontSize: 12, marginTop: 2 },
  juzBadge: { backgroundColor: COLORS.accent, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  juzText: { color: '#111827', fontWeight: '700', fontSize: 13 },
  backLabel: { color: COLORS.accent, fontWeight: '700', fontSize: 12, letterSpacing: 1 },
  backValue: { color: '#fff', fontSize: 14, fontWeight: '500' },
  qrText: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 8 },
  flipHint: { fontSize: 12, color: '#64748b', marginTop: 8 },
  addButton: {
    marginTop: 28,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  addButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
