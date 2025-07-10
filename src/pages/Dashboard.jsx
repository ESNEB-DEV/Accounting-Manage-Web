import React from 'react'
import Drawer from '../components/Drawer'
import Footer from '../components/Footer'
import Pre_Drawer from '../components/Per_Drawer'

function Dashboard() {
    return (
        <div>
            <Pre_Drawer />
            <div className="container mx-auto text-center w-[80rem] h-screen font-NotoSansThai">
                <div className='bg-blue-100 p-5 text-left m-5 border rounded'>
                    <h1 className='text-2xl text-extrabold my-2 text-gray-700'>สวัสดีผู้ใช้</h1>
                    <p className='text-sm text-gray-600'>ยินดีต้อนรับเข้าสู่ระบบการลงบันทึกรายการค่าใช้จ่าย</p>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default Dashboard
