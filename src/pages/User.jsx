import React from 'react'
import Drawer from '../components/Drawer.jsx'

function User() {
    return (
        <div>
            <Drawer />
            <div className="container mx-auto text-center w-[80rem] h-screen border border-2 border-solid border-gray-300 ">
                <h1>จัดการข้อมูลผู้ใช้</h1>
            </div>
        </div>
    )
}

export default User