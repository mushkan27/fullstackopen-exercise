const filterReducer = (state = '', action) => {
    switch(action.type){
        case 'SET_FILTER':
            return action.payload
        default:
            return state
    }
}

export const setFilter = (filterValue) => {
    return {
        type: 'SET_FILTER',
        payload: filterValue
    }
}

export default filterReducer