import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Post } from '../models/post.model'

export const ADD_POST       = 'ADD_POST'
export const REMOVE_POST    = 'REMOVE_POST'
export const UPDATE_POST    = 'UPDATE_POST'
export const SELECT_POST    = 'SELECT_POST'
export const UPDATE_ALL_POSTS = 'UPDATE_ALL_POSTS'

export class AddPost implements Action {
    readonly type = ADD_POST

    constructor(public payload: Post) {}
}

export class RemovePost implements Action {
    readonly type = REMOVE_POST
  
    constructor(public payload: any) {}
}

export class UpdatePost implements Action {
    readonly type = UPDATE_POST  

    constructor(public payload: Post) {}
}


export class SelectPost implements Action {
    readonly type = SELECT_POST  

    constructor(public payload: Post) {}
}

export class UpdateAllPosts implements Action {
    readonly type = UPDATE_ALL_POSTS  

    constructor(public payload: any) {}
}


export type Actions = AddPost | RemovePost | UpdatePost | SelectPost | UpdateAllPosts