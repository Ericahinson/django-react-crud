import { Routes, Route } from 'react-router-dom'
import View from './pages/View'
import Create from './pages/Create'
import './index.css'

export default function App() {
    
  return (
    <>
    <Routes>
      <Route exact path="/" element={<View />}/>
      <Route exact path="/students" element={<View />}/>
      <Route exact path="/create" element={<Create />}/>
    </Routes>
    </>
  )
}
