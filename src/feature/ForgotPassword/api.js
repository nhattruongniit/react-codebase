import { kycHttp, urlApi } from 'service';

export const forgotPassword = async (domainApp, payload) => {
  const { data } = await kycHttp.post({ path: `kyc/${domainApp}/${urlApi.customer.forgotPassword}`, payload });
  return data;
};
