let myNotes = [];
function makediaryDiv(diary) {
  const div = document.createElement("div");
  div.setAttribute("class", "diary-card");
  div.setAttribute("id", `diary-${diary.id}`);
  const h2 = document.createElement("h2");
  h2.innerText = diary["date"];
  const h3 = document.createElement("h3");
  h3.innerText = diary["notes"];
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Clear";

  deleteBtn.addEventListener("click", function () {
    removediary(diary["id"]);
  });
  div.appendChild(h2);
  div.appendChild(h3);
  div.appendChild(deleteBtn);
  return div;
}
function removediary(diaryId) {
  console.log("Deleting ", diaryId);

  const filteredArray = myNotes.filter((diary) => diary.id != diaryId);
  myNotes = filteredArray;
  updatediaryListUI();
}
function clearApp() {
  const app = document.querySelector("#app");
  app.innerHTML = "";
}
function updatediaryListUI() {
  clearApp();
  sortarray();
  for (let i = 0; i < myNotes.length; i++) {
    const diaryDiv = makediaryDiv(myNotes[i]);
    const diaryApp = document.querySelector("#app");
    diaryApp.appendChild(diaryDiv);
  }
}
function adddiary(diary) {
  myNotes.push(diary);
  sortarray();
  updatediaryListUI();
  saveToLocalStorage();
}
function hookForm() {
  const form = document.querySelector("#diary-form-id");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formDate = document.querySelector("#date").value;
    const note = document.querySelector("#notes-text").value;

    const diary = {
      id: new Date().getTime(),
      date: formDate,
      notes: note,
    };
    adddiary(diary);
  });
}

function saveToLocalStorage() {
  const str = JSON.stringify(myNotes);
  localStorage.setItem("my-diary-list", str);
}
function getFromLocalStorage() {
  const str = localStorage.getItem("my-diary-list");
  if (!str) {
    myNotes = [];
  } else {
    myNotes = JSON.parse(str);
  }
}
function sortarray() {
  myNotes.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
}
getFromLocalStorage();
updatediaryListUI();
hookForm();
