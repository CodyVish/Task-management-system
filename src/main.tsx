import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import Spinner from '@/components/ui/loader'
import { ThemeProvider } from './store/theme-context'

const DashboardLayout = lazy(() => import('./layout/dashboard-layout.tsx'))
const BoardLayout = lazy(() => import('./layout/board-layout.tsx'))
const LoginPage = lazy(() => import('@/pages/login/index.tsx'))
const BoardPage = lazy(() => import('@/pages/board/index.tsx'))
const BoardsPage = lazy(() => import('@/pages/boards/index.tsx'))

const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  {
    element: <DashboardLayout />,
    children: [
      { path: '/boards', element: <BoardsPage /> },
    ]
  },
  {
    element: <BoardLayout />,
    children: [
      { path: '/board/:boardID', element: <BoardPage /> },
    ]
  },
  { path: '*', element: <Navigate to="/" replace /> }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Suspense fallback={<Spinner/>}>
        <RouterProvider router={router} />
        <Toaster/>
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>,
)
