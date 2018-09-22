import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Employee } from './../models/employee.model'

export const ADD_EMPLOYEE       = 'ADD_EMPLOYEE'
export const REMOVE_EMPLOYEE    = 'REMOVE_EMPLOYEE'
export const UPDATE_EMPLOYEE    = 'UPDATE_EMPLOYEE'
export const SELECT_EMPLOYEE    = 'SELECT_EMPLOYEE'

export class AddEmployee implements Action {
    readonly type = ADD_EMPLOYEE

    constructor(public payload: Employee) {}
}

export class RemoveEmployee implements Action {
    readonly type = REMOVE_EMPLOYEE
  
    constructor(public payload: any) {}
}

export class UpdateEmployee implements Action {
    readonly type = UPDATE_EMPLOYEE  

    constructor(public payload: Employee) {}
}


export class SelectEmployee implements Action {
    readonly type = SELECT_EMPLOYEE  

    constructor(public payload: Employee) {}
}



export type Actions = AddEmployee | RemoveEmployee | UpdateEmployee | SelectEmployee