import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlassPanel } from '../components/GlassPanel';
import { COLORS } from '../theme';

export default function ReportScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <GlassPanel style={styles.card}>
        <Text style={styles.title}>Rapor Tahfidz ICBS</Text>
        <Text style={styles.sub}>Periode: Semester Ganjil 2026</Text>
        <Text style={styles.info}>Santri: Ahmad Hasyim (8A - Asrama Umar bin Khattab)</Text>
        <Text style={styles.info}>Total Capaian: 12 Juz • Rata-rata Nilai: 92.5</Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => Alert.alert('Rapor PDF', 'Rapor PDF siap diunduh setelah terhubung ke backend.')}
        >
          <Text style={styles.btnText}>Unduh PDF Rapor</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 16 }}>
          <Text style={{ color: COLORS.secondary, fontWeight: '600' }}>← Kembali ke Dashboard</Text>
        </TouchableOpacity>
      </GlassPanel>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ecfdf5', padding: 20 },
  card: { width: '100%', maxWidth: 380, padding: 24, backgroundColor: 'rgba(255,255,255,0.8)', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', color: COLORS.primary, marginBottom: 6 },
  sub: { fontSize: 14, color: COLORS.secondary, marginBottom: 16 },
  info: { fontSize: 14, color: COLORS.textDark, marginBottom: 6, textAlign: 'center' },
  btn: { marginTop: 18, backgroundColor: COLORS.primary, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 10 },
  btnText: { color: '#fff', fontWeight: '700' },
});
