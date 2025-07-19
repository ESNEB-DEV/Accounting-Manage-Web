import { useState, useEffect } from 'react'
import Footer from '../components/Footer.jsx'
import Per_Drawer from '../components/Per_Drawer.jsx';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import config from '../js/config.js'
import axios from 'axios';

function Dashboard() {
    const [users, setuser] = useState([]);
    const [credits, setCredits] = useState([]); // state สำหรับ bg_credit

    const getuser = async () => {
        const response = await axios.get('/users');
        setuser(response.data)
    }

    // เพิ่มฟังก์ชันดึงข้อมูล bg_credit
    const getCredits = async () => {
        const response = await axios.get(`${config.API_URL}/bg_credit`);
        setCredits(response.data);
    }

    useEffect(() => {
        getuser();
        getCredits(); // ดึงข้อมูล bg_credit
    }, [])

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
                    <div>
                        <h2>รายชื่อผู้ใช้จาก Neon DB</h2>
                        <ul>
                            {users.map((u) => <li key={u.id}>{u.name}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h2 className='mt-8'>รายการบัตรเครดิต (bg_credit)</h2>
                        <ul>
                            {credits.map((c) => (
                                <li key={c.bg_credit_id}>
                                    {c.c_name} - {Number(c.f_amount).toLocaleString()} บาท ({c.d_doc_date})
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Footer />
            </Box>
        </Box>
    )
}

export default Dashboard