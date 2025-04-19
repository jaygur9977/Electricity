// Simple mock auth middleware for demonstration
// In a real app, you'd use JWT or similar

module.exports = (req, res, next) => {
    // For demo purposes, we'll just check for a userId header
    const userId = req.headers['x-user-id'] || req.query.userId || req.body.userId;
    
    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Attach user to request
    req.user = { userId };
    next();
  };