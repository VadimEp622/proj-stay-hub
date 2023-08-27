import { store } from './store.js'


export function setAppModal(type) {
    store.dispatch({ type })
}