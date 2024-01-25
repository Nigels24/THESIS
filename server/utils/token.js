const { sign } = require('jsonwebtoken')

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

const generateToken = (payload) => {
  if (!ACCESS_TOKEN_SECRET) throw new Error('Token secret is undefined.')

  return sign(payload, ACCESS_TOKEN_SECRET)
}

module.exports = {
  generateToken,
}
