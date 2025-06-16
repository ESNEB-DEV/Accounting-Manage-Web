import React, { useState, useEffect } from 'react'
import Drawer from '../components/Drawer.jsx'
import { FaFileInvoiceDollar } from "react-icons/fa";
import axios from 'axios';
import { MdDelete } from "react-icons/md";

function Record_Daily() {

    const [items, setItems] = useState([]);
    const [c_name, setC_name] = useState('');
    const [f_amount, setF_amount] = useState(0);
    const [c_type, setC_type] = useState('');
    const [recieve, setRecieve] = useState([]);
    const [pay, setPay] = useState([]);


    const getItems = async () => {
        const response = await axios.get('http://localhost:3001/bg_daily');
        setItems(response.data)
    }

    const getRecieve = () => {
        axios.get('http://localhost:3001/bg_daily_recieve')
            .then((response) => {
                setRecieve(response.data);
            })
    }

    const getPay = () => {
        axios.get('http://localhost:3001/bg_daily_pay')
            .then((response) => {
                setPay(response.data);
            })
    }

    useEffect(() => {
        getItems();
        getRecieve();
        getPay();
    }, []);

    const addItems = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/bg_daily_create', {
            c_name: c_name,
            f_amount: f_amount,
            c_type: c_type
        }).then((response) => {
            const newItem = response.data.bg_daily_id;
            setItems([{
                bg_daily_id: newItem,
                c_name: c_name,
                f_amount: f_amount,
                c_type: c_type
            }, ...items]);
        })
        setC_name('');
        setF_amount(0);
        setC_type(0);
    }

    return (
        <div>
            <Drawer />
            <div className="w-full font-NotoSansThai text-gray-600">
                <h1 className='flex items-center text-xl pl-5 text-white h-14 text-left bg-gray-400 pl-11'>
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
                            <div className='mt-9 mr-15 p-2'>
                                <button className='bg-gray-600 text-white w-36 h-10 px-4 py-2 rounded hover:bg-gray-500 h-8 flex justify-center items-center'>ค้นหา</button>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <label>เพิ่มรายการ</label>
                        <div className='border border-solid border-gray-300 p-2 mr-10'>
                            <div className='flex flex-row items-center'>
                                <label>รายการ : </label>
                                <input type="text"
                                    value={c_name}
                                    onChange={(e) => { setC_name(e.target.value) }}
                                    className='ml-2 border border-gray-300 rounded w-96 p-2 mr-5 focus:outline-none h-8'
                                    placeholder='กรุณากรอกชื่อรายการ' />
                            </div>
                            <div className='mt-2'>
                                <label>จำนวนเงิน : </label>
                                <input type="number"
                                    value={f_amount}
                                    onChange={(e) => { setF_amount(e.target.value) }}
                                    className='border border-gray-300 rounded w-48 p-2 mr-5 focus:outline-none h-8'
                                    placeholder='กรุณากรอกจำนวนเงิน' />
                                <label>รับ/จ่าย : </label>
                                <input type="radio"
                                    id="receive"
                                    name="payment_type"
                                    value={1}
                                    onChange={(e) => { setC_type(e.target.value) }} />
                                <label htmlFor="receive" className='pr-2'> รับเงิน</label>
                                <input type="radio"
                                    id="pay"
                                    name="payment_type"
                                    value={0}
                                    onChange={(e) => { setC_type(e.target.value) }} />
                                <label htmlFor="pay"> จ่ายเงิน  </label>
                            </div>
                            <div className='mt-2 mr-15 p-2'>
                                <button className='bg-gray-600 text-white w-36 h-10 px-4 py-2 rounded hover:bg-gray-500 h-8 flex justify-center items-center text-sm' onClick={addItems}>เพิ่มรายการใหม่</button>
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
                        {items.length > 0 ? (
                            items.map((val) => {
                                const rec = recieve.find(re => re.bg_daily_id === val.bg_daily_id);
                                const pays = pay.find(payItem => payItem.bg_daily_id === val.bg_daily_id);

                                return (
                                    <tr key={val.bg_daily_id} className='hover:bg-gray-200'>
                                        <td className='text-left px-10 w-[200px] md:w-[200px] lg:w-[700px]'>
                                            <p className='text-gray-600'>{val.c_name}</p>
                                        </td>
                                        <td>
                                            <p className='text-green-600 text-right'>
                                                {rec ? Number(rec.f_amount).toLocaleString() + ' บาท' : '-'}
                                            </p>
                                        </td>
                                        <td>
                                            <p className='text-red-600 text-right'>
                                                {pays ? Number(pays.f_amount).toLocaleString() + ' บาท' : '-'}
                                            </p>
                                        </td>
                                        <td className='text-center'>
                                            <button className='text-white px-4 py-2 rounded bg-red-600 hover:bg-red-500 my-1' onClick={() => { handleDeleteClick(val.bg_daily_id) }}><MdDelete /></button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center text-gray-500 py-4">
                                    ไม่พบข้อมูลรายการ
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Record_Daily
