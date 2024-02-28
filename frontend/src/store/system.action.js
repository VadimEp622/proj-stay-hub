import { store } from './store'


export function setAppModal(type) {
    store.dispatch({ type })
}