import React, { useState } from 'react';

type Tab = 'dashboard' | 'santri' | 'pengguna' | 'monitoring';

const STUDENTS = [
  { id: 1, nis: '202601080042', name: 'Ahmad Fauzan', kelas: '8A', asrama: 'Asrama Umar bin Khattab', muhaffiz: 'Ust. Budi Santoso', wali: 'Bpk. Rizal', juz: 6.5 },
  { id: 2, nis: '202601080043', name: 'Zaid Al-Farisi', kelas: '8A', asrama: 'Asrama Abu Bakar', muhaffiz: 'Ust. Budi Santoso', wali: 'Ibu Aminah', juz: 15.5 },
  { id: 3, nis: '202601080044', name: 'Bilal Ramadhan', kelas: '9B', asrama: 'Asrama Utsman bin Affan', muhaffiz: 'Ust. Hendra Wijaya', wali: 'Bpk. Ahmad', juz: 20.0 },
  { id: 4, nis: '202601080045', name: 'Ibrahim Al-Fatih', kelas: '8B', asrama: 'Asrama Umar bin Khattab', muhaffiz: 'Ust. Hendra Wijaya', wali: 'Bpk. Yusuf', juz: 9.0 },
];

const LOGS = [
  { id: 1, santri: 'Ahmad Fauzan', asrama: 'Asrama Umar bin Khattab', jenis: 'ZIYADAH', surah: 'QS. Al-Mulk : 1-15', nilai: 95, muhaffiz: 'Ust. Budi Santoso', waktu: 'Hari ini, 06:15' },
  { id: 2, santri: 'Zaid Al-Farisi', asrama: 'Asrama Abu Bakar', jenis: 'MURAJAAH', surah: 'QS. Al-Qalam : 1-20', nilai: 90, muhaffiz: 'Ust. Budi Santoso', waktu: 'Hari ini, 06:30' },
  { id: 3, santri: 'Bilal Ramadhan', asrama: 'Asrama Utsman bin Affan', jenis: 'TASMI', surah: 'QS. Al-Haqqah : 1-24', nilai: 96, muhaffiz: 'Ust. Hendra Wijaya', waktu: 'Kemarin, 16:40' },
];

