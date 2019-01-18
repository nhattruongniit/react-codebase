import { kycHttp, urlApi } from 'service';

export const getInfo = async () => {
  const { data } = await kycHttp.get({ path: `${urlApi.customer.getInfo}` });
  return data;
};
