// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import Button from "@mui/material/Button";

interface FileProp {
  name: string
  type: string
  size: number
}

interface FileUploaderSingleProps {
  files: File[] | null;
  setFiles: (files: File[] | null) => void;
  error: boolean;
}

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  width: 48,
  height: 48,
  marginBottom: theme.spacing(8.5)
}))

const FileUploaderSingle = ({ files, setFiles, error }: FileUploaderSingleProps) => {
  // ** State
  //const [files, setFiles] = useState<File[]>([])

  // ** Hooks
  const theme = useTheme()
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  const img = files?.map((file: FileProp) => (
    <img key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file as any)} />
  ))

  return (
    <>
      <Box
        {...getRootProps({ className: 'dropzone' })}
        sx={{
          minHeight: 200,
          ...(files?.length ? { height: 450 } : { height: 100 }),
        }}
      >
        <input {...getInputProps()} />
        {files?.length ? (
          img
        ) : (
          <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Img alt='Upload img' src={`/images/misc/upload-${theme.palette.mode}.png`} />
            <Typography variant='body1' sx={{ mb: 1 }}>
              Drop image here or click to upload.
            </Typography>
          </Box>
        )}
      </Box>
      {files?.length ? (
        <div className='buttons'>
          <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
            Remove
          </Button>
        </div>
      ) : <></>}
    </>
  )
}

export default FileUploaderSingle
