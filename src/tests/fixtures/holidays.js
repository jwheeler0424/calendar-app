const holidays = [{
    id: '0',
    name: "New Year's Day",
    month: 0, // January
    date:1,
    display: true
}, {
    id: '1',
    name: "Martin Luther King Jr. Day",
    month: 0,  // January
    date: { n: 3, day: 'Monday'}, // 3rd Monday in January
    display: true
}, {
    id: '2',
    name: "Valentine's Day",
    month: 1, // February
    date: 14,
    display: true
}, {
    id: '3',
    name: "President's Day",
    month: 1, // February
    date: { n: 3, day: 'Monday'}, // 3rd Monday in February
    display: true
}, {
    id: '4',
    name: "St. Patrick's Day",
    month: 2, // March
    date: 17,
    display: true
}, {
    id: '5',
    name: "Starwars Day",
    month: 4, // May
    date: 4,
    display: true
}, {
    id: '6',
    name: "Cinco de Mayo",
    month: 4, // May
    date: 5,
    display: true
}, {
    id: '7',
    name: "Mother's Day",
    month: 4, // May
    date: { n: 2, day: 'Sunday'}, // 2nd Sunday in May
    display: true
}, {
    id: '8',
    name: "Memorial Day",
    month: 4, // May
    date: { n: 0, day: 'Monday'}, // Last Monday in May
    display: true
}, {
    id: '9',
    name: "Juneteenth",
    month: 5, // June
    date: 19,
    display: true
}, {
    id: '10',
    name: "Father's Day",
    month: 5, // June
    date: { n: 3, day: 'Sunday'}, // 3rd Sunday in June
    display: true
}, {
    id: '11',
    name: "Independence Day",
    month: 6, // July
    date:4,
    display: true
}, {
    id: '12',
    name: "Labor Day",
    month: 8, // September
    date: { n: 1, day: 'Monday'}, // 1st Monday in September
    display: true
}, {
    id: '13',
    name: "US Indigenous People's Day",
    month: 9, // October
    date: { n: 2, day: 'Monday'}, // 2nd Monday in October
    display: true
}, {
    id: '14',
    name: "Halloween",
    month: 9, // October
    date: 31,
    display: true
}, {
    id: '15',
    name: "Veteran's Day",
    month: 10, // November
    date:11,
    display: true
}, {
    id: '16',
    name: "Thanksgiving",
    month: 10, // November
    date: { n: 4, day: 'Thursday'}, // 4th Thursday in November
    display: true
}, {
    id: '17',
    name: "Christmas Eve",
    month: 11, // December
    date:24,
    display: true
}, {
    id: '18',
    name: "Christmas Day",
    month: 11, // December
    date:25,
    display: true
}, {
    id: '19',
    name: "New Year's Eve",
    month: 11, // December
    date:31,
    display: true
}];

export { holidays as default };