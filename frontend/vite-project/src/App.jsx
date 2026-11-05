import { useState, useEffect } from 'react'
import './App.scss'

function App() {
  const [data, setData] = useState([])
//   const [переменные для строк в бд с их именами + set]  

  useEffect(() => {
    fetch('http://localhost:3000/api/main')
    .then(res => res.json())
    .then(data => setData(data))
  },[])
  const handlForm = async(e) => {
    e.preventDefault()
    try {
        await axios.post('http://localhost:5173/api/form',{
            // переменные из бд и их тип данных
        })
    }
  }

  return (
    <>
      <div>
        {
          data.map((item) => (
            <ul key={item.id}>
                <li>{item.category}</li>
            </ul>
          ))
        }
      </div>
    </>
  )
}

export default App
