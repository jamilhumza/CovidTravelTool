import './App.css'
import Table from './components/Table'
import Navbar from './components/Navbar'
import Search from './components/Search'
import About from './components/About'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </div>
  )
}

export default App
