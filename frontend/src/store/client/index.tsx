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

interface ListParams {
  query: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Clients
export const fetchData = createAsyncThunk('clients/fetchData', async (params: DataParams) => {
  const response = await axios.get(`${baseURL}/Client`, { params })

  return response.data
})

// ** Add Client
export const addClient = createAsyncThunk(
  'clients/addClient',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    console.log(data)

    const config = {
      method: 'post',
      url: `${baseURL}/Client`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    try {
      await axios.request(config)
      dispatch(fetchData(getState().clients.params))
      dispatch(fetchClientStats())

      return { success: true }
    } catch (error) {
      return { success: false }
    }
  }
)

// ** Delete Client
export const deleteClient = createAsyncThunk(
  'clients/deleteClient',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await axios.delete(`${baseURL}/Client/${id}`)
    dispatch(fetchData(getState().clients.params))

    return response.data
  }
)

// ** Fetch Client Statuses
export const fetchClientStatuses = createAsyncThunk('clients/fetchClientStatuses', async () => {
  const response = await axios.get(`${baseURL}/Client/Statuses`)

  return response.data
})

// ** Fetch Client Stats
export const fetchClientStats = createAsyncThunk('clients/fetchClientStats', async () => {
  const response = await axios.get(`${baseURL}/Client/Stats`)

  return response.data
})

// ** Fetch Clients as List
export const fetchClientList = createAsyncThunk('clients/fetchClientList', async (params: ListParams) => {
  const response = await axios.get(`${baseURL}/Client/List`, { params })

  return response.data
})

export const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    data: [],
    statuses: [],
    stats: {
      totalClients: 0,
      paidClients: 0,
      lateClients: 0,
      inactiveClients: 0
    },
    list: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(fetchClientStatuses.fulfilled, (state, action) => {
      state.statuses = action.payload
    })

    builder.addCase(fetchClientStats.fulfilled, (state, action) => {
      state.stats = action.payload
    })
    builder.addCase(fetchClientList.fulfilled, (state, action) => {
      state.list = action.payload
    })
  }
})

export default clientsSlice.reducer
