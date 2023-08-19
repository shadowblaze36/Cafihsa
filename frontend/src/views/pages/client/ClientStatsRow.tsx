import Grid from "@mui/material/Grid";
import CardClientStats from "./CardClientStats";
import {ClientStatsHorizontalWithDetailsProps} from "../../../types/clientTypes";


interface ClientStatsData {
  totalClients: number
  paidClients: number
  lateClients: number
  inactiveClients: number
}

const ClientStatsRow = (props: ClientStatsData) => {

  const statsHorizontalWithDetails:ClientStatsHorizontalWithDetailsProps[] = [
    {
      stats: props.totalClients,
      title: 'Total Clients',
      icon: 'tabler:user',
      avatarColor: 'primary',
    },
    {
      stats: props.paidClients,
      title: 'Paid Clients',
      avatarColor: 'success',
      icon: 'tabler:user-check',
    },
    {
      stats: props.lateClients,
      title: 'Late Clients',
      avatarColor: 'error',
      icon: 'tabler:user-exclamation',
    },
    {
      stats: props.inactiveClients,
      title: 'Inactive Clients',
      avatarColor: 'secondary',
      icon: 'tabler:user-off',
    }
  ]

  return (
    <Grid item xs={12}>
      {statsHorizontalWithDetails && (
        <Grid container spacing={6}>
          {statsHorizontalWithDetails.map((item: ClientStatsHorizontalWithDetailsProps, index: number) => {
            return (
              <Grid item xs={12} md={3} sm={6} key={index}>
                <CardClientStats {...item} />
              </Grid>
            )
          })}
        </Grid>
      )}
    </Grid>
  )
}

export default ClientStatsRow
