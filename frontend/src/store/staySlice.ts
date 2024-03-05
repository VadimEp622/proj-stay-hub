import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { stayService } from "../services/stay.service"
import { showErrorMsg } from "../services/event-bus.service"

interface Guests {
    adults: number
    children: number
    infants: number
    pets: number
}

interface FilterBy {
    where: string
    from: null | number
    to: null | number
    capacity: number
    guests: Guests
    label: string
}

interface ApiFilterBy {
    where: string
    from: '' | number
    to: '' | number
    capacity: number
    label: string
    page: number
}

interface StayState {
    stays: any
    stay: any
    isLoadingStay: boolean
    filterBy: null | FilterBy
    isSetParamsToFilterBy: boolean
    page: number
    isLoadingMoreStays: boolean
    isFinalPage: boolean
}



const initialState: StayState = {
    stays: [],
    stay: {},
    isLoadingStay: false,
    filterBy: null,
    isSetParamsToFilterBy: false,// protection layer -> basically, before store filterBy is ready, don't fetch stays.
    page: 0,
    isLoadingMoreStays: false,
    isFinalPage: false
}

const staySlice = createSlice({
    name: 'stay',
    initialState,
    reducers: {
        stayUpdateFilterBy: (state, action: PayloadAction<FilterBy>) => {
            _updateFilterBy(state, action.payload)
        },

        stayResetFilterBy: (state) => {
            _resetFilterBy(state)
        },

        stayResetPageNum: (state) => {
            state.page = 0
        },

        stayUpdateIsFinalPage: (state, action: PayloadAction<boolean>) => {
            state.isFinalPage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadStays.pending, (state) => {
            state.isSetParamsToFilterBy = false
            state.isLoadingMoreStays = true
        }).addCase(loadStays.fulfilled, (state, action: PayloadAction<{ stays: any, isFinalPage: boolean }>) => {
            if (action.payload.isFinalPage) state.isFinalPage = action.payload.isFinalPage
            state.stays = action.payload.stays
            state.isLoadingMoreStays = false
        }).addCase(loadStays.rejected, (state, action) => {
            console.log('Failed loading stays', action.error)
            showErrorMsg('Failed loading stays')
            state.isLoadingMoreStays = false
            state.page = 0
        })

        builder.addCase(loadMoreStays.pending, (state) => {
            state.isLoadingMoreStays = true
        }).addCase(loadMoreStays.fulfilled, (state, action: PayloadAction<{ stays: any, isFinalPage: boolean }>) => {
            if (action.payload.isFinalPage) state.isFinalPage = action.payload.isFinalPage
            state.stays = [...state.stays, ...action.payload.stays]
            state.page += 1
            state.isLoadingMoreStays = false
        }).addCase(loadMoreStays.rejected, (state, action) => {
            state.isLoadingMoreStays = false
            console.log('Failed loading more stays', action.error)
            showErrorMsg('Failed loading more stays')
        })

        builder.addCase(loadStay.pending, (state) => {
            state.isLoadingStay = true
        }).addCase(loadStay.fulfilled, (state, action: PayloadAction<any>) => {
            state.stay = action.payload
            state.isLoadingStay = false
        })

    }
})


// TODO: check if page key gets properly sent to the backend, in ALL possible cases
export const loadStays = createAsyncThunk(
    'stay/loadStays',
    async (filterBy: FilterBy) => {
        const filter: ApiFilterBy = {
            where: '',
            from: '',
            to: '',
            capacity: 0,
            label: '',
            page: 0
        }
        if (filterBy.where) filter.where = filterBy.where
        if (filterBy.from) filter.from = filterBy.from
        if (filterBy.to) filter.to = filterBy.to
        if (filterBy.capacity) filter.capacity = filterBy.capacity
        if (filterBy.label) filter.label = filterBy.label

        const { stays, isFinalPage } = await stayService.query(filter)
        return { stays, isFinalPage }
    }
)

export const loadMoreStays = createAsyncThunk(
    'stay/loadMoreStays',
    async ({ filterBy, page }: { filterBy: FilterBy, page: number }) => {
        const filter: ApiFilterBy = {
            where: '',
            from: '',
            to: '',
            capacity: 0,
            label: '',
            page
        }
        if (filterBy.where) filter.where = filterBy.where
        if (filterBy.from) filter.from = filterBy.from
        if (filterBy.to) filter.to = filterBy.to
        if (filterBy.capacity) filter.capacity = filterBy.capacity
        if (filterBy.label) filter.label = filterBy.label

        const { stays, isFinalPage } = await stayService.query(filter)
        return { stays, isFinalPage }
    }
)

export const loadStay = createAsyncThunk(
    'stay/loadStay',
    async (stayId: string) => {
        try {
            const stay = await stayService.getById(stayId)
            return stay
        } catch (err: any) {
            showErrorMsg('Failed loading stay')
            throw new Error('Failed loading stay', err)
        }
    }
)



export const { stayUpdateFilterBy, stayResetFilterBy, stayResetPageNum, stayUpdateIsFinalPage } = staySlice.actions

export default staySlice.reducer


// ************ Local utility functions ************
function _updateFilterBy(state: StayState, filterBy: FilterBy) {
    state.filterBy = { ...stayService.getEmptyFilterBy(), ...state.filterBy, ...filterBy }
    state.isSetParamsToFilterBy = true
}

function _resetFilterBy(state: StayState) {
    state.filterBy = null
    state.isSetParamsToFilterBy = true
}
