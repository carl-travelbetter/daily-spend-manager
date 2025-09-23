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
}
