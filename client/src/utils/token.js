import { jwtDecode } from 'jwt-decode'

/**
 *
 * @param {accessToken} token
 * @returns an object containing the details of the logged in user
 */
export const decodeToken = (token) => jwtDecode(token)
