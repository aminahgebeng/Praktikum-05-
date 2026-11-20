// 1. Ambil elemen yang dibutuhkan
const isiTabel = document.getElementById("isiTabel"); //[cite: 7]
const inputCari = document.getElementById("cari"); //[cite: 7]
const totalBuku = document.getElementById("totalBuku"); //[cite: 7]
const terpilih = document.getElementById("terpilih"); //[cite: 7]

// 2. Hitung baris yang tampil, lalu tulis ke sidebar
function perbaruiTotal() {
    const baris = isiTabel.querySelectorAll("tr:not([hidden])"); //[cite: 7]
    totalBuku.textContent = "Total judul: " + baris.length; //[cite: 7]
}

perbaruiTotal(); //[cite: 7]

// 3. Cari judul atau penulis saat pengguna mengetik
inputCari.addEventListener("input", function () { //[cite: 7, 18]
    const kata = inputCari.value.trim().toLowerCase(); //[cite: 7]
    const semuaBaris = isiTabel.querySelectorAll("tr"); //[cite: 7]

    for (let i = 0; i < semuaBaris.length; i++) { //[cite: 7]
        const judul = semuaBaris[i].cells[0].textContent.toLowerCase(); //[cite: 7]
        const penulis = semuaBaris[i].cells[1].textContent.toLowerCase(); //[cite: 18]
        semuaBaris[i].hidden = !(judul.includes(kata) || penulis.includes(kata)); //[cite: 7, 18]
    }

    perbaruiTotal(); //[cite: 7]
});

// 4. Sorot baris, stok menipis, dan hapus baris terpilih
isiTabel.addEventListener("click", function (event) { //[cite: 8]
    const baris = event.target.closest("tr"); //[cite: 8]

    if (baris === null) { //[cite: 8]
        return; //[cite: 8]
    }

    const aktif = baris.classList.toggle("dipilih"); //[cite: 8]
    terpilih.textContent = aktif //[cite: 8]
        ? "Dipilih: " + baris.cells[0].textContent //[cite: 8]
        : "Dipilih: -"; //[cite: 8]
});

const tombolMenipis = document.getElementById("tombolMenipis"); //[cite: 8]

tombolMenipis.addEventListener("click", function () { //[cite: 8]
    const semuaBaris = isiTabel.querySelectorAll("tr"); //[cite: 8]

    for (let i = 0; i < semuaBaris.length; i++) { //[cite: 8]
        const stok = Number(semuaBaris[i].cells[4].textContent); //[cite: 8]
        semuaBaris[i].classList.toggle("menipis", stok <= 3); //[cite: 8]
    }
});

const tombolHapus = document.getElementById("tombolHapus"); //[cite: 18]

tombolHapus.addEventListener("click", function () { //[cite: 18]
    const barisTerpilih = isiTabel.querySelectorAll("tr.dipilih"); //[cite: 18]

    barisTerpilih.forEach(function (baris) {
        baris.remove(); //[cite: 18]
    });

    terpilih.textContent = "Dipilih: -"; //[cite: 18]
    perbaruiTotal(); //[cite: 18]
});

// 5. Buat baris tabel dari sebuah array
const formBuku = document.getElementById("formBuku"); //[cite: 9]

function buatBaris(data) { //[cite: 9]
    const baris = document.createElement("tr"); //[cite: 9]

    for (let i = 0; i < data.length; i++) { //[cite: 9]
        const sel = document.createElement("td"); //[cite: 9]
        sel.textContent = data[i]; //[cite: 9]
        baris.appendChild(sel); //[cite: 9]
    }

    return baris; //[cite: 9]
}

// 6. Ambil kolom isian dan kotak pesan
const inputJudul = document.getElementById("judul"); //[cite: 11]
const inputPenulis = document.getElementById("penulis"); //[cite: 11]
const inputTahun = document.getElementById("tahun"); //[cite: 11]
const inputStok = document.getElementById("stok"); //[cite: 11]
const kotakError = document.getElementById("pesanError"); //[cite: 11]
const pesanSukses = document.getElementById("pesanSukses"); //[cite: 11]

// 7. Periksa teks: kosong, panjang minimal, duplikat, dan angka pada penulis
function judulSudahAda(nilai) { //[cite: 11]
    const semuaBaris = isiTabel.querySelectorAll("tr"); //[cite: 11]

    for (let i = 0; i < semuaBaris.length; i++) { //[cite: 11]
        const judul = semuaBaris[i].cells[0].textContent; //[cite: 11]

        if (judul.toLowerCase() === nilai.toLowerCase()) { //[cite: 11]
            return true; //[cite: 11]
        }
    }

    return false; //[cite: 11]
}

function cekJudul(nilai) { //[cite: 11]
    if (nilai === "") { //[cite: 11]
        return "Judul wajib diisi."; //[cite: 11]
    }

    if (nilai.length < 3) { //[cite: 11]
        return "Judul minimal 3 karakter."; //[cite: 11]
    }

    if (judulSudahAda(nilai)) { //[cite: 11]
        return "Judul sudah ada di katalog."; //[cite: 11]
    }

    return ""; //[cite: 11]
}

