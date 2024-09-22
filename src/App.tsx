import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PostList from './components/PostList'
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import PostDetail from './components/PostDetail';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-3xl">게시판 예제</h1>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/posts/:id" element={<PostDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
