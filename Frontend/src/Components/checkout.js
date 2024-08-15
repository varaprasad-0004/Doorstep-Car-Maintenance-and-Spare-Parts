import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';

export default function Profile() {
  const [addressData, setAddressData] = useState([]);
  const [usernamesList, setUsernamesList] = useState([]);
  const username = new URLSearchParams(window.location.search).get('username');
  const [formdata, setFormdata] = useState({
    fname: '',
    email: '',
    dno: '',
    street: '',
    district: '',
    state: '',
    pin: '',
    monum: '',
  });
  const [carts, setCart] = useState([]);

  useEffect(() => {
    // Fetch cart items
    axios
      .get(`http://localhost:5005/getitems?username=${username}`)
      .then((response) => {
        console.log(response.data.cartitems);
        setCart(response.data.cartitems);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch address data
    axios
      .get('http://localhost:5005/getaddressdata')
      .then((response) => {
        console.log(response.data);
        setAddressData(response.data);

        // Extract usernames from the address data and set the list
        const usernames = response.data.map((user) => user.username);
        setUsernamesList(usernames);

        setConfirmedUsernames(usernames);
      })
      .catch((error) => {
        console.error('Error fetching address data:', error);
      });
  }, [username]);  

  const total = carts.reduce((acc, item) => acc + item.price, 0);

  const dc = 70;

  const currentdatee = new Date();
  const month = currentdatee.getMonth();
  const year = currentdatee.getFullYear();
  const date = currentdatee.getDate();
  const formattedDate = `${date}/${month}/${year}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      username: username,
      formdata: formdata,
      date: formattedDate,
    };

    axios
      .post('http://localhost:5005/addaddress', requestData)
      .then((response) => {
        console.log(response.data);
        alert('Submitted Successfully');

        // Generate PDF
        generatePDF(formdata);

        // Redirect to home after a delay
        setTimeout(() => {
          window.location.href = `/home?username=${username}`;
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const generatePDF = async (formData) => {
    const pdf = new jsPDF();

    // Header
    pdf.setFontSize(18);
    pdf.text(70, 20, 'DYNO CAR SPAREZ');
    pdf.setFontSize(16);
    pdf.text(20, 40, 'Invoice');

    // Content
    pdf.setFontSize(14);
    pdf.text(20, 50, 'Billing Details');
    pdf.setFontSize(12);
    pdf.text(20, 60, `Date: ${date}/${month + 1}/${year}`);
    pdf.text(20, 70, `Name: ${formData.fname}`);
    pdf.text(20, 80, `Email: ${formData.email}`);
    pdf.text(20, 90, `Mobile Number: ${formData.monum}`);

    pdf.setFontSize(14);
    pdf.text(20, 110, 'Delivery Address');
    pdf.setFontSize(12);
    pdf.text(20, 120, `Door No: ${formData.dno}`);
    pdf.text(20, 130, `Street: ${formData.street}`);
    pdf.text(20, 140, `District: ${formData.district}`);
    pdf.text(20, 150, `State: ${formData.state}`);
    pdf.text(20, 160, `Pin: ${formData.pin}`);

    pdf.setFontSize(14);
    pdf.text(20, 180, 'Cart Summary');
    pdf.setFontSize(12);

    try {
      const cartItems = await fetchData();

      cartItems.forEach((item, index) => {
        pdf.text(20, 190 + index * 10, `${index + 1}. ${item.title} - ${item.price.toFixed(2)}`);
      });

      // Total items cost
      pdf.text(20, 190 + cartItems.length * 10 + 10, `Total Items Cost: ${(total + dc).toFixed(2)}`);

      // Footer
      pdf.setFontSize(12);
      pdf.text(20, pdf.internal.pageSize.height - 20, 'Thank you for your business!');

      // Save or open the PDF
      pdf.save('invoice.pdf');
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const fetchData = async () => {
    // Simulate fetching cart items from an API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(carts);
      }, 1000);
    });
  };

  const blk = (v) => {
    v.target.style.backgroundColor = 'red';
    v.target.style.color = 'black';
    v.target.style.fontWeight = 'bold';
    v.target.style.border = 'none';
  };

  const lkb1 = (v) => {
    v.target.style.backgroundColor = 'black';
    v.target.style.color = 'white';
    v.target.style.fontWeight = 'normal';
    v.target.style.border = '1px solid white';
  };


  const [confirmedUsernames, setConfirmedUsernames] = useState([]);
  const isOrderConfirmed = confirmedUsernames.includes(username);

  // Display checkout form if order is pending
  return (
    <div style={{ background: '#bababa' }}>
        <div>
      <div className="row">
        <div className="col-md-2">
          <Link to={`/home?username=${username}`}>
            <img
              style={{ cursor: 'pointer', width: '100%', borderRadius: '0px 60px 60px 0px' }}
              src="Logo.png"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-3 mt-4">
          <h2 style={{ color: 'black', textDecoration: 'none' }}>Checkout</h2>
        </div>
        <div className="col-md-4 mt-3">
          <Link to={`/cart `}>
            <button onMouseOver={blk} onMouseLeave={lkb1} className="btn0">
              Cart
            </button>
          </Link>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <h4>Welcome "{username}"</h4>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <h4>Enter the Delivery Address</h4>
          <form onSubmit={handleSubmit}>
            <label className="gaali">Full Name:</label>
            <input
              onChange={(e) => setFormdata({ ...formdata, fname: e.target.value })}
              name="fname"
              required
              type="text"
            />
            <br />
            <label className="gaali">Email:</label>
            <input
              onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
              name="email"
              required
              type="email"
            />
            <br />
            <label className="gaali">Door No:</label>
            <input
              onChange={(e) => setFormdata({ ...formdata, dno: e.target.value })}
              name="dno"
              required
              type="text"
            />
            <br />
            <label className="gaali">Street:</label>
            <input
              onChange={(e) => setFormdata({ ...formdata, street: e.target.value })}
              name="street"
              required
              type="text"
            />
            <br />
            <label className="gaali">District:</label>
            <input
              onChange={(e) => setFormdata({ ...formdata, district: e.target.value })}
              name="district"
              required
              type="text"
            />
            <br />
            <label className="gaali">State</label>
            <input
              onChange={(e) => setFormdata({ ...formdata, state: e.target.value })}
              name="state"
              required
              type="text"
            />
            <br />
            <label className="gaali">Pin Number:</label>
            <input
              onChange={(e) => setFormdata({ ...formdata, pin: e.target.value })}
              name="engine"
              required
              type="number"
            />
            <br />
            <label className="gaali">Mobile Number:</label>
            <input
              onChange={(e) => setFormdata({ ...formdata, monum: e.target.value })}
              name="monum"
              required
              type="text"
            />
            <br />
            <input className="das" type="submit" value="Submit" />
          </form>
        </div>
        <div className="col-md-6">
          <h4>Cart Summary</h4>
          <div className="row">
            <div className="col-md-6">
              <h5 className="mt-5">Cart Items Cost: </h5>
            </div>
            <div className="col-md-6">
              <h5 className="mt-5">{total}</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h5 className="mt-5">Delivery Method: </h5>
            </div>
            <div className="col-md-6">
              <h5 style={{ color: 'green' }} className="mt-5">
                Cash on Delivery
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h5 className="mt-5">Delivery Cost: </h5>
            </div>
            <div className="col-md-6">
              <h5 style={{ color: 'green' }} className="mt-5">
                {dc}
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h5 className="mt-5">Total Items Cost:</h5>
            </div>
            <div className="col-md-6">
              <h5 className="mt-5">{total + dc}</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h5 className="mt-5">Expected Delivery Date: </h5>
            </div>
            <div className="col-md-6">
              <h5 style={{ color: 'green' }} className="mt-5">
                {date + 7}/{month}/{year}
              </h5>
            </div>
          </div>
        </div>
      </div>
        </div>
    </div>
  );
}