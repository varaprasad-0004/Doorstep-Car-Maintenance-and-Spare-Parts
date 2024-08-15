import React from 'react';
import ScrollToTopButton from './Scroll';
import Imageslider from './imageslider';
import Aboutus from './aboutus';
import Process from './process';
import Form from './form';
import Brands from './brands';
import City from './city';
import Hfoot from './hfoot'

export default function Navbarr({ username }) {

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      };

    const handleSparez = () => {
        window.location.href = `/spares?username=${username}`;
    }

    const handleCart = () => {
        window.location.href = `/cart?username=${username}`;
    }

    const handlelogout = () => {
        window.location.href = `/`;
    }
  return (
    <div>
        <nav className="navbar navbar-dark bg-black fixed-top">
            <div className="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="Logo.png" alt="Bootstrap" width="200px" height="80px" style={{borderRadius: '0px 60px 60px 0px'}}></img>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/service">Service</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/contact">Contact</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" onClick={scrollToContact} aria-current="page" href="#contact">Request a Callback</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" onClick={handleSparez}>Shop</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" onClick={handleCart}>Cart</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" onClick={handlelogout}>Logout</a>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
            </nav>
    <div>
      <Imageslider/>
      <Aboutus/>
      <Process/>
      <Form/>
      <Brands/>
      <City/>
      <ScrollToTopButton/>
      <Hfoot/>
    </div>
    </div>
  )
}