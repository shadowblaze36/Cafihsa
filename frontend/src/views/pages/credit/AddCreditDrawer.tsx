// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Components
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { addCredit } from 'src/store/credit'
import { fetchClientList } from 'src/store/client'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { CreditData } from 'src/interfaces/CreditData'
import {
  Avatar,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { ListType } from 'src/types/ListTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

interface SidebarAddCreditType {
  open: boolean
  toggle: () => void
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  clientId: yup.number().required(),
  amount: yup.number().required(),
  interestRate: yup.number().required()
})

const defaultValues: CreditData = {
  clientId: 0,
  amount: 0.0,
  interestRate: 0
}

const SidebarAddCredit = (props: SidebarAddCreditType) => {
  // ** Props
  const { open, toggle } = props

  const [selectedClient, setSelectedClient] = useState<number>(0)

  const handleListItemClick = (index: number) => {
    setSelectedClient(index)
  }

  const handleFilter = useCallback((val: string) => {
    setSearchValue(val)
  }, [])

  const [searchValue, setSearchValue] = useState<string>('')

  const dispatch = useDispatch<AppDispatch>()
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  // ** Hooks
  useEffect(() => {
    dispatch(
      fetchClientList({
        query: searchValue
      })
    )
  }, [dispatch, searchValue])

  const store = useSelector((state: RootState) => state.clients)

  const onSubmit = (data: CreditData) => {
    dispatch(addCredit({ ...data })).then((result: any) => {
      const success = result.payload?.success
      if (success) {
        toggle()
        reset()
        toast.success('Credit added succesfully!')
      } else {
        toast.error('Error creating credit')
      }
    })
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  const handleCloseWithReason = (event: string, reason: string) => {
    if (reason && reason == 'backdropClick') return
    handleClose()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleCloseWithReason}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 350, md: 850, lg: 1200 } } }}
    >
      <Header>
        <Typography variant='h6'>Add Credit</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{ borderRadius: 1, color: 'text.primary', backgroundColor: 'action.selected' }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Divider sx={{ mb: '0 !important' }} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Select Client
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                size='small'
                value={searchValue}
                sx={{ mr: 4 }}
                placeholder='Search Client'
                onChange={e => handleFilter(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <List sx={{ maxHeight: 300, overflow: 'auto', position: 'relative' }}>
                {store.list.map((client: ListType, index) => (
                  <ListItem dense key={client.id}>
                    <ListItemButton selected={selectedClient === 0} onClick={() => handleListItemClick(client.id)}>
                      <ListItemAvatar>
                        <CustomAvatar
                          skin='light'
                          color='primary'
                          sx={{ mr: 2.5, width: 38, height: 38, fontSize: '1rem', fontWeight: 500 }}
                        >
                          {getInitials(client.name)}
                        </CustomAvatar>
                      </ListItemAvatar>
                      <ListItemText primary={client.name} />
                      <ListItemSecondaryAction>
                        <IconButton edge='end'>
                          <ListItemText primary={client.id} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='clientId'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.clientId)}
                      fullWidth
                      label='Client'
                      placeholder='John'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:user' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.clientId && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.clientId.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mb: '0 !important' }} />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='amount'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.amount)}
                      fullWidth
                      label='Last Name'
                      placeholder='Doe'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:user-pause' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.amount && <FormHelperText sx={{ color: 'error.main' }}>{errors.amount.message}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
            <Button type='submit' variant='contained' sx={{ ml: 3, mt: 4 }}>
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddCredit
