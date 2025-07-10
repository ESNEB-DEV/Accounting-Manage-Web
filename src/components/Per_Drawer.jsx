import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { FcSalesPerformance } from "react-icons/fc"
import { FaSignOutAlt, FaFileInvoiceDollar, FaHome, FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdAttachMoney } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import Divider from '@mui/material/Divider';

const drawerWidth = 265;

function Per_Drawer() {
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: 'none' }}>
                <Toolbar className='bg-gray-600 flex justify-between items-center text-white font-NotoSansThai'>
                    <h2 className='text-xl text-center font-bold text-white flex justify-center items-center '>
                        <FcSalesPerformance className='mr-2 w-[20px] h-[20px] ' />Accounting Manage Web
                    </h2>
                    <div className='flex justify-center items-center space-x-2 text-white'>
                        <FaUserCircle className='w-[20px] h-[20px]' />
                        <h1 className='text-md'>ADMINISTRATOR SYSTEM</h1>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}>
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <nav className="flex flex-col space-y-2 text-gray-700 flex-1 m-4">
                        <div className="group">
                            <Link to="/" className="block px-3 py-2 mb-2 rounded font-semibold flex items-center">
                                <FaHome className='mr-2 w-[20px] h-[20px] text-gray-600' />Dashboard</Link>
                            <Divider />
                            <a className="block px-3 py-2 rounded font-semibold flex items-center">
                                <MdAttachMoney className='mr-2 w-[20px] h-[20px] text-gray-600' />บันทึกการเงิน</a>
                            <Divider />
                            <div className="ml-4 mt-1 flex flex-col space-y-1">
                                <Link to="/Record_Estimate" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">บันทึกประมาณการค่าใช้จ่าย</Link>
                                <Link to="/Record_Daily" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">บันทึกรายรับ - รายจ่าย</Link>
                                <Link to="/Use_Credit_Card" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">บันทึกรายการใช้บัตรเครดิต</Link>
                                <Link to="/Installment_Credit_Card" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">บันทึกรายการผ่อนชำระบัตรเครดิต</Link>
                                <Link to="/Expenses" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">บันทึกค่าใช้จ่ายประจำเดือน</Link>
                            </div>
                        </div>
                        <div className="group">
                            <Divider />
                            <a className="block px-3 py-2 rounded font-semibold flex items-center">
                                <FaFileInvoiceDollar className='mr-2 w-[20px] h-[20px] text-gray-600' />รายงาน</a>
                            <Divider />
                            <div className="ml-4 mt-1 flex flex-col space-y-1">
                                <Link to="/Rep_Use_Credit_Card" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">รายการสรุปการใช้บัตรเคดิต</Link>
                                <Link to="/Rep_Record_Daily" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">รายงานสรุปใช้จ่ายประจำวัน</Link>
                                <Link to="/Rep_Installment_Credit_Card" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">รายงานการผ่อนชำระบัตรเคดิต</Link>
                                <Link to="/Rep_Next_Expenses_List" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">รายงานค่าใช้จ่ายเดือนถัดไป</Link>
                            </div>
                        </div>
                        <div className="group">
                            <Divider />
                            <a className="block px-3 py-2 rounded font-semibold flex items-center">
                                <FaGear className='mr-2 w-[20px] h-[20px] text-gray-600' />ตั้งค่าระบบ</a>
                            <Divider />
                            <div className="ml-4 mt-1 flex flex-col space-y-1">
                                <Link to="/User" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">จัดการข้อมูลผู้ใช้งาน</Link>
                                {/* <Link to="/ChangePass" className="block px-3 py-1 rounded hover:bg-gray-200 text-sm">เปลี่ยนรหัสผ่าน</Link> */}
                            </div>
                        </div>
                    </nav>
                    {/* <div className="mt-20 ml-4 flex flex-col space-y-1">
                        <a href="/Signin" className="flex items-center block px-3 py-2 rounded text-sm hover:bg-gray-200 hover:text-gray-900">
                            <FaSignOutAlt className='mr-2 w-[20px] h-[20px] hover:text-red-600' />ออกจากระบบ</a>
                    </div> */}
                </Box>
            </Drawer>
        </Box>
    );
}

export default Per_Drawer
