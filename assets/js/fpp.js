document.getElementById('pinjaman-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah pengiriman form default //

    // Fungsi Mengambil data dari form //

    const nomorFpp = document.getElementById('nomor-fpp').value;
    const tanggalPermohonan = document.getElementById('tanggal-permohonan').value;
    const nomorAnggota = document.getElementById('nomor-anggota').value;
    const namaAnggota = document.getElementById('nama-anggota').value;
    const jumlahPermohonan = document.getElementById('jumlah-permohonan').value;
    const keperluan = document.getElementById('keperluan').value;

    // Membuat nomor BP unik berdasarkan timestamp //

    const noBP = 'BP-' + Date.now();

    // Untuk Simpan data permohonan pinjaman di localStorage //

    const pinjamanData = {
        noBP, 
        nomorFpp,
        tanggalPermohonan,
        nomorAnggota,
        namaAnggota,
        jumlahPermohonan,
        keperluan
    };
    
    localStorage.setItem('pinjamanData', JSON.stringify(pinjamanData));

    window.location.href = 'bukti-peminjaman.html'; // Untuk mengarahkan ke halaman bukti peminjaman //
});

    function logout() {
            alert("Anda telah logout.");
            window.location.href = "../login.html"; // Ke halaman login jika logout //

    }
