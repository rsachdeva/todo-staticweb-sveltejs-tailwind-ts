import { writable } from 'svelte/store'
import { localStore } from './localStore'
import type { TodoType } from '../types/todo.type'

export const alert = writable<string>('Welcome to the To-Do list app!')

// export const todos = writable([]) // before local store

const initialTodos: TodoType[] = [
    { id: 1, name: 'Visit MDN web docs', completed: true },
    { id: 2, name: 'Complete the Svelte Tutorial', completed: false },
  ]
// const initialTodos = { handler: () => {} }

export const todos = localStore('mdn-svelte-todo', initialTodos)