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
    body: "Hi, we have detected suspicious activity with your account. Please click here to change your password."
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
      <button>
        Scan Email
      </button>
    </div>
  )
}

export default App
