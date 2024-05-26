import React, { useState, useEffect } from 'react';

const UserStatistics = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMales, setTotalMales] = useState(0);
  const [totalFemales, setTotalFemales] = useState(0);

  useEffect(() => {
    // Fetch user statistics from the database
    // Example API call:
    // fetch('/api/user/statistics')
    //   .then(response => response.json())
    //   .then(data => {
    //     setTotalUsers(data.totalUsers);
    //     setTotalMales(data.totalMales);
    //     setTotalFemales(data.totalFemales);
    //   })
    //   .catch(error => console.error('Error fetching user statistics:', error));

    // Placeholder data
    setTotalUsers(2500);
    setTotalMales(1000);
    setTotalFemales(1500);
  }, []);

  return (
    <div className="row tile_count">
      <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
        <span className="count_top"><i className="fa fa-user"></i> Total Users</span>
        <div className="count">{totalUsers}</div>
      </div>
      <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
        <span className="count_top"><i className="fa fa-user"></i> Total Males</span>
        <div className="count green">{totalMales}</div>
      </div>
      <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
        <span className="count_top"><i className="fa fa-user"></i> Total Females</span>
        <div className="count">{totalFemales}</div>
      </div>
    </div>
  );
};

export default UserStatistics;
