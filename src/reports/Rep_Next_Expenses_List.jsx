import React from 'react'
import Drawer from '../components/Drawer.jsx'

function Rep_Next_Expenses_List() {
    return (
        <div>
            <Drawer />
            <div className="container mx-auto text-center w-[60rem] h-screen border border-2 border-solid border-gray-300 ">
                <h1>รายงาน list ค่าใช้จ่ายเดือนถัดไป</h1>
            </div>
        </div>
    )
}

export default Rep_Next_Expenses_List
