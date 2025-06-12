import React, { useState } from 'react'
import { FaBars, FaUserCircle, FaSignOutAlt, FaFileInvoiceDollar, FaHome } from "react-icons/fa";
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
            <div className='mx-auto text-center py-4 flex justify-center items-center px-10 shadow-md'>
                <div className='flex justify-between items-center text-gray-600 w-full'>
                    <button onClick={() => setIsDrawerOpen(true)}>
                        <FaBars className='w-[20px] h-[20px]' />
                    </button>
                    <div className='flex justify-center items-center space-x-2 text-gray-600'>
                        <FaUserCircle className='w-[20px] h-[20px]' />
                        <h1>ADMINISTRATOR SYSTEM</h1>
                    </div>
                </div>
            </div>

            {/* Drawer with slide-in transition */}
            <div className={`fixed inset-0 z-50 flex pointer-events-none text-gray-600  ${isDrawerOpen || isClosing ? '' : 'invisible'}`} aria-hidden={!isDrawerOpen && !isClosing} >
                {/* Overlay */}
                <div
                    className={`fixed inset-0 bg-black opacity-40 transition-opacity duration-300 ${isDrawerOpen || isClosing ? 'opacity-40 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onClick={handleOverlayClick}
                />
                {/* Drawer panel */}
                <div className={`relative bg-gray-100 w-50 h-full shadow-lg p-6 z-50 transform transition-transform duration-300
                    ${isDrawerOpen && !isClosing ? 'translate-x-0' : '-translate-x-full'}
                    pointer-events-auto flex flex-col`}>
                    <h2 className='text-xl text-center font-bold text-gray-700 mb-6 flex items-center'><FcSalesPerformance className='mr-2 w-[20px] h-[20px] ' />Accounting Manage Web</h2>
                    <nav className="flex flex-col space-y-2 text-gray-700 flex-1">
                        <div className="group">
                            <Link to="/" className="block px-3 py-2 mb-3 rounded font-semibold flex items-center bg-gray-600 text-white"><FaHome className='text-white mr-2 w-[20px] h-[20px] text-gray-600' />Dashboard</Link>
                            <a className="block px-3 py-2 rounded font-semibold flex items-center bg-gray-600 text-white"><MdAttachMoney className='text-white mr-2 w-[20px] h-[20px] text-gray-600' />บันทึกการเงิน</a>
                            <div className="ml-4 mt-1 flex flex-col space-y-1">
                                <Link to="/Amount_Receive" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">บันทึกแยกจำนวนเงินที่ได้รับมา</Link>
                                <Link to="/Record_Daily" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">บันทึกรายกการค่าใช้จ่ายประจำวัน</Link>
                                <Link to="/Record_Act_Est" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">บันทึกประมาณการ / ค่าใช้จ่ายจริง</Link>
                                <Link to="/Amount_Use" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">กำหนดจำนวนเงินที่ต้องใช้</Link>
                                <Link to="/Use_Credit_Card" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">บันทึกรายการใช้บัตรเครดิต</Link>
                                <Link to="/Check_List" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">Check list ค่าใช้จ่ายประจำเดือน</Link>
                            </div>
                        </div>
                        <div className="group">
                            <a className="block px-3 py-2 rounded font-semibold flex items-center bg-gray-600 text-white"><FaFileInvoiceDollar className='text-white mr-2 w-[20px] h-[20px] text-gray-600' />รายงาน</a>
                            <div className="ml-4 mt-1 flex flex-col space-y-1">
                                <Link to="/Rep_Amount_Receive" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">รายงานแสดงภาพรวมการแยกจำนวนเงินที่ได้รับมา / เดือน</Link>
                                <Link to="/Rep_Record_Daily" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">รายงานสรุปใช้จ่ายประจำวัน / เดือน</Link>
                                <Link to="/Rep_Use_Credit_Card" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">รายการการใช้บัตรเคดิต</Link>
                                <Link to="/Rep_Installment_Credit_Card" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">รายงานการผ่อนชำระบัตรเคดิต</Link>
                                <Link to="/Rep_Next_Expenses_List" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">รายงาน list ค่าใช้จ่ายเดือนถัดไป</Link>
                            </div>
                        </div>
                    </nav>
                    <div className="mt-auto ml-4 flex flex-col space-y-1">
                        <a href="#" className="flex items-center block px-3 py-2 rounded hover:bg-gray-200 text-sm"> <FaSignOutAlt className='mr-2 w-[20px] h-[20px] text-gray-600' />ออกจากระบบ</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Drawer
