import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Addmin = () => {
  const [userData, setUserData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');
  const [addressData, setAddressData] = useState([]);
  const [userCredentials, setUserCredentials] = useState([]);
  const [serviceData, setServiceData] = useState([]);

  const showContent = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    axios
      .get('http://localhost:5005/getAdminData')
      .then((response) => {
        console.log(response.data);
        setUserData(response.data.groupedData);
        setTotalUsers(response.data.totalUsers);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });

    // Fetch user credentials
    axios
      .get('http://localhost:5005/getuserpass')
      .then((response) => {
        console.log(response.data);
        setUserCredentials(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user credentials:', error);
      });

    axios
      .get('http://localhost:5005/getser')
      .then((response) => {
        console.log(response.data);
        setServiceData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user credentials:', error);
      });

    // Fetch address data
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

  const getOrderStatus = (username) => {
    const userAddressData = addressData.find((address) => address.username === username);
  
    if (userAddressData) {
      return {
        status: 'ordered',
        orderedDate: userAddressData.date,
      };
    } else {
      return {
        status: 'pending',
        orderedDate: null,
      };
    }
  };
  

  return (
    <div>
      <nav className="navbar navbar-dark bg-black fixed-top">
        <div className="container-fluid">
          <h3 style={{ color: 'white', padding: '10px' }}>Dashboard</h3>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Dashboard
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    onClick={() => showContent('home')}
                  >
                    Users
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    onClick={() => showContent('pro')}
                  >
                    Productz
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    onClick={() => showContent('callback')}
                  >
                    Callback Data
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    onClick={() => showContent('orderz')}
                  >
                    Orderz
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <section>
      {currentPage === 'home' && (
        <>
            <div className='row' style={{ marginTop: '100px', textAlign: 'center' }}>
            <div className='col-md-2' style={{ backgroundColor: 'darkcyan', borderRadius: '20px' }}>
                <h4 style={{ color: 'white' }}>Userz Registered</h4>
                <h1 style={{ color: 'white' }}>{totalUsers}</h1>
            </div>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    {userCredentials.map((user, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ marginRight: '10px', fontSize: '20px' }}>👤</span>
                        <p style={{ fontSize: '18px', fontWeight:'bold' }}>{user.username}</p>
                    </div>
                    ))}
                </div>
            </div>

        </>
      )}
        {currentPage === 'pro' && (
  <>
    <table style={{ marginTop: '100px' }} border='4px' width='1000px'>
      <thead style={{marginTop:'500px'}}>
        <tr>
          <th>sl.no</th>
          <th>Username</th>
          <th>Items in the cart</th>
          <th>Date</th>
          <th>Cost of the each item</th>
          <th>Total Cost</th>
          <th>Order Status</th>
          <th>Ordered Date</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(userData).map((username, index) => (
          <tr key={username}>
            <td>{index + 1}</td>
            <td>{username}</td>
            <td>
              <ul>
                {userData[username].map((cartItem, cartIndex) => (
                  <li key={cartIndex} style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={cartItem.image}
                      style={{ height: '40px', width: '40px', borderRadius: '10px', marginRight: '10px', marginBottom:'10px' }}
                      alt={cartItem.title}
                    />
                    <p>{cartItem.title}</p>
                  </li>
                ))}
              </ul>
            </td>
            <td>
              <ul>
                {userData[username].map((cartItem, cartIndex) => (
                  <li key={cartIndex} style={{ display: 'flex', alignItems: 'center' }}>                         
                    <p>{cartItem.date}</p>
                  </li>
                ))}
              </ul>
            </td>
            <td>
              <ul>
                {userData[username].map((cartItem, cartIndex) => (
                  <p key={cartIndex}>{cartItem.price}</p>
                ))}
              </ul>
            </td>
            <td>
              {userData[username].reduce((total, cartItem) => total + cartItem.price, 0)}
            </td>
            <td>{getOrderStatus(username).status}</td>
            <td>{getOrderStatus(username).orderedDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)}
      {currentPage === 'callback' && (
        <>
        <table style={{ marginTop: '100px' }} border='4px' width='1000px'>
            <thead style={{marginTop:'500px'}}>
            <tr>
                <th>Sl.no</th>
                <th>Date</th>
                <th>Username</th>
                <th>Customer Details</th>
                <th>Vehicle Details</th>
            </tr>
            </thead>
            <tbody>
            {serviceData.map((cartItem, index) => (
                <tr>
                  <td>{index+1}</td>
                  <td>{cartItem.date}</td>
                  <td>{cartItem.username}</td>
                  <td>
                    <ul>
                      <li>{cartItem.fname}</li>
                      <li>{cartItem.email}</li>
                      <li>{cartItem.number}</li>
                      <li>{cartItem.anumber}</li>
                      <li>{cartItem.address}</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>{cartItem.vnumber}</li>
                      <li>{cartItem.engine}</li>
                      <li>{cartItem.model}</li>
                      <li>{cartItem.year}</li>
                      <li>{cartItem.colour}</li>
                    </ul>
                  </td>
                </tr>
            ))}
            </tbody>
        </table>
      </>
      )}
      {currentPage === 'orderz' && (
        <>
            
        </>
      )}
      </section>
    </div>
  );
};

export default Addmin;
