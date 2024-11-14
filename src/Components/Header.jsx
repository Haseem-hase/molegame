import React from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
  } from 'mdb-react-ui-kit';

function Header() {
  return (
    <div>
            <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
            <img
              src='https://flyclipart.com/thumb2/mole-splash-appstore-for-android-252835.png'
              height='30'
              alt=''
              loading='lazy'
            />
           Whack-a-Mole
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
        
    </div>
  )
}

export default Header