// Fungsi untuk memformat angka menjadi format dengan pemisah ribuan dan Rp ( rupiah ) //

function formatRupiah(angka) {
    angka = parseFloat(angka);
    if (isNaN(angka) || angka < 0) {
        return 'Rp 0';
    }
    return 'Rp ' + angka.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Fungsi untuk menentukan tingkat bunga berdasarkan jumlah pinjaman //

    function hitungBunga(jumlahPinjaman) {
        if (jumlahPinjaman <= 5000000) {
            return 0.10; // 10% ( Contoh ) //
        } else if (jumlahPinjaman > 5000000 && jumlahPinjaman <= 10000000) {
            return 0.12; // 12% ( -- ) //
        } else {
        return 0.15; // 15% ( -- ) //
        }
    }

// Untuk Mengambil data permohonan pinjaman dari localStorage //

    const pinjamanData = JSON.parse(localStorage.getItem('pinjamanData'));


// Fungsi Jika ada data pinjaman yang tersimpan //

if (pinjamanData) {
    const noBp = pinjamanData.noBP; // ----- //
    const tglBp = new Date().toLocaleDateString(); // ----- //
    const jumlahRealisasi = parseFloat(pinjamanData.jumlahPermohonan); // ------- //
    const lamaAngsuran = 12; // ------- //
    const jumlahAngsuran = (jumlahRealisasi / lamaAngsuran).toFixed(2); // ------ //
    
    // Fungsi Menghitung bunga sesuai dengan jumlah pinjaman //

    const bungaPersen = hitungBunga(jumlahRealisasi);
    const bunga = bungaPersen * jumlahRealisasi; // Bunga berdasarkan persen (%) //

    // Menyusun tampilan anggota dengan format angka //

    const anggotaBox = `
        <div class="anggota-box">
            <h3>${pinjamanData.namaAnggota}</h3>
            <p><strong>Nomor Anggota:</strong> ${pinjamanData.nomorAnggota}</p>
            <p><strong>Jumlah Permohonan:</strong> ${formatRupiah(jumlahRealisasi)}</p>
            <a href="#" class="view-details" onclick="toggleDetails(event)">View Details</a>
            <div class="details" style="display: none;">
                <p><strong>Nomor BP:</strong> ${noBp}</p>
                <p><strong>Tanggal BP:</strong> ${tglBp}</p>
                <p><strong>Jumlah Realisasi:</strong> ${formatRupiah(jumlahRealisasi)}</p>
                <p><strong>Lama Angsuran:</strong> ${lamaAngsuran} bulan</p>
                <p><strong>Jumlah Angsuran:</strong> ${formatRupiah(jumlahAngsuran)} per bulan</p>
                <p><strong>Bunga:</strong> ${bungaPersen * 100}% ( ${formatRupiah(bunga)})</p>
            </div>
        </div>
    `;

    // Menampilkan anggota dan bukti peminjaman //

    document.querySelector('.bukti-info').innerHTML = anggotaBox;
    } else {

    // Kalau tidak ada data pinjaman atau Kosong //

    document.querySelector('.bukti-info').innerHTML = "<p>Data peminjaman tidak ditemukan. Silakan ajukan permohonan pinjaman terlebih dahulu.</p>";
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
    function logout() {
            alert("Anda telah logout.");
            window.location.href = "../login.html"; // Ke halaman login jika logout //

    }