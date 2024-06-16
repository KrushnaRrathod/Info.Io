// userReducer.js
const initialState = {
    isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true',
    firstName: JSON.parse(sessionStorage.getItem('firstName')) || null,
    lastName: JSON.parse(sessionStorage.getItem('lastName')) || null,
    email: JSON.parse(sessionStorage.getItem('email')) || null,
    phoneNumber: JSON.parse(sessionStorage.getItem('phoneNumber')) || null
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_USER':
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('firstName', JSON.stringify(action.payload));
        sessionStorage.setItem('lastName', JSON.stringify(action.payload));
        sessionStorage.setItem('email', JSON.stringify(action.payload));
        sessionStorage.setItem('phoneNumber', JSON.stringify(action.payload));
        return {
          ...state,
          isAuthenticated: true,
          firstName: action.payload,
          lastName: action.payload,
          email: action.payload,
          phoneNumber: action.payload
        };
      case 'LOGOUT_USER':
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('firstName');
        sessionStorage.removeItem('lastName');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('phoneNumber');
  
        return {
          ...state,
          isAuthenticated: false,
          firstName: null,
          lastName:null,
          email:null,
          phoneNumber:null
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  