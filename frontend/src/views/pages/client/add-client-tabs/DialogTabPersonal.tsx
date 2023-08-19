// ** React Imports
import React, { useState, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from '@mui/material/FormHelperText'

//** Icon Imports
import Icon from '../../../../@core/components/icon'
import Grid from "@mui/material/Grid";

// ** Source code imports
import DropzoneWrapper from "../../../../@core/styles/libs/react-dropzone";
import FileUploaderSingle from "../../../file-uploader/FileUploaderSingle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { FormControl } from '@mui/material'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import { ClientData } from '../../../../interfaces/ClientData';

const TabPersonal = ({ defaultValues, schema }: { defaultValues: ClientData; schema: yup.ObjectSchema<any> }) => {

  // const [value, setValue] = useState<string>('ecommerce')
  //
  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setValue(event.target.value)
  // }

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


  return (
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
  )
}

export default TabPersonal
