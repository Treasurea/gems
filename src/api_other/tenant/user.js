import axios from 'axios';

//新建idaas账户
export const newPostAddUser = (body = {}) => axios.post(`api/authn/signup`, body);
//通过组织id获取账户信息
export const newGetUser = (query = {}) => axios.get(`api/authn/user`, { params: query });
//添加组织
export const newAddOrg = (body = {}) => axios.post(`api/idt/org`, body);
