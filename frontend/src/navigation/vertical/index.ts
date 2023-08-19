// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'tabler:smart-home'
    },
    {
      title: 'Clients',
      path: '/client',
      icon: 'tabler:users'
    },
    {
      title: 'Credits',
      path: '/credit',
      icon: 'tabler:moneybag'
    },
    {
      title: 'Payments',
      path: '/second-page',
      icon: 'tabler:report-money'
    }
  ]
}

export default navigation
