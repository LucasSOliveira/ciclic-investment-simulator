/* eslint-disable */
import axios from 'axios'

const baseURL = process.env.VUE_APP_SIMULATOR_API
const responseType = 'json'
const instance = axios.create({ baseURL, responseType })

export default instance

