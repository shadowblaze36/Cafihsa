// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Import
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import {ThemeColor} from "../../../@core/layouts/types";

type ClientStatsHorizontalWithDetailsProps = {
  icon: string
  stats: number
  title: string
  avatarColor?: ThemeColor
}

const CardStatsHorizontalWithDetails = (props: ClientStatsHorizontalWithDetailsProps) => {
  // ** Props
  const {
    icon,
    stats,
    title,
    avatarColor = 'primary'
  } = props

  return (
    <Card>
      <CardContent sx={{ gap: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography sx={{ mb: 1, color: 'text.secondary' }}>{title}</Typography>
          <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant='h5'>{stats}</Typography>
          </Box>
        </Box>
        <CustomAvatar skin='light' variant='rounded' color={avatarColor} sx={{ width: 38, height: 38 }}>
          <Icon icon={icon} fontSize={24} />
        </CustomAvatar>
      </CardContent>
    </Card>
  )
}

export default CardStatsHorizontalWithDetails
