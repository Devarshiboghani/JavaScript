let notes = JSON.parse(localStorage.getItem("notely")) || [];

let selectedColor = "purple";

let editId = null;

const notesBox = document.getElementById("notes");
const count = document.getElementById("count");
const modal = document.getElementById("modalBg");
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");

/* OPEN MODAL */

function openModal() {
  modal.style.display = "flex";
}

/* CLOSE MODAL */

function closeModal() {
  modal.style.display = "none";

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";

  selectedColor = "purple";

  document.querySelectorAll(".color").forEach((c) => {
    c.classList.remove("active");
  });

  document
    .querySelector('[data-color="purple"]')
    .classList.add("active");
}

/* COLOR PICKER */

document.querySelectorAll(".color").forEach((color) => {
  color.addEventListener("click", () => {
    document.querySelectorAll(".color").forEach((c) => {
      c.classList.remove("active");
    });

    color.classList.add("active");

    selectedColor = color.dataset.color;
  });
});

/* SAVE NOTE */

function saveNote() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const category = document.getElementById("category").value;

  if (title === "" && content === "") {
    alert("Please enter title or content");
    return;
  }

   if(editId){
    notes = notes.map(note => {
      if(note.id === editId){
        return{
          ...note,
          title,
          content,
          category,
          color:selectedColor
        };
      }
      return note;
    });

    editId = null;

  }else{

    const note = {
      id:Date.now(),
      title,
      content,
      category,
      color:selectedColor,
      time:new Date().toLocaleDateString()
    };

    notes.unshift(note);

  }

  localStorage.setItem("notely", JSON.stringify(notes));
  renderNotes();
  closeModal();
}

/* RENDER NOTES */

function renderNotes() {
  notesBox.innerHTML = "";

  count.innerText = notes.length;

  let searchValue = searchInput.value.toLowerCase();

  let categoryValue = filterCategory.value;

  let filteredNotes = notes.filter((note) => {
    const matchSearch =
      note.title.toLowerCase().includes(searchValue) ||
      note.content.toLowerCase().includes(searchValue);

    const matchCategory =
      categoryValue === "All" ||
      note.category === categoryValue;

    return matchSearch && matchCategory;
  });

  if (filteredNotes.length === 0) {
    notesBox.innerHTML = `
    
    <div class="empty-state">
      <div class="empty-emoji">📝</div>
      <h3>No Notes Found</h3>
    </div>
    
    `;

    return;
  }

  filteredNotes.forEach((note) => {
    notesBox.innerHTML += `
    
    <div class="card ${note.color}">
      <div class="card-top">
        <h3>${note.title}</h3>
        <div class="actions">
          <button onclick="editNote(${note.id})">✏️</button>
          <button onclick="deleteNote(${note.id})">🗑️</button>
        </div>
      </div>

      <p>${note.content}</p>

      <div class="bottom">
        <div class="badge">${note.category}</div>
        <div class="time">${note.time}</div>
      </div>
    </div>
    
    `;
  });
}


  function editNote(id){

  const note = notes.find(note => note.id === id);

  if(!note) return;

  editId = id;

  openModal();

  document.getElementById("title").value = note.title;
  document.getElementById("content").value = note.content;
  document.getElementById("category").value = note.category;

  selectedColor = note.color;

  document.querySelectorAll(".color").forEach((c)=>{
    c.classList.remove("active");
  });

  document
    .querySelector(`[data-color="${note.color}"]`)
    .classList.add("active");

}


function deleteNote(id){

  const confirmDelete = confirm("Delete this note?");

  if(!confirmDelete) return;

  notes = notes.filter(note => note.id !== id);

  localStorage.setItem("notely", JSON.stringify(notes));

  renderNotes();

}


/* SEARCH */

searchInput.addEventListener("input", renderNotes);

/* FILTER CATEGORY */

filterCategory.addEventListener("change", renderNotes);

/* CLOSE MODAL OUTSIDE CLICK */

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

/* TAB FILTER */

const tabs = document.querySelectorAll(".tab");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));

    tab.classList.add("active");

    const value = tab.innerText;

    filterCategory.value =
      value === "All" ? "All" : value;

    renderNotes();
  });
});

renderNotes();