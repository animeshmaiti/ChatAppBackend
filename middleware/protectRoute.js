import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const protectRoute = async(req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    if (!decoded) {
        return res.status(401).json({ error: 'Unauthorized' });        
    }

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log('Error in protectRoute: ', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export default protectRoute;