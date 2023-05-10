// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
      <li>
        <NavLink className='navlink' exact to="/"><img src='https://img.freepik.com/premium-vector/icon-kindness-charity-hand-heart-hand-hug-heart-symbol-valentines-day-love-hand-drawn_81863-4927.jpg'/></NavLink>
      </li>
      <div className='right-nav'>
      {sessionUser ? <li>
        <NavLink className='create-spot' to="/spots/new">Create a New Spot</NavLink>
      </li> : null}
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      </div>
    </ul>
  );
}

export default Navigation;