export default function App() {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [asramaFilter, setAsramaFilter] = useState('ALL');
  const [migrateStudent, setMigrateStudent] = useState<string | null>(null);
  const [importOpen, setImportOpen] = useState(false);

  const filteredStudents = STUDENTS.filter(
    (s) => asramaFilter === 'ALL' || s.asrama === asramaFilter
  );

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-emerald-50 via-blue-50 to-amber-50">
      {/* Subtle Logo Watermark */}
      <img
        src="/logo.png"
        alt="ICBS Watermark"
        className="pointer-events-none fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] opacity-[0.06]"
      />

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 p-5 hidden md:flex flex-col justify-between glass-card border-r border-white/80">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <img src="/logo.png" alt="ICBS" className="w-11 h-11 object-contain" />
              <div>
                <h1 className="font-bold text-emerald-700 leading-tight">Tahfidz ICBS</h1>
                <p className="text-xs text-blue-700 font-medium">Admin Dashboard</p>
              </div>
            </div>

            <nav className="space-y-2">
              {[
                { key: 'dashboard', label: 'Dashboard Ringkasan', icon: '📊' },
                { key: 'santri', label: 'Santri & Halaqah', icon: '🕌' },
                { key: 'pengguna', label: 'Manajemen Pengguna', icon: '👥' },
                { key: 'monitoring', label: 'Monitoring Setoran', icon: '📖' },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setTab(item.key as Tab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    tab === item.key
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'text-slate-700 hover:bg-white/70'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-3 rounded-xl bg-emerald-600/10 border border-emerald-600/20 text-xs text-emerald-800">
            <p className="font-bold">● Sync Server Aktif</p>
            <p className="mt-0.5 text-emerald-700">Semua data halaqah tersinkron</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 max-w-6xl mx-auto w-full">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {tab === 'dashboard' && 'Dashboard Ringkasan'}
                {tab === 'santri' && 'Manajemen Santri & Halaqah'}
                {tab === 'pengguna' && 'Manajemen Pengguna'}
                {tab === 'monitoring' && 'Monitoring Setoran'}
              </h2>
              <p className="text-sm text-slate-600">Insan Cendekia Boarding School • TA 2026/2027</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setImportOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700"
              >
                + Import Excel/CSV
              </button>
            </div>
          </div>

          {/* DASHBOARD BENTO GRID */}
          {tab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass-card rounded-2xl p-5 border-t-4 border-t-emerald-600">
                <p className="text-xs font-semibold text-slate-500 uppercase">Total Santri</p>
                <p className="text-3xl font-extrabold text-emerald-700 mt-2">320</p>
                <p className="text-xs text-emerald-600 font-semibold mt-1">▲ +12 santri baru</p>
              </div>
              <div className="glass-card rounded-2xl p-5 border-t-4 border-t-blue-600">
                <p className="text-xs font-semibold text-slate-500 uppercase">Total Muhaffiz</p>
                <p className="text-3xl font-extrabold text-blue-700 mt-2">18</p>
                <p className="text-xs text-slate-500 mt-1">16–20 santri / halaqah</p>
              </div>
              <div className="glass-card rounded-2xl p-5 border-t-4 border-t-amber-500">
                <p className="text-xs font-semibold text-slate-500 uppercase">Total Asrama</p>
                <p className="text-3xl font-extrabold text-amber-600 mt-2">6</p>
                <p className="text-xs text-slate-500 mt-1">Putra & Putri</p>
              </div>
              <div className="glass-card rounded-2xl p-5 border-t-4 border-t-emerald-500 bg-gradient-to-br from-emerald-600 to-blue-700 text-white">
                <p className="text-xs font-semibold text-amber-300 uppercase">Setoran Hari Ini</p>
                <p className="text-3xl font-extrabold mt-2">248</p>
                <p className="text-xs text-white/85 mt-1">● 100% Tersinkron</p>
              </div>

              {/* Wide Bento: Capaian Per Asrama */}
              <div className="md:col-span-2 glass-card rounded-2xl p-5">
                <h3 className="font-bold text-slate-800 mb-4">Capaian Hafalan per Asrama</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Asrama Umar bin Khattab', pct: 82, color: 'bg-emerald-600' },
                    { name: 'Asrama Abu Bakar', pct: 74, color: 'bg-blue-600' },
                    { name: 'Asrama Utsman bin Affan', pct: 68, color: 'bg-amber-500' },
                  ].map((a) => (
                    <div key={a.name}>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>{a.name}</span>
                        <span>{a.pct}% target</span>
                      </div>
                      <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full ${a.color} rounded-full`} style={{ width: `${a.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wide Bento: Setoran Terbaru */}
              <div className="md:col-span-2 glass-card rounded-2xl p-5">
                <h3 className="font-bold text-slate-800 mb-4">Log Setoran Terbaru</h3>
                <div className="space-y-2.5">
                  {LOGS.map((l) => (
                    <div key={l.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white/70 border border-white">
                      <div>
                        <p className="text-sm font-bold text-slate-800">{l.santri}</p>
                        <p className="text-xs text-slate-500">{l.surah} • {l.jenis}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs">
                        {l.nilai}/100
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SANTRI & HALAQAH */}
          {tab === 'santri' && (
            <div className="glass-card rounded-2xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <select
                  value={asramaFilter}
                  onChange={(e) => setAsramaFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold"
                >
                  <option value="ALL">Semua Asrama</option>
                  <option value="Asrama Umar bin Khattab">Asrama Umar bin Khattab</option>
                  <option value="Asrama Abu Bakar">Asrama Abu Bakar</option>
                  <option value="Asrama Utsman bin Affan">Asrama Utsman bin Affan</option>
                </select>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="py-3">NIS</th>
                      <th>Nama Santri</th>
                      <th>Kelas & Asrama</th>
                      <th>Muhaffiz</th>
                      <th>Total Juz</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((s) => (
                      <tr key={s.id} className="border-b border-slate-100">
                        <td className="py-3 font-mono text-xs">{s.nis}</td>
                        <td className="font-bold text-slate-800">{s.name}</td>
                        <td className="text-slate-600">{s.kelas} • {s.asrama}</td>
                        <td className="text-blue-700 font-medium">{s.muhaffiz}</td>
                        <td>
                          <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 font-bold text-xs">
                            {s.juz} Juz
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => setMigrateStudent(s.name)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
                          >
                            Migrasi Halaqah
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PENGGUNA */}
          {tab === 'pengguna' && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-bold text-slate-800 mb-2">Akun Muhaffiz & Wali Murid</h3>
              <p className="text-sm text-slate-600 mb-4">
                Akun dibuat tertutup oleh Admin atau melalui Import Excel/CSV. Pengguna wajib mengganti password default saat login pertama.
              </p>
              <button
                onClick={() => setImportOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold"
              >
                Import Massal Excel/CSV
              </button>
            </div>
          )}

          {/* MONITORING */}
          {tab === 'monitoring' && (
            <div className="glass-card rounded-2xl p-5">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-3">Santri</th>
                    <th>Asrama</th>
                    <th>Jenis</th>
                    <th>Surah</th>
                    <th>Nilai</th>
                    <th>Muhaffiz</th>
                  </tr>
                </thead>
                <tbody>
                  {LOGS.map((l) => (
                    <tr key={l.id} className="border-b border-slate-100">
                      <td className="py-3 font-bold">{l.santri}</td>
                      <td>{l.asrama}</td>
                      <td>
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                          {l.jenis}
                        </span>
                      </td>
                      <td>{l.surah}</td>
                      <td className="font-bold text-emerald-700">{l.nilai}</td>
                      <td>{l.muhaffiz}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {/* Modal Migrasi */}
      {migrateStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4">
          <div className="glass-card bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="font-bold text-lg mb-1">Migrasi Halaqah</h3>
            <p className="text-sm text-slate-600 mb-4">Pindahkan <b>{migrateStudent}</b> ke Muhaffiz baru:</p>
            <select className="w-full p-2.5 rounded-xl border border-slate-200 mb-4 text-sm">
              <option>Ust. Hendra Wijaya</option>
              <option>Ust. Budi Santoso</option>
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setMigrateStudent(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-sm font-semibold">Batal</button>
              <button onClick={() => setMigrateStudent(null)} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold">Simpan Migrasi</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Import */}
      {importOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4">
          <div className="glass-card bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="font-bold text-lg mb-1">Import Data Excel/CSV</h3>
            <p className="text-sm text-slate-600 mb-4">Unggah template data Santri, Asrama, Muhaffiz, dan Wali Murid.</p>
            <input type="file" className="w-full text-sm mb-4" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setImportOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-sm font-semibold">Tutup</button>
              <button onClick={() => setImportOpen(false)} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold">Upload</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
