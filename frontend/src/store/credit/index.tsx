// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_baseURL

interface DataParams {
  query: string
  status: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Credits
export const fetchCredits = createAsyncThunk('credits/fetchCredits', async (params: DataParams) => {
  const response = await axios.get(`${baseURL}/Credit`, { params })

  return response.data
})

// ** Add Credit
export const addCredit = createAsyncThunk(
  'credits/addCredit',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const config = {
      method: 'post',
      url: `${baseURL}/Credit`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }
    try {
      await axios.request(config)
      dispatch(fetchCredits(getState().clients.params))

      return { success: true }
    } catch (error) {
      return { success: false }
    }
  }
)

// ** Fetch Credit Statuses
export const fetchCreditStatuses = createAsyncThunk('credits/fetchCreditStatuses', async () => {
  const response = await axios.get(`${baseURL}/Credit/Statuses`)

  return response.data
})

export const creditsSlice = createSlice({
  name: 'credits',
  initialState: {
    data: [],
    statuses: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCredits.fulfilled, (state, action) => {
      state.data = action.payload
    })

    builder.addCase(fetchCreditStatuses.fulfilled, (state, action) => {
      state.statuses = action.payload
    })
  }
})

export default creditsSlice.reducer
