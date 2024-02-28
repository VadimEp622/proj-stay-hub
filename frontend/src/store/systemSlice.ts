import { PayloadAction, createSlice } from "@reduxjs/toolkit"


interface SystemState {
    isLoading: boolean
    isUnclickableBg: boolean
    isFilterExpanded: boolean
    isExpandedModalOpen: boolean
    appModal: string | null
}

const initialState: SystemState = {
    isLoading: false,
    isUnclickableBg: false,
    isFilterExpanded: false,
    isExpandedModalOpen: false,
    appModal: null // Main App Modal 
}

const systemSlice = createSlice({
    name: "system",
    initialState,
    reducers: {
        systemSetIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        systemSetIsUnclickableBg: (state, action: PayloadAction<boolean>) => {
            state.isUnclickableBg = action.payload
        },
        systemSetIsExpandedHeader: (state, action: PayloadAction<boolean>) => {
            state.isFilterExpanded = action.payload
        },
        systemSetIsExpandedHeaderModal: (state, action: PayloadAction<boolean>) => {
            state.isExpandedModalOpen = action.payload
        },
        systemCloseAppModal: state => {
            state.appModal = null
        },
        systemSetAppModal: (state, action: PayloadAction<string>) => {
            state.appModal = action.payload
        }
    }
})

export const {
    systemSetIsLoading, systemSetIsUnclickableBg, systemSetIsExpandedHeader, systemSetIsExpandedHeaderModal, systemCloseAppModal, systemSetAppModal
} = systemSlice.actions

export default systemSlice.reducer