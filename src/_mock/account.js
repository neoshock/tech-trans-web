// ----------------------------------------------------------------------

 export const getUserDataFromLocalStorage = async () => {
  const user = {
    displayName: localStorage.getItem('full_name'),
    email: localStorage.getItem('email'),
    photoURL: '/assets/images/avatars/avatar_25.png',
  };
  return user;
}