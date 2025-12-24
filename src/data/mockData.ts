export interface Petani {
  kodePetani: string;
  namaPetani: string;
  alamatPetani: string;
}

export interface Lahan {
  kodeLahan: string;
  lokasiLahan: string;
}

export interface Komoditas {
  kodeKomoditas: string;
  namaKomoditas: string;
  hargaSatuan: number;
}

export interface DetailTransaksi {
  noTransaksi: string;
  kodeKomoditas: string;
  berat: number;
}

export interface TransaksiHasilPanen {
  noTransaksi: string;
  tanggal: string;
  namaPengepul: string;
  kodePetani: string;
  kodeLahan: string;
}

// 20 Unique Farmers
export const petaniData: Petani[] = [
  { kodePetani: "PTN-001", namaPetani: "Agus Setiawan", alamatPetani: "Jl. Melati No. 9" },
  { kodePetani: "PTN-002", namaPetani: "Asep Sunandar", alamatPetani: "Jl. Mawar No. 3" },
  { kodePetani: "PTN-003", namaPetani: "Bambang Pamungkas", alamatPetani: "Jl. Elang No. 10" },
  { kodePetani: "PTN-004", namaPetani: "Budi Santoso", alamatPetani: "Jl. Merpati No. 5" },
  { kodePetani: "PTN-005", namaPetani: "Dewi Sartika", alamatPetani: "Jl. Cendrawasih No. 2" },
  { kodePetani: "PTN-006", namaPetani: "Eko Prasetyo", alamatPetani: "Jl. Garuda No. 1" },
  { kodePetani: "PTN-007", namaPetani: "Fajar Nugraha", alamatPetani: "Jl. Rajawali No. 7" },
  { kodePetani: "PTN-008", namaPetani: "Gilang Dirga", alamatPetani: "Jl. Bangau No. 11" },
  { kodePetani: "PTN-009", namaPetani: "Hesti Purwadinata", alamatPetani: "Jl. Parkit No. 15" },
  { kodePetani: "PTN-010", namaPetani: "Iwan Fals", alamatPetani: "Jl. Nuri No. 20" },
  { kodePetani: "PTN-011", namaPetani: "Joko Widodo", alamatPetani: "Jl. Anggrek No. 8" },
  { kodePetani: "PTN-012", namaPetani: "Julia Perez", alamatPetani: "Jl. Beo No. 6" },
  { kodePetani: "PTN-013", namaPetani: "Kartika Putri", alamatPetani: "Jl. Jalak No. 14" },
  { kodePetani: "PTN-014", namaPetani: "Luna Maya", alamatPetani: "Jl. Kakaktua No. 22" },
  { kodePetani: "PTN-015", namaPetani: "Mamat Alkatiri", alamatPetani: "Jl. Pipit No. 30" },
  { kodePetani: "PTN-016", namaPetani: "Nunung Srimulat", alamatPetani: "Jl. Walet No. 88" },
  { kodePetani: "PTN-017", namaPetani: "Olga Syahputra", alamatPetani: "Jl. Gelatik No. 99" },
  { kodePetani: "PTN-018", namaPetani: "Parto Patrio", alamatPetani: "Jl. Pelikan No. 55" },
  { kodePetani: "PTN-019", namaPetani: "Rina Marlina", alamatPetani: "Jl. Kutilang No. 4" },
  { kodePetani: "PTN-020", namaPetani: "Siti Aminah", alamatPetani: "Jl. Kenari No. 12" },
];

