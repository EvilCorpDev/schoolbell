export const BASE_64_PREFIX = 'base64,';

export const PAGES = {
    schedulePage: 'schedulePage',
    exceptionsPage: 'exceptionsPage'
};

export const getBase64 = (file, callback) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        if (callback) {
            callback(reader.result)
        }
    };
    reader.onerror = function (error) {
        console.log('Error reading file: ', error);
    };
};

export const withLeadingZero = time => {
    if (time === '' || time === undefined || isNaN(time)) {
        return '';
    }
    return time.toString().length === 2 ? time : "0" + time;
};

export const negativeToZero = num => {
    return num < 0 ? 0 : num;
};
