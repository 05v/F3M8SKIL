class Cleaner {
  clean(whereToClean) {
    // Maakt de HTML leeg van whereToClean
    document.querySelector(whereToClean).innerHTML = "";
  }
}
