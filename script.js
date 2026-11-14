// ==========================================
// RUANG PRODUKTIF - TASK MANAGER
// Modul 3: JavaScript Dasar
// ==========================================

// 1. Mengambil elemen HTML (DOM)
const formTugas = document.getElementById("form-tugas");
const inputNama = document.getElementById("nama-tugas");
const inputKategori = document.getElementById("kategori-tugas");
const daftarTugasElement = document.getElementById("daftar-tugas");
const inputPencarian = document.getElementById("pencarian-tugas");

// 2. Array of Objects: menyimpan data tugas
let daftarTugas = [
    {
        id: 1,
        nama: "Belajar JavaScript",
        kategori: "Belajar",
        selesai: false
    },
    {
        id: 2,
        nama: "Mengerjakan Modul 3",
        kategori: "Belajar",
        selesai: false
    },
    {
        id: 3,
        nama: "Membaca buku",
        kategori: "Pribadi",
        selesai: true
    }
];

// 3. Function untuk menentukan label kategori
function getLabelKategori(kategori) {
    switch (kategori) {
        case "Belajar":
            return "📚 Belajar";
        case "Pekerjaan":
            return "💼 Pekerjaan";
        case "Pribadi":
            return "🌱 Pribadi";
        default:
            return "Lainnya";
    }
}

// 4. Function untuk menampilkan data tugas
function tampilkanData(data = daftarTugas) {
    daftarTugasElement.innerHTML = "";

    if (data.length === 0) {
        daftarTugasElement.innerHTML =
            "<p>Belum ada tugas yang ditemukan.</p>";
        return;
    }

    data.forEach(function(tugas) {
        const item = document.createElement("div");
        item.className = "task-item";

        const status = tugas.selesai ? "Selesai" : "Belum selesai";

        item.innerHTML = `
            <h3>${tugas.nama}</h3>
            <p>Kategori: ${getLabelKategori(tugas.kategori)}</p>
            <p>Status: ${status}</p>

            <button onclick="ubahStatus(${tugas.id})">
                ${tugas.selesai ? "Batalkan" : "Selesaikan"}
            </button>

            <button onclick="hapusData(${tugas.id})">
                Hapus
            </button>
        `;

        daftarTugasElement.appendChild(item);
    });
}

// 5. Function untuk menambahkan tugas
function tambahData(nama, kategori) {
    if (nama === "" || kategori === "") {
        alert("Nama tugas dan kategori wajib diisi!");
        return;
    }

    const idBaru = daftarTugas.length > 0
        ? Math.max(...daftarTugas.map(tugas => tugas.id)) + 1
        : 1;

    const tugasBaru = {
        id: idBaru,
        nama: nama,
        kategori: kategori,
        selesai: false
    };

    daftarTugas.push(tugasBaru);

    tampilkanData();
}

// 6. Function untuk menghapus tugas
function hapusData(id) {
    const index = daftarTugas.findIndex(function(tugas) {
        return tugas.id === id;
    });

    if (index === -1) {
        alert("Tugas tidak ditemukan!");
        return;
    }

    daftarTugas.splice(index, 1);
    tampilkanData();
}

// 7. Function untuk mengubah status tugas
function ubahStatus(id) {
    const tugas = daftarTugas.find(function(item) {
        return item.id === id;
    });

    if (tugas) {
        tugas.selesai = !tugas.selesai;
        tampilkanData();
    } else {
        alert("Tugas tidak ditemukan!");
    }
}

// 8. Function untuk mencari tugas
function cariData(kataKunci) {
    const hasilPencarian = daftarTugas.filter(function(tugas) {
        return tugas.nama.toLowerCase().includes(kataKunci.toLowerCase());
    });

    tampilkanData(hasilPencarian);

    return hasilPencarian;
}

// 9. Function untuk menghitung jumlah tugas
function hitungTugas() {
    let jumlahSelesai = 0;
    let jumlahBelumSelesai = 0;

    for (let i = 0; i < daftarTugas.length; i++) {
        if (daftarTugas[i].selesai) {
            jumlahSelesai++;
        } else {
            jumlahBelumSelesai++;
        }
    }

    console.log("Tugas selesai:", jumlahSelesai);
    console.log("Tugas belum selesai:", jumlahBelumSelesai);
}

// 10. Event listener untuk form tambah tugas
formTugas.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = inputNama.value.trim();
    const kategori = inputKategori.value;

    if (nama === "" || kategori === "") {
        alert("Nama tugas dan kategori wajib diisi!");
        return;
    }

    tambahData(nama, kategori);
    formTugas.reset();
});

// 11. Event listener untuk pencarian tugas
inputPencarian.addEventListener("input", function() {
    const kataKunci = inputPencarian.value;
    cariData(kataKunci);
});

// 12. Menampilkan seluruh tugas saat halaman dibuka
tampilkanData();

// Menampilkan ringkasan tugas di Console
hitungTugas();