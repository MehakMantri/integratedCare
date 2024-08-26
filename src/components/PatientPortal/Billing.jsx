import React from 'react';

function Billing() {
  const bills = [
    { id: 1, date: '2024-05-01', description: 'General Checkup', amount: 150, status: 'Unpaid' },
    { id: 2, date: '2024-04-15', description: 'Blood Test', amount: 75, status: 'Paid' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Billing</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id} className="border-b">
                <td className="py-3 px-4">{bill.date}</td>
                <td className="py-3 px-4">{bill.description}</td>
                <td className="py-3 px-4">${bill.amount}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded ${bill.status === 'Paid' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {bill.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Billing;