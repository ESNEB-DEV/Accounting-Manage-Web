import { useEffect, useState } from 'react'
import config from '../js/config.js';
import date from '../js/date.js';
import axios from 'axios';
import { FaTable, FaEdit, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Footer from '../components/Footer'
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Per_Drawer from '../components/Per_Drawer.jsx';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

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
    const [sumperMonth, setSumPerMonth] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const getInstallment = async () => {
        const response = await axios.get(`${config.API_URL}/bg_installment`);
        setItems(response.data)
    }

    const getSumItems = async () => {
        axios.get(`${config.API_URL}/bg_installment_sumItems`)
            .then((response) => {
                setCountAct(response.data);
                setSumPerMonth(response.data);
            })
    }

    useEffect(() => {
        getInstallment();
        getSumItems();
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

            getSumItems();
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
                getSumItems();
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
            i_active: editData.i_active,
            t_update_dt: date.getCurrentDateTimeTH()
        }).then(() => {
            setItems(items.map(item =>
                item.bg_installment_id === editData.bg_installment_id
                    ? { ...item, ...editData }
                    : item
            ));
            setShowEdit(false);
            getSumItems();
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
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Per_Drawer />
            <Box component="main">
                <Toolbar />
                <div className="font-NotoSansThai text-sm text-gray-600">
                    <h1 className='flex items-center text-lg pl-10 text-white text-left h-14 bg-gray-400'>
                        <FaTable className='mr-3 w-[20px] h-[20px]' />บันทึกรายการผ่อนชำระบัตรเคดิต</h1>
                    <form className='my-2 px-10 py-5 bg-gray-100 flex items-center sm:flex-col md:flex-col lg:flex-row h-44'>
                        <div className='w-2/3'>
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
                                        hidden="hidden"
                                        value={1}
                                        checked={i_active === 1}
                                        onChange={() => setI_active(1)}
                                        className='mr-2'
                                        disabled />
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
                                    <p className='font-bold text-blue-500'>
                                        {sumperMonth.map((val, idx) => (
                                            <span key={idx} className='mr-2 font-bold'>{Number(val.sumPerMonth).toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}</span>
                                        ))}
                                    </p>บาท
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className='mx-10'>
                        <label>รายการผ่อนชำระบัตรเคดิต</label>
                    </div>
                    <table className='fixed-table-body border border-solid border-gray-300 mx-10'>
                        <thead>
                            <tr className='bg-gray-200'>
                                <th className='border border-gray-300 p-2 w-20'>ลำดับ</th>
                                <th className='border border-gray-300 p-2 w-52'>รายการ</th>
                                <th className='border border-gray-300 p-2'>จำนวนเงิน</th>
                                <th className='border border-gray-300 p-2'>จำนวนงวด</th>
                                <th className='border border-gray-300 p-2'>งวดชำระปัจจุบัน</th>
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

                                    const startDate = val.d_doc_date;
                                    const totalInstallments = val.c_preriod;
                                    const { paid, total } = date.getInstallmentProgress(startDate, totalInstallments);
                                    const progress = (paid / total) * 100;

                                    return (
                                        <tr key={val.bg_installment_id} className='hover:bg-gray-200'>
                                            <td className='text-center w-20'>{order}</td>
                                            <td className='w-[200px] pl-2'>
                                                <div>{val.c_name}</div>
                                            </td>
                                            <td>
                                                <div className='text-right'>
                                                    {Number(val.f_amount).toLocaleString(undefined, {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    })} บาท
                                                </div>
                                            </td>
                                            <td>
                                                <div className='text-center'>{val.c_preriod}</div>
                                            </td>
                                            <td>
                                                <Box sx={{ display: 'flex', alignItems: 'center', width: 300 }}>
                                                    <Box sx={{ width: '70px', mx: 1 }}>
                                                        <LinearProgress variant="determinate" value={progress} sx={{ borderRadius: 4 }} />
                                                    </Box>
                                                    <Box sx={{ minWidth: 100 }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {`${paid} / ${total}`}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </td>
                                            <td>
                                                <div className={`text-center ${val.i_active === 0 ? 'text-gray-500 bg-gray-200 rounded' : 'text-green-600 bg-green-200 rounded'}`}>
                                                    {val.i_active === 0 ? 'ปิดการผ่อนชำระ' : 'ใช้งานอยู่'}
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
                                            <td>
                                                <div className='text-right'>{date.formatThaiDate(val.d_doc_date)}</div>
                                            </td>
                                            <td>
                                                <div className='flex justify-center '>
                                                    <FaEdit className='text-blue-500 hover:text-blue-700 mx-2 w-5 h-5 m-2 cursor-pointer' onClick={() => handleEditClick(val)} />
                                                    <MdDelete className='text-red-500 hover:text-red-700 mx-2 w-5 h-5 m-2 cursor-pointer' onClick={() => { handleDeleteClick(val.bg_installment_id) }} />
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
            </Box>
        </Box>
    )
}

export default Installment_Credit_Card
