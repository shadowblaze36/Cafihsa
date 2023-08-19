import { ThemeColor } from 'src/@core/layouts/types'

export type CreditsType = {
  id: number
  clientId: number
  firstName: string
  lastName: string
  email: string
  balance: number
  startDate: string
  status: string
  avatar: string
  avatarColor?: ThemeColor
}
