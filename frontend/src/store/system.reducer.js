// =============== Being Used In Cmps I Know ===============
export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SET_UNCLICKABLE_BG = 'SET_UNCLICKABLE_BG'
export const REMOVE_UNCLICKABLE_BG = 'REMOVE_UNCLICKABLE_BG'
export const OPEN_EXPANDED_HEADER = 'OPEN_EXPANDED_HEADER'
export const CLOSE_EXPANDED_HEADER = 'CLOSE_EXPANDED_HEADER'
export const OPEN_EXPANDED_HEADER_MODAL = 'OPEN_EXPANDED_HEADER_MODAL'
export const CLOSE_EXPANDED_HEADER_MODAL = 'CLOSE_EXPANDED_HEADER_MODAL'

// *********** Main App Modal (centered with gray screen) ***********
export const CLOSE_APP_MODAL = 'CLOSE_APP_MODAL'
export const SET_APP_MODAL_LOGIN = 'SET_APP_MODAL_LOGIN'
export const SET_APP_MODAL_LOGIN_QUICK = 'SET_APP_MODAL_LOGIN_QUICK'
export const SET_APP_MODAL_SIGNUP = 'SET_APP_MODAL_SIGNUP'
export const SET_APP_MODAL_SIGNUP_QUICK = 'SET_APP_MODAL_SIGNUP_QUICK'
export const SET_APP_MODAL_MAIN_FILTER = 'SET_APP_MODAL_MAIN_FILTER'
// ******************************************************************
// =========================================================

const initialState = {
  // =============== Being Used In Cmps I Know ===============
  isLoading: false,
  isUnclickableBg: false,
  isFilterExpanded: false,
  isExpandedModalOpen: false,
  appModal: null// Main App Modal 
  // =========================================================
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {

    // =============== Being Used In Cmps I Know ===============
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case SET_UNCLICKABLE_BG:
      return { ...state, isUnclickableBg: true }
    case REMOVE_UNCLICKABLE_BG:
      return { ...state, isUnclickableBg: false }
    case CLOSE_EXPANDED_HEADER:
      return { ...state, isFilterExpanded: false }
    case OPEN_EXPANDED_HEADER:
      return { ...state, isFilterExpanded: true }
    case OPEN_EXPANDED_HEADER_MODAL:
     return { ...state, isExpandedModalOpen: true }
    case CLOSE_EXPANDED_HEADER_MODAL:
     return { ...state, isExpandedModalOpen: false }

    // *********** Main App Modal (centered with gray screen) ***********
    case CLOSE_APP_MODAL:
      return { ...state, appModal: null }
    case SET_APP_MODAL_LOGIN:
      return { ...state, appModal: SET_APP_MODAL_LOGIN }
    case SET_APP_MODAL_LOGIN_QUICK:
      return { ...state, appModal: SET_APP_MODAL_LOGIN_QUICK }
    case SET_APP_MODAL_SIGNUP:
      return { ...state, appModal: SET_APP_MODAL_SIGNUP }
    case SET_APP_MODAL_SIGNUP_QUICK:
      return { ...state, appModal: SET_APP_MODAL_SIGNUP_QUICK }
    case SET_APP_MODAL_MAIN_FILTER:
      return { ...state, appModal: SET_APP_MODAL_MAIN_FILTER }
    // ******************************************************************
    // =========================================================
    
    default: return state
  }
}
