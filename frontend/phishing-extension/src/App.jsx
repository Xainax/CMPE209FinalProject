import { useState } from 'react'
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
    const testResponse = {
      label: "Phishing",
      explanation: "The email has urgent language and there's a suspicious link attached."
    }

    setTimeout(() => {
      setResult(testResponse)
    }, 500) 
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
          <p1>{result.explanation}</p1>
        </div>
      )}
    </div>
  )
}

export default App
