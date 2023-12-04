import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import FlexBetween from '@/components/FlexBeetween'
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api'
import { Box, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const pieData = [
  { name: "Group A", value: 600},
  { name: "Group B", value: 400}
]

const Row2 = () => {
  const { data: operationalData  } = useGetKpisQuery()
  const { palette } = useTheme()

  const operationalExpenses = useMemo(() => {
    return (
      operationalData && 
      operationalData[0].monthlyData.map(({
        month, operationalExpenses, nonOperationalExpenses
      }) => {
        return {
          name: month.substring(0,3),
          "Operational Expenses": operationalExpenses,
          "Non Operational Expenses": nonOperationalExpenses
        }
      })
    )
  }, [operationalData])

  const pieColors = [palette.primary[800], palette.primary[300]]

  return (
    <>
    <DashboardBox gridArea="d">
      <BoxHeader
        title="Operational vs Non-Operational Expenses"
        subtitle="op. vs non. op expenses"
        sidetext="+4%"
      />
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={operationalExpenses}
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
          <Line 
            yAxisId={"left"}
            type="monotone"
            dataKey="Non Operational Expenses"
            stroke={palette.tertiary[500]}
          />
          <Line 
            yAxisId={"right"}
            type="monotone"
            dataKey="Operational Expenses"
            stroke={palette.primary.main}
          />
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>

    <DashboardBox gridArea="e">
    <BoxHeader
      title="Campaings and Targes"
      sidetext='+4%'
    />
    <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
      <PieChart 
        width={110} 
        height={100}
        margin={{
          top: 0,
          right: -10,
          left: 10,
          bottom: 10
        }}
      >
        <Pie
          stroke="none"
          data={pieData}
          innerRadius={18}
          outerRadius={38}
          dataKey="value"
        >
          {pieData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={pieColors[index]} />
          ))}
        </Pie>
      </PieChart>
      <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
          <Typography variant='h5'>
            Target Sales
          </Typography>
          <Typography variant="h3" m="0.3rem 0" color={palette.primary[300]}>
            83
          </Typography>
          <Typography variant='h6'>
            Finance goals of the campaing that is desired
          </Typography>
      </Box>
      <Box ml="-0.7rem" flexBasis="40%">
          <Typography variant='h5'>
            Losses in revenue
          </Typography>
          <Typography variant='h6'>
            Losses are down 25%
          </Typography>
          <Typography variant="h5">
            Profit Margins
          </Typography>
          <Typography variant='h6'>
            Margins are up by 30% from last month
          </Typography>
      </Box>
    </FlexBetween>
    </DashboardBox>

    </>
  )
}

export default Row2