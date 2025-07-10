import React from 'react'
import Footer from '../components/Footer'
import Per_Drawer from '../components/Per_Drawer.jsx';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

function Rep_Next_Expenses_List() {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Per_Drawer />
            <Box component="main">
                <Toolbar />
                <div className="container mx-auto text-center w-[80rem] h-screen font-NotoSansThai">
                    <div className='bg-blue-100 p-5 text-left m-5 border rounded'>
                        <h1>รายงาน list ค่าใช้จ่ายเดือนถัดไป</h1>
                    </div>
                </div>
                <Footer />
            </Box>
        </Box>
    )
}

export default Rep_Next_Expenses_List
