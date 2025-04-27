const { verifyToken } = require('../jwtUtils'); // Import the verifyToken function

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;  // Get the JWT from the cookies

  if (!token) {
    return res.status(403).send('Access denied. No token provided.');
  }

  try {
    const user = verifyToken(token);  // Verify the token using the secret key
    req.user = user;  // Attach user information (from the token) to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(403).send('Invalid token.');
  }
};

module.exports = authenticateJWT;
