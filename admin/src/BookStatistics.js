import React, { useState, useEffect } from 'react';

const BookStatistics = () => {
  const [topBooks, setTopBooks] = useState([]);

  useEffect(() => {
    // Fetch top books statistics from the database
    // Example API call:
    // fetch('/api/book/top')
    //   .then(response => response.json())
    //   .then(data => setTopBooks(data))
    //   .catch(error => console.error('Error fetching top books:', error));

    // Placeholder data
    const placeholderData = [
      { title: 'In Search of Lost Time by Marcel Proust', rating: '66%', count: '123k' },
      { title: 'Don Quixote by Miguel de Cervantes', rating: '45%', count: '53k' },
      // Other placeholder book entries
    ];
    setTopBooks(placeholderData);
  }, []);

  return (
    <div className="row">
      <div className="col-md-6 col-sm-6 col-xs-12">
        <div className="x_panel tile">
          <div className="x_title">
            <h2>Top rating</h2>
            {/* Other JSX */}
            <div className="clearfix"></div>
          </div>
          <div className="x_content">
            <h4>Books</h4>
            {topBooks.map((book, index) => (
              <div className="widget_summary" key={index}>
                <div className="w_left w_25">
                  <span>{book.title}</span>
                </div>
                <div className="w_center w_55">
                  <div className="progress">
                    <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: book.rating }}>
                      <span className="sr-only">{book.rating} Complete</span>
                    </div>
                  </div>
                </div>
                <div className="w_right w_20">
                  <span>{book.count}</span>
                </div>
                <div className="clearfix"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Other JSX */}
    </div>
  );
};

export default BookStatistics;
