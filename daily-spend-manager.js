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
        document.getElementById("expenses-grid").hidden = false;
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
