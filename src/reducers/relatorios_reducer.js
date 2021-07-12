import {
    RELATORIOS_DIARIOS
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case RELATORIOS_DIARIOS:
            return {
                ...state,
                relatorios: action.payload,
                authorized: true
            }
        default:
            return state;
    }
}
