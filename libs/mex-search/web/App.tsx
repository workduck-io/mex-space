import './App.css'

import React, { useState } from 'react'

import { generateEntities } from '../entities'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [result, setResult] = useState<any[]>([])
  const [isloading, setLoading] = useState<boolean>(false)

  const handleLaunch = async () => {
    setLoading(true)
    const searchResult = await generateEntities(searchInput)
    setResult([...searchResult])
    setLoading(false)
  }
  return (
    <div className="App">
      <div className="Search-Input">
        <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        <button onClick={handleLaunch}> search </button>
      </div>
      <div>
        {!isloading ? (
          result.map((item) => (
            <div className="card">
              <h2 className="card-title">Id: {item.id}</h2>
              <p className="card-description">{item.text}</p>
            </div>
          ))
        ) : (
          <div className="spinner"></div>
        )}
      </div>
    </div>
  )
}

export default App
