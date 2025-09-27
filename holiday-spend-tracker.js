let workingBalance = 0;

let totalSpend = 0;


//set a storage key
const STORAGE_KEY = "tb_dailySpendData";



//retrieve stored data
//let expenses = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] ;
let state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { expenses: [], budget: 0, dailyLimit: 0, startDate: null, endDate: null, duration: 0 };


// Create a global function to convert a number to GBP (£) format
const gbp = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });

function simpleCalculation()
{
   console.log("Simple Calculation");
   state.budget = parseInt(document.getElementById("simpleBudget").value);
   console.log("Balance Set "+state.budget);
   //Get today's date
   const today = new Date();
   //Get the start date of the trip select by the user
   let startDate = document.getElementById("simpleStartDate").value;
   state.startDate = new Date(startDate);
   
   //Get the end date of the trip selected by the user
   let selectedDate = document.getElementById("simpleEndDate").value;
   console.log("Selected End Date = "+selectedDate);
   state.endDate = new Date(selectedDate); 
   console.log("End Date = "+state.endDate);
   //Calculate the days between the end date and today in milliseconds
   const daysBetweenMilli = state.endDate - state.startDate;
   //Convert Milliseconds to days, set a min value of 1 and ensure a rounded day count
   let daysBetween = Math.max(1, Math.floor(daysBetweenMilli / (1000 * 3600 * 24)));
   
   console.log("Difference in Days = "+daysBetween);
   state.duration = daysBetween;
   //Create the daily spend limit variable and set to Zero               
   let dailyLimit = 0;
    
    if (daysBetween > 0)
    {
        //Set the new daily limit to total balance / number of days
        //dailyLimit = (balance / daysBetween).toFixed(2);
        state.dailyLimit = state.budget / daysBetween;
        console.log("Daily Cash Limit £"+ state.dailyLimit);
        const resultsArea = document.getElementById("results");
        resultsArea.innerHTML = "";
        resultsArea.className = "resultCard";
        const dailyLimitResults = document.createElement("p");
        dailyLimitResults.textContent = "Your Recommended Daily Spend Limit Is "+gbp.format(state.dailyLimit);
        resultsArea.append(dailyLimitResults);
        //Set the working balance to the be the calculated daily limit allowed
        workingBalance = state.dailyLimit;
        //Enable expense capture
        document.getElementById("expense-capture").hidden = false;
        const workingBalanceContainer = document.getElementById("working-balance");
        const workingBalanceMessage = document.createElement("p");
        workingBalanceMessage.textContent = "Current Balance = "+gbp.format(workingBalance);
        workingBalanceContainer.append(workingBalanceMessage);
        document.getElementById("simpleapp").hidden = true;
        updateBalance();
    }
   else
    {
       console.log("Calculation Went Wrong");
    }
}

function advancedCalculation()
{
   console.log("Advanced Calculation");
}

function loadSimpleTool()
{
  console.log("Load Simple Tool");
   document.getElementById("advancedapp").hidden = true;
   document.getElementById("simpleapp").hidden = false;
}

function loadAdvanceTool()
{
  console.log("Load Advanced Tool");
   document.getElementById("advancedapp").hidden = false;
   document.getElementById("simpleapp").hidden = true;
}

//Take all the entries in the table, add them up and then take them away from the working balance or daily limit
//Show a total spend value as well (total of all elements)
function updateBalance()
{
   console.log("Update Balance");
   //Reset the working balance
   workingBalance = state.dailyLimit;
   //reset the total spend to zero
   totalSpend = 0;
   state.expenses.forEach(expenseItem => {
      console.log("Expense "+expenseItem.value);
      totalSpend = totalSpend+expenseItem.value;
      console.log("Running Total "+gbp.format(totalSpend));
      console.log("Last Items Purchased "+expenseItem.name);
   });
   workingBalance = workingBalance - totalSpend;
   let remainingTotalBudget = state.budget - totalSpend;
   const workingBalanceReporting = document.getElementById("working-balance");
   workingBalanceReporting.innerHTML = "";
   const currentBalance = document.createElement("p");
   const remainingBudgetNote = document.createElement("p");
   
   
      currentBalance.textContent = "Total Spend "+gbp.format(totalSpend);
      currentBalance.className = "onbudget";
      remainingBudgetNote.textContent = "Remaining Budget "+gbp.format(remainingTotalBudget);
   
     
   
   
   workingBalanceReporting.append(currentBalance);
   workingBalanceReporting.append(remainingBudgetNote);
   saveState();
   outputExpenses();
}

