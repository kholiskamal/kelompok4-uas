// Fungsi untuk menghentikan animasi loading dan menampilkan game-container
function stopLoading() {
  $(".loading-container").fadeOut(2000);
  document.querySelector(".game-container").style.display = "inline-block";
  // Memastikan musik dimulai setelah elemen audio dimuat sepenuhnya
}

// Jalankan loading saat halaman dibuka
$(window).on("mulai", function () {
  // Hentikan animasi loading dan tampilkan game-container
  stopLoading();
});

mulai.addEventListener("click", function () {
  window.location.href = "level.html";
});
