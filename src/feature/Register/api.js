import { kycHttp, urlApi } from 'service';

export const register = async (nameApp, payload) => {
  const { data } = await kycHttp.post({ path: `kyc/${nameApp}/${urlApi.customer.register}`, payload });
  return data;
};
