// script.js

// Format input menjadi Rupiah
function formatRupiah(angka, prefix) {
    let number_string = angka.value.replace(/[^,\d]/g, '').toString();
    let split = number_string.split(',');
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    angka.value = rupiah;
}

function tampil() {
    // Mengambil elemen-elemen input
    const jenisSukuBunga = document.getElementById('jenis-suku-bunga').value;
    const tabunganAwal = document.getElementById('tabungan-awal').value.replace(/\./g, '');
    const sukuBunga = document.getElementById('suku-bunga').value;
    const waktuBunga = document.getElementById('waktuBunga').value;
    const periodeKe = document.getElementById('periode-ke').value;
    const waktuPeriode = document.getElementById('waktuPeriode').value;

    // Validasi input
    if (!jenisSukuBunga || !tabunganAwal || !sukuBunga || !periodeKe) {
        showModal();
        return;
    }

    // Konversi nilai input
    const P = parseFloat(tabunganAwal);
    const r = parseFloat(sukuBunga) / 100;
    const n = parseInt(periodeKe);
    let t;

    if (waktuPeriode === 'bulan') {
        t = n / 12;
    } else {
        t = n;
    }

    let A;

    if (jenisSukuBunga === 'tunggal') {
        // Bunga Tunggal: A = P(1 + r * t)
        A = P * (1 + r * t);
    } else {
        // Bunga Majemuk: A = P(1 + r/n)^(n*t)
        // Asumsikan bunga majemuk dihitung per periode (bulan/tahun)
        let compoundingPerYear = waktuBunga === 'bulan' ? 12 : 1;
        A = P * Math.pow((1 + r / compoundingPerYear), compoundingPerYear * t);
    }

    // Format hasil ke Rupiah
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2
    });

    const hasil = formatter.format(A);

    // Menampilkan hasil
    const hasilDiv = document.getElementById('hasil');
    hasilDiv.innerHTML = `
        <h2 class="text-lg font-semibold mb-2">Hasil Perhitungan:</h2>
        <p>Jumlah Akhir: <span class="text-green-400">${hasil}</span></p>
    `;
    hasilDiv.classList.remove('hidden');
}

// Menampilkan modal error
function showModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('opacity-0', '-translate-y-[100%]');
    modal.classList.add('opacity-100', 'translate-y-0');

    // Menutup modal setelah 3 detik
    setTimeout(() => {
        modal.classList.add('opacity-0', '-translate-y-[100%]');
        modal.classList.remove('opacity-100', 'translate-y-0');
    }, 3000);
}
