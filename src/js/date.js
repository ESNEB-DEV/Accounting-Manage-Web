
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
        start = new Date(year, month, 27);
        end = new Date(year, month + 1, 26);
    } else {
        // รอบนี้เดือนนี้
        start = new Date(year, month - 1, 26);
        end = new Date(year, month, 25);
    }
    // คืนค่าเป็น yyyy-mm-dd
    return {
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0]
    };
}

export default {
    CurrentDateDisplay,
    formatThaiDate,
    formatInputDate,
    getCurrentBillingPeriod
};
