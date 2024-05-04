import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectName, selectUser } from '../redux/features/auth/authSlice'; // Import the selector functions

function CheckComponent() {
  // useSelector hook to access values from Redux state
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const name = useSelector(selectName);
  const user = useSelector(selectUser);

  // Logging the values to the console
  console.log('Is Logged In:', isLoggedIn);
  console.log('Name:', name);
  console.log('User:', user);
  console.log('seen')

  return (
    <div>
      <h1>Yes</h1>
    </div>
  );
}

export default CheckComponent;
