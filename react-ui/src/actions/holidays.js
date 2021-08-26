import database from '../firebase/firebase';

// ADD_HOLIDAY
export const addHoliday = (holiday) => ({
    type: 'ADD_HOLIDAY',
    holiday
});

export const startAddHoliday = (holidayData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            name = '',
            month = 0,
            date = 0,
            display = false
        } = holidayData;

        const holiday = { name, month, date, display };

        return database.ref(`users/${uid}/holidays`).push(holiday).then((ref) => {
            dispatch(addHoliday({
                id: ref.key,
                ...holiday
            }))
        });
    }
}

// REMOVE_HOLIDAY
export const removeHoliday = ({ id } = {}) => ({
    type: 'REMOVE_HOLIDAY',
    id
});

export const startRemoveHoliday = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/holidays/${id}`).remove().then((ref) => {
            dispatch(removeHoliday({ id }));
        });
    }
}

// EDIT_HOLIDAY
export const editHoliday = (id, updates) => ({
    type: 'EDIT_HOLIDAY',
    id, 
    updates
});

export const startEditHoliday = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/holidays/${id}`).update(updates).then((ref) => {
            dispatch(editHoliday(id, updates));
        });
    }
};

// POPULATE_HOLIDAYS
export const populateHolidays = (holidays) => ({
    type: 'POPULATE_HOLIDAYS',
    holidays
});

export const startPopulateHolidays = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/holidays`).once('value').then((snapshot) => {
            const holidayCollection = [];
            
            snapshot.forEach((childSnapshot) => {
                holidayCollection.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            
            dispatch(populateHolidays(holidayCollection));
        });
    };
};