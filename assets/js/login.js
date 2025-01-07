function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    if (username === 'admin' && password === 'admin') {
        window.location.href = 'credit-department.html';
    } else if (username) {
        window.location.href = 'index.html';
    } else {
        errorMsg.textContent = 'Masukkan username untuk login sebagai anggota.';
    }
}
function logout() {
    alert("Anda telah logout.");
    window.location.href = "login.html"; // Ke halaman login jika logout //

}