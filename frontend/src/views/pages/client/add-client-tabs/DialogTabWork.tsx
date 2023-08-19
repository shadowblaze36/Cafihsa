// ** React Imports
import React, {useState, ChangeEvent} from 'react'

// ** MUI Imports
import TextField from '@mui/material/TextField'
import InputAdornment from "@mui/material/InputAdornment";

//** Icon Imports
import Icon from '../../../../@core/components/icon'
import Grid from "@mui/material/Grid";

// ** Source code imports
import DropzoneWrapper from "../../../../@core/styles/libs/react-dropzone";

const TabWork = () => {


  return (
    <div>

        <Grid container spacing={5}>

            <Grid item xs={12} sm={6}>
              <TextField
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
            </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
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
          </Grid>


          <Grid item xs={12} sm={6}>
            <TextField
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
          </Grid>

          <Grid item xs={12} >
            <TextField
              multiline
              minRows={3}
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
          </Grid>



          <Grid item xs={12} sm={6}>
            <TextField
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
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
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
          </Grid>

        </Grid>
    </div>
  )
}

export default TabWork
