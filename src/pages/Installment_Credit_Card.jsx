import { useEffect, useState } from 'react'
import Drawer from '../components/Drawer'
import config from '../config';
import date from '../date.js';
import axios from 'axios';
import { FaTable, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

function Installment_Credit_Card() {

    const [items, setItems] = useState([]);
    const [c_name, setC_name] = useState("");
    const [f_amount, setF_amount] = useState("");
    const [c_preriod, setC_Preriod] = useState("3");
    const [d_doc_date, setD_doc_date] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });
    const [active, setActive] = useState(1);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [editData, setEditData] = useState({
        active: 1
    });


    const getInstallment = async () => {
        const response = await axios.get(`${config.API_URL}/bg_installment`);
        setItems(response.data)
    }

    useEffect(() => {
        getInstallment();
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

        axios.post(`${config.API_URL}/bg_installment_create`, {
            c_name: c_name,
            f_amount: f_amount,
            c_preriod: c_preriod,
            d_doc_date: d_doc_date,
            active: active
        }).then((response) => {
            const newItem = response.data.bg_installment_id;
            setItems([{
                bg_installment_id: newItem,
                c_name: c_name,
                f_amount: f_amount,
                c_preriod: c_preriod,
                d_doc_date: d_doc_date,
                active: active
            }, ...items]);

        })
        setC_name('');
        setF_amount('');
        setC_Preriod(3);
    }

    const handleEditClick = (item) => {
        setEditData({
            active: item.active,
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


    const handleDeleteClick = (bg_installment_id) => {
        setDeleteId(bg_installment_id);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        axios.delete(`${config.API_URL}/bg_installment_delete/${deleteId}`)
            .then(() => {
                setItems(items.filter((val) => val.bg_installment_id !== deleteId));
                setShowConfirm(false);
                setDeleteId(null);
            })
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setDeleteId(null);
    };

    const handleCancelEdit = () => {
        setShowEdit(false);
    };

    const handleSaveEdit = () => {
        axios.put(`${config.API_URL}/bg_credit_update/${editData.bg_credit_id}`, {
            c_name: editData.c_name,
            f_amount: editData.f_amount,
            d_doc_date: editData.d_doc_date
        }).then(() => {
            setOrderCreditCard(OrderCreditCard.map(item =>
                item.bg_credit_id === editData.bg_credit_id
                    ? { ...item, ...editData }
                    : item
            ));
            setShowEdit(false);
        });
    };

    const Android12Switch = styled(Switch)(({ theme }) => ({
        padding: 8,
        '& .MuiSwitch-track': {
            borderRadius: 22 / 2,
            '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 16,
                height: 16,
            },
            '&::before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    theme.palette.getContrastText(theme.palette.primary.main),
                )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
                left: 12,
            },
            '&::after': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    theme.palette.getContrastText(theme.palette.primary.main),
                )}" d="M19,13H5V11H19V13Z" /></svg>')`,
                right: 12,
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: 'none',
            width: 16,
            height: 16,
            margin: 2,
        },
    }));

    return (
        <div>
            <Drawer />
            <div className="w-full font-NotoSansThai text-sm text-gray-600">
                <h1 className='flex items-center text-lg pl-10 text-white text-left h-14 bg-gray-400'>
                    <FaTable className='mr-3 w-[20px] h-[20px]' />บันทึกรายการผ่อนชำระบัตรเคดิต</h1>
                <form className='my-2 px-10 py-5 bg-gray-100 flex items-center sm:flex-col md:flex-col lg:flex-row h-44'>
                    <div className='w-1/2'>
                        <label>เพิ่มรายการ</label>
                        <div className='border border-solid border-gray-300 p-2 mr-10'>
                            <div className='mb-2'>
                                <label className='ml-3'>รายการ: </label>
                                <input type='text'
                                    value={c_name}
                                    onChange={(e) => { setC_name(e.target.value) }}
                                    placeholder='กรุณากรอกชื่อรายการ'
                                    className='ml-2 border border-gray-300 rounded w-80 p-2 mr-5 focus:outline-none h-7' />
                                <label>จำนวนเงิน: </label>
                                <input type='number'
                                    value={f_amount}
                                    onChange={(e) => { setF_amount(e.target.value) }}
                                    className='border border-gray-300 rounded text-right w-20 p-2 mr-2 focus:outline-none h-7'
                                    placeholder='0' />
                            </div>
                            <div>
                                <label>จำนวนงวด: </label>
                                <select className='w-20 text-center border border-gray-300 rounded mr-5'
                                    value={c_preriod}
                                    onChange={(e) => { setC_Preriod(e.target.value) }}
                                >
                                    <option value="3">3</option>
                                    <option value="6">6</option>
                                    <option value="10">10</option>
                                </select>
                                <label>วันที่: </label>
                                <input type="date"
                                    value={d_doc_date}
                                    onChange={(e) => { setD_doc_date(e.target.value) }}
                                    className='border border-gray-300 rounded w-50 p-2 mr-5 focus:outline-none h-7' />
                                <input type="checkbox"
                                    value={1}
                                    checked={active === 1}
                                    onChange={() => setActive(1)}
                                    className='mr-2'
                                    disabled />
                                <label>Active</label>
                            </div>
                            <div className='mr-15 mt-1 p-2'>
                                <button className='bg-gray-600 text-white w-36 px-4 py-2 rounded hover:bg-gray-500 h-8 flex justify-center items-center' onClick={addItems}>
                                    เพิ่มรายการใหม่
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="fixed-table-body w-[90rem] mx-auto">
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-gray-400 h-12 text-lg text-white text-base'>
                                <th className='w-[40rem]'>รายการ</th>
                                <th>จำนวนเงิน</th>
                                <th>จำนวนงวด</th>
                                <th>สถานะการผ่อน</th>
                                <th>งวดละ/บาท</th>
                                <th>วันที่</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        <tbody className='border border-2'>
                            {items.length > 0 ? (
                                items.map((val) => (
                                    <tr key={val.bg_installment_id} className='hover:bg-gray-200'>
                                        <td className='w-[40rem]'><div className='pl-10'>{val.c_name}</div></td>
                                        <td><div className='text-right pr-5'>{Number(val.f_amount).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })} บาท</div></td>
                                        <td><div className='text-center'>{val.c_preriod}</div></td>
                                        <td>
                                            <div className={`text-center ${val.active === 0 ? 'text-gray-300' : 'text-green-600'}`}>
                                                {val.active === 0 ? 'ผ่อนครบแล้ว' : 'อยู่ในช่วงผ่อนชำระ'}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='text-right pr-5'>
                                                {val.c_preriod && Number(val.c_preriod) > 0
                                                    ? Number(val.f_amount / val.c_preriod).toLocaleString(undefined, {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    }) : '-'} บาท
                                            </div>
                                        </td>
                                        <td><div className='text-right pr-5'>{date.formatThaiDate(val.d_doc_date)}</div></td>
                                        <td>
                                            <div className='flex justify-center '>
                                                <button className=' text-white px-4 py-2 rounded bg-green-400 hover:bg-green-500 my-1 mr-4'
                                                    onClick={() => handleEditClick(val)}
                                                ><FaEdit /></button>
                                                <button className='text-white px-4 py-2 rounded bg-red-600 hover:bg-red-500 my-1' onClick={() => { handleDeleteClick(val.bg_installment_id) }}><MdDelete /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center text-gray-500 py-4">
                                        ไม่พบข้อมูลรายการ
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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
                {showEdit && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-8 w-96">
                            <div className="mb-6 text-lg text-gray-700 text-center">แก้ไขรายการ</div>
                            <div className="flex flex-col gap-4">
                                <div className='text-center'>
                                    <FormControlLabel
                                        control={<Android12Switch />}
                                        label="ปิดการผ่อนชำระ"
                                    />
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
                )}

            </div>
        </div>
    )
}

export default Installment_Credit_Card
