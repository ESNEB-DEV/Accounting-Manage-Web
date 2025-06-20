import { useEffect, useState } from 'react'
import Drawer from '../components/Drawer'
import config from '../config';
import date from '../date.js';
import axios from 'axios';
import { FaTable, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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
            const newItem = response.data.bg_daily_id;
            setItems([{
                bg_daily_id: newItem,
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
                                    className='mr-2' />
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
                        <tbody>
                            {items && items.length > 0 ? (
                                items.map((val) => (
                                    <tr key={val.bg_installment_id} className='hover:bg-gray-200'>
                                        <td className='w-[40rem]'><div className='pl-10'>{val.c_name}</div></td>
                                        <td><div className='text-right pr-5'>{Number(val.f_amount).toLocaleString()} บาท</div></td>
                                        <td><div className='text-center'>{val.c_preriod}</div></td>
                                        <td><div className='text-center'>{val.active}</div></td>
                                        <td></td>
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

            </div>
        </div>
    )
}

export default Installment_Credit_Card
