import axios from 'axios';
export const addInstance = (body = {}) => axios.post(`api/authn/instance`, body);
export const getInstance = (query = {}) => axios.get(`api/authn/instance`, { params: query });
export const getOrg = (query = {}) => axios.get(`api/idt/org`, { params: query });
export const addAccount = (body = {}) => axios.post(`api/authn/signup`, body);
