let workingBalance = 0;
let dailyBudget = 0;

function simpleCalculation()
{
   console.log("Simple Calculation");
   let balance = parseInt(document.getElementById("simpleBudget").value);
   console.log("Balance Entered "+balance);
   //Get today's date
   const today = new Date();
   //Get the data entered by the user
   let selectedDate = document.getElementById("simpleEndDate").value;
   const endDay = new Date(selectedDate); 
   //Calculate the days between the end date and today in milliseconds
   const daysBetweenMilli = endDay - today;
   //Convert Milliseconds to days
   let daysBetween = daysBetweenMilli / (1000 * 3600 * 24);
   console.log("Difference in Days = "+daysBetween);
   //Create the daily spend limit variable and set to Zero               
   let dailyLimit = 0;
    
    if (daysBetween > 0)
    {
        //Set the new daily limit to total balance / number of days
        dailyLimit = (balance / daysBetween).toFixed(2);
        console.log("Daily Cash Limit £"+ dailyLimit);
        const resultsArea = document.getElementById("results");
        resultsArea.innerHTML = "";
        resultsArea.className = "resultCard";
        const dailyLimitResults = document.createElement("p");
        dailyLimitResults.textContent = "Your Daily Spend Limit Is £"+dailyLimit;
        resultsArea.append(dailyLimitResults);
        //Set the working balance to the be the calculated daily limit allowed
        workingBalance = dailyLimit;
        //Set the global daily spend limit
        dailyBudget = dailyLimit;
        document.getElementById("expenses-grid").hidden = false;
        const workingBalanceContainer = document.getElementById("working-balance");
        const workingBalanceMessage = document.createElement("p");
        workingBalanceMessage.textContent = "Current Balance = £"+workingBalance;
        workingBalanceContainer.append(workingBalanceMessage);
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
   workingBalance = dailyBudget;
   //Grab all the entries - Temp commented out 
   /*
   let expense1 = parseFloat(document.getElementById("expense-1").value);
   console.log("Expense 1 = "+expense1);
   let expense2 = parseFloat(document.getElementById("expense-2").value);
   console.log("Expense 2 = "+expense2);
   let expense3 = parseFloat(document.getElementById("expense-3").value);
   console.log("Expense 3 = "+expense3);
   let expense4 = parseFloat(document.getElementById("expense-4").value);
   console.log("Expense 4 = "+expense4);
   let totalSpend = expense1 + expense2 + expense3 + expense4;
   console.log("Total Spend = £"+totalSpend);*/
   
}

function clearExpenseGrid()
{
   console.log("Clear Expense Grid");
}

function printExpenseGrid()
{
   console.log("Print Expense Grid");
}
