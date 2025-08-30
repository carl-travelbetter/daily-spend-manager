function simpleCalculation()
{
   console.log("Simple Calculation");
   let balance = parseInt(document.getElementById("simpleBudget").value);
   console.log("Balance Entered "+balance);
   const today = new Date();
   console.log("Today is" + today.getDate());
   let selectedDate = document.getElementById("simpleEndDate").value;
   const endDay = new Date(selectedDate);
   console.log("End Day is"+endDay.getDate());
   let budgetDays = endDay.getDate() - today.getDate();
   console.log("Days count is "+budgetDays);
   let dailyLimit = 0;
    
    if (budgetDays > 0)
    {
        dailyLimit = (moneyleft / budgetDays).toFixed(2);
        console.log("Daily Cash Limit £"+ dailyLimit);
    }
   else
    {
       console.log("Date Calculation Went Wrong");
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