// 20 Unique Land Areas
export const lahanData: Lahan[] = [
  { kodeLahan: "LAH-A01", lokasiLahan: "Desa Sukamaju, Blok Utara" },
  { kodeLahan: "LAH-B02", lokasiLahan: "Desa Sukamaju, Blok Selatan" },
  { kodeLahan: "LAH-C03", lokasiLahan: "Desa Sukamaju, Blok Timur" },
  { kodeLahan: "LAH-D04", lokasiLahan: "Desa Sukamaju, Blok Barat" },
  { kodeLahan: "LAH-E05", lokasiLahan: "Desa Makmur, Blok A" },
  { kodeLahan: "LAH-F06", lokasiLahan: "Desa Makmur, Blok B" },
  { kodeLahan: "LAH-G07", lokasiLahan: "Desa Harapan, Blok C" },
  { kodeLahan: "LAH-H08", lokasiLahan: "Desa Harapan, Blok D" },
  { kodeLahan: "LAH-I09", lokasiLahan: "Desa Sejahtera, Blok E" },
  { kodeLahan: "LAH-J10", lokasiLahan: "Desa Sejahtera, Blok F" },
  { kodeLahan: "LAH-K11", lokasiLahan: "Desa Makmur, Blok C" },
  { kodeLahan: "LAH-L12", lokasiLahan: "Desa Makmur, Blok D" },
  { kodeLahan: "LAH-M13", lokasiLahan: "Desa Harapan, Blok E" },
  { kodeLahan: "LAH-N14", lokasiLahan: "Desa Harapan, Blok F" },
  { kodeLahan: "LAH-O15", lokasiLahan: "Desa Sejahtera, Blok G" },
  { kodeLahan: "LAH-P16", lokasiLahan: "Desa Sejahtera, Blok H" },
  { kodeLahan: "LAH-Q17", lokasiLahan: "Desa Sukamaju, Blok Barat" },
  { kodeLahan: "LAH-R18", lokasiLahan: "Desa Sukamaju, Blok Timur" },
  { kodeLahan: "LAH-S19", lokasiLahan: "Desa Makmur, Blok E" },
  { kodeLahan: "LAH-T20", lokasiLahan: "Desa Sejahtera, Blok I" },
];

// 20 Unique Commodities
export const komoditasData: Komoditas[] = [
  { kodeKomoditas: "K-001", namaKomoditas: "Bawang Merah", hargaSatuan: 30000 },
  { kodeKomoditas: "K-002", namaKomoditas: "Bawang Putih", hargaSatuan: 28000 },
  { kodeKomoditas: "K-003", namaKomoditas: "Bayam Hijau", hargaSatuan: 2000 },
  { kodeKomoditas: "K-004", namaKomoditas: "Brokoli", hargaSatuan: 15000 },
  { kodeKomoditas: "K-005", namaKomoditas: "Cabai Rawit", hargaSatuan: 25000 },
  { kodeKomoditas: "K-006", namaKomoditas: "Jagung Manis", hargaSatuan: 4000 },
  { kodeKomoditas: "K-007", namaKomoditas: "Kacang Tanah", hargaSatuan: 10000 },
  { kodeKomoditas: "K-008", namaKomoditas: "Kangkung Darat", hargaSatuan: 2000 },
  { kodeKomoditas: "K-009", namaKomoditas: "Kedelai", hargaSatuan: 8000 },
  { kodeKomoditas: "K-010", namaKomoditas: "Kentang Granola", hargaSatuan: 15000 },
  { kodeKomoditas: "K-011", namaKomoditas: "Kubis Hijau", hargaSatuan: 4000 },
  { kodeKomoditas: "K-012", namaKomoditas: "Labu Siam", hargaSatuan: 3000 },
  { kodeKomoditas: "K-013", namaKomoditas: "Mentimun", hargaSatuan: 4000 },
  { kodeKomoditas: "K-014", namaKomoditas: "Padi Ciherang", hargaSatuan: 5000 },
  { kodeKomoditas: "K-015", namaKomoditas: "Sawi Putih", hargaSatuan: 5000 },
  { kodeKomoditas: "K-016", namaKomoditas: "Singkong Gajah", hargaSatuan: 1500 },
  { kodeKomoditas: "K-017", namaKomoditas: "Terong Ungu", hargaSatuan: 6000 },
  { kodeKomoditas: "K-018", namaKomoditas: "Tomat Merah", hargaSatuan: 8000 },
  { kodeKomoditas: "K-019", namaKomoditas: "Ubi Cilembu", hargaSatuan: 3000 },
  { kodeKomoditas: "K-020", namaKomoditas: "Wortel Import", hargaSatuan: 12000 },
];

