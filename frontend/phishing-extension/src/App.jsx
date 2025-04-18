import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [email, setEmail] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.type === "EMAIL_DATA") {
        setEmail(request.payload);
      }
      console.log(request.payload);
    });
  }, []);

  const testEmail = {
    subject: "Important: Your account information has been compromised",
    sender: "support@xfinit.com",
    body: "Hi, we have detected suspicious activity with your account. Please click here to change your password. http://xfnty.com"
  }

const handleScan = async () => {
    setLoading(true);

    const prompt = `
    Subject: ${testEmail.subject}
    From: ${testEmail.sender}
    Body: ${testEmail.body}
    
    Is this email a phishing attempt? Please explain why or why not.
    `

    try {
      const res = await axios.post('http://127.0.0.1:5000/api/llm-query', {
        message: prompt
      })

      setResult({
        label: "AI Response",
        explanation: res.data.reply
      })
      console.log(res.data.reply)
    } catch (err) {
      console.error(err)
      setResult({
        label: "Error",
        explanation: err.response?.data?.error || err.message
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className = "container">
      <h1>OpenAI Phishing Detector</h1>

      {email ? (
        <div className="card">
          <h3>{email.subject}</h3>
          <p>From: {email.sender}</p>
          <p>{email.body}</p>
        </div>
      ) : (
        <p>Please open an email to begin scan.</p>
      )}

      <button onClick={handleScan}>
        Scan Email
      </button> 
      {loading && <div className="loader"></div>}
      {result && (
        <div className={"result-card"}>
          <h2>{result.label}</h2>
          <p>{result.explanation}</p>
        </div>
      )}
    </div>
  )
}

export default App
