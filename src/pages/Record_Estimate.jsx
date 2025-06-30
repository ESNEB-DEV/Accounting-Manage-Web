import { useState, useEffect } from 'react'
import Drawer from '../components/Drawer.jsx'
import { FaRegChartBar, FaAngleLeft, FaAngleRight, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import date from '../js/date.js';
import axios from 'axios';
import config from '../js/config.js';

function Record_Estimate() {

    const [items, setItems] = useState([]);
    const [c_name, setC_name] = useState('');
    const [f_amount, setF_amount] = useState('');
    const [sum_amount, setSum_amount] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const [showEdit, setShowEdit] = useState(false);
    const [editData, setEditData] = useState({
        bg_estimate_id: null,
        c_name: "",
        f_amount: 0,
    });


    const getEstimate = async () => {
        const response = await axios.get(`${config.API_URL}/bg_estimate`);
        setItems(response.data);
    }

    const getSumAmount = async () => {
        axios.get(`${config.API_URL}/bg_estimate_sum`)
            .then((response) => {
                setSum_amount(response.data);
            });
    }

    useEffect(() => {
        getEstimate();
        getSumAmount();
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

        axios.post(`${config.API_URL}/bg_estimate_create`, {
            c_name: c_name,
            f_amount: f_amount,
        }).then((response) => {
            const newItem = response.data.bg_estimate_id;
            setItems([...items,
            {
                bg_estimate_id: newItem,
                c_name: c_name,
                f_amount: f_amount,
            }]);
            getSumAmount();
        })
        setC_name('');
        setF_amount('');
    }

    const handleDeleteClick = (bg_estimate_id) => {
        setDeleteId(bg_estimate_id);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        axios.delete(`${config.API_URL}/bg_estimate_delete/${deleteId}`)
            .then(() => {
                setItems(items.filter((val) => val.bg_estimate_id !== deleteId));
                setShowConfirm(false);
                setDeleteId(null);
                getSumAmount();
            })
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setDeleteId(null);
    };

    const handleEditClick = (item) => {
        setEditData({
            bg_estimate_id: item.bg_estimate_id,
            c_name: item.c_name,
            f_amount: item.f_amount,
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
        axios.put(`${config.API_URL}/bg_estimate_update/${editData.bg_estimate_id}`, {
            c_name: editData.c_name,
            f_amount: editData.f_amount,
            t_update_dt: date.getCurrentDateTimeTH()
        }).then(() => {
            setItems(items.map(item =>
                item.bg_estimate_id === editData.bg_estimate_id
                    ? { ...item, ...editData }
                    : item
            ));
            setShowEdit(false);
            getSumAmount();
        });
    };

    const handleCancelEdit = () => {
        setShowEdit(false);
    };


    return (

        <div>
            <Drawer />
            <div className="w-full font-NotoSansThai text-sm text-gray-600">
                <h1 className='flex items-center text-lg pl-10 text-white text-left h-14 bg-gray-400'>
                    <FaRegChartBar className='mr-3 w-[20px] h-[20px]' />บันทึกประมาณการค่าใช้จ่าย</h1>
                <form className='my-2 px-10 py-5 bg-gray-100 flex items-center sm:flex-col md:flex-col lg:flex-row h-40'>
                    <div className='w-1/2'>
                        <label>เพิ่มรายการ</label>
                        <div className='border border-solid border-gray-300 p-2 mr-10'>
                            <div>
                                <label className='ml-3'>ชื่อประมาณการค่าใช้จ่าย: </label>
                                <input type='text'
                                    value={c_name}
                                    onChange={(e) => { setC_name(e.target.value) }}
                                    placeholder='กรุณากรอกชื่อประมาณการค่าใช้จ่าย'
                                    className='ml-2 border border-gray-300 rounded w-80 p-2 mr-5 focus:outline-none h-7' />
                            </div>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <label className='ml-3 mr-2'>จำนวนเงิน: </label>
                                    <input type='number'
                                        value={f_amount}
                                        onChange={(e) => { setF_amount(e.target.value) }}
                                        placeholder='0'
                                        className='border border-gray-300 rounded text-right w-20 p-2 focus:outline-none h-7' />
                                </div>
                                <div className='mr-15 mt-1 p-2'>
                                    <button className='bg-gray-600 text-white w-36 px-4 py-2 rounded hover:bg-gray-500 h-8 flex justify-center items-center'
                                        onClick={addItems}>
                                        เพิ่มรายการใหม่
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <p>แสดงจำนวนเงิน</p>
                        <div className='border border-solid border-gray-300 p-2 pl-4 h-24'>
                            <h3 className='flex flex-row'>จำนวนเงินรวม :
                                {sum_amount.map((val) => {
                                    const colorOver = val.SumAmount > 26000 ? 'text-red-500' : 'text-green-500';
                                    return (
                                        <p key={val.SumAmount} className={`${colorOver} pl-2 font-bold`}>{Number(val.SumAmount).toLocaleString()} บาท</p>
                                    )
                                })}
                            </h3>
                        </div>
                    </div>
                </form>
                <div className='mx-10'>
                    <label>รายการประมาณการค่าใช้จ่าย</label>
                </div>
                <table className='fixed-table-body w-[90rem] mx-auto border border-solid border-gray-300 '>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='border border-gray-300 p-2 w-20'>ลำดับ</th>
                            <th className='border border-gray-300 p-2'>ชื่อประมาณการค่าใช้จ่าย</th>
                            <th className='border border-gray-300 p-2'>จำนวนเงิน</th>
                            <th className='border border-gray-300 p-2'>-</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? (
                            currentItems.map((val, idx) => {

                                const order = indexOfFirstItem + idx + 1;

                                return (
                                    <tr key={val.bg_estimate_id} className='hover:bg-gray-200'>
                                        <td className='text-center w-20'>{order}</td>
                                        <td className='text-left pl-5'>{val.c_name}</td>
                                        <td className='text-right pr-5'>{Number(val.f_amount).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })} บาท</td>
                                        <td className='text-center'>
                                            <button className=' text-white px-4 py-1 rounded bg-green-400 hover:bg-green-500 my-1 mr-4'
                                                onClick={() => handleEditClick(val)}>
                                                <FaEdit />
                                            </button>
                                            <button className='bg-red-500 text-white px-4 py-1 my-1 rounded hover:bg-red-400'
                                                onClick={() => { handleDeleteClick(val.bg_estimate_id) }}>
                                                <MdDelete />
                                            </button>
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
                <div className="flex justify-end items-center mt-4 gap-2 bg-gray-200 h-10 text-lg text-gray-600 text-sm">
                    <button className="px-3 py-1 rounded border" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}> <FaAngleLeft className='w-[25px] h-[25px]' /></button>
                    <span>หน้า {currentPage} / {totalPages}</span>
                    <button className="px-3 py-1 rounded border" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} > <FaAngleRight className='w-[25px] h-[25px]' /></button>
                </div>
                {
                    showConfirm && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                            <div className="bg-white rounded-lg shadow-lg p-8 w-96">
                                <div className="mb-6 text-lg text-gray-700 text-center">ต้องการลบข้อมูลหรือไม่ ?</div>
                                <div className="flex justify-center gap-4">
                                    <button className="border border-red-500 text-red-500 px-6 py-2 rounded bg-transparent hover:bg-red-50" onClick={cancelDelete} type="button" >ยกเลิก</button>
                                    <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600" onClick={confirmDelete} >ตกลง</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    showEdit && (
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
                                            className="border border-gray-300 rounded w-full p-2 focus:outline-none" />
                                    </div>
                                    <div className='flex flex-row gap-4'>
                                        <div className='w-1/2'>
                                            <label className="block text-gray-600 text-left mb-1">จำนวนเงิน</label>
                                            <input
                                                type="number"
                                                name="f_amount"
                                                value={editData.f_amount}
                                                onChange={handleEditChange}
                                                className="border border-gray-300 rounded w-full p-2 focus:outline-none text-right" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center gap-4 mt-6">
                                    <button
                                        className="border border-red-500 text-red-500 px-6 py-2 rounded bg-transparent hover:bg-red-50"
                                        onClick={handleCancelEdit}
                                        type="button">ยกเลิก
                                    </button>
                                    <button
                                        className="bg-green-500 text-white px-6 py-2 rounded  hover:bg-green-600"
                                        onClick={handleSaveEdit}>บันทึก
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div >
        </div >
    )
}

export default Record_Estimate
