import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { GlassPanel } from '../components/GlassPanel';
import { COLORS } from '../theme';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'MuhaffizStudentList'>;

const MOCK_STUDENTS = [
  { id: 1, nis: '2026 0108 0042', full_name: 'Ahmad Fauzan', class_name: '8A', dormitory: 'Asrama Umar bin Khattab', total_juz: 6.5, today_done: true },
  { id: 2, nis: '2026 0108 0043', full_name: 'Zaid Al-Farisi', class_name: '8A', dormitory: 'Asrama Abu Bakar', total_juz: 15.5, today_done: true },
  { id: 3, nis: '2026 0108 0044', full_name: 'Bilal Ramadhan', class_name: '9B', dormitory: 'Asrama Utsman bin Affan', total_juz: 20, today_done: false },
  { id: 4, nis: '2026 0108 0045', full_name: 'Ibrahim Al-Fatih', class_name: '8B', dormitory: 'Asrama Umar bin Khattab', total_juz: 9, today_done: false },
];

export default function StudentListScreen() {
  const navigation = useNavigation<NavProp>();
  const [search, setSearch] = useState('');
  const [chartOpen, setChartOpen] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<(typeof MOCK_STUDENTS)[0] | null>(null);
  const [setoranType, setSetoranType] = useState<'ZIYADAH' | 'MURAJAAH' | 'TASMI'>('ZIYADAH');
  const [juz, setJuz] = useState('30');
  const [surah, setSurah] = useState('An-Naba');
  const [ayahStart, setAyahStart] = useState('1');
  const [ayahEnd, setAyahEnd] = useState('20');
  const [score, setScore] = useState('92');
  const [notes, setNotes] = useState('');

  const filtered = MOCK_STUDENTS.filter(
    (s) =>
      s.full_name.toLowerCase().includes(search.toLowerCase()) ||
      s.dormitory.toLowerCase().includes(search.toLowerCase())
  );

  const doneCount = MOCK_STUDENTS.filter((s) => s.today_done).length;

  return (
    <View style={styles.root}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.bgLogo}
        resizeMode="contain"
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top User Bento Row */}
        <View style={styles.userBentoRow}>
          <GlassPanel style={styles.userBentoMain}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
            <View style={{ flex: 1 }}>
              <Text style={styles.greeting} numberOfLines={1}>Ust. Budi Santoso</Text>
              <Text style={styles.subGreeting}>Muhaffiz • Halaqah ICBS</Text>
            </View>
          </GlassPanel>
          <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.userBentoAction}>
            <Text style={styles.logoutText}>Keluar</Text>
          </TouchableOpacity>
        </View>

        {/* Summary Bento Grid */}
        <View style={styles.bentoRow}>
          <GlassPanel style={[styles.bentoStat, { borderTopColor: COLORS.secondary }]}>
            <Text style={[styles.bentoVal, { color: COLORS.secondary }]}>{MOCK_STUDENTS.length}</Text>
            <Text style={styles.bentoLbl}>Total Santri</Text>
          </GlassPanel>
          <GlassPanel style={[styles.bentoStat, { borderTopColor: COLORS.primary }]}>
            <Text style={[styles.bentoVal, { color: COLORS.primary }]}>{doneCount}/{MOCK_STUDENTS.length}</Text>
            <Text style={styles.bentoLbl}>Setor Hari Ini</Text>
          </GlassPanel>
          <GlassPanel style={[styles.bentoStat, { borderTopColor: COLORS.accent }]}>
            <Text style={[styles.bentoVal, { color: '#b45309', fontSize: 14 }]}>● Online</Text>
            <Text style={styles.bentoLbl}>0 Antrean Sync</Text>
          </GlassPanel>
        </View>

        {/* Accordion Distribusi Progres Hafalan (Cocok untuk 20+ Santri) */}
        <GlassPanel style={styles.chartCard}>
          <TouchableOpacity
            style={styles.chartHeader}
            onPress={() => setChartOpen(!chartOpen)}
          >
            <Text style={styles.chartTitle}>Distribusi Predikat Nilai Santri</Text>
            <Text style={styles.chartSub}>20 Santri {chartOpen ? '▴' : '▾'}</Text>
          </TouchableOpacity>
          {chartOpen && [
            { label: 'Mumtaz (90–100)', count: 7, total: 20, color: COLORS.primary },
            { label: 'Jayyid Jiddan (80–89)', count: 8, total: 20, color: COLORS.secondary },
            { label: 'Jayyid (70–79)', count: 3, total: 20, color: COLORS.accent },
            { label: 'Perlu Bimbingan (<70)', count: 2, total: 20, color: '#dc2626' },
          ].map((tier) => {
            const pct = Math.round((tier.count / tier.total) * 100);
            return (
              <View key={tier.label} style={styles.tierRow}>
                <View style={styles.tierTop}>
                  <Text style={styles.tierLabel}>{tier.label}</Text>
                  <Text style={styles.tierCount}>{tier.count} santri ({pct}%)</Text>
                </View>
                <View style={styles.tierTrack}>
                  <View style={[styles.tierFill, { width: `${pct}%`, backgroundColor: tier.color }]} />
                </View>
              </View>
            );
          })}
        </GlassPanel>

        {/* Search Bar */}
        <GlassPanel style={styles.searchBox}>
          <TextInput
            placeholder="Cari nama santri atau asrama..."
            placeholderTextColor="#64748b"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </GlassPanel>

        <Text style={styles.sectionTitle}>Daftar Santri Binaan</Text>

        {/* Student Bento Cards */}
        {filtered.map((item) => (
          <GlassPanel
            key={item.id}
            style={[
              styles.studentCard,
              { borderLeftColor: item.today_done ? COLORS.primary : COLORS.accent },
            ]}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => navigation.navigate('StudentDetail', { studentId: item.id })}
            >
              <View style={styles.cardTop}>
                <Text style={styles.studentName}>{item.full_name}</Text>
                <View style={styles.juzBadge}>
                  <Text style={styles.juzText}>{item.total_juz} Juz</Text>
                </View>
              </View>
              <Text style={styles.studentMeta}>{item.class_name} • {item.dormitory}</Text>
              <View style={styles.cardBottom}>
                <Text style={[styles.statusText, { color: item.today_done ? COLORS.primary : '#d97706' }]}>
                  {item.today_done ? '✓ Sudah setor hari ini' : '• Belum setor hari ini'}
                </Text>
                <TouchableOpacity
                  style={styles.quickBtn}
                  onPress={() => setSelectedStudent(item)}
                >
                  <Text style={styles.quickBtnText}>+ Setor</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </GlassPanel>
        ))}
      </ScrollView>

      {/* Bottom Sheet Modal Input Setoran */}
      <Modal
        visible={!!selectedStudent}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedStudent(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetTop}>
              <View>
                <Text style={styles.sheetTitle}>Input Setoran</Text>
                <Text style={styles.sheetSub}>
                  {selectedStudent?.full_name} • {selectedStudent?.class_name}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedStudent(null)} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.typeRow}>
              {(['ZIYADAH', 'MURAJAAH', 'TASMI'] as const).map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.typeBtn, setoranType === t && styles.typeBtnActive]}
                  onPress={() => setSetoranType(t)}
                >
                  <Text style={[styles.typeText, setoranType === t && styles.typeTextActive]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.inputRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>Juz</Text>
                <TextInput value={juz} onChangeText={setJuz} keyboardType="numeric" style={styles.sheetInput} />
              </View>
              <View style={{ flex: 2 }}>
                <Text style={styles.inputLabel}>Surah</Text>
                <TextInput value={surah} onChangeText={setSurah} style={styles.sheetInput} />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>Ayat Awal</Text>
                <TextInput value={ayahStart} onChangeText={setAyahStart} keyboardType="numeric" style={styles.sheetInput} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>Ayat Akhir</Text>
                <TextInput value={ayahEnd} onChangeText={setAyahEnd} keyboardType="numeric" style={styles.sheetInput} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>Nilai</Text>
                <TextInput value={score} onChangeText={setScore} keyboardType="numeric" style={styles.sheetInput} />
              </View>
            </View>

            <Text style={styles.inputLabel}>Catatan Tajwid</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Contoh: Mad wajib muttashil perlu diperhatikan"
              style={styles.sheetInput}
            />

            <TouchableOpacity
              style={styles.saveSheetBtn}
              onPress={() => {
                Alert.alert('Tersimpan', `Setoran ${selectedStudent?.full_name} (${surah}: ${ayahStart}-${ayahEnd}) tersimpan!`);
                setSelectedStudent(null);
              }}
            >
              <Text style={styles.saveSheetText}>Simpan Setoran</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f0fdf4' },
  bgLogo: {
    position: 'absolute',
    width: 320,
    height: 320,
    alignSelf: 'center',
    top: '30%',
    opacity: 0.16,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 48,
    paddingBottom: 32,
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  userBentoRow: { flexDirection: 'row', gap: 10, marginBottom: 14, alignItems: 'stretch' },
  userBentoMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.95)',
  },
  logo: { width: 40, height: 40, marginRight: 12 },
  greeting: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
  subGreeting: { fontSize: 12, color: COLORS.primary, fontWeight: '600', marginTop: 2 },
  userBentoAction: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(254, 226, 226, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(254, 202, 202, 0.95)',
  },
  logoutText: { color: '#dc2626', fontWeight: '700', fontSize: 12 },

  bentoRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  bentoStat: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.84)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bentoVal: { fontSize: 18, fontWeight: '800' },
  bentoLbl: { fontSize: 11, color: '#475569', fontWeight: '600', marginTop: 4, textAlign: 'center' },

  chartCard: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    marginBottom: 14,
  },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  chartTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textDark },
  chartSub: { fontSize: 11, fontWeight: '700', color: COLORS.secondary },
  tierRow: { marginBottom: 10 },
  tierTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  tierLabel: { fontSize: 12, fontWeight: '600', color: '#334155' },
  tierCount: { fontSize: 12, fontWeight: '700', color: COLORS.textDark },
  tierTrack: { height: 8, backgroundColor: '#e2e8f0', borderRadius: 4, overflow: 'hidden' },
  tierFill: { height: '100%', borderRadius: 4 },

  searchBox: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(203, 213, 225, 0.8)',
    marginBottom: 16,
  },
  searchInput: { fontSize: 14, color: COLORS.textDark, paddingVertical: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textDark, marginBottom: 10 },

  studentCard: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.86)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderLeftWidth: 4,
    marginBottom: 10,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  studentName: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
  juzBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.16)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  juzText: { color: '#b45309', fontWeight: '700', fontSize: 12 },
  studentMeta: { fontSize: 12, color: COLORS.secondary, fontWeight: '500', marginTop: 4 },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  statusText: { fontSize: 12, fontWeight: '600' },
  quickBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
  },
  quickBtnText: { color: '#fff', fontWeight: '700', fontSize: 12 },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 20,
    paddingBottom: 30,
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  sheetHandle: {
    width: 42,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#cbd5e1',
    alignSelf: 'center',
    marginBottom: 14,
  },
  sheetTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sheetTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textDark },
  sheetSub: { fontSize: 12, color: COLORS.primary, fontWeight: '600', marginTop: 2 },
  closeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#f1f5f9', justifyContent: 'center', alignItems: 'center' },
  closeBtnText: { fontSize: 14, fontWeight: '700', color: '#475569' },
  typeRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  typeBtn: { flex: 1, paddingVertical: 9, borderRadius: 10, backgroundColor: '#f1f5f9', alignItems: 'center' },
  typeBtnActive: { backgroundColor: COLORS.primary },
  typeText: { fontSize: 12, fontWeight: '700', color: '#475569' },
  typeTextActive: { color: '#fff' },
  inputRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  inputLabel: { fontSize: 12, fontWeight: '600', color: '#475569', marginBottom: 4, marginTop: 4 },
  sheetInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 9,
    fontSize: 14,
    color: COLORS.textDark,
  },
  saveSheetBtn: {
    marginTop: 16,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveSheetText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
