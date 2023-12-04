import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery } from '@/state/api'
import { useTheme } from '@mui/material'
import { useMemo } from 'react'
import { 
  ResponsiveContainer, 
  AreaChart, 
  XAxis,
  YAxis,
  Area,
  Tooltip,
  Line,
  CartesianGrid,
  Legend,
  LineChart,
  BarChart,
  Bar
} from 'recharts'

const Row1 = () => {
  const { data } = useGetKpisQuery()
  const { palette } = useTheme()

  const revenueExpenses = useMemo(() => {
    return (
      data && 
      data[0].monthlyData.map(({
        month, revenue, expenses
      }) => {
        return {
          name: month.substring(0,3),
          revenue,
          expenses,
        }
      })
    )
  }, [data])

  const revenueProfit = useMemo(() => {
    return (
      data && 
      data[0].monthlyData.map(({
        month, revenue, expenses
      }) => {
        return {
          name: month.substring(0,3),
          revenue,
          profit: revenue - expenses,
        }
      })
    )
  }, [data])

  const revenue = useMemo(() => {
    return (
      data && 
      data[0].monthlyData.map(({
        month, revenue, 
      }) => {
        return {
          name: month.substring(0,3),
          revenue,
        }
      })
    )
  }, [data])

  return (
    <>
        <DashboardBox gridArea="a">
          <BoxHeader
            title="Revenue and Expenses"
            subtitle="revenues and expenses graph"
            sidetext="+4%"
          />
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart
              data={revenueExpenses}
              margin={{
                top: 15,
                right: 25,
                left: -10,
              }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={palette.primary[300]} 
                    stopOpacity={0.5}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={palette.primary[300]} 
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={palette.primary[300]} 
                    stopOpacity={0.5}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={palette.primary[300]} 
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" 
                tickLine={false} 
                style={
                  { fontSize: "10px" }
                } />
              <YAxis 
                tickLine={false}
                axisLine={{ strokeWidth: 0 }}
                style={{ fontSize: "10px" }}
              />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke={palette.primary.main} 
                dot={true}
                fillOpacity={1}
                fill="url(#colorRevenue)" 
              />
              <Area 
                type="monotone" 
                dataKey="expenses" 
                stroke={palette.primary.main} 
                fillOpacity={1}
                dot={true}
                fill="url(#colorExpenses)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </DashboardBox>

        <DashboardBox gridArea="b">
        <BoxHeader
            title="Profit and Revenue"
            subtitle="prof. and rev."
            sidetext="+4%"
          />
          <ResponsiveContainer width="100%" height="80%">
            <LineChart
              data={revenueProfit}
              margin={{
                top: 15,
                right: 25,
                left: -10,
              }}
              >

              <CartesianGrid vertical={false} stroke={palette.grey[800]} />
              <XAxis dataKey="name" 
                tickLine={false} 
                style={
                  { fontSize: "10px" }
                } />
              <YAxis 
                yAxisId={"left"}
                tickLine={false}
                axisLine={false}
                style={{ fontSize: "10px" }}
              />
              <YAxis 
                yAxisId={"right"}
                orientation="right"
                tickLine={false}
                axisLine={false}
                style={{ fontSize: "10px" }}
              />
              <Tooltip />
              <Legend height={20} wrapperStyle={{
                margin: '0 0 10px 0'
              }} />
              <Line 
                yAxisId={"left"}
                type="monotone"
                dataKey="profit"
                stroke={palette.tertiary[500]}
              />
              <Line 
                yAxisId={"right"}
                type="monotone"
                dataKey="revenue"
                stroke={palette.primary.main}
              />
            </LineChart>
          </ResponsiveContainer>
        </DashboardBox>

        <DashboardBox gridArea="c">
          <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop 
              offset="5%" 
              stopColor={palette.primary[300]} 
              stopOpacity={0.8}
            />
            <stop 
              offset="95%" 
              stopColor={palette.primary[300]} 
              stopOpacity={0}
            />
          </linearGradient>
          </defs>
          <BoxHeader
              title="Revenue month by month"
              subtitle="graph represent represent revenue month by month"
              sidetext="+4%"
            />
            <ResponsiveContainer width="100%" height="80%">
              <BarChart
                width={500}
                height={200}
                data={revenue}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={palette.grey[800]} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: "10px"}} />
                <YAxis axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
                <Tooltip />
                <Bar dataKey="revenue" fill="url(#colorRevenue)" />
              </BarChart>
            </ResponsiveContainer>
        </DashboardBox>
    </>
  )
}

export default Row1