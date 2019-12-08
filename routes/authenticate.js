const jwt = require('jsonwebtoken');

function getUser(req, res) {
  if (req.headers && req.headers.authorization) {
    let authorization = req.headers.authorization
    let decoded = ''
    try {
      decoded = jwt.verify(authorization, process.env.JWT_SECRET);
    } catch (e) {
      return {detail: 'unauthorized'}
    }
    return {detail: 'success', user: decoded.data}
    // Fetch the user by id
  }
  return {detail: 'no header'};
}

module.exports = {'getUser': getUser};
