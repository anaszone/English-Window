function loadAllButtons() {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayAllButtons(data.data));
}

function displayAllButtons(buttons) {
  const allBtns = document.getElementById("all-btns");

  for (let btn of buttons) {
    // console.log(btn);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `<button onclick = "loadWordsByButton(${btn.level_no})" class="btn btn-sm hover:bg-blue-500 hover:text-white"><img src="assets/fa-book-open.png" alt="">Lesson - ${btn.level_no}</button>`;
    allBtns.append(btnDiv);
  }
}

function loadWordsByButton() {
  fetch("https://openapi.programming-hero.com/api/level/5")
    .then((res) => res.json())
    .then((data) => displayWordsByButton(data.data));
}
function displayWordsByButton(words) {
  // console.log(words);

  const wordsContainer = document.getElementById("words-container");
  for (let word of words) {
    console.log(word);
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
        <div class="card bg-base-100 card-lg shadow-sm">
  <div class="card-body">
    <h2 class="card-title text-3xl font-bold text-sky-950">${word.word}</h2>
    <h1 class="font-bold">Meaning/Pronunciation</h1>
    <p>${word.meaning}</p>
  </div>
</div>
        
        `;
    wordsContainer.append(wordDiv);
  }
}

loadAllButtons();
// loadWordsByButton();
