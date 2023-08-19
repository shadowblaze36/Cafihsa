import {
  CardStatsSquareProps,
  CardStatsVerticalProps,
  CardStatsHorizontalProps,
  CardStatsWithAreaChartProps,
  CardStatsHorizontalWithDetailsProps
} from 'src/@core/components/card-statistics/types'

export type CardStatsType = {
  statsSquare: CardStatsSquareProps[]
  statsVertical: CardStatsVerticalProps[]
  statsHorizontal: CardStatsHorizontalProps[]
  statsWithAreaChart: CardStatsWithAreaChartProps[]
  statsHorizontalWithDetails: CardStatsHorizontalWithDetailsProps[]
}
