import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import { IoMdDocument } from 'react-icons/io'
import moment from 'moment'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import InfoCard from '../Cards/InfoCard'
const RecentTransactions = ({transactions, onSeeMore}) => {
  console.log("Transactions data:", transactions);

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
       <h5 className='text-lg'>Recent Transactions</h5>

      <button className='card-btn' onClick={onSeeMore}>
        See All
        <LuArrowRight className='text-base' />
      </button>
{/* <TransactionInfoCard/> */}
      </div>
      <div className='mt-6'>
        
      {transactions?.slice(0,5)?.map((item, index) => (
        
  <TransactionInfoCard
    key={item._id || index}
    title={item.type === 'expense' ? item.category : item.source}
    icon={item.icon}
    date={moment(item.date).format('Do MM YYYY')}
    amount={item.amount}
    type={item.type}
    hideDeleteBtn
  />
))}    
      </div>
    </div>
  )
}

export default RecentTransactions