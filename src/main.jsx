import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// Commponent Pages
import Amount_Receive from './pages/Amount_Receive.jsx'
import Amount_Use from './pages/Amount_Use.jsx'
import Check_List from './pages/Check_List.jsx'
import Record_Act_Est from './pages/Record_Act_Est.jsx'
import Record_Daily from './pages/Record_Daily.jsx'
import Use_Credit_Card from './pages/Use_Credit_Card.jsx'
// Commponent Report
import Rep_Amount_Receive from '../src/pages/reports/Rep_Amount_Receive.jsx'
import Rep_Installment_Credit_Card from '../src/pages/reports/Rep_Installment_Credit_Card.jsx'
import Rep_Next_Expenses_List from '../src/pages/reports/Rep_Next_Expenses_List.jsx'
import Rep_Record_Daily from '../src/pages/reports/Rep_Record_Daily.jsx'
import Rep_Use_Credit_Card from '../src/pages/reports/Rep_Use_Credit_Card.jsx'
// Component Other
import Info from './pages/Info.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  //Pagess
  {
    // บันทึกแยกจำนวนเงินที่ได้รับมา
    path: 'Amount_Receive',
    element: <Amount_Receive />,
  },
  {
    // กำหนดจำนวนเงินที่ต้องใช้
    path: 'Amount_Use',
    element: <Amount_Use />,
  },
  {
    // Check list ค่าใช้จ่ายประจำเดือน
    path: 'Check_List',
    element: <Check_List />,
  },
  {
    // บันทึกประมาณการ / ค่าใช้จ่ายจริง
    path: 'Record_Act_Est',
    element: <Record_Act_Est />,
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

  //Report
  {
    // รายงานแสดงภาพรวมการแยกจำนวนเงินที่ได้รับมา / เดือน
    path: 'Rep_Amount_Receive',
    element: <Rep_Amount_Receive />,
  },
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
    path: 'Info',
    element: <Info />,
  },
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
