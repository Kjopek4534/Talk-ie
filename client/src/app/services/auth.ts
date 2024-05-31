import axios from 'axios'

const API_URL = 'http://localhost:5000'

export const signIn = async (username: string, password: string) => {
  return axios.post(`${API_URL}/auth/signin`, { username, password })
}

export const signUp = async (
  username: string,
  email: string,
  password: string,
) => {
  return axios.post(`${API_URL}/auth/signup`, { username, email, password })
}

//test
