import { ThemeColor } from 'src/@core/layouts/types'

export type ClientsType = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  birthdate: string
  identificationNumber: string
  status: string
  avatar: string
  avatarColor?: ThemeColor
}

export type CreditListDataType = {
  id: number
  amount: string
  interestRate: string
  startDate: string
  duration: string
  status: string
  progressValue: number
  progressColor: ThemeColor
}

export type ClientStatsHorizontalWithDetailsProps = {
  icon: string
  stats: number
  title: string
  avatarColor?: ThemeColor
}
