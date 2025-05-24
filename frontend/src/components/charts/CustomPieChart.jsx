import React, { useState, useEffect } from 'react'
import {
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

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 400);
    };

    checkScreenSize(); // initial check
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const outerRadius = isMobile ? 80 : 130;
  const innerRadius = isMobile ? 60 : 100;

  return (
    <ResponsiveContainer width="100%" height={isMobile ? 280 : 380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          labelLine={false}
          minAngle={5}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
          <Label
            value={`Total Balance:\n${totalAmount}`}
            position="center"
            fontSize={isMobile ? 12 : 16}
            fontWeight="bold"
            fill="#333"
          />
        </Pie>
        <Tooltip content={<CustomToolTip />} />
        <Legend content={<CustomLegend />} />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="#666"
              fontSize={isMobile ? "12px" : "14px"}
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
              fontSize={isMobile ? "18px" : "24px"}
              fontWeight="600"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
