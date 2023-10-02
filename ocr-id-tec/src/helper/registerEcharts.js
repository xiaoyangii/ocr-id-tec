import * as echarts from 'echarts/core'
import { RadarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { LegendComponent } from 'echarts/components'

echarts.use([RadarChart, CanvasRenderer, LegendComponent])


// 导出 echarts
export default echarts
