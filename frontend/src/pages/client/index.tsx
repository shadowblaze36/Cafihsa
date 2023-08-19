// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, fetchClientStatuses, deleteClient, fetchClientStats } from 'src/store/client'

// ** Third Party Components
//import axios from 'axios'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { ClientsType } from 'src/types/clientTypes'

// ** Custom Table Components Imports
import TableHeader from 'src/views/pages/client/TableHeader'
import AddClientDrawer from 'src/views/pages/client/AddClientDrawer'
import ClientStatsRow from "../../views/pages/client/ClientStatsRow";
import { format } from "date-fns";

interface ClientStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: ClientsType
}

// ** renders client column
const userStatusObj: ClientStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** renders client column
const renderClient = (row: ClientsType) => {
  return (
    <CustomAvatar
      skin='light'
      color={row.avatarColor}
      sx={{ mr: 2.5, width: 38, height: 38, fontSize: '1rem', fontWeight: 500 }}
    >
      {getInitials(row.firstName + ' ' + row.lastName ?? 'AJohn ADoe')}
    </CustomAvatar>
  )
}

const RowOptions = ({ id }: { id: number | string }) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteClient(id))
    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href='/apps/user/view/account'
          onClick={handleRowOptionsClose}
        >
          <Icon icon='tabler:eye' fontSize={20} />
          View
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const columns = [
  {
    flex: 0.10,
    minWidth: 45,
    headerName: 'id',
    field: 'id',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
          {row.id}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 280,
    field: 'firstName',
    headerName: 'Client',
    renderCell: ({ row }: CellType) => {
      const { firstName, lastName, email } = row
      const fullName = `${firstName} ${lastName}`

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              component={Link}
              href='/apps/user/view/account'
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {fullName}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
              {email}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 170,
    headerName: 'Phone',
    field: 'phone',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
          {row.phone}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 400,
    field: 'address',
    headerName: 'Address',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.address}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 125,
    field: 'birthdate',
    headerName: 'Birthdate',
    renderCell: ({ row }: CellType) => {
      const formattedDate = format(new Date(row.birthdate), 'dd/MM/yyyy');

      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {formattedDate}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.status}
          color={userStatusObj[row.status]}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 20,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => <RowOptions id={row.id} />
  }
]

const ClientList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [addClientOpen, setAddClientOpen] = useState<boolean>(false)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.clients)


  useEffect(() => {
    dispatch(fetchClientStatuses());
    dispatch(fetchClientStats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchData({
        status,
        query: value
      })
    )
  }, [dispatch, status, value])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

  const toggleAddClientDrawer = () => setAddClientOpen(!addClientOpen)

  return (
    <Grid container spacing={6.5}>
      <ClientStatsRow {...store.stats}></ClientStatsRow>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Select Status' }}
                  >
                    <MenuItem value=''>Select Status</MenuItem>
                    {store.statuses.map((status) => (
                      <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddClientDrawer} />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={store.data}
            columns={columns}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>


      <AddClientDrawer open={addClientOpen} toggle={toggleAddClientDrawer} />
    </Grid>
  )
}

export default ClientList
