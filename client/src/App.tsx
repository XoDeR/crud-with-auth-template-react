import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostsPage from './pages/PostsPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route element={<ProtectedRoute/>}>
          <Route path="/posts" element={<PostsPage/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
