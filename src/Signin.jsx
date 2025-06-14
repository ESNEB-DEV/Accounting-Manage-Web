import React, { useState } from 'react';
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Username: ${username}\nPassword: ${password}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-Sarabun">
      <div className="bg-white p-8 rounded shadow-md w-[450px]">
        <h1 className="text-2xl font-bold text-center">เข้าสู่ระบบ</h1>
        <h3 className='text-center text-sm mb-6 text-gray-500'>กรุณาเข้าสู่ระบบเพื่อใช้งาน</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-gray-500">ชื่อผู้ใช้</label>
            <div className='relative'>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaUser />
              </span>
              <input
                type="text"
                className="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none"
                placeholder="กรอกชื่อผู้ใช้"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>

          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 text-gray-500 ">รหัสผ่าน</label>
            <div className='relative'>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg pl-10 focus:outline-none"
                placeholder="กรอกรหัสผ่าน"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required />
            </div>
          </div>
          <button type="submit"
            className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 flex items-center justify-center gap-2">
            <FaSignInAlt />เข้าสู่ระบบ
          </button>

        </form>
      </div>
    </div>
  );
}

export default SignIn;