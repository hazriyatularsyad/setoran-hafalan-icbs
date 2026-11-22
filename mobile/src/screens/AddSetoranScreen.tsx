import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme';
import { GlassPanel } from '../components/GlassPanel';

export default function AddSetoranScreen() {
  const navigation = useNavigation();
  const [type, setType] = useState<'ZIYADAH' | 'MURAJAAH' | 'TASMI'>('ZIYADAH');
  const [juz, setJuz] = useState('30');
  const [surah, setSurah] = useState('An-Naba');
  const [ayahStart, setAyahStart] = useState('1');
  const [ayahEnd, setAyahEnd] = useState('20');
  const [score, setScore] = useState('92');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    Alert.alert('Tersimpan', `Setoran ${type} (${surah}: ${ayahStart}-${ayahEnd}) disimpan!`);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, paddingTop: 48 }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 12 }}>
        <Text style={{ color: COLORS.secondary, fontWeight: '600' }}>← Batal</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Input Setoran Hafalan</Text>

      <GlassPanel style={styles.formCard}>
        <Text style={styles.label}>Jenis Setoran</Text>
        <View style={styles.typeRow}>
          {(['ZIYADAH', 'MURAJAAH', 'TASMI'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.typeBtn, type === t && styles.typeBtnActive]}
              onPress={() => setType(t)}
            >
              <Text style={[styles.typeText, type === t && styles.typeTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Juz (1-30)</Text>
        <TextInput value={juz} onChangeText={setJuz} keyboardType="numeric" style={styles.input} />

        <Text style={styles.label}>Nama Surah</Text>
        <TextInput value={surah} onChangeText={setSurah} style={styles.input} />

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.label}>Ayat Awal</Text>
            <TextInput value={ayahStart} onChangeText={setAyahStart} keyboardType="numeric" style={styles.input} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Ayat Akhir</Text>
            <TextInput value={ayahEnd} onChangeText={setAyahEnd} keyboardType="numeric" style={styles.input} />
          </View>
        </View>

        <Text style={styles.label}>Nilai (0-100)</Text>
        <TextInput value={score} onChangeText={setScore} keyboardType="numeric" style={styles.input} />

        <Text style={styles.label}>Catatan Tajwid</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Contoh: Mad wajib muttashil perlu diperhatikan"
          multiline
          style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Simpan Setoran</Text>
        </TouchableOpacity>
      </GlassPanel>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ecfdf5' },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.textDark, marginBottom: 16 },
  formCard: { padding: 16, backgroundColor: 'rgba(255,255,255,0.75)' },
  label: { fontSize: 13, fontWeight: '600', color: COLORS.textDark, marginBottom: 6, marginTop: 8 },
  typeRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  typeBtn: { flex: 1, padding: 10, borderRadius: 8, backgroundColor: '#e2e8f0', alignItems: 'center' },
  typeBtnActive: { backgroundColor: COLORS.primary },
  typeText: { fontSize: 12, fontWeight: '600', color: '#475569' },
  typeTextActive: { color: '#fff' },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
  row: { flexDirection: 'row' },
  saveBtn: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
