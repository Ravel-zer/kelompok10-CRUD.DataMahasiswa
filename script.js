// Inisialisasi data mahasiswa dari local storage jika ada, jika tidak buat array kosong
let students = JSON.parse(localStorage.getItem("students")) || [];

// Fungsi untuk menampilkan data mahasiswa ke dalam tabel
function renderStudents() {
  const studentListDiv = document.getElementById("studentList");
  // Mengosongkan isi div sebelum menambahkan data baru
  studentListDiv.innerHTML = "";

  // Membuat tabel
  const table = document.createElement("table");
  table.className = "student-table"; // Menambahkan kelas CSS untuk styling

  // Membuat baris judul
  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `
    <th>NIM</th>
    <th>Nama</th>
    <th>Alamat</th>
    <th>Aksi</th>
  `;
  table.appendChild(headerRow);

  // Menambahkan data mahasiswa ke dalam tabel
  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.nim}</td>
      <td>${student.nama}</td>
      <td>${student.alamat}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Hapus</button>
      </td>
    `;
    table.appendChild(row);
  });

  // Menambahkan tabel ke dalam div
  studentListDiv.appendChild(table);
}

// Fungsi untuk menambahkan atau mengedit data mahasiswa
function addOrUpdateStudent(nim, nama, alamat, index = null) {
  const studentData = { nim, nama, alamat };
  if (index === null) {
    students.push(studentData);
    showAlert("Data mahasiswa berhasil ditambahkan!", "success");
  } else {
    students[index] = studentData;
    showAlert("Data mahasiswa berhasil diupdate!", "success");
  }
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();

  // Mengosongkan nilai input formulir setelah submit
  document.getElementById("nim").value = "";
  document.getElementById("nama").value = "";
  document.getElementById("alamat").value = "";
}

// Fungsi untuk menghapus data mahasiswa
function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
  showAlert("Data mahasiswa berhasil dihapus!", "success");
}

// Fungsi untuk menampilkan alert dalam bentuk dialog
function showAlert(message, type) {
  alert(`${type.toUpperCase()}: ${message}`);
}

// Fungsi untuk menampilkan ModalBox untuk mengedit data mahasiswa
function editStudent(index) {
  const student = students[index];

  // Menampilkan ModalBox
  const modal = document.getElementById("myModal");
  const editForm = document.getElementById("editForm");
  const editNIMInput = document.getElementById("editNIM");
  const editNamaInput = document.getElementById("editNama");
  const editAlamatInput = document.getElementById("editAlamat");

  editNIMInput.value = student.nim;
  editNamaInput.value = student.nama;
  editAlamatInput.value = student.alamat;

  modal.style.display = "block";

  // Menangani ketika form di-submit untuk melakukan update data
  editForm.onsubmit = function (event) {
    event.preventDefault();
    students[index].nama = editNamaInput.value;
    students[index].alamat = editAlamatInput.value;
    localStorage.setItem("students", JSON.stringify(students));
    renderStudents();
    showAlert("Data mahasiswa berhasil diupdate!", "success");
    modal.style.display = "none";
  };
}

// Fungsi untuk menutup ModalBox
function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// Tampilkan data mahasiswa saat halaman dimuat
renderStudents();

// Fungsi untuk menangani penambahan data mahasiswa
document.getElementById("studentForm").onsubmit = function (event) {
  event.preventDefault();
  addOrUpdateStudent(document.getElementById("nim").value, document.getElementById("nama").value, document.getElementById("alamat").value);
};
