import React from 'react';
import RadialGraph from './RadialGraph'; // Import your RadialGraph component

const BookStatsComponent = ({ totalBooks, issuedBooks, overdueBooks }) => {
  return (
    <div style={{ backgroundColor: 'blue', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h2>Total Books</h2>
        <p>{totalBooks}</p>
      </div>
      <div>
        <RadialGraph title="Issued Books" value={issuedBooks} />
        <RadialGraph title="Overdue Books" value={overdueBooks} />
      </div>
    </div>
  );
}

export default BookStatsComponent;
