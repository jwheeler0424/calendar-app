import moment from 'moment';

const getRoundedMinute = () => {
    let minute = moment().minute();
    minute = Math.ceil(minute / 5) * 5;
    if(minute === 60) {
        minute = 0;
    }
    return minute;
}

export { getRoundedMinute as default };