// 50 Transactions
export const transaksiData: TransaksiHasilPanen[] = [
  { noTransaksi: "TRX-001", tanggal: "2025-11-01", namaPengepul: "CV. Tani Jaya", kodePetani: "PTN-004", kodeLahan: "LAH-A01" },
  { noTransaksi: "TRX-002", tanggal: "2025-11-02", namaPengepul: "UD. Sumber Rezeki", kodePetani: "PTN-020", kodeLahan: "LAH-B02" },
  { noTransaksi: "TRX-003", tanggal: "2025-11-03", namaPengepul: "PT. Agro Makmur", kodePetani: "PTN-011", kodeLahan: "LAH-C03" },
  { noTransaksi: "TRX-004", tanggal: "2025-11-04", namaPengepul: "CV. Tani Jaya", kodePetani: "PTN-002", kodeLahan: "LAH-D04" },
  { noTransaksi: "TRX-005", tanggal: "2025-11-05", namaPengepul: "UD. Sumber Rezeki", kodePetani: "PTN-001", kodeLahan: "LAH-E05" },
  { noTransaksi: "TRX-006", tanggal: "2025-11-06", namaPengepul: "CV. Tani Jaya", kodePetani: "PTN-019", kodeLahan: "LAH-F06" },
  { noTransaksi: "TRX-007", tanggal: "2025-11-07", namaPengepul: "UD. Sumber Rezeki", kodePetani: "PTN-003", kodeLahan: "LAH-G07" },
  { noTransaksi: "TRX-008", tanggal: "2025-11-08", namaPengepul: "PT. Agro Makmur", kodePetani: "PTN-005", kodeLahan: "LAH-H08" },
  { noTransaksi: "TRX-009", tanggal: "2025-11-09", namaPengepul: "CV. Tani Jaya", kodePetani: "PTN-006", kodeLahan: "LAH-I09" },
  { noTransaksi: "TRX-010", tanggal: "2025-11-10", namaPengepul: "UD. Sumber Rezeki", kodePetani: "PTN-007", kodeLahan: "LAH-J10" },
  { noTransaksi: "TRX-011", tanggal: "2025-11-11", namaPengepul: "PT. Agro Makmur", kodePetani: "PTN-008", kodeLahan: "LAH-K11" },
  { noTransaksi: "TRX-012", tanggal: "2025-11-12", namaPengepul: "CV. Tani Jaya", kodePetani: "PTN-009", kodeLahan: "LAH-L12" },
  { noTransaksi: "TRX-013", tanggal: "2025-11-13", namaPengepul: "CV. Tani Jaya", kodePetani: "PTN-010", kodeLahan: "LAH-M13" },
  { noTransaksi: "TRX-014", tanggal: "2025-11-14", namaPengepul: "UD. Sumber Rezeki", kodePetani: "PTN-012", kodeLahan: "LAH-N14" },
  { noTransaksi: "TRX-015", tanggal: "2025-11-15", namaPengepul: "PT. Agro Makmur", kodePetani: "PTN-013", kodeLahan: "LAH-O15" },
  { noTransaksi: "TRX-016", tanggal: "2025-11-16", namaPengepul: "CV. Tani Jaya", kodePetani: "PTN-014", kodeLahan: "LAH-P16" },
  { noTransaksi: "TRX-017", tanggal: "2025-11-17", namaPengepul: "UD. Sumber Rezeki", kodePetani: "PTN-015", kodeLahan: "LAH-Q17" },
  { noTransaksi: "TRX-018", tanggal: "2025-11-18", namaPengepul: "PT. Agro Makmur", kodePetani: "PTN-016", kodeLahan: "LAH-R18" },
  { noTransaksi: "TRX-019", tanggal: "2025-11-19", namaPengepul: "CV. Tani Jaya", kodePetani: "PTN-017", kodeLahan: "LAH-S19" },
  { noTransaksi: "TRX-020", tanggal: "2025-11-20", namaPengepul: "UD. Sumber Rezeki", kodePetani: "PTN-018", kodeLahan: "LAH-T20" },
  { noTransaksi: "TRX-021", tanggal: "2025-11-21", namaPengepul: "CV. Tani Jaya", kodePetani: "PTN-004", kodeLahan: "LAH-A01" },
  { noTransaksi: "TRX-022", tanggal: "2025-11-22", namaPengepul: "UD. Sumber Rezeki", kodePetani: "PTN-020", kodeLahan: "LAH-B02" },
  { noTransaksi: "TRX-023", tanggal: "2025-11-23", namaPengepul: "PT. Agro Makmur", kodePetani: "PTN-011", kodeLahan: "LAH-C03" },
  { noTransaksi: "TRX-024", tanggal: "2025-11-24", namaPengepul: "CV. Tani Jaya", kodePetani: "PTN-010", kodeLahan: "LAH-M13" },
  { noTransaksi: "TRX-025", tanggal: "2025-11-25", namaPengepul: "UD. Sumber Rezeki", kodePetani: "PTN-014", kodeLahan: "LAH-P16" },
  { noTransaksi: "TRX-026", tanggal: "2025-11-26", namaPengepul: "PT. Agro Makmur", kodePetani: "PTN-018", kodeLahan: "LAH-T20" },
  { noTransaksi: "TRX-027", tanggal: "2025-11-27", namaPengepul: "CV. Tani Jaya", kodePetani: "PTN-008", kodeLahan: "LAH-K11" },
  { noTransaksi: "TRX-028", tanggal: "2025-11-28", namaPengepul: "UD. Sumber Rezeki", kodePetani: "PTN-009", kodeLahan: "LAH-L12" },
  { noTransaksi: "TRX-029", tanggal: "2025-11-29", namaPengepul: "PT. Agro Makmur", kodePetani: "PTN-016", kodeLahan: "LAH-R18" },
  { noTransaksi: "TRX-030", tanggal: "2025-11-30", namaPengepul: "CV. Tani Jaya", kodePetani: "PTN-015", kodeLahan: "LAH-Q17" },
  { noTransaksi: "TRX-031", tanggal: "2025-12-01", namaPengepul: "CV. Tani Jaya", kodePetani: "PTN-013", kodeLahan: "LAH-O15" },
  { noTransaksi: "TRX-032", tanggal: "2025-12-02", namaPengepul: "UD. Sumber Rezeki", kodePetani: "PTN-017", kodeLahan: "LAH-S19" },
  { noTransaksi: "TRX-033", tanggal: "2025-12-03", namaPengepul: "PT. Agro Makmur", kodePetani: "PTN-012", kodeLahan: "LAH-N14" },
  { noTransaksi: "TRX-034", tanggal: "2025-12-04", namaPengepul: "CV. Tani Jaya", kodePetani: "PTN-006", kodeLahan: "LAH-I09" },
  { noTransaksi: "TRX-035", tanggal: "2025-12-05", namaPengepul: "UD. Sumber Rezeki", kodePetani: "PTN-007", kodeLahan: "LAH-J10" },
  { noTransaksi: "TRX-036", tanggal: "2025-12-06", namaPengepul: "PT. Agro Makmur", kodePetani: "PTN-019", kodeLahan: "LAH-F06" },
  { noTransaksi: "TRX-037", tanggal: "2025-12-07", namaPengepul: "CV. Tani Jaya", kodePetani: "PTN-003", kodeLahan: "LAH-G07" },
  { noTransaksi: "TRX-038", tanggal: "2025-12-08", namaPengepul: "UD. Sumber Rezeki", kodePetani: "PTN-005", kodeLahan: "LAH-H08" },
  { noTransaksi: "TRX-039", tanggal: "2025-12-09", namaPengepul: "PT. Agro Makmur", kodePetani: "PTN-001", kodeLahan: "LAH-E05" },
  { noTransaksi: "TRX-040", tanggal: "2025-12-10", namaPengepul: "CV. Tani Jaya", kodePetani: "PTN-002", kodeLahan: "LAH-D04" },
  { noTransaksi: "TRX-041", tanggal: "2025-12-11", namaPengepul: "CV. Tani Jaya", kodePetani: "PTN-004", kodeLahan: "LAH-A01" },
  { noTransaksi: "TRX-042", tanggal: "2025-12-12", namaPengepul: "UD. Sumber Rezeki", kodePetani: "PTN-020", kodeLahan: "LAH-B02" },
  { noTransaksi: "TRX-043", tanggal: "2025-12-13", namaPengepul: "PT. Agro Makmur", kodePetani: "PTN-011", kodeLahan: "LAH-C03" },
  { noTransaksi: "TRX-044", tanggal: "2025-12-14", namaPengepul: "CV. Tani Jaya", kodePetani: "PTN-010", kodeLahan: "LAH-M13" },
  { noTransaksi: "TRX-045", tanggal: "2025-12-15", namaPengepul: "UD. Sumber Rezeki", kodePetani: "PTN-014", kodeLahan: "LAH-P16" },
  { noTransaksi: "TRX-046", tanggal: "2025-12-16", namaPengepul: "PT. Agro Makmur", kodePetani: "PTN-018", kodeLahan: "LAH-T20" },
  { noTransaksi: "TRX-047", tanggal: "2025-12-17", namaPengepul: "CV. Tani Jaya", kodePetani: "PTN-016", kodeLahan: "LAH-R18" },
  { noTransaksi: "TRX-048", tanggal: "2025-12-18", namaPengepul: "UD. Sumber Rezeki", kodePetani: "PTN-015", kodeLahan: "LAH-Q17" },
  { noTransaksi: "TRX-049", tanggal: "2025-12-19", namaPengepul: "PT. Agro Makmur", kodePetani: "PTN-009", kodeLahan: "LAH-L12" },
  { noTransaksi: "TRX-050", tanggal: "2025-12-20", namaPengepul: "CV. Tani Jaya", kodePetani: "PTN-008", kodeLahan: "LAH-K11" },
];

