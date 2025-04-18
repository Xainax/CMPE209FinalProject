function getEmailData() {
    const subject = document.querySelector("h2.hP")?.innerText || "";
    const sender = document.querySelector("span.gD")?.getAttribute("email") || "";
    const body = document.querySelector("div.a3s")?.innerText || "";
  
    if (!body) return;
  
    const emailData = {
      sender,
      subject,
      body
    };
  
    fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailData)
    })
    .then(res => res.json())
    .then(data => {
      alert(`Classification: ${data.label}\nExplanation: ${data.explanation}`);
    })
    .catch(err => console.error("Error contacting backend:", err));
  }
  
  // Gmail is an SPA – use MutationObserver
  const observer = new MutationObserver(() => {
    const emailView = document.querySelector("div.a3s");
    if (emailView) {
      getEmailData();
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
  