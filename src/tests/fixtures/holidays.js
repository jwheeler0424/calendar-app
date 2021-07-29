const holidays = [{
    name: "New Year's Day",
    month: 1,
    date:1,
    display: true
}, {
    name: "Martin Luther King Jr. Day",
    month: 1,
    date: { n: 3, day: 'Monday'}, // 3rd Monday in January
    display: true
}, {
    name: "Valentine's Day",
    month: 2,
    date: 14,
    display: true
}, {
    name: "President's Day",
    month: 2,
    date: { n: 3, day: 'Monday'}, // 3rd Monday in February
    display: true
}, {
    name: "St. Patrick's Day",
    month: 3,
    date: 17,
    display: true
}, {
    name: "Cinco de Mayo",
    month: 5,
    date: 5,
    display: true
}, {
    name: "Mother's Day",
    month: 5,
    date: { n: 2, day: 'Sunday'}, // 2nd Sunday in May
    display: true
}, {
    name: "Memorial Day",
    month: 5,
    date: { n: 0, day: 'Monday'}, // Last Monday in May
    display: true
}, {
    name: "Juneteenth",
    month: 6,
    date: 19,
    display: true
}, {
    name: "Father's Day",
    month: 6,
    date: { n: 3, day: 'Sunday'}, // 3rd Sunday in June
    display: true
}, {
    name: "Independence Day",
    month: 7,
    date:4,
    display: true
}, {
    name: "Labor Day",
    month: 9,
    date: { n: 1, day: 'Monday'}, // 1st Monday in September
    display: true
}, {
    name: "US Indigenous People's Day",
    month: 10,
    date: { n: 2, day: 'Monday'}, // 2nd Monday in October
    display: true
}, {
    name: "Halloween",
    month: 10,
    date: 31,
    display: true
}, {
    name: "Veteran's Day",
    month: 11,
    date:11,
    display: true
}, {
    name: "Thanksgiving",
    month: 11,
    date: { n: 4, day: 'Thursday'}, // 4th Thursday in November
    display: true
}, {
    name: "Christmas Eve",
    month: 12,
    date:24,
    display: true
}, {
    name: "Christmas Day",
    month: 12,
    date:25,
    display: true
}, {
    name: "New Year's Eve",
    month: 12,
    date:31,
    display: true
}];

export { holidays as default };