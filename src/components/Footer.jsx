import React from 'react'

function Footer() {
    return (
        <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
            <div className='text-center font-NotoSansThai text-gray-600 text-sm h-4'>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by BXNSE-Dev</p>
            </div>
        </footer>
    )
}

export default Footer
