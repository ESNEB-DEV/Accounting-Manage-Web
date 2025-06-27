import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// Commponent Pages
import Expenses from './pages/Expenses.jsx'
import Record_Estimate from './pages/Record_Estimate.jsx'
import Record_Daily from './pages/Record_Daily.jsx'
import Use_Credit_Card from './pages/Use_Credit_Card.jsx'
import Installment_Credit_Card from './pages/Installment_Credit_Card.jsx'
// Commponent Report
import Rep_Installment_Credit_Card from './reports/Rep_Installment_Credit_Card.jsx'
import Rep_Next_Expenses_List from './reports/Rep_Next_Expenses_List.jsx'
import Rep_Record_Daily from './reports/Rep_Record_Daily.jsx'
import Rep_Use_Credit_Card from './reports/Rep_Use_Credit_Card.jsx'
// Component Other
import ChangePass from './pages/ChangePass.jsx'
import Signin from './pages/Signin.jsx'
import User from './pages/User.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  //Pagess
  {
    // Check list ค่าใช้จ่ายประจำเดือน
    path: 'Expenses',
    element: <Expenses />,
  },
  {
    // บันทึกประมาณการ / ค่าใช้จ่ายจริง
    path: 'Record_Estimate',
    element: <Record_Estimate />,
  },
  {
    // บันทึกรายการค่าใช้จ่ายประจำวัน
    path: 'Record_Daily',
    element: <Record_Daily />,
  },
  {
    // บันทึกรายการใช้บัตรเครดิต
    path: 'Use_Credit_Card',
    element: <Use_Credit_Card />,
  },
   {
    // บันทึกรายการผ่อนชำระบัตรเครดิต
    path: 'Installment_Credit_Card',
    element: <Installment_Credit_Card />,
  },

  //Report
  {
    // รายงานการผ่อนชำระบัตรเคดิต
    path: 'Rep_Installment_Credit_Card',
    element: <Rep_Installment_Credit_Card />,
  },
  {
    // รายงาน list ค่าใช้จ่ายเดือนถัดไป
    path: 'Rep_Next_Expenses_List',
    element: <Rep_Next_Expenses_List />,
  },
  {
    // รายงานสรุปใช้จ่ายประจำวัน / เดือน
    path: 'Rep_Record_Daily',
    element: <Rep_Record_Daily />,
  },
  {
    // รายการการใช้บัตรเคดิต
    path: 'Rep_Use_Credit_Card',
    element: <Rep_Use_Credit_Card />,
  },

  // Other routes can be added here
  {
    // ข้อมูลผู้ใช้
    path: 'ChangePass',
    element: <ChangePass />,
  },
  {
    // จัดการข้อมูลผู้ใช้
    path: 'User',
    element: <User />,
  },
  {
    // เข้าสู่ระบบ
    path: 'Signin',
    element: <Signin />,
  },
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
