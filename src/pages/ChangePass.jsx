import React from 'react'
import Footer from '../components/Footer.jsx'
import Per_Drawer from '../components/Per_Drawer.jsx';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

function ChangePass() {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Per_Drawer />
            <Box component="main">
                <Toolbar />
                <div className="container mx-auto text-center w-[80rem] h-screen font-NotoSansThai">
                    <h1>เปลี่ยนรหัสผ่าน</h1>
                </div>
                <Footer />
            </Box>
        </Box>
    )
}

export default ChangePass