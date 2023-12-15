//  membuat variabel jawaban dan pertanyaan
const listKata = [
  {
    jawaban: "cin",
    pertanyaan:
      "Perintah untuk menginput suatu nilai dari keyboard untuk di proses di dalam program adalah",
  },
  {
    jawaban: "string",
    pertanyaan:
      "Tipe data apa yang digunakan untuk menyimpan variabel dengan nilai teks?",
  },
  {
    jawaban: "double",
    pertanyaan: "Tipe data yang digunakan untuk bilangan pecahan adalah? ",
  },
  {
    jawaban: "boolean",
    pertanyaan:
      "Tipe data yang digunakan untuk menghasilkan nilai TRUE dan FALSE adalah?",
  },
  {
    jawaban: "break",
    pertanyaan:
      "Berikut adalah pernyataan yang digunakan untuk menghentikan perulangan?",
  },
  {
    jawaban: "return",
    pertanyaan:
      "Kata kunci yang digunakan untuk menyatakan nilai balik di dalam fungsi?",
  },
  {
    jawaban: "prompt",
    pertanyaan:
      "Perintah yang digunakan di dalam javascript untuk menerima inputan dari keyboard adalah?",
  },
  {
    jawaban: "confirm",
    pertanyaan:
      "Perintah di javascript yang berfungsi untuk memberikan suatu informasi ke pengguna melalui jendela dialog dengan tombol Ok dan cancel adalah?",
  },
  {
    jawaban: "alert",
    pertanyaan:
      "Perintah di javascript yang berfungsi untuk menampilkan data/informasi dalam bentuk POP UP adalah    ",
  },
  {
    jawaban: "var",
    pertanyaan:
      "Kata kunci JavaScript yang digunakan untuk mendeklarasikan variabel?",
  },
];

// Membuat variabel konstanta untuk mereferensi elemen-elemen HTML yang akan digunakan
const wordDisplay = document.querySelector(".word-display");
const tebakanText = document.querySelector(".tebakan-text b");
const keyboardDiv = document.querySelector(".keyboard");
const boxImage = document.querySelector(".gambar-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

// variabel  sound effects
const winSound = new Audio("./assets/musik/menang.weba");
const loseSound = new Audio("./assets/musik/kalah.weba");

// Menginisialisasi variabel-variabel game
let kataKata, jawabanBenar, salahTebak;
const maxSalahJawab = 3; // Jumlah maksimal tebakan yang salah

// Fungsi untuk mereset permainan
const resetGame = () => {
  jawabanBenar = [];
  salahTebak = 0;
  boxImage.src = "./assets/img/yuli1.gif";
  tebakanText.innerText = `${salahTebak} / ${maxSalahJawab}`;
  wordDisplay.innerHTML = kataKata
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  keyboardDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));
  gameModal.classList.remove("show");
};

// Fungsi untuk mendapatkan pertanyaan dan jawaban  secara acak
const getRandomWord = () => {
  const { jawaban, pertanyaan } =
    listKata[Math.floor(Math.random() * listKata.length)];
  kataKata = jawaban;
  document.querySelector(".hint-text b").innerText = pertanyaan;
  resetGame();
};

// Fungsi untuk menangani kondisi akhir permainan
const gameOver = (isVictory) => {
  const modalText = isVictory ? `Jawaban Kamu:` : "Jawaban Yang Benar:";
  const modal = gameModal.querySelector(".content");
  const modalImage1 = modal.querySelector(".img1");
  const modalImage2 = modal.querySelector(".img2");

  // Setelah permainan selesai, tampilkan gambar GIF sesuai dengan hasil permainan
  if (isVictory) {
    modalImage1.src = "./assets/img/fitri2.gif";
    modalImage1.style.display = "block"; // Tampilkan gambar ke-1
    modalImage2.style.display = "none"; // Sembunyikan gambar ke-2
    modalImage1.style = "center";
    // Play win effect
    winSound.play();
  } else {
    modalImage1.style.display = "none"; // Sembunyikan gambar ke-1
    modalImage2.src = "./assets/img/bintang2.gif";
    modalImage2.style.display = "block"; // Tampilkan gambar ke-2
    modalImage2.style = "center";
    // Play lose effect
    loseSound.play();
  }

  modal.querySelector("h4").innerText = isVictory
    ? "selamat kamu menang"
    : "Yahh Salah!! semangat ya....";
  modal.querySelector("p").innerHTML = `${modalText} <b>${kataKata}</b>`;
  gameModal.classList.add("show");
};

// Fungsi untuk menghandle tebakan huruf
const guess = (clickedLetter) => {
  if (kataKata.includes(clickedLetter)) {
    // Menangani tebakan yang benar
    [...kataKata].forEach((letter, index) => {
      if (letter === clickedLetter) {
        jawabanBenar.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    // Menangani tebakan yang salah
    salahTebak++;
    boxImage.src = `./assets/img/yuli1.gif`;
  }
  tebakanText.innerText = `${salahTebak} / ${maxSalahJawab}`;

  // Memeriksa apakah permainan selesai
  if (salahTebak === maxSalahJawab) return gameOver(false);
  if (jawabanBenar.length === kataKata.length) return gameOver(true);
};

// Membuat tombol-tombol keyboard dan menambahkan event listener
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) => guess(String.fromCharCode(i)));
}

// Menambahkan event listener untuk tombol "Main Lagi"
playAgainBtn.addEventListener("click", function () {
  resetGame();
  getRandomWord();
});

// Memulai permainan dengan kata acak pertama
getRandomWord();
