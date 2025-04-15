import { useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [result, setResult] = useState(null)

  const testEmail = {
    subject: "Important: Your account information has been compromised",
    sender: "support@xfinit.com",
    body: "Hi, we have detected suspicious activity with your account. Please click here to change your password. http://xfnty.com"
  }

const handleScan = async () => {
    const prompt = `
    Subject: ${testEmail.subject}
    From: ${testEmail.sender}
    Body: ${testEmail.body}
    
    Is this email a phishing attempt? Please explain why or why not.
    `

    try {
      const res = await axios.post('http://localhost:5000/api/llm-query', {
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
    }
  }

  return (
    <div className = "container">
      <h1>OpenAI Phishing Detector</h1>
      <div className="card">
        <h3>{testEmail.subject}</h3>
        <p>
          From: {testEmail.sender}
        </p>
        <p>
          {testEmail.body}
        </p>
      </div>
      <button onClick={handleScan}>
        Scan Email
      </button>
      {result && (
        <div className={`result ${result.label.toLowerCase()}`}>
          <h2>{result.label}</h2>
          <p>{result.explanation}</p>
        </div>
      )}
    </div>
  )
}

export default App
