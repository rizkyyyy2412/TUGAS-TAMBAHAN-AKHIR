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
    <div class="anggota-box" style="border: 1px solid #ddd; border-radius: 5px; padding: 20px; margin-bottom: 20px; background-color:rgba(162, 166, 173, 0.45); box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
        <h3 style="margin-bottom: 15px; color: #2c3e50;">Nama : ${pinjamanData.namaAnggota}</h3>
        <hr style="border: none; border-top: 1px solid #ddd; margin-bottom: 15px;">
        <p style="margin: 10px 0; line-height: 1.6;"><strong>Nomor Anggota:</strong> ${pinjamanData.nomorAnggota}</p>
        <p style="margin: 10px 0; line-height: 1.6;"><strong>Jumlah Pinjaman:</strong> ${formatRupiah(jumlahRealisasi)}</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
        <p style="margin: 10px 0; line-height: 1.6;"><strong>Nomor Bayar Peminjaman:</strong> ${noBp}</p>
        <p style="margin: 10px 0; line-height: 1.6;"><strong>Tanggal Bukti Peminjaman:</strong> ${tglBp}</p>
        <p style="margin: 10px 0; line-height: 1.6;"><strong>Jumlah Realisasi:</strong> ${formatRupiah(jumlahRealisasi)}</p>
        <p style="margin: 10px 0; line-height: 1.6;"><strong>Lama Angsuran:</strong> ${lamaAngsuran} bulan</p>
        <p style="margin: 10px 0; line-height: 1.6;"><strong>Jumlah Angsuran Yang Harus Dibayar:</strong> ${formatRupiah(jumlahAngsuran)} / Bulan</p>
        <p style="margin: 10px 0; line-height: 1.6;"><strong>Bunga:</strong> ${bungaPersen * 100}% </p>
    </div>
`;


    // Menampilkan anggota dan bukti peminjaman //

    document.querySelector('.bukti-info').innerHTML = anggotaBox;
    } else {

    // Kalau tidak ada data pinjaman atau Kosong //

    document.querySelector('.bukti-info').innerHTML = "<p>Data peminjaman tidak ditemukan. Silakan ajukan permohonan pinjaman terlebih dahulu.</p>";
}



    function logout() {
            alert("Anda telah logout.");
            window.location.href = "../login.html"; // Ke halaman login jika logout //

    }