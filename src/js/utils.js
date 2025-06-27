import dayjs from 'dayjs';

export function getBillingCycle(dateStr) {
    const date = dayjs(dateStr);
    const year = date.year();
    const month = date.date() <= 25 ? date.month() : date.month() + 1;

    const cycleEnd = dayjs(`${year}-${month + 1}-25`);
    const cycleStart = cycleEnd.subtract(1, 'month').add(1, 'day');

    return {
        start: cycleStart.format('YYYY-MM-DD'),
        end: cycleEnd.format('YYYY-MM-DD'),
        label: `${cycleStart.format('DD MMM')} - ${cycleEnd.format('DD MMM')}`,
    };
}

export function groupByBillingCycle(transactions) {
    const grouped = {};

    transactions.forEach((tx) => {
        const cycle = getBillingCycle(tx.date);
        const key = cycle.label;

        if (!grouped[key]) grouped[key] = [];

        grouped[key].push(tx);
    });

    return grouped;
}
