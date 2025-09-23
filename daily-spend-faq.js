//Load my favourite top three results ready for display
let faqList = [];
 fetch('daily-spend-manager-faq.json')
  .then(response => response.json())
  .then(data => {
    faqList = data;
    console.log("FAQ List: ", faqList);
    loadFAQs();
  })
  .catch(error => console.error("Error loading FAQ data:", error));

function loadFAQs()
{
  console.log("Load FAQs...");
  const faqDiv = document.getElementById("faq-list");
  faqDiv.innerHTML = "";
  faqList.forEach(item => {
   let faqItem = document.createElement("div");
   faqItem.className = "help-topic-card";
   let question = document.getElementById("h3");
   question.textContent = item.question;
   faqItem.appendChild(question);
   let answer = document.getElementById("p");
   answer.textContent = item.answer;
   faqItem.appendChild(answer);
   faqDiv.appendChild(faqItem);
  });
}
