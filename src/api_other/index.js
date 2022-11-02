import Request from '@/utils/request';
// const api = 'https://sso.kubeboost.caas.fii-fmc.com/intmon'

// export const signin = (body = {}) => axios.post(`/api/authn/signin`, body)
export default {
  AddAc: (data) => {
    return Request({
      url: `/api/authn/signup`,
      method: 'post',
      data,
    });
  },
};
