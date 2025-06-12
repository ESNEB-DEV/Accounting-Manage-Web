import React from 'react'
import Drawer from '../components/Drawer.jsx'

function Amount_Receive() {
    return (

        <div>
            <Drawer />
            <div className="container mx-auto text-center w-[60rem] h-screen border border-2 border-solid border-gray-300 ">
                <form>
                    <h1 className='text-2xl font-bold text-gray-700 mb-6 mt-4'>บันทึกแยกจำนวนเงินที่ได้รับมา</h1>
                    <div className='flex flex-col space-y-4'>
                        <label className='text-left text-gray-600'>วันที่ได้รับเงิน:</label>
                        <input type="date" className='border border-gray-300 rounded p-2 w-full' />

                        <label className='text-left text-gray-600'>จำนวนเงินที่ได้รับ:</label>
                        <input type="number" className='border border-gray-300 rounded p-2 w-full' placeholder='0.00' />

                        <label className='text-left text-gray-600'>หมายเหตุ:</label>
                        <textarea className='border border-gray-300 rounded p-2 w-full' rows="4" placeholder='กรุณากรอกหมายเหตุ'></textarea>

                        <button type="submit" className='bg-blue-500 text-white rounded p-2 hover:bg-blue-600'>บันทึก</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Amount_Receive
