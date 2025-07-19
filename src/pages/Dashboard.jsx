import { useState, useEffect } from 'react'
import Footer from '../components/Footer.jsx'
import Per_Drawer from '../components/Per_Drawer.jsx';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import config from '../js/config.js'

function Dashboard() {

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Per_Drawer />
            <Box component="main">
                <Toolbar />
                <div className="container mx-auto text-center w-[80rem] h-screen font-NotoSansThai">
                    <div className='bg-blue-100 p-5 text-left m-5 border rounded'>
                        <h1 className='text-2xl text-extrabold my-2 text-gray-700'>สวัสดีผู้ใช้</h1>
                        <p className='text-sm text-gray-600'>ยินดีต้อนรับเข้าสู่ระบบการลงบันทึกรายการค่าใช้จ่าย</p>
                    </div>
                </div>
                <Footer />
            </Box>
        </Box>
    )
}

export default Dashboard
