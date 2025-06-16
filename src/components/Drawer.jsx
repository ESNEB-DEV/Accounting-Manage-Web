import React, { useState } from 'react'
import { FaBars, FaUserCircle, FaSignOutAlt, FaFileInvoiceDollar, FaHome, FaRegUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { Link } from 'react-router-dom';

function Drawer() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleOverlayClick = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsDrawerOpen(false);
            setIsClosing(false);
        }, 300); // 300ms = duration-300
    };

    return (
        <>
            <div className='mx-auto text-center py-4 flex justify-center bg-gray-600 items-center px-10 shadow-md font-NotoSansThai'>
                <div className='flex justify-between items-center text-white  w-full'>
                    <div className='flex items-center space-x-5'>
                        <button onClick={() => setIsDrawerOpen(true)} className='hover:text-gray-400'>
                            <FaBars className='w-[20px] h-[20px]' />
                        </button>
                        <h2 className='text-left text-xl font-bold'>Accounting Manage Web</h2>
                    </div>
                    <div className='flex justify-center items-center space-x-2 text-white'>
                        <FaUserCircle className='w-[20px] h-[20px]' />
                        <h1 className='text-md'>ADMINISTRATOR SYSTEM</h1>
                    </div>
                </div>
            </div>

            {/* Drawer with slide-in transition */}
            <div className={`fixed inset-0 z-50 flex pointer-events-none text-gray-600 font-NotoSansThai ${isDrawerOpen || isClosing ? '' : 'invisible'}`} aria-hidden={!isDrawerOpen && !isClosing} >
                {/* Overlay */}
                <div
                    className={`fixed inset-0 bg-black opacity-40 transition-opacity duration-300 ${isDrawerOpen || isClosing ? 'opacity-40 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onClick={handleOverlayClick}
                />
                {/* Drawer panel */}
                <div className={`relative bg-gray-100 w-50 h-full shadow-lg p-6 z-50 transform transition-transform duration-300
                    ${isDrawerOpen && !isClosing ? 'translate-x-0' : '-translate-x-full'}
                    pointer-events-auto flex flex-col`}>
                    <h2 className='text-xl text-center font-bold text-gray-700 mb-6 flex items-center'>
                        <FcSalesPerformance className='mr-2 w-[20px] h-[20px] ' />Accounting Manage Web</h2>
                    <nav className="flex flex-col space-y-2 text-gray-700 flex-1">
                        <div className="group">
                            <Link to="/" className="block px-3 py-2 mb-3 rounded font-semibold flex items-center bg-gray-600 hover:bg-gray-400 text-white"><FaHome className='text-white mr-2 w-[20px] h-[20px] text-gray-600' />Dashboard</Link>
                            <a className="block px-3 py-2 rounded font-semibold flex items-center bg-gray-600 text-white">
                                <MdAttachMoney className='text-white mr-2 w-[20px] h-[20px] text-gray-600' />บันทึกการเงิน</a>
                            <div className="ml-4 mt-1 flex flex-col space-y-1">
                                <Link to="/Amount_Receive" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">บันทึกแยกจำนวนเงินที่ได้รับมา</Link>
                                <Link to="/Record_Daily" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">บันทึกรายรับ - รายจ่าย</Link>
                                <Link to="/Record_Act_Est" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">บันทึกประมาณการ / ค่าใช้จ่ายจริง</Link>
                                <Link to="/Amount_Use" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">กำหนดจำนวนเงินที่ต้องใช้</Link>
                                <Link to="/Use_Credit_Card" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">บันทึกรายการใช้บัตรเครดิต</Link>
                                <Link to="/Installment_Credit_Card" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">บันทึกรายการผ่อนชำระบัตรเครดิต</Link>
                                <Link to="/Check_List" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">Check list ค่าใช้จ่ายประจำเดือน</Link>
                            </div>
                        </div>
                        <div className="group">
                            <a className="block px-3 py-2 rounded font-semibold flex items-center bg-gray-600 text-white">
                                <FaFileInvoiceDollar className='text-white mr-2 w-[20px] h-[20px] text-gray-600' />รายงาน</a>
                            <div className="ml-4 mt-1 flex flex-col space-y-1">
                                <Link to="/Rep_Amount_Receive" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">รายงานแสดงภาพรวมการแยกจำนวนเงินที่ได้รับมา</Link>
                                <Link to="/Rep_Record_Daily" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">รายงานสรุปใช้จ่ายประจำวัน</Link>
                                <Link to="/Rep_Use_Credit_Card" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">รายการการใช้บัตรเคดิต</Link>
                                <Link to="/Rep_Installment_Credit_Card" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">รายงานการผ่อนชำระบัตรเคดิต</Link>
                                <Link to="/Rep_Next_Expenses_List" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">รายงาน list ค่าใช้จ่ายเดือนถัดไป</Link>
                            </div>
                        </div>
                        <div className="group">
                            <a className="block px-3 py-2 rounded font-semibold flex items-center bg-gray-600 text-white">
                                <FaGear className='text-white mr-2 w-[20px] h-[20px] text-gray-600' />ตั้งค่าระบบ</a>
                            <div className="ml-4 mt-1 flex flex-col space-y-1">
                                <Link to="/User" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">จัดการข้อมูลผู้ใช้งาน</Link>
                                <Link to="/ChangePass" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">เปลี่ยนรหัสผ่าน</Link>
                            </div>
                        </div>
                    </nav>
                    <div className="mt-auto ml-4 flex flex-col space-y-1">
                        <a href="/Signin" className="flex items-center block px-3 py-2 rounded text-sm hover:bg-gray-200 hover:text-gray-900"> <FaSignOutAlt className='mr-2 w-[20px] h-[20px] hover:text-red-600' />ออกจากระบบ</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Drawer