function cekPenulis(nilai) { //[cite: 11]
    if (nilai === "") { //[cite: 11]
        return "Penulis wajib diisi."; //[cite: 11]
    }

    if (nilai.length < 3) { //[cite: 11]
        return "Penulis minimal 3 karakter."; //[cite: 11]
    }

    for (let i = 0; i < nilai.length; i++) { //[cite: 19]
        const karakter = nilai[i];
        if (karakter !== " " && !isNaN(karakter)) { //[cite: 19]
            return "Nama penulis tidak boleh berisi angka."; //[cite: 19]
        }
    }

    return ""; //[cite: 11]
}

// 8. Periksa angka: bulat, lalu batas nilai
function cekTahun(nilai) { //[cite: 12]
    const angka = Number(nilai); //[cite: 12]
    const tahunIni = new Date().getFullYear(); //[cite: 12]

    if (nilai === "") { //[cite: 12]
        return "Tahun wajib diisi."; //[cite: 12]
    }

    if (!Number.isInteger(angka)) { //[cite: 12]
        return "Tahun harus berupa angka bulat."; //[cite: 12]
    }

    if (angka < 1900 || angka > tahunIni) { //[cite: 12]
        return "Tahun harus antara 1900 dan " + tahunIni + "."; //[cite: 12]
    }

    return ""; //[cite: 12]
}

function cekStok(nilai) { //[cite: 12]
    const angka = Number(nilai); //[cite: 12]

    if (nilai === "") { //[cite: 12]
        return "Stok wajib diisi."; //[cite: 12]
    }

    if (!Number.isInteger(angka)) { //[cite: 12]
        return "Stok harus berupa angka bulat."; //[cite: 12]
    }

    if (angka < 0) { //[cite: 12]
        return "Stok tidak boleh negatif."; //[cite: 12]
    }

    return ""; //[cite: 12]
}

// 9. Periksa semua kolom dengan satu loop
function validasiForm() { //[cite: 13]
    const kolom = [ //[cite: 13]
        { input: inputJudul, cek: cekJudul }, //[cite: 13]
        { input: inputPenulis, cek: cekPenulis }, //[cite: 13]
        { input: inputTahun, cek: cekTahun }, //[cite: 13]
        { input: inputStok, cek: cekStok } //[cite: 13]
    ];
    const daftarError = []; //[cite: 13]

    for (let i = 0; i < kolom.length; i++) { //[cite: 13]
        const pesan = kolom[i].cek(kolom[i].input.value.trim()); //[cite: 13]

        kolom[i].input.classList.toggle("salah", pesan !== ""); //[cite: 13]

        if (pesan !== "") { //[cite: 13]
            daftarError.push(pesan); //[cite: 13]
        }
    }

    return daftarError; //[cite: 13]
}

// 10. Tampilkan pesan, tahan pengiriman bila ada error, dan batasi 3x gagal
function tampilkanError(daftarError) { //[cite: 14]
    kotakError.innerHTML = ""; //[cite: 14]

    daftarError.forEach(function (pesan) { //[cite: 14]
        const item = document.createElement("li"); //[cite: 14]
        item.textContent = pesan; //[cite: 14]
        kotakError.appendChild(item); //[cite: 14]
    });
}

let gagalBerturut = 0; //[cite: 19]
const tombolTambah = formBuku.querySelector('button[type="submit"]');

formBuku.addEventListener("submit", function (event) { //[cite: 14]
    event.preventDefault(); //[cite: 14]

    const daftarError = validasiForm(); //[cite: 14]
    tampilkanError(daftarError); //[cite: 14]

    if (daftarError.length > 0) { //[cite: 14]
        pesanSukses.textContent = ""; //[cite: 14]
        gagalBerturut++; //[cite: 19]

        if (gagalBerturut >= 3) { //[cite: 19]
            tombolTambah.disabled = true; //[cite: 19]
            const item = document.createElement("li");
            item.textContent = "Tombol dinonaktifkan karena 3 kali gagal berturut-turut. Refresh halaman untuk mengulang."; //[cite: 19]
            kotakError.appendChild(item);
        }
        return; //[cite: 14]
    }

    gagalBerturut = 0; //[cite: 19]

    const data = [ //[cite: 14]
        inputJudul.value.trim(), //[cite: 14]
        inputPenulis.value.trim(), //[cite: 14]
        document.getElementById("kategori").value, //[cite: 14]
        inputTahun.value.trim(), //[cite: 14]
        inputStok.value.trim() //[cite: 14]
    ];

    isiTabel.appendChild(buatBaris(data)); //[cite: 14]
    pesanSukses.textContent = "Buku ditambahkan: " + data[0]; //[cite: 14]
    formBuku.reset(); //[cite: 14]
    perbaruiTotal(); //[cite: 14]
});