// 60 Transaction Details (some transactions have multiple commodities)
export const detailTransaksiData: DetailTransaksi[] = [
  { noTransaksi: "TRX-001", kodeKomoditas: "K-014", berat: 1000 },
  { noTransaksi: "TRX-002", kodeKomoditas: "K-006", berat: 500 },
  { noTransaksi: "TRX-003", kodeKomoditas: "K-009", berat: 200 },
  { noTransaksi: "TRX-004", kodeKomoditas: "K-016", berat: 2000 },
  { noTransaksi: "TRX-005", kodeKomoditas: "K-019", berat: 300 },
  { noTransaksi: "TRX-006", kodeKomoditas: "K-007", berat: 100 },
  { noTransaksi: "TRX-007", kodeKomoditas: "K-005", berat: 50 },
  { noTransaksi: "TRX-008", kodeKomoditas: "K-001", berat: 40 },
  { noTransaksi: "TRX-009", kodeKomoditas: "K-002", berat: 30 },
  { noTransaksi: "TRX-010", kodeKomoditas: "K-018", berat: 100 },
  { noTransaksi: "TRX-011", kodeKomoditas: "K-020", berat: 50 },
  { noTransaksi: "TRX-012", kodeKomoditas: "K-010", berat: 200 },
  { noTransaksi: "TRX-013", kodeKomoditas: "K-011", berat: 300 },
  { noTransaksi: "TRX-014", kodeKomoditas: "K-017", berat: 150 },
  { noTransaksi: "TRX-015", kodeKomoditas: "K-003", berat: 50 },
  { noTransaksi: "TRX-016", kodeKomoditas: "K-008", berat: 60 },
  { noTransaksi: "TRX-017", kodeKomoditas: "K-015", berat: 100 },
  { noTransaksi: "TRX-018", kodeKomoditas: "K-004", berat: 40 },
  { noTransaksi: "TRX-019", kodeKomoditas: "K-012", berat: 200 },
  { noTransaksi: "TRX-020", kodeKomoditas: "K-013", berat: 150 },
  { noTransaksi: "TRX-021", kodeKomoditas: "K-005", berat: 20 },
  { noTransaksi: "TRX-022", kodeKomoditas: "K-018", berat: 50 },
  { noTransaksi: "TRX-023", kodeKomoditas: "K-001", berat: 100 },
  { noTransaksi: "TRX-024", kodeKomoditas: "K-014", berat: 2000 },
  { noTransaksi: "TRX-025", kodeKomoditas: "K-006", berat: 1000 },
  { noTransaksi: "TRX-026", kodeKomoditas: "K-009", berat: 500 },
  { noTransaksi: "TRX-027", kodeKomoditas: "K-007", berat: 200 },
  { noTransaksi: "TRX-028", kodeKomoditas: "K-016", berat: 1500 },
  { noTransaksi: "TRX-029", kodeKomoditas: "K-019", berat: 400 },
  { noTransaksi: "TRX-030", kodeKomoditas: "K-004", berat: 50 },
  { noTransaksi: "TRX-031", kodeKomoditas: "K-020", berat: 100 },
  { noTransaksi: "TRX-032", kodeKomoditas: "K-010", berat: 300 },
  { noTransaksi: "TRX-033", kodeKomoditas: "K-002", berat: 50 },
  { noTransaksi: "TRX-034", kodeKomoditas: "K-017", berat: 200 },
  { noTransaksi: "TRX-035", kodeKomoditas: "K-011", berat: 400 },
  { noTransaksi: "TRX-036", kodeKomoditas: "K-003", berat: 100 },
  { noTransaksi: "TRX-037", kodeKomoditas: "K-008", berat: 150 },
  { noTransaksi: "TRX-038", kodeKomoditas: "K-015", berat: 200 },
  { noTransaksi: "TRX-039", kodeKomoditas: "K-012", berat: 300 },
  { noTransaksi: "TRX-040", kodeKomoditas: "K-013", berat: 250 },
  // Multi-commodity transactions (TRX-041 to TRX-050)
  { noTransaksi: "TRX-041", kodeKomoditas: "K-006", berat: 200 },
  { noTransaksi: "TRX-041", kodeKomoditas: "K-014", berat: 500 },
  { noTransaksi: "TRX-042", kodeKomoditas: "K-007", berat: 50 },
  { noTransaksi: "TRX-042", kodeKomoditas: "K-009", berat: 100 },
  { noTransaksi: "TRX-043", kodeKomoditas: "K-001", berat: 10 },
  { noTransaksi: "TRX-043", kodeKomoditas: "K-005", berat: 10 },
  { noTransaksi: "TRX-044", kodeKomoditas: "K-010", berat: 50 },
  { noTransaksi: "TRX-044", kodeKomoditas: "K-020", berat: 20 },
  { noTransaksi: "TRX-045", kodeKomoditas: "K-003", berat: 20 },
  { noTransaksi: "TRX-045", kodeKomoditas: "K-008", berat: 20 },
  { noTransaksi: "TRX-046", kodeKomoditas: "K-004", berat: 10 },
  { noTransaksi: "TRX-046", kodeKomoditas: "K-015", berat: 20 },
  { noTransaksi: "TRX-047", kodeKomoditas: "K-017", berat: 30 },
  { noTransaksi: "TRX-047", kodeKomoditas: "K-018", berat: 30 },
  { noTransaksi: "TRX-048", kodeKomoditas: "K-012", berat: 50 },
  { noTransaksi: "TRX-048", kodeKomoditas: "K-013", berat: 50 },
  { noTransaksi: "TRX-049", kodeKomoditas: "K-016", berat: 500 },
  { noTransaksi: "TRX-049", kodeKomoditas: "K-019", berat: 100 },
  { noTransaksi: "TRX-050", kodeKomoditas: "K-002", berat: 10 },
  { noTransaksi: "TRX-050", kodeKomoditas: "K-011", berat: 20 },
];

