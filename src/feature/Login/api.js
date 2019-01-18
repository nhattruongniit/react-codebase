import { kycHttp, urlApi } from 'service';

export const login = async (domainApp, payload) => {
  const { data } = await kycHttp.post({ path: `kyc/${domainApp}/${urlApi.customer.login}`, payload });
  return data;
};
