import { useState } from 'react'
import Drawer from '../components/Drawer.jsx'
import { FaRegChartBar } from "react-icons/fa";

function Record_Estimate() {

    const [c_name, setC_name] = useState('');
    const [f_amount, setF_amount] = useState('');

    return (

        <div>
            <Drawer />
            <div className="w-full font-NotoSansThai text-sm text-gray-600">
                <h1 className='flex items-center text-lg pl-10 text-white text-left h-14 bg-gray-400'>
                    <FaRegChartBar className='mr-3 w-[20px] h-[20px]' />บันทึกประมาณการค่าใช้จ่าย</h1>
                <form className='my-2 px-10 py-5 bg-gray-100 flex items-center sm:flex-col md:flex-col lg:flex-row h-48'>
                    <div className='w-1/2'>
                        <label>เพิ่มรายการ</label>
                        <div className='border border-solid border-gray-300 p-2 mr-10'>
                            <div className='mb-2'>
                                <label className='ml-3'>ชื่อประมาณการค่าใช้จ่าย: </label>
                                <input type='text'
                                    value={c_name}
                                    onChange={(e) => { setC_name(e.target.value) }}
                                    placeholder='กรุณากรอกชื่อประมาณการค่าใช้จ่าย'
                                    className='ml-2 border border-gray-300 rounded w-80 p-2 mr-5 focus:outline-none h-7' />
                            </div>
                            <div>
                                <label className='ml-3'>จำนวนเงิน: </label>
                                <input type='number'
                                    value={f_amount}
                                    onChange={(e) => { setF_amount(e.target.value) }}
                                    placeholder='กรุณากรอกจำนวนเงิน'
                                    className='ml-2 border border-gray-300 rounded w-40 p-2 mr-5 focus:outline-none h-7' />
                            </div>
                            <div className='mr-15 mt-1 p-2'>
                                <button className='bg-gray-600 text-white w-36 px-4 py-2 rounded hover:bg-gray-500 h-8 flex justify-center items-center'>
                                    เพิ่มรายการใหม่
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className='px-10 py-5 bg-gray-100 flex items-center sm:flex-col md:flex-col lg:flex-row h-40'>
                    <div className='w-full'>
                        <label>รายการประมาณการค่าใช้จ่าย</label>
                        <table className='w-full border-collapse border border-gray-300 mt-2'>
                            <thead>
                                <tr className='bg-gray-200'>
                                    <th className='border border-gray-300 p-2'>ลำดับ</th>
                                    <th className='border border-gray-300 p-2'>ชื่อประมาณการค่าใช้จ่าย</th>
                                    <th className='border border-gray-300 p-2'>จำนวนเงิน</th>
                                    <th className='border border-gray-300 p-2'>จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='border border-gray-300 p-2'>1</td>
                                    <td className='border border-gray-300 p-2'>ค่าใช้จ่ายสำนักงาน</td>
                                    <td className='border border-gray-300 p-2'>10,000 บาท</td>
                                    <td className='border border-gray-300 p-2'>
                                        <button className='bg-red-500 text-white px-4 py-1 rounded hover:bg-red-400'>ลบ</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Record_Estimate
