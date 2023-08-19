// ** React Imports
import React, { useState, ChangeEvent } from 'react'

// ** MUI Imports
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputAdornment from "@mui/material/InputAdornment";

//** Icon Imports
import Icon from '../../../../@core/components/icon'
import Grid from "@mui/material/Grid";

// ** Source code imports
import DropzoneWrapper from "../../../../@core/styles/libs/react-dropzone";
import FileUploaderSingle from "../../../file-uploader/FileUploaderSingle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";


const TabAddress = () => {


  return (
    <div>

      <DropzoneWrapper>

        <Grid container spacing={5}>

          <Grid item xs={12} >
            <TextField
              multiline
              minRows={3}
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
          </Grid>

          {/* <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant='subtitle1' sx={{ mb:3 }}>
                  Bill Receipt:
                </Typography>
                <FileUploaderSingle />
              </CardContent>
            </Card>
          </Grid> */}

        </Grid>
      </DropzoneWrapper>
    </div>
  )
}

export default TabAddress
