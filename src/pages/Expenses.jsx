import { useEffect, useState } from 'react'
import Drawer from '../components/Drawer.jsx'
import { FaCoins } from "react-icons/fa";
import axios from 'axios';
import config from '../js/config.js';

function Expenses() {

    const [items, setItems] = useState([]);
    const [c_name, setC_name] = useState("");
    const [f_amount, setF_amount] = useState("");

    const addItems = (e) => {
        e.preventDefault();

        if (!c_name) {
            alert("กรุณากรอก ชื่อรายการค่าใช้จ่าย");
            return;
        }

        if (!f_amount) {
            alert("กรุณาระบุ จำนวนเงิน");
            return;
        }

        axios.post(`${config.API_URL}/bg_expense_create`, {
            c_name: c_name,
            f_amount: f_amount,
        }).then((response) => {
            const newId = response.data.bg_expense_id;
            setItems([{
                bg_expense_id: newId,
                c_name: c_name,
                f_amount: f_amount,
            }, ...items]);
        })
        setC_name('');
        setF_amount('');
    }

    return (
        <div>
            <Drawer />
            <div className="w-full font-NotoSansThai text-sm text-gray-600">
                <h1 className='flex items-center text-lg pl-10 text-white text-left h-14 bg-gray-400'>
                    <FaCoins className='mr-3 w-[20px] h-[20px]' />ค่าใช้จ่ายประจำเดือน</h1>
                <form className='my-2 px-10 py-5 bg-gray-100 flex items-center sm:flex-col md:flex-col lg:flex-row h-40'>
                    <div className='w-1/2'>
                        <label>เพิ่มรายการ</label>
                        <div className='border border-solid border-gray-300 p-2 mr-10'>
                            <div className='mb-2'>
                                <label className='ml-3'>ชื่อค่าใช้จ่าย: </label>
                                <input type='text'
                                    value={c_name}
                                    onChange={(e) => { setC_name(e.target.value) }}
                                    placeholder='กรุณากรอกชื่อค่าใช้จ่าย'
                                    className='ml-2 border border-gray-300 rounded w-80 p-2 mr-5 focus:outline-none h-7' />
                                <label>จำนวนเงิน: </label>
                                <input type='number'
                                    value={f_amount}
                                    onChange={(e) => { setF_amount(e.target.value) }}
                                    className='border border-gray-300 rounded text-right w-20 p-2 mr-2 focus:outline-none h-7'
                                    placeholder='0' />
                            </div>
                            <div className='mr-15 mt-1 p-2'>
                                <button className='bg-gray-600 text-white w-36 px-4 py-2 rounded hover:bg-gray-500 h-8 flex justify-center items-center'
                                    onClick={addItems}>
                                    เพิ่มรายการใหม่
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className='mx-10'>
                    <label>รายการค่าใช้จ่าย</label>
                </div>
                <table className='fixed-table-body w-[90rem] mx-auto border border-solid border-gray-300 '>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='border border-gray-300 p-2 w-20'>ลำดับ</th>
                            <th className='border border-gray-300 p-2'>รายการค่าใช้จ่ายประจำเดือน</th>
                            <th className='border border-gray-300 p-2 w-32'>จำนวนเงิน</th>
                            <th className='border border-gray-300 p-2 w-40'>-</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default Expenses