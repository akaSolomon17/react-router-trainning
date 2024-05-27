import React from 'react'

import Nav from './components/Navbar/Nav'
import Sidebar from './components/Sidebar/Sidebar'
const LazyHomePage = React.lazy(() => import('./pages/Home'))
const LazyBlogPage = React.lazy(() => import('./pages/Blog'))
const LazyCommunityPage = React.lazy(() => import('./pages/Community'))
const LazyTutorialPage = React.lazy(() => import('./pages/Tutorial'))
const LazyDocsPage = React.lazy(() => import('./pages/Docs'))
const LazyGettingStarted = React.lazy(() => import('./pages/GettingStarted'))

import './App.css'

import { Route, Routes } from 'react-router-dom'
import Loader from './components/Loading/Loader'
import NotFound from './components/NotFound/NotFound'
import FormYup from './pages/FormYup'
import Register from './pages/Register'
import UserInfo from './pages/User/UserInfo'

function App() {
  return (
    <div>
      <Nav />
      <div className="d-flex flex-rows justify-content-end">
        <React.Suspense fallback={<Loader />}>
          <Routes >
            <Route path='/' element={<LazyHomePage />} />
            <Route path='/docs' element={<LazyDocsPage />} />
            <Route path='/docs/getting-started' element={<LazyGettingStarted />} />
            <Route path='/tutorial' element={<LazyTutorialPage />} />
            <Route path='/blog' element={<LazyBlogPage />} />
            <Route path='/community' element={<LazyCommunityPage />} />
            <Route path='/react-hook-form' element={<FormYup />} />
            <Route path='/register' element={<Register />} />
            <Route path='/user-info' element={<UserInfo />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </React.Suspense>
        <Sidebar />
      </div>
    </div>
  )
}

export default App
