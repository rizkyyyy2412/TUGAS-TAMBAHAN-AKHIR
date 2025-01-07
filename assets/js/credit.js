// Fungsi untuk memformat angka menjadi format dengan pemisah ribuan dan Rp ( rupiah ) //

function formatRupiah(angka) {
    angka = parseFloat(angka);
    if (isNaN(angka) || angka < 0) {
        return 'Rp 0'; 
        }
        return 'Rp ' + angka.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}


// Fungsi untuk mengirim laporan //

function kirimLaporan(type) {
    const alertBox = document.getElementById('alert');
    alertBox.style.display = 'block';
        setTimeout(() => {
    alertBox.style.display = 'none';
        }, 3000);

            if (type === 'pinjaman') {
                console.log("Laporan peminjaman telah dikirim kepada ketua koperasi.");
            } else if (type === 'angsuran') {
                console.log("Laporan angsuran telah dikirim kepada koperasi.");
            }
}

// Mengambil data arsip angsuran dari localStorage //

const arsipAngsuran = JSON.parse(localStorage.getItem('arsipAngsuran')) || [];

// Fungsi Mengambil elemen tbody untuk menambahkan data arsip //

const arsipBody = document.getElementById('arsip-body');

// Fungsi untuk menghapus arsip angsuran //

function hapusArsip(index) {
        arsipAngsuran.splice(index, 1); // Menghapus data pada indeks yang dipilih //
            localStorage.setItem('arsipAngsuran', JSON.stringify(arsipAngsuran)); // Untuk Menyimpan ulang data ke localStorage //
            renderArsipAngsuran(); // Render ulang tabel //
    }

// Fungsi untuk render arsip angsuran //

function renderArsipAngsuran() {
        arsipBody.innerHTML = '';

            if (arsipAngsuran.length === 0) {
                arsipBody.innerHTML = "<tr><td colspan='7'>Tidak ada arsip angsuran yang ditemukan.</td></tr>";
            } else {
                arsipAngsuran.forEach((angsuran, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${angsuran.noBA}</td>
                        <td>${angsuran.tanggalBA}</td>
                        <td>${angsuran.noBP}</td>
                        <td>${formatRupiah(angsuran.jumlahAngsuran)}</td>
                        <td>${formatRupiah(angsuran.bunga)}</td>
                        <td>${angsuran.pembayaranKe}</td>
                        <td>
                            <button onclick="hapusArsip(${index})">Hapus</button>
                            <button onclick="kirimLaporan('angsuran')">Kirim Laporan</button>
                        </td>
                    `;
                    arsipBody.appendChild(row);
                });
            }
        }

// Untuk Render data arsip angsuran saat halaman dimuat //
renderArsipAngsuran();

// Fungsi Menampilkan bukti peminjaman //

const pinjamanData = JSON.parse(localStorage.getItem('pinjamanData'));

if (pinjamanData) {
    // Ambil nomor Bukti Peminjaman (BP) yang sudah disimpan
    const noBp = pinjamanData.noBP;

    // Tanggal Bukti Peminjaman (format lokal)
    const tglBp = new Date().toLocaleDateString();

    // Pastikan jumlah permohonan menjadi angka
    const jumlahRealisasi = parseFloat(pinjamanData.jumlahPermohonan);

    // Lama angsuran (contoh: 12 bulan)
    const lamaAngsuran = 12;

    // Hitung jumlah angsuran per bulan dan bulatkan ke 2 desimal
    const jumlahAngsuran = (jumlahRealisasi / lamaAngsuran).toFixed(2);

    // Template HTML untuk menampilkan informasi anggota
    const anggotaBox = `
    <div class="anggota-box">
        <h3>Nama Anggota: ${pinjamanData.namaAnggota}</h3>
        <p><strong>Nomor Anggota:</strong> ${pinjamanData.nomorAnggota}</p>
        <p><strong>Jumlah Pinjaman:</strong> ${formatRupiah(jumlahRealisasi)}</p>

        <!-- Detail informasi peminjaman sebagai tabel -->
        <div class="details" style="display: block;">
            <table class="detail-table">
                <tr>
                    <th>Nomor Bayar Peminjaman</th>
                    <td>${noBp}</td>
                </tr>
                <tr>
                    <th>Tanggal Bukti Peminjaman</th>
                    <td>${tglBp}</td>
                </tr>
                <tr>
                    <th>Jumlah Realisasi</th>
                    <td>${formatRupiah(jumlahRealisasi)}</td>
                </tr>
                <tr>
                    <th>Lama Angsuran</th>
                    <td>${lamaAngsuran} bulan</td>
                </tr>
                <tr>
                    <th>Jumlah Angsuran</th>
                    <td>${formatRupiah(jumlahAngsuran)} / Bulan</td>
                </tr>
            </table>
        </div>
    </div>
`;


    // Tambahkan informasi peminjaman ke elemen dengan class "bukti-info"
    document.querySelector('.bukti-info').innerHTML = anggotaBox;
} else {
    // Tampilkan pesan jika data peminjaman tidak ditemukan
    document.querySelector('.bukti-info').innerHTML = `
        <p>Data peminjaman tidak ditemukan. Silakan ajukan permohonan pinjaman terlebih dahulu.</p>
    `;
}



// untuk menghapus bukti peminjaman //

function hapusBuktiPeminjaman() {
        localStorage.removeItem('pinjamanData');
        document.querySelector('.bukti-info').innerHTML = "<p>Data peminjaman telah dihapus.</p>";
        console.log("Bukti peminjaman telah dihapus.");
}

function logout() {
        alert("Anda telah logout.");
        window.location.href = "../login.html"; // Ke halaman login jika logout //

}