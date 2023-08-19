// ** React Imports
import { Ref, useState, forwardRef, ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from '../../../@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Hook Imports
import { useSettings } from '../../../@core/hooks/useSettings'

// ** Tab Content Imports
import DialogTabAddress from "./add-client-tabs/DialogTabAddress";
import DialogTabWork from "./add-client-tabs/DialogTabWork";
import DialogTabReference from "./add-client-tabs/DialogTabReference";
import { FormControl, FormHelperText, Grid, InputAdornment, TextField } from '@mui/material'

// ** Types Imports
import { AppDispatch } from 'src/store'

// ** Actions Imports
import { ClientData } from 'src/interfaces/ClientData'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

interface TabLabelProps {
  title: string
  active: boolean
  subtitle: string
  icon: ReactElement
}

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  birthdate: yup
    .string()
    .min(3, obj => showErrors('Birthdate', obj.value.length, obj.min))
    .required(),
  identificationNumber: yup
    .string()
    .min(3, obj => showErrors('Identification Number', obj.value.length, obj.min))
    .required(),
  identificationImage: yup.mixed().nullable(),
  address: yup.string().required(),
  billReceipt: yup.mixed().nullable(),
  workPlace: yup.string().required(),
  workPhone: yup.string().required(),
  startDate: yup.string().required(),
  workAddress: yup.string().required(),
  bossName: yup.string().required(),
  bossPhone: yup.string().required(),
  personalReference1: yup.string().required(),
  personalReferencePhone1: yup.string().required(),
  personalReference2: yup.string().required(),
  personalReferencePhone2: yup.string().required(),
  workReference1: yup.string().required(),
  workReferencePhone1: yup.string().required(),
  workReference2: yup.string().required(),
  workReferencePhone2: yup.string().required()
});

const defaultValues: ClientData = {
  firstName: '',
  lastName: '',
  email: '',
  identificationNumber: '',
  address: '',
  birthdate: new Date().toISOString(),
  phone: '',
  workPlace: '',
  workPhone: '',
  startDate: '',
  workAddress: '',
  bossName: '',
  bossPhone: '',
  personalReference1: '',
  personalReferencePhone1: '',
  personalReference2: '',
  personalReferencePhone2: '',
  workReference1: '',
  workReferencePhone1: '',
  workReference2: '',
  workReferencePhone2: ''
};

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const TabLabel = (props: TabLabelProps) => {
  const { icon, title, subtitle, active } = props

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            ...(active
              ? { color: 'common.white', backgroundColor: 'primary.main' }
              : { backgroundColor: 'action.selected' })
          }}
        >
          {icon}
        </Avatar>
        <Box sx={{ textAlign: 'left' }}>
          <Typography>{title}</Typography>
          <Typography variant='caption' sx={{ textTransform: 'none' }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </div>
  )
}

const tabsArr = ['personalTab', 'addressTab', 'workTab', 'referenceTab', 'submitTab']

