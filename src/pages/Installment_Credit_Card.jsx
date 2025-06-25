import { useEffect, useState } from 'react'
import Drawer from '../components/Drawer'
import config from '../config';
import date from '../date.js';
import axios from 'axios';
import { FaTable, FaEdit, FaAngleLeft, FaAngleRight } from "react-icons/fa";
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
    const [i_active, setI_active] = useState(1);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [editData, setEditData] = useState({
        bg_installment_id: null,
        i_active: 0
    });
    const [countAct, setCountAct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);


    const sumActMonth = items
        .filter(item => item.i_active === 1) //เลือกเฉพาะรายการที่ i_active มีค่าเท่ากับ 1 (แปลว่าใช้งานอยู่)
        .reduce((sum, item) => {  //reduce((sum, item) => { ... }, 0) รวมค่าทั้งหมดโดยเริ่มต้นที่ 0
            const perMonth = Number(item.f_amount) / Number(item.c_preriod || 1); // แปลง f_amount เป็นตัวเลข แล้วหารด้วย c_preriod (จำนวนงวด)  ถ้า c_preriod ไม่มีค่า จะใช้ 1 เพื่อป้องกันหารด้วยศูนย์
            return sum + perMonth;  // บวกยอดรายเดือนของแต่ละรายการเข้ากับผลรวม
        }, 0);

    const getInstallment = async () => {
        const response = await axios.get(`${config.API_URL}/bg_installment`);
        setItems(response.data)
    }

    const getCountAct = async () => {
        axios.get(`${config.API_URL}/bg_installment_contAct`)
            .then((response) => {
                setCountAct(response.data);
            })
    }

    useEffect(() => {
        getInstallment();
        getCountAct();
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
            i_active: i_active
        }).then((response) => {
            const newId = response.data.bg_installment_id;
            setItems([{
                bg_installment_id: newId,
                c_name: c_name,
                f_amount: f_amount,
                c_preriod: c_preriod,
                d_doc_date: d_doc_date,
                i_active: i_active
            }, ...items]);

        })
        setC_name('');
        setF_amount('');
        setC_Preriod(3);
    }

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
                getCountAct();
            })
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setDeleteId(null);
    };

    const handleEditClick = (item) => {
        setEditData({
            bg_installment_id: item.bg_installment_id,
            i_active: item.i_active,
        });
        setShowEdit(true);
    };
    const handleCancelEdit = () => {
        setShowEdit(false);
    };

    const handleSaveEdit = () => {
        axios.put(`${config.API_URL}/bg_installment_update/${editData.bg_installment_id}`, {
            i_active: editData.i_active
        }).then(() => {
            setItems(items.map(item =>
                item.bg_installment_id === editData.bg_installment_id
                    ? { ...item, ...editData }
                    : item
            ));
            setShowEdit(false);
            getCountAct();
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
                                    checked={i_active === 1}
                                    onChange={() => setI_active(1)}
                                    className='mr-2'
                                    disabled />
                                <label>เริ่มการผ่อนชำระ</label>
                            </div>
                            <div className='mr-15 mt-1 p-2'>
                                <button className='bg-gray-600 text-white w-36 px-4 py-2 rounded hover:bg-gray-500 h-8 flex justify-center items-center' onClick={addItems}>
                                    เพิ่มรายการใหม่
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <p>สรุปยอดการผ่อนชำระ</p>
                        <div className='border border-solid border-gray-300 p-2 pl-4 h-32'>
                            <div className='flex items-center'>
                                <p className='mr-2'>จำนวนรายการผ่อน</p>
                                {countAct.map((val, idx) => (
                                    <p key={idx} className='mr-2 font-bold'>{Number(val.CountAct).toLocaleString()}</p>
                                ))}รายการ
                            </div>
                            <div className='flex items-center mt-2'>
                                <p className='mr-2'>ยอดรวม ต่อเดือน</p>
                                <p className='mr-2 font-bold text-blue-500'>
                                    {sumActMonth.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </p>บาท
                            </div>
                        </div>
                    </div>
                </form>
                <div className='mx-10'>
                    <label>รายการผ่อนชำระบัตรเคดิต</label>
                </div>
                <table className='fixed-table-body w-[90rem] mx-auto border border-solid border-gray-300 '>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='border border-gray-300 p-2 w-20'>ลำดับ</th>
                            <th className='border border-gray-300 p-2'>รายการ</th>
                            <th className='border border-gray-300 p-2'>จำนวนเงิน</th>
                            <th className='border border-gray-300 p-2'>จำนวนงวด</th>
                            <th className='border border-gray-300 p-2'>สถานะการผ่อน</th>
                            <th className='border border-gray-300 p-2'>งวดละ/บาท</th>
                            <th className='border border-gray-300 p-2'>วันที่</th>
                            <th className='border border-gray-300 p-2'>-</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? (
                            currentItems.map((val, idx) => {

                                const order = indexOfFirstItem + idx + 1;

                                return (
                                    <tr key={val.bg_installment_id} className='hover:bg-gray-200'>
                                        <td className='text-center w-20'>{order}</td>
                                        <td className='w-[190px]'>
                                            <div>{val.c_name}
                                            </div>
                                        </td>
                                        <td><div className='text-right pr-5'>{Number(val.f_amount).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })} บาท</div></td>
                                        <td>
                                            <div className='text-center'>{val.c_preriod}
                                            </div>
                                        </td>
                                        <td>
                                            <div className={`text-center ${val.i_active === 0 ? 'text-gray-500' : 'text-green-600'}`}>
                                                {val.i_active === 0 ? 'ผ่อนครบแล้ว' : 'อยู่ในช่วงผ่อนชำระ'}
                                            </div>
                                        </td>
                                        <td>
                                            <div className={`text-right ${val.i_active === 0 ? 'text-gray-500' : 'text-blue-600'}`}>
                                                {val.c_preriod && Number(val.c_preriod) > 0
                                                    ? Number(val.f_amount / val.c_preriod).toLocaleString(undefined, {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    }) : '-'} บาท
                                            </div>
                                        </td>
                                        <td><div className='text-right'>{date.formatThaiDate(val.d_doc_date)}</div></td>
                                        <td>
                                            <div className='flex justify-center '>
                                                <button className=' text-white px-4 py-1 rounded bg-green-400 hover:bg-green-500 my-1 mr-4'
                                                    onClick={() => handleEditClick(val)}
                                                ><FaEdit /></button>
                                                <button className='text-white px-4 py-1 rounded bg-red-600 hover:bg-red-500 my-1' onClick={() => { handleDeleteClick(val.bg_installment_id) }}><MdDelete /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center text-gray-500 py-4">
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
                                        control={<Android12Switch
                                            checked={editData.i_active === 0}
                                            onChange={(_, checked) => setEditData(ed => ({
                                                ...ed,
                                                i_active: checked ? 0 : 1 // checked=ปิด=0, ไม่checked=เปิด=1
                                            }))}
                                        />}
                                        label={editData.i_active === 0 ? "ปิดสถานะการผ่อนชำระ" : "เปิดสถานะการผ่อนชำระ"}
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
