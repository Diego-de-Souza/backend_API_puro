function isEmailValid(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
  
function isPasswordStrong(password) {
    return password.length >= 8 
      && /[A-Z]/.test(password) 
      && /[0-9]/.test(password);
}

module.exports = { isEmailValid, isPasswordStrong };