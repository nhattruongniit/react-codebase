import { kycHttp, urlApi } from 'service';

export const changePassword = async (payload) => {
  const { data } = await kycHttp.post({ path: `${urlApi.customer.changePassword}`, payload });
  return data;
};
