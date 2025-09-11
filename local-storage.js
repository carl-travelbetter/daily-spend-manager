const STORAGE_KEY = "expenses";

// Get elements
const descInput = document.getElementById("descInput");
const amountInput = document.getElementById("amountInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const expensesList = document.getElementById("expensesList");

// Load saved expenses or start empty
let expenses = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Render function
function renderExpenses() {
  expensesList.innerHTML = ""; // clear old list
  expenses.forEach((exp, index) => {
    const li = document.createElement("li");
    li.textContent = `${exp.desc} - £${exp.amount.toFixed(2)}`;
    expensesList.appendChild(li);
  });
}

// Save function
function saveExpenses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

// Add expense
addBtn.addEventListener("click", () => {
  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);
  
  if (!desc || isNaN(amount)) return; // simple validation
  
  expenses.push({ desc, amount });
  saveExpenses();
  renderExpenses();

  // clear inputs
  descInput.value = "";
  amountInput.value = "";
  descInput.focus();
});

// Clear all
clearBtn.addEventListener("click", () => {
  expenses = [];
  saveExpenses();
  renderExpenses();
});

// Initial render on page load
renderExpenses();

