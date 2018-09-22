import { Action } from '@ngrx/store'
import { Employee } from './../models/employee.model'
import * as AdminActions from './../actions/admin.actions'

export interface adminState {
    employees: Employee[],
    selectedEmployee: Employee,
}

export const initialState: adminState = {
    employees: [{
        id: "1",
        name: 'Luis Domingos',
        username: 'LDomingos',
        phone: '00351915147045',
        role: 'Developer'
    },
    {
        id: "2",
        name: 'Thomas Edison',
        username: 'TEdison',
        phone: '003519176678',
        role: 'Genius'
    },
    {
        id: "3",
        name: 'Henry Ford',
        username: 'HFord',
        phone: '003519006641',
        role: 'Money Maker'
    }],
    selectedEmployee: null,
};

export function adminReducer(state = initialState, action: AdminActions.Actions) {

    switch (action.type) {
        case AdminActions.ADD_EMPLOYEE:
            action.payload.id = action.payload.id ? action.payload.id : generateId(state)
            return {
                employees: [...state.employees, action.payload]
            }
        case AdminActions.REMOVE_EMPLOYEE:
            let employees = state.employees.filter((item)=>{
                return  item.id !== action.payload
            })
            return {
                ...state,
                employees: employees,
                selectedEmployee: null
            }
        case AdminActions.UPDATE_EMPLOYEE:
            let toUpdate = state.employees.map((item)=>{
                if(item.id === action.payload.id)
                item = action.payload
                return item
            })
            return {
                ...state,
                employees: toUpdate,
                selectedEmployee: null
            }
        case AdminActions.SELECT_EMPLOYEE:
            return {
                ...state,
                selectedEmployee: action.payload
            }
        default:
            return state;
    }
}

const generateId = (state) => {
    return String(state.employees.length + 1)
}