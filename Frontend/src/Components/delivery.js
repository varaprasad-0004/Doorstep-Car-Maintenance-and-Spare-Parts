import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Delivery() {
  const [addressData, setAddressData] = useState([]);
  const username = new URLSearchParams(window.location.search).get('username');

  useEffect(() => {
    axios
      .get('http://localhost:5005/getaddressdata')
      .then((response) => {
        console.log(response.data);
        setAddressData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching address data:', error);
      });
  }, []);

  const handleDeliveryStatusUpdate = (username, status) => {
    // Send a request to update delivery status
    axios.post('http://localhost:5005/updateDeliveryStatus', { username, status })
      .then((response) => {
        console.log(response.data);
        // Update the local state or fetch data again to reflect changes
      })
      .catch((error) => {
        console.error('Error updating delivery status:', error);
      });
  };

  return (
    <div>
      <h2>Delivery Address Data</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ddd', background: '#f2f2f2' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Door No</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Street</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>District</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>State</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Pin</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Mobile Number</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Delivered/Cancelled</th>
          </tr>
        </thead>
        <tbody>
          {addressData.map((user, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{user.fname}</td>
              <td style={{ padding: '10px' }}>{user.email}</td>
              <td style={{ padding: '10px' }}>{user.dno}</td>
              <td style={{ padding: '10px' }}>{user.street}</td>
              <td style={{ padding: '10px' }}>{user.district}</td>
              <td style={{ padding: '10px' }}>{user.state}</td>
              <td style={{ padding: '10px' }}>{user.pin}</td>
              <td style={{ padding: '10px' }}>{user.monum}</td>
              <td>
                <button onClick={() => handleDeliveryStatusUpdate(user.username, 'delivered')}>Delivered</button>
                <button onClick={() => handleDeliveryStatusUpdate(user.username, 'cancelled')}>Cancelled</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
