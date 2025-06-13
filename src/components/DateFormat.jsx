import React from 'react'

function DateFormat() {
    return (
        // ฟังก์ชันแปลงวันที่เป็นรูปแบบ "วันที่ เดือน ปี พ.ศ."
        function formatThaiDate(dateString) {
            if (!dateString) return "";
            const months = [
                "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
                "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
            ];
            const date = new Date(dateString);
            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear() + 543;
            return `${day} ${month} ${year}`;
        }
    )
}

export default DateFormat
