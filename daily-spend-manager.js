function simpleCalculation()
{
   console.log("Simple Calculation");
   let balance = parseInt(document.getElementById("simpleBudget").value);
   console.log("Balance Entered "+balance);
   const today = new Date();
   let selectedDate = document.getElementById("simpleEndDate").value;
   const endDay = new Date(selectedDate);
  

   
   const daysBetweenMilli = endDay - today;
   let daysBetween = daysBetweenMilli / (1000 * 3600 * 24);
   console.log("Difference in Days = "+daysBetween);
                  
   let dailyLimit = 0;
    
    if (daysBetween > 0)
    {
        dailyLimit = (balance / daysBetween).toFixed(2);
        console.log("Daily Cash Limit £"+ dailyLimit);
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
