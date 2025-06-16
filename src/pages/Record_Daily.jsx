import React from 'react'
import Drawer from '../components/Drawer.jsx'
import { FaFileInvoiceDollar } from "react-icons/fa";

function Record_Daily() {

    return (
        <div>
            <Drawer />
            <div className="w-full font-NotoSansThai">
                <h1 className='flex items-center text-xl pl-5 text-white h-14 text-left bg-gray-400'>
                    <FaFileInvoiceDollar className='mr-3 w-[20px] h-[20px]' />บันทึกรายรับ - รายจ่าย</h1>
                <form className='my-2 px-10 py-5 bg-gray-100 flex sm:flex-col md:flex-col lg:flex-row h-50'>
                    <div className='w-1/2'>
                        <label>ค้นหารายการ</label>
                        <div className='border border-solid border-gray-300 p-2 mr-10'>
                            <div className='mt-4'>
                                <label className='pr-2'>เริ่มวันที่ :</label>
                                <input type="date" name='date1' className='border border-gray-300 rounded w-36 p-2 mr-5 focus:outline-none h-7' />
                                <label className='pr-2'>ถึงวันที่ :</label>
                                <input type="date" name='date2' className='border border-gray-300 rounded w-36 p-2 mr-5 focus:outline-none h-7' />
                            </div>
                            <div className='mt-9'>
                                <button className='bg-gray-600 text-white w-36 h-10 px-4 py-2 rounded hover:bg-gray-500 h-7 flex justify-center items-center'>ค้นหา</button>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <label>เพิ่มรายการ</label>
                        <div className='border border-solid border-gray-300 p-2 mr-10'>
                            <div className='flex flex-row items-center'>
                                <label>รายการ : </label>
                                <input type="text" className='ml-2 border border-gray-300 rounded w-96 p-2 mr-5 focus:outline-none h-8' placeholder='กรุณากรอกชื่อรายการ' />
                            </div>
                            <div className='mt-2'>
                                <label>จำนวนเงิน : </label>
                                <input type="number" className='border border-gray-300 rounded w-48 p-2 mr-5 focus:outline-none h-8' placeholder='กรุณากรอกจำนวนเงิน' />
                                <label>รับ/จ่าย : </label>
                                <input type="radio" id="receive" name="payment_type" value="receive" />
                                <label htmlFor="receive" className='pr-2'> รับเงิน</label>
                                <input type="radio" id="pay" name="payment_type" value="pay" />
                                <label htmlFor="pay"> จ่ายเงิน  </label>
                            </div>
                            <div className='mt-2'>
                                <button className='bg-gray-600 text-white w-36 h-10 px-4 py-2 rounded hover:bg-gray-500 h-7 flex justify-center items-center text-sm'>เพิ่มรายการใหม่</button>
                            </div>
                        </div>
                    </div>
                </form>
                <table className='w-full border border-solid border-gray-400'>
                    <thead>
                        <tr className='bg-gray-400 h-12 text-lg text-white'>
                            <th className='w-96'>รายการ</th>
                            <th className='w-20'>รับเงิน</th>
                            <th className='w-20'>จ่ายเงิน</th>
                            <th className='w-40'>-</th>
                        </tr>
                    </thead>
                    <tbody className='border border-2'>
                        {/* {OrderCreditCard && OrderCreditCard.length > 0 ? (
                            currentItems.map((val) => (
                                <tr key={val.bg_credit_id} className='hover:bg-gray-200'>
                                    <td className='text-left px-5  w-[200px] md:w-[200px] lg:w-[700px]'><p className='text-gray-600'>{val.c_name}</p></td>
                                    <td><p className='text-gray-600 text-right'>{Number(val.f_amount).toLocaleString()} บาท</p></td>
                                    <td><p className='text-gray-600 text-right'>{formatThaiDate(val.d_doc_date)}</p></td>
                                    <td>
                                        <div className='flex justify-center'>
                                            <button className=' text-white px-4 py-2 rounded bg-green-400 hover:bg-green-500 my-1 mr-4'
                                                onClick={() => handleEditClick(val)}
                                            ><FaEdit /></button>
                                            <button className='text-white px-4 py-2 rounded bg-red-600 hover:bg-red-500 my-1' onClick={() => { handleDeleteClick(val.bg_credit_id) }}><MdDelete /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : ( */}
                        <tr>
                            <td colSpan={4} className="text-center text-gray-500 py-4">
                                ไม่พบข้อมูลรายการ
                            </td>
                        </tr>
                        {/* )} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Record_Daily
