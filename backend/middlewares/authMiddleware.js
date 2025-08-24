// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
  // Safely get cookie

  //here we are trying to read the cookie header from the request
  //if the process of reading it is unsuccessful then we are returning an error
  const cookie = req.headers.cookie;
  if (!cookie) {
    return res.status(401).json({
      success: false,
      message: 'No token, Authorization denied'
    });
  }

  //  Extract token from cookie
  const token = cookie
    .split(';')
    .find(c => c.trim().startsWith('token='))
    ?.split('=')[1];
//we are validating the token after its extraction from the cookie
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token found in cookie'
    });
  }

  try {
    //now we have extracted the token and we are verifying it with our jwtkey
    const decoded = jwt.verify(token, process.env.JWT_KEY || 'xY7!kL9@qW3nR$sE5vG2#mP8&wZ6^tB1uN4oQcV7jX2%aF9');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Token verification failed'
    });
  }
};

module.exports = authToken;