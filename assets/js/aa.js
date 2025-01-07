// Mengambil data arsip angsuran dari localStorage //

const arsipAngsuran = JSON.parse(localStorage.getItem('arsipAngsuran')) || [];

// Untuk Mengambil elemen tbody untuk menambahkan data arsip //

const arsipBody = document.getElementById('arsip-body');

// Fungsi Memeriksa apakah ada data arsip angsuran //

if (arsipAngsuran.length === 0) {
    arsipBody.innerHTML = "<tr><td colspan='6'>Tidak ada arsip angsuran yang ditemukan.</td></tr>";
} else {

    // Menampilkan data arsip angsuran //

    arsipAngsuran.forEach(angsuran => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${angsuran.noBA}</td>
            <td>${angsuran.tanggalBA}</td>
            <td>${angsuran.noBP}</td>
            <td>${formatRupiah(angsuran.jumlahAngsuran)}</td>
            <td>${formatRupiah(angsuran.bunga)}</td>
            <td>${angsuran.pembayaranKe}</td> <!-- Menambahkan kolom Pembayaran Ke -->
        `;

        arsipBody.appendChild(row);
    });
}

// Fungsi untuk memformat angka menjadi format Rupiah //

function formatRupiah(angka) {
    angka = parseFloat(angka);
    if (isNaN(angka)) {
        return 'Rp 0';
    }
    return 'Rp ' + angka.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
function logout() {
            alert("Anda telah logout.");
            window.location.href = "../login.html"; // Ke halaman login jika logout //

        }