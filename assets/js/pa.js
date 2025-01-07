const paymentForm = document.getElementById('payment-form');
paymentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const noBP = document.getElementById('noBP').value.trim();
    let jumlahAngsuran = document.getElementById('jumlahAngsuran').value.replace(/[^\d]/g, ''); // Menghapus karakter non-numerik //
    jumlahAngsuran = parseInt(jumlahAngsuran); // Berfungsi Untuk Mengonversi ke angka //

    // Validasi input //

    if (!noBP || isNaN(jumlahAngsuran)) {
        document.getElementById('error-message').innerText = 'Harap masukkan Nomor BP dan Jumlah Angsuran yang valid.';
        return;
    }

    // Mengambil data pinjaman dari localStorage //

    const pinjamanData = JSON.parse(localStorage.getItem('pinjamanData'));

    if (!pinjamanData) {
        document.getElementById('error-message').innerText = 'Data peminjaman tidak ditemukan di localStorage.';
        return;
    }

    if (pinjamanData.noBP !== noBP) {
        document.getElementById('error-message').innerText = 'Nomor BP tidak ditemukan atau formatnya tidak sesuai.';
        return;
    }

    // Mengambil arsip angsuran yang sudah ada di localStorage //

    let arsipAngsuran = JSON.parse(localStorage.getItem('arsipAngsuran')) || [];

    // Untuk Menghitung angsuran ke berapa //

    let angsuranKe = arsipAngsuran.length + 1;

    // Fungsi Untuk Memastikan jumlah angsuran tidak melebihi 12 ( 12 bulan / 1 tahun ) //

    if (angsuranKe > 12) {
        document.getElementById('error-message').innerText = 'Angsuran telah lunas.';
        return;
    }

    // Menghitung bunga untuk persen (%) //

    const bunga = (jumlahAngsuran * 5) / 100;

    // Menyimpan data pembayaran angsuran //

    const pembayaranAngsuran = {
        noBA: `BA-${new Date().getTime()}`,
        tanggalBA: new Date().toLocaleDateString(),
        noBP: pinjamanData.noBP,
        jumlahAngsuran: jumlahAngsuran,
        bunga: bunga, 
        pembayaranKe: angsuranKe 
    };

    // Untuk Menyimpan ke arsip angsuran di LS //

    arsipAngsuran.push(pembayaranAngsuran);
    localStorage.setItem('arsipAngsuran', JSON.stringify(arsipAngsuran));

    // Untuk Menampilkan informasi pembayaran angsuran keberapa //

    document.getElementById('payment-info').innerHTML = `Anda Berhasil Membayar angsuran ke-${angsuranKe}.<br><br>`;

    // Untuk Menampilkan pesan sukses //

    document.getElementById('error-message').innerHTML = `Pembayaran angsuran berhasil! No. ${pembayaranAngsuran.noBA}.<br><br>`;

    // Untuk Menampilkan link cek arsip angsuran //
    
    document.getElementById('error-message').innerHTML += `<a href="/form/arsip-angsuran.html" style="color: blue; text-decoration: underline;"> Cek </a>`;

    // Mereset form
    paymentForm.reset();
});
    function logout() {
        alert("Anda telah logout.");
        window.location.href = "../login.html"; // Ke halaman login jika logout

    }