import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BudgetPatients from './BudgetPatient';
export default function BudgetPayments() {
  const budgets = useSelector(state => state.allBudgets);
  const newBudgets = budgets.filter(b => b.paid !== true);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',

        justifyContent: 'space-around',
        width: '175vh',
        marginLeft: '10px',
      }}
    >
      {newBudgets.map(e => (
        <BudgetPatients
          key={e.treatments.ID}
          linkPayment={e.linkPayment}
          description={JSON.parse(e.treatments)[0].description}
          totalPrice={e.totalPrice}
        />
      ))}
    </div>
  );
}