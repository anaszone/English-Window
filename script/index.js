function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");

  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}

// Button load and display start
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
    btnDiv.innerHTML = `<button id="btn-${btn.level_no}" onclick = "loadLessonWiseWordMeaning(${btn.level_no})" class="btn btn-sm hover:bg-blue-500 hover:text-white"><img src="assets/fa-book-open.png" alt="">Lesson - ${btn.level_no}</button>`;
    allBtns.append(btnDiv);
  }
}
// Button load and display end

// All the word meanings load and display start
function loadWordsByButton() {
  fetch("https://openapi.programming-hero.com/api/level/5")
    .then((res) => res.json())
    .then((data) => displayWordsByButton(data.data));
}
function loadWordDetailsOk(wordID) {
    const url = `https://openapi.programming-hero.com/api/word/${wordID}`

    fetch(url)
    .then((res)=>res.json())
    .then((data)=>displayWordDetailsOk(data.data));
  }
  function displayWordDetailsOk(wordDetails){
    console.log(wordDetails);
    document.getElementById("world_details").showModal();
    const modalContainer = document.getElementById("modal_container");
    modalContainer.innerHTML = `

    
        <h1 class="text-3xl font-bold">${wordDetails.word}  [<img  src="https://img.icons8.com/?size=48&id=85796&format=png" class="w-8 inline-block mx-auto mb-4" alt="">: ${wordDetails.pronunciation} ] </h1>

        <h1 class="text-xl font-bold text-rose-300">Meaning:</h1>
        ${wordDetails.meaning}

        <h1 class="text-xl font-bold  text-rose-300">Example</h1>
        ${wordDetails.sentence}

        <h1 class="text-xl font-bold  text-rose-300">সমার্থক শব্দ গুলো</h1>
        ${wordDetails.synonyms}
    
    `

  }

function displayWordsByButton(words) {
  // console.log(words);

  const wordsContainer = document.getElementById("words-container");
  wordsContainer.innerHTML = ``;
  if (words.length == 0) {
    wordsContainer.innerHTML = `
   <div class="bg-slate-100 w-full col-span-full mx-auto py-5 text-center h-[200px] rounded-lg flex flex-col justify-center items-center gap-5">
                <img src="assets/alert-error.png" alt="">
                <p class="text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="text-3xl font-semibold">নেক্সট Lesson এ যান</h1>
              </div>
    
    `;
    return;
  }

  for (let word of words) {
    // console.log(word);
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
        <div class="card bg-base-100 card-lg shadow-sm">
  <div class="card-body">
    <h2 class="card-title text-3xl font-bold text-sky-950">${word.word}</h2>
    <h1 class="font-bold">Meaning/Pronunciation</h1>
    <p>${word.meaning}</p>
    <p>${word.id}</p>
  <div class="flex justify-between">
  <button onclick="loadWordDetailsOk('${word.id}')" class="w-10 h-10 bg-slate-100 p-2 text-center hover:bg-yellow-200 hover:cursor-pointer">
<img  src="https://img.icons8.com/?size=60&id=59719&format=png" alt="">
  </button>
  <button class="w-10 h-10 bg-slate-100 p-2 text-center hover:bg-yellow-200 hover:cursor-pointer">
<img  src="https://img.icons8.com/?size=100&id=41563&format=png" alt="">
  </button>
</div>
  </div>
</div>
        
        `;
    wordsContainer.append(wordDiv);
  }
}
// All the word meanings load and display end

// Lesson wise word meaning load and display start
function loadLessonWiseWordMeaning(level) {
  const url = `https://openapi.programming-hero.com/api/level/${level}`;
  removeActiveClass();

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const clickedButton = document.getElementById(`btn-${level}`);
      // console.log(clickedButton);
      clickedButton.classList.add("active");

      displayWordsByButton(data.data);
    });
}

// Lesson wise word meaning load and display end

loadAllButtons();
// loadWordsByButton();
