const jwt = require('jsonwebtoken');
const User = require('../models/user')

const authMiddleware = async (req, res, next) => {
   const { authorization } = req.headers;

   // Log the authorization header
   console.log('Authorization header:', authorization);

   if (!authorization) {
     return res.status(401).json({ error: 'Authorization token required' });
   }

   const token = authorization.split(' ')[1];
   try {
          // if token verified we get user id from it as we have passed it as an payload when we created a token
         const decoded = jwt.verify(token, process.env.SECRET);
         // Log the decoded token
         console.log('Decoded token:', decoded);

         const user = await User.findById(decoded._id).select('_id');

         // Log the user found in the database
         console.log('User found:', user);

         if (!user) {
             return res.status(401).json({ error: 'User not found' });
         }

         req.user = user;
         next();
   } catch (error) {
      console.error('Error during token verification or user lookup:', error);
      res.status(401).json({ error: 'Request is not authorized' });
   }
}

module.exports = authMiddleware;
