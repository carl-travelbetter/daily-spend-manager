// Pick a key name for our storage
const STORAGE_KEY = "myNote";

// Grab elements
const input = document.getElementById("noteInput");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");
const display = document.getElementById("noteDisplay");

// 1. Load any saved note when the page starts
const savedNote = localStorage.getItem(STORAGE_KEY);
if (savedNote) {
  display.textContent = savedNote;
  input.value = savedNote;
}

// 2. Save note when clicking Save
saveBtn.addEventListener("click", () => {
  const note = input.value;
  localStorage.setItem(STORAGE_KEY, note);
  display.textContent = note;
});

// 3. Clear note when clicking Clear
clearBtn.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  display.textContent = "";
  input.value = "";
});
