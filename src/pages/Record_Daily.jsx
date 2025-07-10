import React, { useState, useEffect } from 'react'
import config from '../js/config.js';
import date from '../js/date.js';
import { FaFileInvoiceDollar, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import Footer from '../components/Footer'
import Per_Drawer from '../components/Per_Drawer.jsx';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

function Record_Daily() {

    const [items, setItems] = useState([]);
    const [c_name, setC_name] = useState('');
    const [f_amount, setF_amount] = useState('');
    const [c_type, setC_type] = useState(0);
    const [recieve, setRecieve] = useState([]);
    const [pay, setPay] = useState([]);
    const [sumrecieve, setSumRecieve] = useState([]);
    const [sumpay, setSumPay] = useState([]);
    const [sumtoday, setSumToday] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);


    const getItems = async () => {
        const response = await axios.get(`${config.API_URL}/bg_daily`);
        setItems(response.data)
    }

    const getRecieve = () => {
        axios.get(`${config.API_URL}/bg_daily_recieve`)
            .then((response) => {
                setRecieve(response.data);
            })
    }

    const getSumRecieve = () => {
        axios.get(`${config.API_URL}/bg_daily_sum_recieve`)
            .then((response) => {
                setSumRecieve(response.data);
            })
    }

    const getPay = () => {
        axios.get(`${config.API_URL}/bg_daily_pay`)
            .then((response) => {
                setPay(response.data);
            })
    }

    const getSumPay = () => {
        axios.get(`${config.API_URL}/bg_daily_sum_pay`)
            .then((response) => {
                setSumPay(response.data);
            })
    }

    const getSumToday = () => {
        axios.get(`${config.API_URL}/bg_daily_sum_today`)
            .then((response) => {
                setSumToday(response.data);
            })
    }

    useEffect(() => {
        getItems();
        getRecieve();
        getPay();
        getSumRecieve();
        getSumPay();
        getSumToday();
    }, []);

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

        axios.post(`${config.API_URL}/bg_daily_create`, {
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

            getItems();
            getRecieve();
            getPay();
            getSumRecieve();
            getSumPay();
            getSumToday();
        })
        setC_name('');
        setF_amount('');
        setC_type(0);
    }

    const handleDeleteClick = (bg_daily_id) => {
        setDeleteId(bg_daily_id);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        axios.delete(`${config.API_URL}/bg_daily_delete/${deleteId}`)
            .then(() => {
                setItems(items.filter((val) => val.bg_daily_id !== deleteId));
                setShowConfirm(false);
                setDeleteId(null);
                getSumRecieve();
                getSumPay();
                getSumToday();
            })
            .catch((err) => {
                alert("เกิดข้อผิดพลาดในการลบข้อมูล");
                setShowConfirm(false);
                setDeleteId(null);
            });;
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setDeleteId(null);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Per_Drawer />
            <Box component="main">
                <Toolbar />
                <div className="font-NotoSansThai text-sm text-gray-600">
                    <h1 className='flex items-center text-lg pl-10 text-white h-14 text-left bg-gray-400'>
                        <FaFileInvoiceDollar className='mr-3 w-[20px] h-[20px]' />บันทึกรายรับ - รายจ่าย</h1>
                    <form className='my-2 px-10 py-5 bg-gray-100 flex sm:flex-col md:flex-col lg:flex-row h-50'>
                        <div className='w-2/3'>
                            <label>เพิ่มรายการ</label>
                            <div className='border border-solid border-gray-300 p-2 mr-10'>
                                <div className='flex flex-row items-center'>
                                    <label className='pl-3'>รายการ : </label>
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
                                        className='border border-gray-300 rounded text-right w-20 p-2 mr-2 focus:outline-none h-7'
                                        placeholder='0' />
                                    <label className='ml-5'>รายการรับ/จ่าย : </label>
                                    <input type="radio"
                                        id="receive"
                                        name="payment_type"
                                        value={1}
                                        checked={c_type === 1}
                                        onChange={() => setC_type(1)} />
                                    <label htmlFor="receive" className='pr-2'> รับเงิน</label>
                                    <input type="radio"
                                        id="pay"
                                        name="payment_type"
                                        value={0}
                                        checked={c_type === 0}
                                        onChange={() => setC_type(0)} />
                                    <label htmlFor="pay"> จ่ายเงิน  </label>
                                </div>
                                <div className='mt-2 mr-15 p-2'>
                                    <button className='bg-gray-600 text-white w-36 px-4 py-2 rounded hover:bg-gray-500 h-8 flex justify-center items-center text-sm' onClick={addItems}>เพิ่มรายการใหม่</button>
                                </div>
                            </div>
                        </div>
                        <div className='w-1/2'>
                            <label>แสดงยอดใช้จ่ายประจำวัน</label>
                            <div className='border border-solid border-gray-300 p-2 pl-4 h-36'>
                                <h1 className='mb-2 flex flex-row'>วันที่ : <p className='pl-2 font-bold'>{date.formatThaiDate(date.CurrentDateDisplay())}</p></h1>
                                <h3 className='flex flex-row'>จำนวนเงินที่ใช้ : {
                                    sumtoday.map((val) => (
                                        <p key={val.SumToday} className='pl-2 font-bold'>{Number(val.SumToday).toLocaleString()} บาท</p>
                                    ))}</h3>
                            </div>
                        </div>
                    </form>
                    <div className='mx-10'>
                        <div className='w-full mt-5'>
                            <label>สรุปยอดเงิน</label>
                        </div>
                        <table className='w-full border-collapse border border-gray-300 mt-2'>
                            <thead>
                                <tr className='bg-gray-200'>
                                    <th className='border border-gray-300 p-2'>รายรับ</th>
                                    <th className='border border-gray-300 p-2'>รายจ่าย</th>
                                    <th className='border border-gray-300 p-2'>ยอดคงเหลือ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {sumrecieve.map((val) => (
                                        <td key="recieve"><p className='text-green-600 text-center text-lg my-2 font-bold border-r-2 border-solid border-gray-200'>{Number(val.SumRecieve).toLocaleString()} บาท</p></td>
                                    ))}
                                    {sumpay.map((val) => (
                                        <td key="pay"><p className='text-red-600 text-center text-lg my-2 font-bold border-r-2 border-solid border-gray-200'>{Number(val.SumPay).toLocaleString()} บาท</p></td>
                                    ))}
                                    <td key="balance">
                                        {
                                            (() => {
                                                const totalRecieve = sumrecieve[0]?.SumRecieve || 0;
                                                const totalPay = sumpay[0]?.SumPay || 0;
                                                const balance = totalRecieve - totalPay;

                                                const balanceColor = balance < 0 ? 'text-red-600' : 'text-blue-600';

                                                return (
                                                    <p className={`${balanceColor} text-center text-lg my-2 font-bold`}>
                                                        {Number(balance).toLocaleString()} บาท
                                                    </p>
                                                );
                                            })()
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <div className='mx-10'>
                        <label>รายการใช้จ่ายประจำวัน</label>
                    </div>
                    <table className='fixed-table-body border border-solid border-gray-300 mx-10'>
                        <thead>
                            <tr className='bg-gray-200'>
                                <th className='border border-gray-300 p-2 w-20'>ลำดับ</th>
                                <th className='border border-gray-300 p-2'>รายการ</th>
                                <th className='border border-gray-300 p-2'>รับเงิน</th>
                                <th className='border border-gray-300 p-2'>จ่ายเงิน</th>
                                <th className='border border-gray-300 p-2'>วันที่</th>
                                <th className='border border-gray-300 p-2'>-</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length > 0 ? (
                                currentItems.map((val, idx) => {
                                    const rec = recieve.find(re => re.bg_daily_id === val.bg_daily_id);
                                    const pays = pay.find(payItem => payItem.bg_daily_id === val.bg_daily_id);

                                    const order = indexOfFirstItem + idx + 1;

                                    return (
                                        <tr key={val.bg_daily_id} className='hover:bg-gray-200'>
                                            <td className='text-center w-20'>{order}</td>
                                            <td className='text-left pl-2 w-[270px]'>
                                                <p className='text-gray-600'>{val.c_name}</p>
                                            </td>
                                            <td>
                                                <p className='text-green-600 text-right pr-5'>
                                                    {rec ? Number(rec.f_amount).toLocaleString() + ' บาท' : '-'}
                                                </p>
                                            </td>
                                            <td>
                                                <p className='text-red-600 text-right pr-5'>
                                                    {pays ? Number(pays.f_amount).toLocaleString() + ' บาท' : '-'}
                                                </p>
                                            </td>
                                            <td><p className='text-gray-600 text-right pr-5'>{date.formatThaiDate(val.t_create_dt)}</p></td>
                                            <td>
                                                <div className='flex justify-center '>
                                                    <MdDelete className='text-red-500 hover:text-red-700 mx-2 w-5 h-5 m-2 cursor-pointer' onClick={() => { handleDeleteClick(val.bg_daily_id) }} />
                                                </div>
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
                    <div className="flex justify-center items-center mt-4 gap-2 bg-gray-200 h-10 text-lg text-gray-600 text-sm">
                        <div className='w-5/6'>
                            <Footer />
                        </div>
                        <div className='flex justify-end items-center text-gray-600 text-sm w-50'>
                            <button className="px-3 py-1 rounded border" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}> <FaAngleLeft className='w-[25px] h-[25px]' /></button>
                            <span>หน้า {currentPage} / {totalPages}</span>
                            <button className="px-3 py-1 rounded border" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} > <FaAngleRight className='w-[25px] h-[25px]' /></button>
                        </div>
                    </div>
                    {showConfirm && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                            <div className="bg-white rounded-lg shadow-lg p-8 w-96">
                                <div className="mb-6 text-lg text-gray-700 text-center">ต้องการลบข้อมูลหรือไม่ ?</div>
                                <div className="flex justify-center gap-4">
                                    <button className="border border-red-500 text-red-500 px-6 py-2 rounded bg-transparent hover:bg-red-50" onClick={cancelDelete} type="button" >ยกเลิก</button>
                                    <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600" onClick={confirmDelete} >ตกลง</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Box>
        </Box>
    )
}

export default Record_Daily
