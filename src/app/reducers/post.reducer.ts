import { Action } from '@ngrx/store'
import { Post } from '../models/post.model'
import * as PostActions from '../actions/post.actions'

export interface postsState {
    posts: Post[]
    selectedPost: Post
}

export const initialState: postsState = {
    posts: [
        {
            id: '1',
            text: '@HFord Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
            markup: '',
            publicationDate: '2018-09-20T15:44:07.525Z'
        },
        {
            id: '2',
            text: 'Lorem ipsum dolor @LDomingos sit amet, consectetur adipiscing elit, #003519176678 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
            markup: '',
            publicationDate: '2018-09-20T15:44:07.525Z'
        },
        {
            id: '3',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            markup: '',
            publicationDate: '2018-09-20T15:44:07.525Z'
        },
        {
            id: '4',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing #003519176678 elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            markup: '',
            publicationDate: '2018-09-20T15:44:07.525Z'
        },
        {
            id: '5',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, @TEdison sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            markup: '',
            publicationDate: '2018-09-20T15:44:07.525Z'
        }
    ],
    selectedPost: null
};

export function postReducer(state = initialState, action: PostActions.Actions) {

    switch (action.type) {
        case PostActions.ADD_POST:
            action.payload.id = action.payload.id ? action.payload.id : guid()
            return {
                posts: [...state.posts, action.payload]
            }
        case PostActions.REMOVE_POST:
            state.posts.splice(action.payload, 1)
            return state;
        case PostActions.UPDATE_POST:
            let toUpdate = state.posts.map((item) => {
                if (item.id === action.payload.id)
                    item = action.payload

                return item
            })
            return {
                ...state,
                posts: toUpdate,
                selectedPost: null
            }
        case PostActions.UPDATE_ALL_POSTS:
            let posts = state.posts.map((item) => {
                item = getMarkup(action.payload, item)
                return item
            })
            return {
                ...state,
                posts: posts,
                selectedPost: null
            }
        case PostActions.SELECT_POST:
            return {
                ...state,
                selectedPost: action.payload
            }
        default:
            return state;
    }
}

const getMarkup = (employees , post) => {
    post.markup = post.text
    let regex = /([@#][\w_-]+)/g
   
    let toMatch = post.text.match(regex)
   
    if(toMatch)
   
        employees.forEach(employee => {
            toMatch.forEach(element => {
                console.log(element.substr(1), '---', employee.username)
                let type
                if(element.charAt(0) === '@') type = 'username'
                if(element.charAt(0) === '#') type = 'phone'
                if(element.substr(1) === employee.username || element.substr(1) === employee.phone)

                //post.markup = post.markup.replace(element, `<employee id="${employee.id}" type="${type}" adHost><span class="hightlight">${(type=== 'username' ? '@' + employee.username : '#' + employee.phone) }</span></employee>`)
                post.markup = post.markup.replace(element, `<span class="tool" data-tip="${employee.name}  @${employee.username}  #${employee.phone}  ${employee.role}" tabindex="2">${(type=== 'username' ? '@' + employee.username : '#' + employee.phone)}</span>`)
            });
        });
    
    
    return post
}


function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const generateId = (state) => {
    return String(state.posts.length + 1)
}
