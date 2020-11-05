/* eslint-disable */
import axios from 'axios'

const baseURL = process.env.VUE_APP_SIMULATOR_API
const headers = { 'Content-Type':'application/x-www-form-urlencoded'}
const responseType = 'json'

const instance = axios.create({ baseURL, headers, responseType })

export default instance

