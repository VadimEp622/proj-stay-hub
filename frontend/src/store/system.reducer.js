export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SET_UNCLICKABLE_BG = 'SET_UNCLICKABLE_BG'
export const REMOVE_UNCLICKABLE_BG = 'REMOVE_UNCLICKABLE_BG'
export const OPEN_EXPANDED_HEADER = 'OPEN_EXPANDED_HEADER'
export const CLOSE_EXPANDED_HEADER = 'CLOSE_EXPANDED_HEADER'
export const OPEN_DROPDOWN_BAR = 'OPEN_DROPDOWN_BAR'
export const CLOSE_DROPDOWN_BAR = 'CLOSE_DROPDOWN_BAR'
export const OPEN_EXPANDED_HEADER_MODAL = 'OPEN_EXPANDED_HEADER_MODAL'
export const CLOSE_EXPANDED_HEADER_MODAL = 'CLOSE_EXPANDED_HEADER_MODAL'
export const SET_IS_SIGNING_UP = 'SET_IS_SIGNING_UP'


const initialState = {
  isLoading: false,
  isUnclickableBg: false,
  isFilterExpanded: false,
  isExpandedModalOpen: false,
  isSigningUp: false
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
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
    case SET_IS_SIGNING_UP:
      return { ...state, isSigningUp: action.isSigningUp }
    default: return state
  }
}
