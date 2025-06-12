import React, { useState } from 'react'
import Drawer from '../components/Drawer.jsx'
import { FaCcVisa } from "react-icons/fa";
import axios from 'axios';

function Use_Credit_Card() {

    const [OrderCreditCard, setOrderCreditCard] = useState([]);
    const [c_name, setC_name] = useState('');
    const [f_amount, setF_amount] = useState(0);
    const [d_doc_date, setD_doc_date] = useState('');

    const getOrderCreditCard = () => {
        axios.get('http://localhost:3001/bg_credit').then((response) => {
            setOrderCreditCard(response.data);
        })
    }

    const addOrderCreditCard = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/bg_credit_create', {
            c_name: c_name,
            f_amount: f_amount,
            d_doc_date: d_doc_date
        }).then(() => {
            setOrderCreditCard([
                ...OrderCreditCard,
                {
                    c_name: c_name,
                    f_amount: f_amount,
                    d_doc_date: d_doc_date
                }
            ]);
        });
    };

    const deleteOrderCreditCard = (id) => {
        axios.delete(`http://localhost:3001/bg_credit_delete/${id}`).then((response) => {
            setOrderCreditCard(
                OrderCreditCard.filter((val) => {
                    return val.id !== id;
            }));
        });
    } 

    return (
        <div>
            <Drawer />
            <div className="container mx-auto text-center w-[60rem] h-screen border border-2 border-solid border-gray-300">
                <h1 className='flex items-center text-2xl pl-5 text-white h-24 text-left bg-gray-400'><FaCcVisa className='mr-3 w-[20px] h-[20px]' />บันทึกการใช้บัตรเครดิต</h1>
                <form className='my-5 px-10 py-5 bg-gray-200'>
                    <div className='flex flex-col md:flex-col lg:flex-row justify-between'>
                        <div className='w-full md:w-1/2 lg:w-1/2'>
                            <div className='flex flex-col items-start justify-start'>
                                <label className='text-gray-600 text-left'>รายการจ่าย</label>
                                <input type="text" onChange={(e) => { setC_name(e.target.value) }} className='border border-gray-300 rounded w-96 p-2  focus:outline-none' placeholder='กรุณากรอกข้อมูลรายการจ่าย' />
                            </div>
                            <div className='flex flex-col items-start justify-start mt-4'>
                                <label className='text-gray-600 text-left'>จำนวนเงิน</label>
                                <input type="number" onChange={(e) => { setF_amount(e.target.value) }} className='border border-gray-300 rounded w-96 p-2 focus:outline-none' placeholder='กรุณากรอกจำนวนเงิน' />
                            </div>
                        </div>
                        <div className='w-1/2'>
                            <div className='flex flex-col items-start justify-start mt-4 md:mt-4 lg:mt-0'>
                                <label className='text-gray-600 text-left'>วันที่ใช้จ่าย</label>
                                <input type="date" onChange={(e) => { setD_doc_date(e.target.value) }} className='border border-gray-300 rounded w-96 p-2 focus:outline-none' />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-start md:justify-center lg:justify-end mt-5'>
                        <button className='bg-gray-600 text-white w-56 px-4 py-2 rounded hover:bg-gray-500' onClick={addOrderCreditCard}>บันทึกรายการ</button>
                    </div>
                </form>
                <hr />
                <button className='bg-gray-600 text-white w-56 px-4 py-2 rounded hover:bg-gray-500' onClick={getOrderCreditCard}>แสดงรายการ</button>
                {OrderCreditCard.map((val, key) => {
                    return (
                        <div key={key} className='bg-gray-100 p-4 my-2 rounded shadow-md flex flex-col md:flex-row lg:flex-row justify-between items-center'>
                            <h2 className='text-lg font-semibold'> {val.c_name}</h2>
                            <p className='text-gray-600'>จำนวนเงิน: {val.f_amount} บาท</p>
                            <p className='text-gray-600'>วันที่ใช้จ่าย: {new Date(val.d_doc_date).toLocaleDateString()}</p>
                            <button className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 mt-2' onClick={() => {deleteOrderCreditCard(val.id)}}>ลบรายการ</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Use_Credit_Card
