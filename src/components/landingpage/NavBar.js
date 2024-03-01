import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../../assets/images/logos/images/Logo_2-removebg-preview.png';
import navIcon1 from '../../assets/images/img/nav-icon1.svg';
import navIcon2 from '../../assets/images/img/nav-icon2.svg';
import navIcon3 from '../../assets/images/img/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  const redirectToExternalUrl = () => {
    window.location.href = 'https://arloader.000webhostapp.com/modelMindARPath1.html';
  };

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>HOME</Nav.Link>
            <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>ABOUT</Nav.Link>
            <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>FAQ</Nav.Link>
            <Nav.Link href="#connect" className={activeLink === 'connect' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('connect')}>CONTACT</Nav.Link>
          </Nav>
          <span className="navbar-text">
            <Link to='/adexplore'>
              <button className="vvd"><span>Let’s Explore</span></button>
            </Link>
          </span>
          {/* <span className="navbar-text">
              <button className="vvd" onClick={redirectToExternalUrl}><span>Let’s Explore</span></button>
          </span> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