const DialogAddClient = () => {
  // ** States
  const [show, setShow] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('personalTab')

  // const [clientData, setClientData] = useState<ClientData>({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phone: '',
  //   birthdate: '',
  //   identificationNumber: '',
  //   address: '',
  //   workPlace: '',
  //   workPhone: '',
  //   startDate: '',
  //   workAddress: '',
  //   bossName: '',
  //   bossPhone: '',
  //   personalReference1: '',
  //   personalReferencePhone1: '',
  //   personalReference2: '',
  //   personalReferencePhone2: '',
  //   workReference1: '',
  //   workReferencePhone1: '',
  //   workReference2: '',
  //   workReferencePhone2: '',
  // });


  // ** Hook
  const { settings } = useSettings()
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

  // ** Var
  const { direction } = settings

  const handleClose = () => {
    console.log('closing')
    setShow(false)
    setActiveTab('personalTab')
  }

  const onSubmit = (data: ClientData) => {
    console.log('submiting')

    //dispatch(addClient({ ...data }))
    //toggle()
    reset()
  }

  // const handleSubmit = () => {
  //   console.log('submiting')
  //   setShow(false)
  //   setActiveTab('personalTab')
  // }

  const handleCloseWithReason = (event: string, reason: string) => {
    if (reason && reason == "backdropClick")
      return;
    handleClose()
  }

  const nextArrow = direction === 'ltr' ? 'tabler:arrow-right' : 'tabler:arrow-left'
  const previousArrow = direction === 'ltr' ? 'tabler:arrow-left' : 'tabler:arrow-right'

  const renderTabFooter = () => {
    const prevTab = tabsArr[tabsArr.indexOf(activeTab) - 1]
    const nextTab = tabsArr[tabsArr.indexOf(activeTab) + 1]

    return (
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant='outlined'
          color='secondary'
          disabled={activeTab === 'personalTab'}
          onClick={() => setActiveTab(prevTab)}
          startIcon={<Icon icon={previousArrow} />}
        >
          Previous
        </Button>
        <Button
          variant='contained'
          color={activeTab === 'submitTab' ? 'success' : 'primary'}
          endIcon={<Icon icon={activeTab === 'submitTab' ? 'tabler:check' : nextArrow} />}
          onClick={() => {
            if (activeTab !== 'submitTab') {
              setActiveTab(nextTab)
            } else {
              handleSubmit(onSubmit)
            }
          }}
        >
          {activeTab === 'submitTab' ? 'Submit' : 'Next'}
        </Button>
      </Box>
    )
  }

  return (
    <Card>

      <Dialog
        fullWidth
        open={show}
        scroll='body'
        maxWidth='md'
        onClose={handleCloseWithReason}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pr: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pl: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(11)} !important`],
            py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='tabler:x' />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Create New Client
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>

              <TabContext value={activeTab}>
                <TabList
                  orientation='vertical'
                  onChange={(e, newValue: string) => setActiveTab(newValue)}
                  sx={{
                    border: 0,
                    minWidth: 200,
                    '& .MuiTabs-indicator': { display: 'none' },
                    '& .MuiTabs-flexContainer': {
                      alignItems: 'flex-start',
                      '& .MuiTab-root': {
                        width: '100%',
                        alignItems: 'flex-start'
                      }
                    }
                  }}
                >
                  <Tab
                    disableRipple
                    value='personalTab'
                    label={
                      <TabLabel
                        title='Personal'
                        subtitle='Personal Info'
                        active={activeTab === 'personalTab'}
                        icon={<Icon icon='tabler:user' />}
                      />
                    }
                  />
                  <Tab
                    disableRipple
                    value='addressTab'
                    label={
                      <TabLabel
                        title='Address'
                        active={activeTab === 'addressTab'}
                        subtitle='Home Address'
                        icon={<Icon icon='tabler:home' />}
                      />
                    }
                  />
                  <Tab
                    disableRipple
                    value='workTab'
                    label={
                      <TabLabel
                        title='Work'
                        icon={<Icon icon='tabler:briefcase' />}
                        subtitle='Work Details'
                        active={activeTab === 'workTab'}
                      />
                    }
                  />
                  <Tab
                    disableRipple
                    value='referenceTab'
                    label={
                      <TabLabel
                        title='References'
                        active={activeTab === 'referenceTab'}
                        subtitle='Add References'
                        icon={<Icon icon='tabler:friends' />}
                      />
                    }
                  />

                  <Tab
                    disableRipple
                    value='submitTab'
                    label={
                      <TabLabel
                        title='Submit'
                        subtitle='Submit'
                        icon={<Icon icon='tabler:check' />}
                        active={activeTab === 'submitTab'}
                      />
                    }
                  />
                </TabList>
                <TabPanel value='personalTab' sx={{ flexGrow: 1, p: '0 !important' }}>
                  <div>

                    <DropzoneWrapper>

                      <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>

                          <FormControl fullWidth >
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
                            {errors.firstName && <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>}
                          </FormControl>


                        </Grid>

                        <Grid item xs={12} sm={6}>
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
                            {errors.lastName && <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>}
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth >
                            <Controller
                              name='lastName'
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

                        <Grid item xs={12} sm={6}>
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

                        <Grid item xs={12} sm={6}>
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
                            {errors.birthdate && <FormHelperText sx={{ color: 'error.main' }}>{errors.birthdate.message}</FormHelperText>}
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
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
                            {errors.identificationNumber && <FormHelperText sx={{ color: 'error.main' }}>{errors.identificationNumber.message}</FormHelperText>}
                          </FormControl>
                        </Grid>

                        {/* <Grid item xs={12}>
                          <Card>
                            <CardContent>
                              <Typography variant='subtitle1' sx={{ mb: 3 }}>
                                Identification Image:
                              </Typography>
                              <FormControl fullWidth>
                                <Controller
                                  name='identificationImage'
                                  control={control}
                                  rules={{ required: true }}
                                  render={({ field: { value, onChange } }) => (
                                    <FileUploaderSingle
                                      files={value}
                                      setFiles={onChange}
                                      error={Boolean(errors.identificationImage)}
                                    />
                                  )}
                                />
                                {errors.identificationImage && <FormHelperText sx={{ color: 'error.main' }}>{errors.identificationImage.message}</FormHelperText>}
                              </FormControl>




                            </CardContent>
                          </Card>
                        </Grid> */}

                      </Grid>
                    </DropzoneWrapper>
                  </div>
                  {renderTabFooter()}
                </TabPanel>
                <TabPanel value='addressTab' sx={{ flexGrow: 1, p: '0 !important' }}>
                  <DialogTabAddress />
                  {renderTabFooter()}
                </TabPanel>
                <TabPanel value='workTab' sx={{ flexGrow: 1, p: '0 !important' }}>
                  <DialogTabWork />
                  {renderTabFooter()}
                </TabPanel>
                <TabPanel value='referenceTab' sx={{ flexGrow: 1, p: '0 !important' }}>
                  <DialogTabReference />
                  {renderTabFooter()}
                </TabPanel>

                <TabPanel value='submitTab' sx={{ flexGrow: 1, p: '0 !important' }}>
                  <Box sx={{ textAlign: 'center' }}>

                    <Typography variant='body2' sx={{ mb: 6 }}>
                      Confirm client information and submit to create a new one.
                    </Typography>

                    <Grid item xs={12}>

                      <TableContainer>
                        <Table >
                          <TableBody
                            sx={{
                              '& .MuiTableCell-root': {
                                borderBottom: 0,
                                verticalAlign: 'top',
                                '&:last-of-type': { px: '0 !important' },
                                '&:first-of-type': { pl: '0 !important' },
                                py: theme => `${theme.spacing(0.3)} !important`
                              }
                            }}
                          >
                            <TableRow>
                              <TableCell>
                                <Typography noWrap sx={{ fontWeight: 700, color: 'text.secondary' }}>
                                  First Name
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography sx={{ color: 'text.secondary' }}>John</Typography>
                              </TableCell>
                            </TableRow>


                            <TableRow>
                              <TableCell>
                                <Typography noWrap sx={{ fontWeight: 700, color: 'text.secondary' }}>
                                  Last Name
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography sx={{ color: 'text.secondary' }}>Doe</Typography>
                              </TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell>
                                <Typography noWrap sx={{ fontWeight: 700, color: 'text.secondary' }}>
                                  Email
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography sx={{ color: 'text.secondary' }}>john@gmail.com</Typography>
                              </TableCell>
                            </TableRow>


                            <TableRow>
                              <TableCell>
                                <Typography noWrap sx={{ fontWeight: 700, color: 'text.secondary' }}>
                                  Phone
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography sx={{ color: 'text.secondary' }}>+(504) 3341-2257</Typography>
                              </TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell>
                                <Typography noWrap sx={{ fontWeight: 700, color: 'text.secondary' }}>
                                  Birthdate
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography sx={{ color: 'text.secondary' }}>06/28/2023</Typography>
                              </TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell>
                                <Typography noWrap sx={{ fontWeight: 700, color: 'text.secondary' }}>
                                  Identification Number
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography sx={{ color: 'text.secondary' }}>123456</Typography>
                              </TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell>
                                <Typography noWrap sx={{ fontWeight: 700, color: 'text.secondary' }}>
                                  Address
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography sx={{ color: 'text.secondary' }}>1456, Liberty Street</Typography>
                              </TableCell>
                            </TableRow>



                            <TableRow>
                              <TableCell>
                                <Typography noWrap sx={{ fontWeight: 700, color: 'text.secondary' }}>
                                  Workplace
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography sx={{ color: 'text.secondary' }}>Amazon</Typography>
                              </TableCell>
                            </TableRow>

                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>


                  </Box>
                  {renderTabFooter()}
                </TabPanel>
              </TabContext>

            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DialogAddClient
