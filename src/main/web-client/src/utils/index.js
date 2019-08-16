export const withLeadingZero = time => {
    if (time === '' || time === undefined || isNaN(time)) {
        return '';
    }
    return time.toString().length === 2 ? time : "0" + time;
};

export const negativeToZero = num => {
    return num < 0 ? 0 : num;
};
