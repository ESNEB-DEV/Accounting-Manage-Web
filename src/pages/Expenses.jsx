import React from 'react'
import Drawer from '../components/Drawer.jsx'

function Expenses() {
    return (

        <div>
            <Drawer />
            <div className="container mx-auto text-center w-[80rem] h-screen border border-2 border-solid border-gray-300 ">
                <h1>ค่าใช้จ่ายประจำเดือน</h1>
            </div>
        </div>
    )
}

export default Expenses
