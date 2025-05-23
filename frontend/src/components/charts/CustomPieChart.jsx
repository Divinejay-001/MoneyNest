import React from 'react'
import{
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    Label,
    ResponsiveContainer,
} from 'recharts'
import CustomToolTip from './CustomToolTip'
import CustomLegend from './CustomLegend'
const CustomPieChart = ({data, label, totalAmount, colors, showTextAnchor }) => {
  return (
<ResponsiveContainer width="100%" height={380}>
  <PieChart>
  <Pie
  data={data}
  dataKey="amount"
  nameKey="name"
  cx="50%"
  cy="50%"
  outerRadius={130}
  innerRadius={100}
  labelLine={false}
  minAngle={5}
>
  {data.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
  ))}
  {/* Add the label at the center of the chart */}
  <Label
    value={`Total Balance:\n${totalAmount}`}
    position="center"
    fontSize={18}
    fontWeight="bold"
    fill="#333"
  />
</Pie>
    <Tooltip content={<CustomToolTip />} />
    <Legend content= {<CustomLegend />} />

    {showTextAnchor && (
      <>
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#666"
          fontSize="14px"
        >
          {label}
        </text>
        <text
          x="50%"
          y="50%"
          dy="1.5em"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#333"
          fontSize="24px"
          fontWeight="600"
        >
          {totalAmount}
        </text>
      </>
    )}
  </PieChart>
</ResponsiveContainer>

)
}

export default CustomPieChart