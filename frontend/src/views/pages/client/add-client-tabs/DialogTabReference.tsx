// ** React Imports
import React, { useState, ChangeEvent } from 'react'

// ** MUI Imports
import TextField from '@mui/material/TextField'
import InputAdornment from "@mui/material/InputAdornment";
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

//** Icon Imports
import Icon from '../../../../@core/components/icon'
import Grid from "@mui/material/Grid";

// ** Source code imports
import DropzoneWrapper from "../../../../@core/styles/libs/react-dropzone";

const TabReference = () => {


  return (
    <div>


      <Grid container spacing={5}>


        <Grid item xs={12}>

          <Typography variant='body2' sx={{ fontWeight: 600 }}>

            Personal Reference 1
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Name'
            placeholder='John'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon='tabler:user-star' />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
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
        </Grid>




        <Grid item xs={12}>
          <Typography variant='body2' sx={{ fontWeight: 600 }}>
            Personal Reference 2
          </Typography>
        </Grid>


        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Name'
            placeholder='John'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon='tabler:user-star' />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
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
        </Grid>


        <Grid item xs={12}>
          <Divider sx={{ mb: '0 !important' }} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='body2' sx={{ fontWeight: 600 }}>
            Work Reference 1
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Name'
            placeholder='John'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon='tabler:user-star' />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
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
        </Grid>

        <Grid item xs={12}>
          <Typography variant='body2' sx={{ fontWeight: 600 }}>
            Work Reference 2
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Name'
            placeholder='John'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon='tabler:user-star' />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
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
        </Grid>


      </Grid>
    </div>
  )
}

export default TabReference
