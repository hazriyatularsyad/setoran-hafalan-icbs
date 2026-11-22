import React, { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
  Platform,
  Animated,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../App"
import { GlassPanel } from "../components/GlassPanel"
import { COLORS } from "../theme"

type NavProp = NativeStackNavigationProp<RootStackParamList, "WaliDashboard">

const STUDENT = {
  id: 1,
  nis: "2026  0108  0042",
  full_name: "AHMAD FAUZAN",
  class_name: "Kelas 8A",
  dormitory: "Asrama Umar bin Khattab (Kmr 204)",
  total_juz: 6.5,
  target_juz: 15,
  avg_score: 88,
  monthly_count: 4,
  monthly_target: 20,
  muhaffiz_name: "Ust. Budi Santoso, Lc.",
  wali_name: "Bpk. Rizal",
  qr_id: "ICBS-202601080042",
}

const RECENT_LOGS = [
  {
    id: 1,
    surah: "Al-Mulk",
    ayah: "1–15",
    type: "ZIYADAH",
    score: 95,
    date: "Hari ini, 06:15",
    period: "week",
    note: "Lancar, makhraj sangat baik",
  },
  {
    id: 2,
    surah: "Al-Qalam",
    ayah: "1–20",
    type: "MURAJAAH",
    score: 90,
    date: "Kemarin, 16:30",
    period: "week",
    note: "Perhatikan mad wajib muttashil",
  },
  {
    id: 3,
    surah: "Al-Haqqah",
    ayah: "1–24",
    type: "TASMI",
    score: 96,
    date: "19 Nov, 07:00",
    period: "week",
    note: "Mumtaz, siap lanjut juz berikutnya",
  },
  {
    id: 4,
    surah: "Al-Ma'arij",
    ayah: "1–18",
    type: "ZIYADAH",
    score: 88,
    date: "10 Nov, 06:20",
    period: "month",
    note: "Sedikit terburu-buru di akhir ayat",
  },
  {
    id: 5,
    surah: "Nuh",
    ayah: "1–28",
    type: "MURAJAAH",
    score: 93,
    date: "05 Nov, 16:45",
    period: "month",
    note: "Sangat baik",
  },
]

const TYPE_STYLE: Record<
  string,
  { bg: string; text: string; cardBg: string; border: string }
> = {
  ZIYADAH: {
    bg: "rgba(5, 150, 105, 0.16)",
    text: "#059669",
    cardBg: "rgba(236, 253, 245, 0.9)",
    border: "#059669",
  },
  MURAJAAH: {
    bg: "rgba(29, 78, 216, 0.16)",
    text: "#1D4ED8",
    cardBg: "rgba(239, 246, 255, 0.9)",
    border: "#1D4ED8",
  },
  TASMI: {
    bg: "rgba(245, 158, 11, 0.2)",
    text: "#b45309",
    cardBg: "rgba(255, 251, 235, 0.92)",
    border: "#F59E0B",
  },
}

export default function WaliDashboardScreen() {
  const navigation = useNavigation<NavProp>()
  const [flipped, setFlipped] = useState(false)
  const [activeTab, setActiveTab] = useState<
    "beranda" | "riwayat" | "akademik" | "rapor" | "profil"
  >("beranda")
  const [periodFilter, setPeriodFilter] = useState<"all" | "week" | "month">(
    "all",
  )
  const [typeFilter, setTypeFilter] = useState<
    "ALL" | "ZIYADAH" | "MURAJAAH" | "TASMI"
  >("ALL")
  const [notifEnabled, setNotifEnabled] = useState(true)
  const [selectedDate, setSelectedDate] = useState(22)
  const [cardCollapsed, setCardCollapsed] = useState(false)
  const flipAnim = useRef(new Animated.Value(0)).current
  const tabFadeAnim = useRef(new Animated.Value(1)).current
  const tabSlideAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    tabFadeAnim.setValue(0)
    tabSlideAnim.setValue(12)
    Animated.parallel([
      Animated.timing(tabFadeAnim, { toValue: 1, duration: 240, useNativeDriver: false }),
      Animated.timing(tabSlideAnim, { toValue: 0, duration: 240, useNativeDriver: false }),
    ]).start()
  }, [activeTab])

  const handleFlipCard = () => {
    Animated.spring(flipAnim, {
      toValue: flipped ? 0 : 1,
      friction: 8,
      tension: 12,
      useNativeDriver: false,
    }).start()
    setFlipped(!flipped)
  }

  const cardRotateY = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  })
  const [openDropdown, setOpenDropdown] = useState<"period" | "type" | null>(
    null,
  )

  const filteredLogs = RECENT_LOGS.filter((log) => {
    const matchPeriod =
      periodFilter === "all" ||
      (periodFilter === "week" && log.period === "week") ||
      (periodFilter === "month" &&
        (log.period === "week" || log.period === "month"))
    const matchType = typeFilter === "ALL" || log.type === typeFilter
    return matchPeriod && matchType
  })

  const progressPct = Math.min(
    100,
    Math.round((STUDENT.total_juz / STUDENT.target_juz) * 100),
  )

  return (
    <View style={styles.root}>
      {/* Logo Watermark Background */}
      <Image
        source={require("../../assets/logo.png")}
        style={styles.bgLogo}
        resizeMode="contain"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Hero Background (User + Credit Card) */}
        <View style={styles.topHeroContainer}>
          {/* Header Bento Grid */}
          <View style={styles.userBentoRow}>
            <GlassPanel style={styles.userBentoMain}>
              <Image
                source={require("../../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.greeting} numberOfLines={1}>
                  Assalamu'alaikum, {STUDENT.wali_name}
                </Text>
                <Text style={styles.subGreeting}>
                  Pemantauan Tahfidz • ICBS
                </Text>
              </View>
            </GlassPanel>

            <TouchableOpacity
              onPress={() => navigation.replace("Login")}
              style={styles.userBentoAction}
            >
              <Text style={styles.logoutText}>Keluar</Text>
            </TouchableOpacity>
          </View>

          {(activeTab === "beranda" || activeTab === "riwayat" || activeTab === "akademik") && !cardCollapsed && (
            <Pressable
              onPress={handleFlipCard}
              style={styles.cardWrapper}
            >
              <Animated.View style={[styles.creditCard, { transform: [{ rotateY: cardRotateY }] }]}>
                <Image
                  source={require("../../assets/campus-bg.jpg")}
                  style={styles.cardBgImage}
                  resizeMode="cover"
                />
                <View style={styles.cardGradientOverlay} />
                <View style={styles.cardGeoRing} />
                {!flipped ? (
                  <View style={styles.cardFace}>
                    {/* Top Header */}
                    <View style={styles.cardTopRow}>
                      <View style={styles.brandRow}>
                        <View style={styles.cardLogoBox}>
                          <Image
                            source={require("../../assets/logo.png")}
                            style={styles.cardLogo}
                            resizeMode="contain"
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.cardBrandTitle} numberOfLines={1}>
                            {STUDENT.full_name}
                          </Text>
                          <Text style={styles.cardBrandSub}>
                            Insan Cendekia Boarding School
                          </Text>
                        </View>
                      </View>
                      <View style={styles.topPills}>
                        <View style={styles.glassPill}>
                          <Text style={styles.glassPillText}>TA 26/27</Text>
                        </View>
                        <View style={styles.glassPill}>
                          <Text style={styles.glassPillText}>↻ Info</Text>
                        </View>
                      </View>
                    </View>

                    {/* Middle: NIS & Juz Badge */}
                    <View style={styles.midRow}>
                      <View>
                        <Text style={styles.smallCapLabel}>
                          NOMOR INDUK SANTRI
                        </Text>
                        <Text style={styles.nisText}>{STUDENT.nis}</Text>
                      </View>
                      <View style={styles.juzBadge}>
                        <Text style={styles.juzBadgeText}>
                          📖 {STUDENT.total_juz} JUZ
                        </Text>
                      </View>
                    </View>

                    <View style={styles.cardDivider} />

                    {/* Bottom Info */}
                    <View style={styles.cardBottomRow}>
                      <View style={{ flex: 1, paddingRight: 10 }}>
                        <Text style={styles.smallCapLabel}>ASRAMA</Text>
                        <Text style={styles.studentMeta} numberOfLines={1}>
                          🏢 {STUDENT.dormitory}
                        </Text>
                      </View>
                      <View style={{ alignItems: "flex-end" }}>
                        <Text style={styles.smallCapLabel}>KELAS</Text>
                        <View style={styles.classPill}>
                          <Text style={styles.classPillText}>
                            {STUDENT.class_name}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={[styles.cardFace, { transform: [{ rotateY: "180deg" }] }]}>
                    <View style={styles.backHeader}>
                      <Text style={styles.backTitle}>
                        INFORMASI HALAQAH & WALI
                      </Text>
                      <View style={styles.activePill}>
                        <Text style={styles.activePillText}>● Aktif</Text>
                      </View>
                    </View>
                    <View style={styles.backBody}>
                      <Text style={styles.backRow}>
                        Muhaffiz:{" "}
                        <Text style={styles.backBold}>
                          {STUDENT.muhaffiz_name}
                        </Text>
                      </Text>
                      <Text style={styles.backRow}>
                        Wali Murid:{" "}
                        <Text style={styles.backBold}>{STUDENT.wali_name}</Text>
                      </Text>
                      <Text style={styles.backRow}>
                        Asrama:{" "}
                        <Text style={styles.backBold}>{STUDENT.dormitory}</Text>
                      </Text>
                    </View>
                    <Text style={styles.qrText}>
                      ID Santri: {STUDENT.qr_id} (Ketuk untuk kembali)
                    </Text>
                  </View>
                )}
              </Animated.View>
            </Pressable>
          )}
        </View>
        {(activeTab === "beranda" || activeTab === "riwayat" || activeTab === "akademik") && (
          <TouchableOpacity
            style={styles.collapseBtn}
            onPress={() => setCardCollapsed(!cardCollapsed)}
          >
            <Text style={styles.collapseIcon}>{cardCollapsed ? "⌄" : "⌃"}</Text>
          </TouchableOpacity>
        )}

        <Animated.View style={{ opacity: tabFadeAnim, transform: [{ translateY: tabSlideAnim }] }}>
        {activeTab === "beranda" && (
          <View style={styles.lowerContent}>
            {/* 2-Column Summary Stats: Tahfidz & Akademik */}
            <View style={styles.statsRow}>
              <GlassPanel style={styles.statBox}>
                <Text style={styles.statHeader}>📖 Rata-rata Nilai Tahfidz</Text>
                <View style={styles.statValueRow}>
                  <Text style={styles.statBig}>{STUDENT.avg_score}</Text>
                  <Text style={styles.statSubBlue}> /100</Text>
                </View>
                <Text style={styles.statFooterGold}>Predikat Mumtaz</Text>
              </GlassPanel>

              <GlassPanel style={[styles.statBox, { borderTopColor: COLORS.secondary }]}>
                <Text style={styles.statHeader}>🎓 Nilai Akademik</Text>
                <View style={styles.statValueRow}>
                  <Text style={styles.statBig}>89.5</Text>
                  <Text style={styles.statSubEmerald}> /100</Text>
                </View>
                <Text style={styles.statFooterMuted}>Kelas {STUDENT.class_name}</Text>
                <Text style={styles.statTrendUp}>▲ +2.4 vs semester lalu</Text>
              </GlassPanel>
            </View>

            {/* Tren Nilai Tahfidz & Akademik */}
            <GlassPanel style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Tren Nilai Tahfidz & Akademik</Text>
                <Text style={styles.sectionMeta}>5 Bulan Terakhir</Text>
              </View>
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: COLORS.primary }]} />
                  <Text style={styles.legendText}>Tahfidz</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: COLORS.accent }]} />
                  <Text style={styles.legendText}>Akademik</Text>
                </View>
              </View>
              <View style={styles.chartRow}>
                {[
                  { label: "Jul", tahfidz: 82, akademik: 85 },
                  { label: "Agu", tahfidz: 85, akademik: 86 },
                  { label: "Sep", tahfidz: 86, akademik: 88 },
                  { label: "Okt", tahfidz: 88, akademik: 89 },
                  { label: "Nov", tahfidz: 92, akademik: 90 },
                ].map((m) => (
                  <View key={m.label} style={styles.barCol}>
                    <View style={styles.dualBarWrap}>
                      <View style={styles.dualBarTrack}>
                        <View style={[styles.barFill, { height: `${m.tahfidz}%`, backgroundColor: COLORS.primary }]} />
                      </View>
                      <View style={styles.dualBarTrack}>
                        <View style={[styles.barFill, { height: `${m.akademik}%`, backgroundColor: COLORS.accent }]} />
                      </View>
                    </View>
                    <Text style={styles.barLabel}>{m.label}</Text>
                  </View>
                ))}
              </View>
            </GlassPanel>

            {/* Jadwal Ujian Akademik */}
            <GlassPanel style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Jadwal Ujian Akademik</Text>
                <TouchableOpacity onPress={() => setActiveTab("akademik")}>
                  <Text style={[styles.sectionMeta, { color: COLORS.secondary }]}>Lihat Semua ›</Text>
                </TouchableOpacity>
              </View>
              {[
                { day: "02", mon: "DES", title: "Ujian Bahasa Arab", time: "08:00 WIB" },
                { day: "03", mon: "DES", title: "Ujian Matematika", time: "08:00 WIB" },
                { day: "04", mon: "DES", title: "Ujian Fiqih & Tahfidz", time: "08:00 WIB" },
              ].map((u) => (
                <View key={u.title} style={styles.examRow}>
                  <View style={styles.examDateBadge}>
                    <Text style={styles.examDateDay}>{u.day}</Text>
                    <Text style={styles.examDateMon}>{u.mon}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.akademikTitle}>{u.title}</Text>
                    <Text style={styles.akademikSub}>PAS Ganjil • Ruang 8A</Text>
                  </View>
                  <View style={styles.examTimePill}>
                    <Text style={styles.examTimeText}>{u.time}</Text>
                  </View>
                </View>
              ))}
            </GlassPanel>
          </View>
        )}

        {activeTab === "riwayat" && (
          <View style={styles.lowerContent}>
            {/* 2-Column Summary Stats */}
            <View style={styles.statsRow}>
              <GlassPanel style={styles.statBox}>
                <Text style={styles.statHeader}>🏅 Rata-rata Nilai</Text>
                <View style={styles.statValueRow}>
                  <Text style={styles.statBig}>{STUDENT.avg_score}</Text>
                  <Text style={styles.statSubBlue}> /100</Text>
                </View>
                <Text style={styles.statFooterGold}>Predikat Mumtaz</Text>
              </GlassPanel>

              <GlassPanel style={styles.statBox}>
                <Text style={styles.statHeader}>☑️ Setoran Bulan Ini</Text>
                <View style={styles.statValueRow}>
                  <Text style={styles.statBig}>{STUDENT.monthly_count}</Text>
                  <Text style={styles.statSubEmerald}> Kali</Text>
                </View>
                <Text style={styles.statFooterMuted}>
                  Target: {STUDENT.monthly_target}x / bulan
                </Text>
                <Text style={styles.statTrendUp}>▲ +18% vs bulan lalu</Text>
              </GlassPanel>
            </View>

            {/* Progress Bar & Trend Chart */}
            <GlassPanel style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Tren Nilai 5 Setoran Terakhir</Text>
                <Text style={styles.sectionMeta}>
                  Target: {STUDENT.total_juz}/{STUDENT.target_juz} Juz
                </Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
              </View>
              <View style={styles.chartRow}>
                {RECENT_LOGS.slice()
                  .reverse()
                  .map((item) => (
                    <View key={item.id} style={styles.barCol}>
                      <Text style={styles.barScore}>{item.score}</Text>
                      <View style={styles.barTrack}>
                        <View style={[styles.barFill, { height: `${item.score}%` }]} />
                      </View>
                      <Text style={styles.barLabel} numberOfLines={1}>
                        {item.surah.replace("Al-", "")}
                      </Text>
                    </View>
                  ))}
              </View>
            </GlassPanel>

            <View style={styles.listHeader}>
              <Text style={styles.sectionTitle}>Semua Riwayat Setoran</Text>
              <Text style={styles.listCount}>
                {filteredLogs.length} setoran
              </Text>
            </View>

            {/* Dropdown Filter & Sort */}
            <View style={styles.dropdownRow}>
              <View style={styles.dropdownCol}>
                <TouchableOpacity
                  style={styles.dropdownBtn}
                  onPress={() =>
                    setOpenDropdown(openDropdown === "period" ? null : "period")
                  }
                >
                  <Text style={styles.dropdownLabel}>
                    Periode:{" "}
                    {periodFilter === "all"
                      ? "Semua"
                      : periodFilter === "week"
                        ? "Minggu Ini"
                        : "Bulan Ini"}
                  </Text>
                  <Text style={styles.dropdownArrow}>▾</Text>
                </TouchableOpacity>
                {openDropdown === "period" && (
                  <GlassPanel style={styles.dropdownMenu}>
                    {[
                      { key: "all", label: "Semua" },
                      { key: "week", label: "Minggu Ini" },
                      { key: "month", label: "Bulan Ini" },
                    ].map((p) => (
                      <TouchableOpacity
                        key={p.key}
                        style={[
                          styles.dropdownItem,
                          periodFilter === p.key && styles.dropdownItemActive,
                        ]}
                        onPress={() => {
                          setPeriodFilter(p.key as any)
                          setOpenDropdown(null)
                        }}
                      >
                        <Text
                          style={[
                            styles.dropdownItemText,
                            periodFilter === p.key && styles.filterTextActive,
                          ]}
                        >
                          {p.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </GlassPanel>
                )}
              </View>

              <View style={styles.dropdownCol}>
                <TouchableOpacity
                  style={styles.dropdownBtn}
                  onPress={() =>
                    setOpenDropdown(openDropdown === "type" ? null : "type")
                  }
                >
                  <Text style={styles.dropdownLabel}>
                    Jenis: {typeFilter === "ALL" ? "Semua" : typeFilter}
                  </Text>
                  <Text style={styles.dropdownArrow}>▾</Text>
                </TouchableOpacity>
                {openDropdown === "type" && (
                  <GlassPanel style={styles.dropdownMenu}>
                    {[
                      { key: "ALL", label: "Semua Jenis" },
                      { key: "ZIYADAH", label: "Ziyadah" },
                      { key: "MURAJAAH", label: "Muraja'ah" },
                      { key: "TASMI", label: "Tasmi'" },
                    ].map((t) => (
                      <TouchableOpacity
                        key={t.key}
                        style={[
                          styles.dropdownItem,
                          typeFilter === t.key && styles.dropdownItemRoyal,
                        ]}
                        onPress={() => {
                          setTypeFilter(t.key as any)
                          setOpenDropdown(null)
                        }}
                      >
                        <Text
                          style={[
                            styles.dropdownItemText,
                            typeFilter === t.key && styles.filterTextActive,
                          ]}
                        >
                          {t.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </GlassPanel>
                )}
              </View>
            </View>

            {filteredLogs.map((log) => {
              const badge = TYPE_STYLE[log.type] || TYPE_STYLE.ZIYADAH
              return (
                <GlassPanel
                  key={log.id}
                  style={[
                    styles.logCard,
                    {
                      backgroundColor: badge.cardBg,
                      borderLeftWidth: 4,
                      borderLeftColor: badge.border,
                    },
                  ]}
                >
                  <View style={styles.logTop}>
                    <View
                      style={[styles.typeBadge, { backgroundColor: badge.bg }]}
                    >
                      <Text style={[styles.typeText, { color: badge.text }]}>
                        {log.type}
                      </Text>
                    </View>
                    <Text style={styles.logDate}>{log.date}</Text>
                  </View>
                  <View style={styles.logMain}>
                    <View style={{ flex: 1, paddingRight: 12 }}>
                      <Text style={styles.logSurah}>
                        QS. {log.surah} : {log.ayah}
                      </Text>
                      <Text style={styles.logNote}>{log.note}</Text>
                    </View>
                    <View style={styles.scoreCircle}>
                      <Text style={styles.scoreValue}>{log.score}</Text>
                    </View>
                  </View>
                </GlassPanel>
              )
            })}
          </View>
        )}

        {activeTab === "akademik" && (
          <View style={styles.lowerContent}>
            <Text style={styles.sectionTitle}>Akademik Santri</Text>

            {/* Kalender Mata Pelajaran (Real Calendar Grid) */}
            <GlassPanel style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>📅 November 2026</Text>
                <Text style={styles.sectionMeta}>Kelas 8A</Text>
              </View>

              <View style={styles.calWeekHeader}>
                {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d, idx) => (
                  <Text
                    key={d}
                    style={[styles.calWeekDay, idx === 0 && { color: "#ef4444" }]}
                  >
                    {d}
                  </Text>
                ))}
              </View>

              <View style={styles.calGrid}>
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                  const isSelected = selectedDate === day;
                  const isSunday = day % 7 === 1;
                  const hasExam = [2, 3, 4, 25, 26].includes(day);
                  return (
                    <TouchableOpacity
                      key={day}
                      style={[styles.calCell, isSelected && styles.calCellActive]}
                      onPress={() => setSelectedDate(day)}
                    >
                      <Text
                        style={[
                          styles.calDayText,
                          isSunday && { color: "#ef4444" },
                          isSelected && styles.calDayTextActive,
                        ]}
                      >
                        {day}
                      </Text>
                      {hasExam && (
                        <View
                          style={[
                            styles.calDot,
                            isSelected && { backgroundColor: "#FACC15" },
                          ]}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.calDetailBox}>
                <Text style={styles.calDetailTitle}>
                  Jadwal {selectedDate} November 2026
                </Text>
                {(
                  {
                    1: [{ time: "08:00", mapel: "Kegiatan Asrama & Muroja'ah Mandiri" }],
                    2: [
                      { time: "07:30", mapel: "Matematika (Ust. Arif)" },
                      { time: "09:30", mapel: "Bahasa Arab (Ust. Salman)" },
                      { time: "13:00", mapel: "Tahfidz Al-Qur'an" },
                    ],
                    3: [
                      { time: "07:30", mapel: "Fiqih Ibadah (Ust. Hendra)" },
                      { time: "09:30", mapel: "Bahasa Inggris (Mr. Dani)" },
                      { time: "13:00", mapel: "IPA Terpadu" },
                    ],
                    4: [
                      { time: "07:30", mapel: "Sirah Nabawiyah (Ust. Budi)" },
                      { time: "09:30", mapel: "Bahasa Indonesia" },
                      { time: "13:00", mapel: "Praktikum IPA" },
                    ],
                    5: [
                      { time: "07:30", mapel: "Aqidah Akhlak" },
                      { time: "09:30", mapel: "Matematika Lanjutan" },
                      { time: "13:00", mapel: "Bahasa Arab (Muhadatsah)" },
                    ],
                    6: [
                      { time: "07:30", mapel: "Kajian Kitab Kuning" },
                      { time: "09:30", mapel: "Pendidikan Jasmani" },
                    ],
                    0: [
                      { time: "08:00", mapel: "Ekstrakurikuler & Pramuka" },
                      { time: "10:30", mapel: "Tasmi' Pekanan" },
                    ],
                  } as Record<number, { time: string; mapel: string }[]>
                )[selectedDate % 7].map((s, idx) => (
                  <View key={idx} style={styles.calSubjectRow}>
                    <Text style={styles.calSubjectTime}>{s.time}</Text>
                    <Text style={styles.calSubjectName}>{s.mapel}</Text>
                  </View>
                ))}
              </View>
            </GlassPanel>

            {/* Nilai Akademik */}
            <GlassPanel style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>📊 Nilai Mata Pelajaran</Text>
                <Text style={styles.sectionMeta}>Rata-rata: 89.5</Text>
              </View>
              <View style={styles.statsRow}>
                {[
                  { mapel: "B. Arab", nilai: 92 },
                  { mapel: "Matematika", nilai: 87 },
                  { mapel: "Fiqih", nilai: 90 },
                ].map((n) => (
                  <View key={n.mapel} style={styles.nilaiMiniBox}>
                    <Text style={styles.nilaiMiniVal}>{n.nilai}</Text>
                    <Text style={styles.nilaiMiniLbl}>{n.mapel}</Text>
                  </View>
                ))}
              </View>
            </GlassPanel>

            {/* Jadwal Ujian */}
            <GlassPanel style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Jadwal Ujian Mendatang</Text>
                <Text style={[styles.sectionMeta, { color: COLORS.secondary }]}>PAS Ganjil</Text>
              </View>
              {[
                { day: "02", mon: "DES", title: "Ujian Bahasa Arab", time: "08:00 WIB" },
                { day: "03", mon: "DES", title: "Ujian Matematika", time: "08:00 WIB" },
                { day: "04", mon: "DES", title: "Ujian Fiqih & Tahfidz", time: "08:00 WIB" },
              ].map((u) => (
                <View key={u.title} style={styles.examRow}>
                  <View style={styles.examDateBadge}>
                    <Text style={styles.examDateDay}>{u.day}</Text>
                    <Text style={styles.examDateMon}>{u.mon}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.akademikTitle}>{u.title}</Text>
                    <Text style={styles.akademikSub}>PAS Ganjil • Ruang 8A</Text>
                  </View>
                  <View style={styles.examTimePill}>
                    <Text style={styles.examTimeText}>{u.time}</Text>
                  </View>
                </View>
              ))}
            </GlassPanel>
          </View>
        )}

        {activeTab === "profil" && (
          <GlassPanel style={styles.sectionCard}>
            {/* Profile Hero Card */}
            <View style={styles.profileHero}>
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>BR</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.profileName}>{STUDENT.wali_name}</Text>
                <Text style={styles.profileRole}>Wali Murid Aktif • ICBS</Text>
              </View>
              <View style={styles.profileIdPill}>
                <Text style={styles.profileIdText}>{STUDENT.qr_id}</Text>
              </View>
            </View>

            {/* Bento Info Santri & Muhaffiz */}
            <View style={styles.statsRow}>
              <GlassPanel style={[styles.statBox, { alignItems: "flex-start" }]}>
                <Text style={styles.bentoMiniLabel}>SANTRI BINAAN</Text>
                <Text style={styles.bentoMiniTitle}>{STUDENT.full_name}</Text>
                <Text style={styles.bentoMiniSub}>{STUDENT.class_name} • {STUDENT.dormitory}</Text>
              </GlassPanel>
              <GlassPanel style={[styles.statBox, { alignItems: "flex-start", borderTopColor: COLORS.secondary }]}>
                <Text style={styles.bentoMiniLabel}>MUHAFFIZ AKTIF</Text>
                <Text style={styles.bentoMiniTitle}>{STUDENT.muhaffiz_name}</Text>
                <Text style={styles.bentoMiniSub}>Halaqah TA 26/27</Text>
              </GlassPanel>
            </View>

            {/* Pengaturan & Keamanan */}
            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => setNotifEnabled(!notifEnabled)}
            >
              <View>
                <Text style={styles.settingTitle}>Notifikasi Setoran Real-time</Text>
                <Text style={styles.settingSub}>Kirim pemberitahuan tiap setoran tersinkron</Text>
              </View>
              <View style={[styles.togglePill, notifEnabled && styles.togglePillOn]}>
                <Text style={styles.togglePillText}>{notifEnabled ? "ON" : "OFF"}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.reportBtn, { backgroundColor: "#dc2626", marginTop: 12 }]}
              onPress={() => navigation.replace("Login")}
            >
              <Text style={styles.reportBtnText}>Keluar Akun</Text>
            </TouchableOpacity>
          </GlassPanel>
        )}
        </Animated.View>
      </ScrollView>

      {/* Floating Glass Bottom Navbar */}
      <View style={styles.floatingNavWrap}>
        <GlassPanel style={styles.floatingNav}>
          {[
            { key: "akademik", icon: "🎓", label: "Akademik" },
            { key: "riwayat", icon: "📖", label: "Tahfidz" },
            { key: "beranda", icon: "🏠", label: "Beranda" },
            { key: "rapor", icon: "📄", label: "Rapor" },
            { key: "profil", icon: "👤", label: "Profil" },
          ].map((tab) => {
            const isActive = activeTab === tab.key
            const isCenter = tab.key === "beranda"
            return (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.navItem,
                  isCenter && styles.navItemElevated,
                  isActive && styles.navItemActive,
                ]}
                onPress={() => {
                  setActiveTab(tab.key as any)
                  if (tab.key === "rapor") {
                    navigation.navigate("Report", { studentId: STUDENT.id })
                  }
                }}
              >
                {isCenter ? (
                  <Image
                    source={require("../../assets/login-bg.png")}
                    style={styles.navCenterLogo}
                    resizeMode="contain"
                  />
                ) : (
                  <Text style={styles.navIcon}>{tab.icon}</Text>
                )}
                <Text
                  style={[styles.navLabel, isActive && styles.navLabelActive]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </GlassPanel>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f0fdf4" },
  bgLogo: {
    position: "absolute",
    width: 340,
    height: 340,
    alignSelf: "center",
    top: "28%",
    opacity: 0.22,
  },
  scrollContent: {
    paddingBottom: 110,
    maxWidth: 520,
    width: "100%",
    alignSelf: "center",
  },
  topHeroContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.65)",
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 22,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 18,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.accent,
  },
  islamicCrescent: {
    position: "absolute",
    fontSize: 180,
    color: "rgba(245, 158, 11, 0.22)",
    top: -30,
    right: -18,
  },
  lowerContent: {
    paddingHorizontal: 16,
  },
  userBentoRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
    alignItems: "stretch",
  },
  userBentoMain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: "rgba(245, 158, 11, 0.28)",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.45)",
  },
  userBentoAction: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "rgba(254, 226, 226, 0.88)",
    borderWidth: 1,
    borderColor: "rgba(254, 202, 202, 0.95)",
  },
  logo: { width: 42, height: 42, marginRight: 12 },
  greeting: { fontSize: 17, fontWeight: "700", color: COLORS.textDark },
  subGreeting: {
    fontSize: 12,
    color: "#92400e",
    fontWeight: "600",
    marginTop: 2,
  },
  logoutBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(254, 226, 226, 0.9)",
    borderRadius: 8,
  },
  logoutText: { color: "#dc2626", fontSize: 12, fontWeight: "600" },

  cardWrapper: { marginBottom: 16, alignItems: "center" },
  creditCard: {
    width: "100%",
    minHeight: 230,
    borderRadius: 22,
    padding: 18,
    backgroundColor: "#059669",
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "rgba(250, 204, 21, 0.55)",
    shadowColor: "#059669",
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  cardBgImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    opacity: 0.45,
  },
  cardGradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(6, 78, 59, 0.68)",
  },
  cardCrescent: {
    fontSize: 112,
    color: "rgba(250, 204, 21, 0.28)",
    transform: [{ rotate: "-18deg" }],
  },
  cardGeoRing: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.12)",
    right: 14,
    bottom: 18,
    transform: [{ rotate: "18deg" }],
    justifyContent: "center",
    alignItems: "center",
  },
  cardFace: { flex: 1, justifyContent: "space-between" },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 8,
  },
  cardLogoBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  cardLogo: { width: 32, height: 32 },
  cardBrandTitle: {
    color: "#FACC15",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  cardBrandSub: { color: "rgba(255,255,255,0.9)", fontSize: 10, marginTop: 1 },
  topPills: { flexDirection: "row", gap: 6 },
  glassPill: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 14,
  },
  glassPillText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  midRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  juzBadge: {
    backgroundColor: "rgba(245, 158, 11, 0.22)",
    borderWidth: 1,
    borderColor: "#FACC15",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
  },
  juzBadgeText: { color: "#FACC15", fontWeight: "800", fontSize: 13 },
  nisText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 2.2,
    marginTop: 2,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 10,
  },
  cardBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  smallCapLabel: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  studentName: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  studentMeta: {
    color: "#FDE68A",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 3,
  },
  classPill: {
    backgroundColor: "#1E3A8A",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginTop: 2,
  },
  classPillText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  backHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backTitle: {
    color: "#FACC15",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  activePill: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  activePillText: { color: "#fff", fontSize: 11, fontWeight: "600" },
  backBody: { gap: 6 },
  backRow: { color: "rgba(255,255,255,0.85)", fontSize: 13 },
  backBold: { color: "#fff", fontWeight: "700" },
  qrText: { color: "rgba(255,255,255,0.8)", fontSize: 12, letterSpacing: 0.5 },

  statsRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  statBox: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.28)",
    borderTopWidth: 3,
    borderTopColor: COLORS.accent,
  },
  statHeader: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  statValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 6,
  },
  statBig: { fontSize: 28, fontWeight: "800", color: "#0f172a" },
  statSubBlue: { fontSize: 14, fontWeight: "700", color: COLORS.secondary },
  statSubEmerald: { fontSize: 14, fontWeight: "700", color: COLORS.primary },
  statFooterGold: { fontSize: 12, fontWeight: "700", color: "#d97706" },
  statFooterMuted: { fontSize: 12, fontWeight: "500", color: "#64748b" },
  statTrendUp: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
    marginTop: 4,
  },

  sectionCard: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.86)",
    borderWidth: 1,
    borderColor: "rgba(5, 150, 105, 0.22)",
    borderTopWidth: 3,
    borderTopColor: COLORS.primary,
    marginBottom: 18,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: COLORS.textDark },
  sectionMeta: { fontSize: 12, fontWeight: "700", color: "#d97706" },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e2e8f0",
    overflow: "hidden",
    marginBottom: 16,
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  chartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 110,
    paddingTop: 8,
  },
  barCol: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
  },
  barScore: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.secondary,
    marginBottom: 4,
  },
  barTrack: {
    width: 22,
    height: 64,
    backgroundColor: "#e2e8f0",
    borderRadius: 6,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  barFill: {
    width: "100%",
    backgroundColor: COLORS.secondary,
    borderRadius: 6,
  },
  barLabel: { fontSize: 11, color: "#475569", marginTop: 6, fontWeight: "500" },

  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  listCount: { fontSize: 12, color: "#64748b", fontWeight: "500" },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.72)",
    borderWidth: 1,
    borderColor: "rgba(203, 213, 225, 0.8)",
  },
  filterPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterPillRoyal: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  filterText: { fontSize: 12, fontWeight: "600", color: "#475569" },
  filterTextActive: { color: "#fff" },
  dropdownRow: { flexDirection: "row", gap: 10, marginBottom: 14, zIndex: 50 },
  dropdownCol: { flex: 1, position: "relative", zIndex: 50 },
  dropdownBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.35)",
  },
  dropdownLabel: { fontSize: 12, fontWeight: "700", color: "#1e293b" },
  dropdownArrow: { fontSize: 12, color: COLORS.primary, fontWeight: "700" },
  dropdownMenu: {
    position: "absolute",
    top: 46,
    left: 0,
    right: 0,
    zIndex: 100,
    elevation: 10,
    padding: 6,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderWidth: 1,
    borderColor: "rgba(203, 213, 225, 0.8)",
    shadowColor: "#0f172a",
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    gap: 4,
  },
  dropdownItem: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: 10 },
  dropdownItemActive: { backgroundColor: COLORS.primary },
  dropdownItemRoyal: { backgroundColor: COLORS.secondary },
  dropdownItemText: { fontSize: 12, fontWeight: "600", color: "#334155" },
  logCard: {
    padding: 14,
    backgroundColor: "rgba(255, 255, 255, 0.78)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.92)",
    marginBottom: 10,
  },
  logTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  typeText: { fontSize: 11, fontWeight: "700", letterSpacing: 0.4 },
  logDate: { fontSize: 12, color: "#64748b" },
  logMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logSurah: { fontSize: 15, fontWeight: "700", color: COLORS.textDark },
  logNote: { fontSize: 12, color: "#475569", marginTop: 3 },
  scoreCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(245, 158, 11, 0.14)",
    borderWidth: 1.5,
    borderColor: "rgba(245, 158, 11, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreValue: { fontSize: 16, fontWeight: "800", color: "#b45309" },

  reportBtn: {
    marginTop: 12,
    backgroundColor: COLORS.secondary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#1D4ED8",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  reportBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },

  floatingNavWrap: {
    position: Platform.OS === "web" ? ("fixed" as any) : "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    zIndex: 100,
    alignItems: "center",
  },
  floatingNav: {
    flexDirection: "row",
    width: "100%",
    maxWidth: 460,
    padding: 6,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.82)",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.35)",
    shadowColor: "#0f172a",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 22,
  },
  navItemActive: {
    backgroundColor: "rgba(5, 150, 105, 0.14)",
  },
  navItemElevated: {
    marginTop: -22,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 24,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: COLORS.accent,
    shadowColor: "#059669",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  navIcon: { fontSize: 16, marginBottom: 2 },
  navCenterLogo: { width: 22, height: 22, marginBottom: 2 },
  navLabel: { fontSize: 11, fontWeight: "600", color: "#64748b" },
  navLabelActive: { color: COLORS.primary, fontWeight: "700" },

  profileHero: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 16,
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  profileAvatarText: { color: "#fff", fontSize: 17, fontWeight: "800" },
  profileName: { fontSize: 17, fontWeight: "700", color: COLORS.textDark },
  profileRole: { fontSize: 12, color: COLORS.secondary, fontWeight: "600", marginTop: 2 },
  profileIdPill: {
    backgroundColor: "rgba(245, 158, 11, 0.16)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  profileIdText: { fontSize: 10, fontWeight: "700", color: "#b45309" },
  bentoMiniLabel: { fontSize: 10, fontWeight: "700", color: "#64748b", letterSpacing: 0.6, marginBottom: 4 },
  bentoMiniTitle: { fontSize: 14, fontWeight: "700", color: COLORS.textDark },
  bentoMiniSub: { fontSize: 11, color: "#475569", marginTop: 3 },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  settingTitle: { fontSize: 14, fontWeight: "700", color: COLORS.textDark },
  settingSub: { fontSize: 11, color: "#64748b", marginTop: 2 },
  togglePill: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12, backgroundColor: "#94a3b8" },
  togglePillOn: { backgroundColor: COLORS.primary },
  togglePillText: { color: "#fff", fontSize: 11, fontWeight: "800" },

  akademikRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  dayPill: {
    backgroundColor: "rgba(5, 150, 105, 0.14)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    minWidth: 64,
    alignItems: "center",
  },
  dayPillText: { fontSize: 11, fontWeight: "700", color: COLORS.primary },
  akademikTitle: { fontSize: 13, fontWeight: "700", color: COLORS.textDark },
  akademikSub: { fontSize: 11, color: "#64748b", marginTop: 2 },
  nilaiMiniBox: {
    flex: 1,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(29, 78, 216, 0.22)",
  },
  nilaiMiniVal: { fontSize: 18, fontWeight: "800", color: COLORS.secondary },
  nilaiMiniLbl: { fontSize: 11, fontWeight: "600", color: "#475569", marginTop: 2 },
  calWeekHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  calWeekDay: { width: "14.2%", textAlign: "center", fontSize: 11, fontWeight: "700", color: "#64748b" },
  calGrid: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10 },
  calCell: {
    width: "14.2%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
  },
  calCellActive: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  calDayText: { fontSize: 13, fontWeight: "600", color: COLORS.textDark },
  calDayTextActive: { color: "#fff", fontWeight: "800" },
  calDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: COLORS.accent, marginTop: 2 },
  calDetailBox: {
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  calDetailTitle: { fontSize: 12, fontWeight: "700", color: COLORS.primary, marginBottom: 6 },
  calSubjectRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 3 },
  calSubjectTime: { fontSize: 11, fontWeight: "700", color: COLORS.secondary, width: 42 },
  calSubjectName: { fontSize: 12, fontWeight: "600", color: COLORS.textDark, flex: 1 },
  collapseBtn: {
    alignSelf: "center",
    marginTop: -18,
    marginBottom: 14,
    width: 68,
    height: 22,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: "#fff",
    borderWidth: 2.5,
    borderTopWidth: 0,
    borderColor: COLORS.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  collapseIcon: { fontSize: 14, fontWeight: "800", color: COLORS.primary, lineHeight: 16 },
  legendRow: { flexDirection: "row", gap: 16, marginBottom: 8 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 11, fontWeight: "600", color: "#475569" },
  dualBarWrap: { flexDirection: "row", gap: 4, alignItems: "flex-end" },
  dualBarTrack: { width: 12, height: 64, backgroundColor: "#e2e8f0", borderRadius: 4, justifyContent: "flex-end", overflow: "hidden" },
  examRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  examDateBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "rgba(245, 158, 11, 0.14)",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  examDateDay: { fontSize: 14, fontWeight: "800", color: "#b45309", lineHeight: 16 },
  examDateMon: { fontSize: 9, fontWeight: "700", color: "#d97706", letterSpacing: 0.5 },
  examTimePill: {
    backgroundColor: "rgba(29, 78, 216, 0.1)",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  examTimeText: { fontSize: 11, fontWeight: "700", color: COLORS.secondary },
})
