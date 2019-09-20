export const BASE_64_PREFIX = 'base64,';
export const WEEK_DAY_ID_PREFIX = 'weekDay';
export const EXCEPTION_ITEM_PREFIX = 'exceptionItem';
export const USERNAME = 'username';
export const PASSWORD = 'password';
export const ROLE = 'role';
export const ALL_PROFILES = 'Всі профілі';

export const PAGES = {
    schedulePage: 'schedulePage',
    exceptionsPage: 'exceptionsPage',
    usersPage: 'usersPage',
    notFoundPage: 'notFoundPage'
};

export const JUMBOTRON_INFO = {
    schedulePage: {
        header: 'Розклад дзвінків',
        description: 'Тут можна налаштувати розклад дзвінків, вибрати аудіо файл і встановити його тривалість'
    },
    exceptionsPage: {
        header: 'Виняткові дні',
        description: 'Тут можна налаштувати дні, коли розклад не працюватиме'
    },
    usersPage: {
        header: 'Налаштування користувачів',
        description: 'Тут можна налаштувати користувачів'
    }
};

export const ALERTS_PARAMS = {
    position: 'top',
    effect: 'stackslide',
    timeout: 2000
};

export const getPageName = pathName => {
    switch (pathName) {
        case '/':
            return PAGES.schedulePage;
        case '/exceptions':
            return PAGES.exceptionsPage;
        case '/users-settings':
            return PAGES.usersPage;
        default:
            return PAGES.notFoundPage;
    }
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
