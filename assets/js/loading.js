// Fungsi untuk menghentikan animasi loading dan menampilkan game-container
function stopLoading() {
  $(".loading-container").fadeOut(2000);
  document.querySelector(".game-container").style.display = "inline-block";
  
  // Membuat referensi ke elemen audio
  var audioElement = document.querySelector(".bgMusik");

  // Menambahkan event listener untuk pemutaran audio setelah klik
  document.body.addEventListener('click', function() {
    // Memastikan musik dimulai setelah elemen audio dimuat sepenuhnya
    audioElement.play();
  }, { once: true }); // Event listener hanya akan berjalan setelah klik pertama
}

// Jalankan loading saat halaman dibuka
$(window).on("load", function () {
  // Hentikan animasi loading dan tampilkan game-container
  stopLoading();
});
