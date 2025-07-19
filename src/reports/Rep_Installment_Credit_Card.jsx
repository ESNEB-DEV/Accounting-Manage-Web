import React from 'react'
import Footer from '../components/Footer.jsx'
import Per_Drawer from '../components/Per_Drawer.jsx';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

function Rep_Installment_Credit_Card() {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Per_Drawer />
            <Box component="main">
                <Toolbar />
                <div className="container mx-auto text-center w-[80rem] h-screen font-NotoSansThai">
                    <div className='bg-blue-100 p-5 text-left m-5 border rounded'>
                        <h1>รายงานการผ่อนชำระบัตรเคดิต</h1>
                    </div>
                </div>
                <Footer />
            </Box>
        </Box>
    )
}

export default Rep_Installment_Credit_Card
