import moment from 'moment';

const getNthDayOfMonth = (n, d, m, y) => {
    let date, isoDay;
    const daysInMonth = moment().month(m).year(y).daysInMonth();
    
    switch (d.toLowerCase()) {
        case 'monday':
            isoDay = 1 + n * 7;
            break;
        case 'tuesday':
            isoDay = 2 + n * 7;
            break;
        case 'wednesday':
            isoDay = 3 + n * 7;
            break;
        case 'thursday':
            isoDay = 4 + n * 7;
            break;
        case 'friday':
            isoDay = 5 + n * 7;
            break;
        case 'saturday':
            isoDay = 6 + n * 7;
            break;
        case 'sunday':
            isoDay = 0 + n * 7;
            break;
        default:
            throw new Error('Must enter a the full named day of week.');
    }

    if (isoDay > daysInMonth) { isoDay -= 7};

    if(n !== 0)  {
        if(moment().month(m).year(y).startOf('month').day(1).date() === 1 && d === 'Monday') {
            date = moment().month(m).year(y).startOf('month').isoWeekday(isoDay - 7).date()
        } else {
            date = moment().month(m).year(y).startOf('month').isoWeekday(isoDay).date()
        }
    } else {
        date = moment().month(m).year(y).endOf('month').isoWeekday(isoDay).date()
    }
    
    return date;
}

export { getNthDayOfMonth as default };