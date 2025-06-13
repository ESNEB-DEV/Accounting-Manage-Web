import React, { useState, useEffect, useContext } from 'react'
import Drawer from '../components/Drawer.jsx'
import { FaCcVisa, FaEdit, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import formatThaiDate from '../components/DateFormat';

function Use_Credit_Card() {

    const [OrderCreditCard, setOrderCreditCard] = useState([]);
    const [c_name, setC_name] = useState("");
    const [f_amount, setF_amount] = useState(0);
    const [d_doc_date, setD_doc_date] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [showEdit, setShowEdit] = useState(false);
    const [editData, setEditData] = useState({
        id: null,
        c_name: "",
        f_amount: 0,
        d_doc_date: ""
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = OrderCreditCard.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(OrderCreditCard.length / itemsPerPage);

    const getOrderCreditCard = async () => {
        const response = await axios.get(`http://localhost:3001/bg_credit`)
        setOrderCreditCard(response.data)
    }

    useEffect(() => {
        getOrderCreditCard();
    }, [])

    const addOrderCreditCard = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/bg_credit_create', {
            c_name: c_name,
            f_amount: f_amount,
            d_doc_date: d_doc_date
        }).then((response) => {
            const newId = response.data.id;
            setOrderCreditCard([
                {
                    id: newId,
                    c_name: c_name,
                    f_amount: f_amount,
                    d_doc_date: d_doc_date
                },
                ...OrderCreditCard
            ]);
        });

        setC_name("");
        setF_amount(0);
        setD_doc_date("");
    };

    console.log(OrderCreditCard);

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:3001/bg_credit_delete/${deleteId}`).then(() => {
            setOrderCreditCard(OrderCreditCard.filter((val) => val.id !== deleteId));
            setShowConfirm(false);
            setDeleteId(null);
        });
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setDeleteId(null);
    };

    const handleEditClick = (item) => {
        // แปลงวันที่ให้อยู่ในรูปแบบ YYYY-MM-DD
        let formattedDate = "";
        if (item.d_doc_date) {
            const date = new Date(item.d_doc_date);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            formattedDate = `${year}-${month}-${day}`;
        }
        setEditData({
            id: item.id,
            c_name: item.c_name,
            f_amount: item.f_amount,
            d_doc_date: formattedDate
        });
        setShowEdit(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveEdit = () => {
        axios.put(`http://localhost:3001/bg_credit_update/${editData.id}`, {
            c_name: editData.c_name,
            f_amount: editData.f_amount,
            d_doc_date: editData.d_doc_date
        }).then(() => {
            setOrderCreditCard(OrderCreditCard.map(item =>
                item.id === editData.id
                    ? { ...item, ...editData }
                    : item
            ));
            setShowEdit(false);
        });
    };

    const handleCancelEdit = () => {
        setShowEdit(false);
    };

    return (
        <div>
            <Drawer />
            <div className="container mx-auto text-center w-[80rem]">
                <h1 className='flex items-center text-2xl pl-5 text-white h-14 text-left bg-gray-400'><FaCcVisa className='mr-3 w-[20px] h-[20px]' />บันทึกการใช้บัตรเครดิต</h1>
                <form className='my-5 px-10 py-5 bg-gray-200'>
                    <div className='flex flex-col md:flex-col lg:flex-row justify-between'>
                        <div className='flex flex-row'>
                            <div className='flex flex-col justify-start'>
                                <label className='text-gray-600 text-left'>รายการจ่าย</label>
                                <input type="text" value={c_name} onChange={(e) => { setC_name(e.target.value) }} className='border border-gray-300 rounded w-96 p-2 mr-5 focus:outline-none' placeholder='กรุณากรอกข้อมูลรายการจ่าย' />
                            </div>
                            <div className='flex flex-col justify-start'>
                                <label className='text-gray-600 text-left'>จำนวนเงิน</label>
                                <input type="number" value={f_amount} onChange={(e) => { setF_amount(e.target.value) }} className='border border-gray-300 rounded w-28 p-2 mr-5 focus:outline-none text-right' placeholder='กรุณากรอกจำนวนเงิน' />
                            </div>
                            <div className='flex flex-col justify-start'>
                                <label className='text-gray-600 text-left'>วันที่ใช้จ่าย</label>
                                <input type="date" value={d_doc_date} onChange={(e) => { setD_doc_date(e.target.value) }} className='border border-gray-300 rounded w-60 p-2 mr-5 focus:outline-none' />
                            </div>
                            <div className='flex items-end'>
                                <button className='bg-gray-600 text-white w-56 h-10 px-4 py-2 rounded hover:bg-gray-500' onClick={addOrderCreditCard}>บันทึกรายการ</button>
                            </div>
                        </div>
                    </div>
                </form>
                <hr />
                <table className='w-full '>
                    <thead>
                        <tr className='bg-gray-400 h-12 text-lg text-white'>
                            <th>รายการจ่าย</th>
                            <th>จำนวนเงิน</th>
                            <th>วันที่ใช้จ่าย</th>
                            <th>-</th>
                        </tr>
                    </thead>
                    <tbody className='border border-2'>
                        {OrderCreditCard && OrderCreditCard.length > 0 ? (
                            currentItems.map((val) => (
                                <tr key={val.id} className='hover:bg-gray-200'>
                                    <td className='text-left px-5 w-[700px]'><p className='text-gray-600'>{val.c_name}</p></td>
                                    <td><p className='text-gray-600 text-right'>{Number(val.f_amount).toLocaleString()} บาท</p></td>
                                    <td><p className='text-gray-600 text-right'>{formatThaiDate(val.d_doc_date)}</p></td>
                                    <td>
                                        <div className='flex justify-center'>
                                            <button className=' text-white px-4 py-2 rounded bg-green-400 hover:bg-green-500 my-1 mr-4'
                                                onClick={() => handleEditClick(val)}
                                            ><FaEdit /></button>
                                            <button className='text-white px-4 py-2 rounded bg-red-600 hover:bg-red-500 my-1' onClick={() => { handleDeleteClick(val.id) }}><MdDelete /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : <h2 className='text-right'>ไม่พบข้อมูลรายการใช้บัตรเครดิต</h2>
                        }

                    </tbody>
                </table>
                <div className="flex justify-end items-center mt-4 gap-2 bg-gray-200 h-10 text-lg text-gray-600  ">
                    <button className="px-3 py-1 rounded border" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}> <FaAngleLeft className='w-[25px] h-[25px]' /></button>
                    <span>หน้า {currentPage} / {totalPages}</span>
                    <button className="px-3 py-1 rounded border" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} > <FaAngleRight className='w-[25px] h-[25px]' /></button>
                </div>
                {showConfirm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-8 w-96">
                            <div className="mb-6 text-lg text-gray-700 text-center">ต้องการลบข้อมูลหรือไม่ ?</div>
                            <div className="flex justify-center gap-4">
                                <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600" onClick={confirmDelete} >ตกลง</button>
                                <button className="border border-red-500 text-red-500 px-6 py-2 rounded bg-transparent hover:bg-red-50" onClick={cancelDelete} type="button" >ยกเลิก</button>
                            </div>
                        </div>
                    </div>
                )}
                {showEdit && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-8 w-96">
                            <div className="mb-6 text-lg text-gray-700 text-center">แก้ไขรายการ</div>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-gray-600 text-left mb-1">ชื่อรายการค่าใช้จ่าย</label>
                                    <input
                                        type="text"
                                        name="c_name"
                                        value={editData.c_name}
                                        onChange={handleEditChange}
                                        className="border border-gray-300 rounded w-full p-2 focus:outline-none"
                                    />
                                </div>
                                <div className='flex flex-row gap-4'>
                                    <div className='w-1/2'>
                                        <label className="block text-gray-600 text-left mb-1">จำนวนเงิน</label>
                                        <input
                                            type="number"
                                            name="f_amount"
                                            value={editData.f_amount}
                                            onChange={handleEditChange}
                                            className="border border-gray-300 rounded w-full p-2 focus:outline-none text-right"
                                        />
                                    </div>
                                    <div className='w-1/2'>
                                        <label className="block text-gray-600 text-left mb-1">วันที่ใช้จ่าย</label>
                                        <input
                                            type="date"
                                            name="d_doc_date"
                                            value={editData.d_doc_date}
                                            onChange={handleEditChange}
                                            className="border border-gray-300 rounded w-full p-2 focus:outline-none"
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="flex justify-center gap-4 mt-6">
                                <button
                                    className="bg-green-500 text-white px-6 py-2 rounded  hover:bg-green-600"
                                    onClick={handleSaveEdit}
                                >บันทึก</button>
                                <button
                                    className="border border-red-500 text-red-500 px-6 py-2 rounded bg-transparent hover:bg-red-50"
                                    onClick={handleCancelEdit}
                                    type="button"
                                >ยกเลิก</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Use_Credit_Card