//function to output the list of expenses so far
function outputExpenses()
{
   console.log("Output Expenses");
   //Grab the array of expense objects and output in simple HTML 

   //Grab the output HTML element
   const expenseSummary = document.getElementById("expense-summary");
   //Reset the list
   expenseSummary.innerHTML = "";
   const expenseListHeader = document.createElement("h2");
   expenseListHeader.textContent = "Summary of Expenses";
   expenseSummary.appendChild(expenseListHeader);
   //Loop through the array and output a simple paragraph per expense
   const expenseList = document.createElement("ul");
  
   
   let expenseNumber = 0;
   state.expenses.forEach(expenseItem => {
      expenseNumber++;
      const expenseListItem = document.createElement("li");
      const expenseItemId = document.createElement("span");
      expenseItemId.className = "span-id";
      expenseItemId.textContent = expenseItem.id;
      expenseListItem.appendChild(expenseItemId);
      const expenseItemName = document.createElement("span");
      expenseItemName.className = "span-name";
      expenseItemName.textContent = expenseItem.name;
      expenseListItem.appendChild(expenseItemName);
      const expenseItemAmount = document.createElement("span");
      expenseItemAmount.className = "span-amount";
      expenseItemAmount.textContent = gbp.format(expenseItem.value);
      expenseListItem.appendChild(expenseItemAmount);
      //Create delete button
      const expenseDelete = document.createElement("span");
      expenseDelete.className = "span-delete";
      
      const deleteExpenseButton = document.createElement("button");
      deleteExpenseButton.textContent = "❌";
      deleteExpenseButton.setAttribute("data-label", expenseNumber-1);
      //Make the button do something
       //Make the button do something when clicked
      deleteExpenseButton.addEventListener("click", () => {
      
      console.log("Delete Expense Button Clicked");
      console.log("Delete ID = "+deleteExpenseButton.dataset.label);   
      state.expenses.splice(deleteExpenseButton.dataset.label, 1); 
      updateBalance();
      });  
      
      expenseDelete.appendChild(deleteExpenseButton);
      expenseListItem.appendChild(expenseDelete);
      expenseList.appendChild(expenseListItem);
   });
      
  expenseSummary.appendChild(expenseList);  

  //clear the input fields
   document.getElementById("item-description").value = "";
   document.getElementById("expense").value = "";

   
    if (expenseSummary) {
        expenseSummary.scrollIntoView({
            behavior: "smooth", // smooth scrolling
            block: "start"      // align to top
        });
    }
   
}

//Function to capture each expense entered - will call the update balance function
function captureExpense()
{
   console.log("Capture Expense");
  
   
   //Capture the expense listed and stored in the array of expenses (just value for now)
   let expense = parseFloat(document.getElementById("expense").value);
   let description = document.getElementById("item-description").value;
   console.log("Capture Expense Description is "+description);
   if (description == "")
   {
      description = "Not provided";
   }
   
   console.log("Expense Captured £"+expense);
   if (isNaN(expense))
   {
      console.log("Invalid Value Entered");
      return;
   }
   else
   {
      let id = state.expenses.length+1;
      let expenseItem = {id:id, name:description, value:expense}; 
      state.expenses.push(expenseItem);
      console.log("Number of expenses captured "+state.expenses.length);
      document.getElementById("expense").innerHTML = " ";
      document.getElementById("item-description").innerHTML = " ";
      updateBalance();
   }
   
   
}

function resetDailySpendLimit()
{
    console.log("Adjust Settings");
    document.getElementById("simpleBudget").value = state.budget;
    document.getElementById("simpleStartDate").value = state.startDate;
    document.getElementById("simpleEndDate").value = state.endDate;
    document.getElementById("simpleapp").hidden = false;
}

function clearExpenseGrid()
{
   console.log("Clear Expense Grid"); 
   //Open a dialog with confirmation and Cancel / Clear options
   if (confirm("Clear all data - This can't be undone!"))
   {
      startNewBudget();
   }
   else
   {
      return;
   }
}

function printExpenseGrid()
{
   console.log("Print Expense Grid");
}

function startNewBudget()
{
   console.log("Start New Budget");
   localStorage.removeItem(STORAGE_KEY);
   state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { expenses: [], budget: 0, dailyLimit: 0, endDate: null };
   document.getElementById("simpleapp").hidden = false;
   document.getElementById("expense-capture").hidden = true;
}

function loadSavedBudget()
{
   console.log("Load Saved Budget");
   //Check if we have some data, if not then new else load from state
   //Need to add the check in 
   if (state.expenses.length === 0)
   {
      console.log("Expenses is Empty so start new");
      startNewBudget();
   }
   else
   {
      document.getElementById("expense-capture").hidden = false;
      const resultsArea = document.getElementById("results");
      resultsArea.innerHTML = "";
      resultsArea.className = "resultCard";
      const dailyLimitResults = document.createElement("p");
      dailyLimitResults.textContent = "Your Recommended Daily Spend Limit Is "+gbp.format(state.dailyLimit);
      resultsArea.append(dailyLimitResults);
      updateBalance();
   }
}

function saveState() {
  console.log("Saving Budget and Spend Data...");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