// Helper functions
export const getPetaniByKode = (kode: string) => petaniData.find((p) => p.kodePetani === kode);
export const getLahanByKode = (kode: string) => lahanData.find((l) => l.kodeLahan === kode);
export const getKomoditasByKode = (kode: string) => komoditasData.find((k) => k.kodeKomoditas === kode);
export const getDetailsByTransaksi = (noTransaksi: string) => detailTransaksiData.filter((d) => d.noTransaksi === noTransaksi);

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Calculate transaction total
export const calculateTransactionTotal = (noTransaksi: string): number => {
  const details = getDetailsByTransaksi(noTransaksi);
  return details.reduce((total, detail) => {
    const komoditas = getKomoditasByKode(detail.kodeKomoditas);
    return total + (komoditas ? detail.berat * komoditas.hargaSatuan : 0);
  }, 0);
};

// Get total revenue
export const getTotalRevenue = (): number => {
  return transaksiData.reduce((total, trx) => total + calculateTransactionTotal(trx.noTransaksi), 0);
};

// Get full transaction report with all joined data
export interface FullTransaksi {
  noTransaksi: string;
  tanggal: string;
  namaPetani: string;
  kodeLahan: string;
  lokasiLahan: string;
  namaKomoditas: string;
  berat: number;
  hargaSatuan: number;
  subtotal: number;
  namaPengepul: string;
}

export const getFullTransaksiReport = (): FullTransaksi[] => {
  const result: FullTransaksi[] = [];

  detailTransaksiData.forEach((detail) => {
    const transaksi = transaksiData.find((t) => t.noTransaksi === detail.noTransaksi);
    if (!transaksi) return;

    const petani = getPetaniByKode(transaksi.kodePetani);
    const lahan = getLahanByKode(transaksi.kodeLahan);
    const komoditas = getKomoditasByKode(detail.kodeKomoditas);

    if (!petani || !lahan || !komoditas) return;

    result.push({
      noTransaksi: detail.noTransaksi,
      tanggal: transaksi.tanggal,
      namaPetani: petani.namaPetani,
      kodeLahan: lahan.kodeLahan,
      lokasiLahan: lahan.lokasiLahan,
      namaKomoditas: komoditas.namaKomoditas,
      berat: detail.berat,
      hargaSatuan: komoditas.hargaSatuan,
      subtotal: detail.berat * komoditas.hargaSatuan,
      namaPengepul: transaksi.namaPengepul,
    });
  });

  return result.sort((a, b) => a.noTransaksi.localeCompare(b.noTransaksi));
};