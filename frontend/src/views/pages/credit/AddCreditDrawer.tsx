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

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addCredit } from 'src/store/credit'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { CreditData } from 'src/interfaces/CreditData'
import { Divider, Grid, InputAdornment } from '@mui/material'

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

  // ** Hooks
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
    setValue('phone', '')
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
                Personal Info
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='firstName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.firstName)}
                      fullWidth
                      label='First Name'
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
                {errors.firstName && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='lastName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.lastName)}
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
                {errors.lastName && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      fullWidth
                      type='email'
                      label='Email'
                      placeholder='carterleonard@gmail.com'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:mail' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='phone'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.phone)}
                      fullWidth
                      type='tel'
                      label='Phone'
                      placeholder='+1(123) 1233-1231'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:phone' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.phone && <FormHelperText sx={{ color: 'error.main' }}>{errors.phone.message}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='birthdate'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.birthdate)}
                      fullWidth
                      type='date'
                      label='Birthdate'
                      placeholder='mm/dd/yyyy'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:calendar' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.birthdate && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.birthdate.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='identificationNumber'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.identificationNumber)}
                      fullWidth
                      label='Identification Number'
                      placeholder='1234567'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:credit-card' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.identificationNumber && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.identificationNumber.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <FormControl fullWidth>
                <Controller
                  name='address'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.address)}
                      multiline
                      minRows={1}
                      fullWidth
                      label='Address'
                      placeholder='1456, Liberty Street'
                      sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='mdi:map-marker' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.address && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.address.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mb: '0 !important' }} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Work Details
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='workPlace'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.workPlace)}
                      fullWidth
                      label='Workplace'
                      placeholder='Amazon'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:building' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.workPlace && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.workPlace.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='workPhone'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.workPhone)}
                      fullWidth
                      type='tel'
                      label='Work Phone'
                      placeholder='+1(123) 1233-1231'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:phone' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.workPhone && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.workPhone.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='bossName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.bossName)}
                      fullWidth
                      label='Boss Name'
                      placeholder='John'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:user-up' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.bossName && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.bossName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='bossPhone'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.bossPhone)}
                      fullWidth
                      type='tel'
                      label='Boss Phone'
                      placeholder='+1(123) 1233-1231'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:phone' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.bossPhone && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.bossPhone.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='startDate'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.startDate)}
                      fullWidth
                      type='date'
                      label='Start Date'
                      placeholder='mm/dd/yyyy'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:calendar' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.startDate && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.startDate.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <FormControl fullWidth>
                <Controller
                  name='workAddress'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.workAddress)}
                      multiline
                      minRows={1}
                      fullWidth
                      label='Work Address'
                      placeholder='1456, Liberty Street'
                      sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='mdi:map-marker' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.workAddress && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.workAddress.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mb: '0 !important' }} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Personal References
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='personalReference1'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.personalReference1)}
                      fullWidth
                      label='Name 1'
                      placeholder='John'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:user-star' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.personalReference1 && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.personalReference1.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='personalReferencePhone1'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.personalReferencePhone1)}
                      fullWidth
                      type='tel'
                      label='Phone 1'
                      placeholder='+1(123) 1233-1231'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:phone' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.personalReferencePhone1 && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.personalReferencePhone1.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='personalReference2'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.personalReference2)}
                      fullWidth
                      label='Name 2'
                      placeholder='John'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:user-star' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.personalReference2 && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.personalReference2.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='personalReferencePhone2'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.personalReferencePhone2)}
                      fullWidth
                      type='tel'
                      label='Phone 2'
                      placeholder='+1(123) 1233-1231'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:phone' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.personalReferencePhone2 && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.personalReferencePhone2.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mb: '0 !important' }} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Work References
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='workReference1'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.workReference1)}
                      fullWidth
                      label='Name 1'
                      placeholder='John'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:user-star' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.workReference1 && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.workReference1.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='workReferencePhone1'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.workReferencePhone1)}
                      fullWidth
                      type='tel'
                      label='Phone 1'
                      placeholder='+1(123) 1233-1231'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:phone' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.workReferencePhone1 && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.workReferencePhone1.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='workReference2'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.workReference2)}
                      fullWidth
                      label='Name 2'
                      placeholder='John'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:user-star' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.workReference2 && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.workReference2.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <Controller
                  name='workReferencePhone2'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.workReferencePhone2)}
                      fullWidth
                      type='tel'
                      label='Phone 2'
                      placeholder='+1(123) 1233-1231'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:phone' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.workReferencePhone2 && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.workReferencePhone2.message}</FormHelperText>
                )}
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
