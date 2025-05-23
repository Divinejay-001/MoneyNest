import React from 'react'
import CustomPieChart from '../charts/CustomPieChart';


const COLORS = ['#0078FF',  '#FF0033', '#1ED728']
const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {

    const balanceData = [
        { name: 'Total Balance', amount: totalBalance },
        { name: 'Total Expenses', amount: totalExpense },
        { name: 'Total Income', amount: totalIncome },
      ];
      console.log("Chart Data:", balanceData);

  return (
    <div className='card'>
<div className='flex items-center justify-between '>
    <h5 className='text-lg'>Financial Overview</h5>
</div>

<CustomPieChart
data={balanceData}
label="Total Balance"
totalAmount={`$${totalBalance}`}
colors={COLORS}
showTextAnchor
/>
    </div>
  )
}

export default FinanceOverview