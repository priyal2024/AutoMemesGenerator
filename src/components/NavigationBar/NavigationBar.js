import React from 'react';
import HamBurgerIcon from '../HamBurgerIcon/HamBurgerIcon';
import '../../scss/navigation_bar.scss';

const NavigationBar = () => {
    return (
        <div className='navbarContainer'>
            <nav>
                <ul>
                    <li><HamBurgerIcon/></li>
                    <li>Home</li>
                    <li>Collection</li>
                    <li>Wishlist</li>
                    <li>Profile</li>
                    <li>Signout</li>
                </ul>
            </nav>
        </div>
    );
};

export default NavigationBar;