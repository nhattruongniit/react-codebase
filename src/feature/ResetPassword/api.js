import { kycHttp, urlApi } from 'service';

export const resetPassword = async (payload) => {
  const { data } = kycHttp.post({ path: `${urlApi.customer.resetPassword}`, payload });
  return data;
};
