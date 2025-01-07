// Fungsi untuk memformat angka menjadi format dengan pemisah ribuan dan Rp ( rupiah ) //

function formatRupiah(angka) {
    angka = parseFloat(angka);
    if (isNaN(angka) || angka < 0) {
        return 'Rp 0'; 
        }
        return 'Rp ' + angka.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Fungsi untuk menampilkan/menghiding detail //

function toggleDetails(event) {
    event.preventDefault();
    const details = event.target.nextElementSibling;
        if (details.style.display === "none" || details.style.display === "") {
            details.style.display = "block";
        } else {
            details.style.display = "none";
        }
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
            const noBp = pinjamanData.noBP; // Fungsi Ambil nomor Bukti Peminjaman yang sudah disimpan //
            const tglBp = new Date().toLocaleDateString(); // Tanggal Bukti Peminjaman //
            const jumlahRealisasi = parseFloat(pinjamanData.jumlahPermohonan); // Fungsi untuk Pastikan menjadi angka //
            const lamaAngsuran = 12; // Lama Angsuran ( Misalnya 12 bulan ) //
            const jumlahAngsuran = (jumlahRealisasi / lamaAngsuran).toFixed(2); // Pembulatan 2 desimal //
            
            const anggotaBox = `
                <div class="anggota-box">
                    <h3>${pinjamanData.namaAnggota}</h3>
                    <p><strong>Nomor Anggota:</strong> ${pinjamanData.nomorAnggota}</p>
                    <p><strong>Jumlah Permohonan:</strong> ${formatRupiah(jumlahRealisasi)}</p>
                    <a href="#" class="view-details" onclick="toggleDetails(event)">View Details</a>
                    <div class="details">
                        <p><strong>Nomor BP:</strong> ${noBp}</p>
                        <p><strong>Tanggal BP:</strong> ${tglBp}</p>
                        <p><strong>Jumlah Realisasi:</strong> ${formatRupiah(jumlahRealisasi)}</p>
                        <p><strong>Lama Angsuran:</strong> ${lamaAngsuran} bulan</p>
                        <p><strong>Jumlah Angsuran:</strong> ${formatRupiah(jumlahAngsuran)} per bulan</p>
                    </div>
                </div>
            `;

            document.querySelector('.bukti-info').innerHTML = anggotaBox;
        } else {
            document.querySelector('.bukti-info').innerHTML = "<p>Data peminjaman tidak ditemukan. Silakan ajukan permohonan pinjaman terlebih dahulu.</p>";
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