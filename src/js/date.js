import dayjs from 'dayjs';

function CurrentDateDisplay() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const year = today.getFullYear();

    return `${month}/${date}/${year}`;

}

function formatThaiDate(dateString) {
    if (!dateString) return "";
    // const months = [
    //     "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    //     "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    // ];
    const months = [
        "ม.ค.", "ก.พ.", "ม.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
        "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear() + 543;
    return `${day} ${month} ${year}`;
}

function formatInputDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getCurrentBillingPeriod(today = new Date()) {
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();

    let start, end;
    if (date >= 26) {
        // รอบเดือนถัดไป
        start = new Date(year, month, 26);
        end = new Date(year, month + 1, 26);
    } else {
        // รอบนี้เดือนนี้
        start = new Date(year, month - 1, 25);
        end = new Date(year, month, 25);
    }
    // คืนค่าเป็น yyyy-mm-dd
    return {
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0]
    };
}

function getCurrentDateTimeTH() {
    const now = new Date();
    now.setHours(now.getHours() + 7); // เพิ่ม 7 ชั่วโมงเป็นเวลาไทย
    return now.toISOString().slice(0, 19).replace('T', ' ');
}

function getInstallmentProgress(startDate, totalInstallments) {
    let start = dayjs(startDate).startOf('day');
    const today = dayjs().startOf('day');

    // ✅ ถ้า startDate กับวันนี้อยู่เดือนเดียวกัน → เริ่มงวดจาก "เดือนถัดไป"
    if (start.month() === today.month() && start.year() === today.year()) {
        start = start.add(1, 'month').startOf('month');
    }

    let monthsDiff = today.diff(start, 'month');

    // ✅ ถ้ายังไม่ถึงวันที่ 1 ของรอบเดือนนั้น ๆ → ยังไม่ถึงงวด
    if (today.date() < start.date()) {
        monthsDiff--;
    }

    const paid = Math.min(Math.max(monthsDiff + 1, 0), totalInstallments);
    return { paid, total: totalInstallments };
}

export default {
    CurrentDateDisplay,
    formatThaiDate,
    formatInputDate,
    getCurrentBillingPeriod,
    getCurrentDateTimeTH,
    getInstallmentProgress
};
