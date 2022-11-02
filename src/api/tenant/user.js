import axios from 'axios';

// 用户列表
export const getUserList = (query = {}) => axios(`user`, { params: Object.assign(query, { preload: 'SystemRole' }) });
// 删除用户
export const deleteUser = (userid) => axios.delete(`user/${userid}`);
// 添加用户
export const postAddUser = (body = {}) => axios.post(`user`, body);
//新建idaas账户
export const newPostAddUser = (body = {}) => axios.post(`api/authn/signup`, body);
//通过组织id获取账户信息
export const newGetUser = (query = {}) => axios.get(`api/authn/user`, { params: query });
//添加组织
export const newAddOrg = (body = {}) => axios.post(`api/idt/org`, body);

//添加实例
// export const addInstance = (body = {}) => axios.post(`authentication/instance`, body);
// 更改用户角色
export const putChangeUserRole = (roleid, userid, body = {}) => axios.put(`systemrole/${roleid}/user/${userid}`, body);
// 更新用户信息
export const putUpdateUser = (userid, body = {}) => axios.put(`user/${userid}`, body);
// 重设用户密码
export const postResetUserPassword = (userid, body = {}) => axios.post(`user/${userid}/reset_password`, body);
