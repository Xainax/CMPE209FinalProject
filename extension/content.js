console.log("Content script running");

function getEmailData() {
    // extracting subject, sender, and body from the email you wish to scan
    const subject = document.querySelector("h2.hP")?.innerText || "";
    const sender = document.querySelector("span.gD")?.getAttribute("email") || "";
    const body = document.querySelector("div.a3s")?.innerText || "";
  
    if (!body) return;
  
    const emailData = {
      sender,
      subject,
      body
    };

    chrome.runtime.sendMessage({
      type: "EMAIL_DATA",
      payload: emailData
    })

    console.log("Extracted email data: ", emailData);
  }
  
  // use mutation observer to detect changes in the DOM structure
  const observer = new MutationObserver(() => {
    const emailView = document.querySelector("div.a3s");
    if (emailView) {
      getEmailData();
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
