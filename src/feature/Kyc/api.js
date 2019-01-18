import { kycHttp } from 'service';

export const getKycConfig = async ({ kycId }) => {
  const { data } = await kycHttp.get({ path: `api/kyc/${kycId}` });
  return data;
};

export const postKyc = async ({ kycId, formId, customerId, payload }) => {
  const { data } = await kycHttp.post({ path: `api/kyc/${kycId}/form/${formId}/customer/${customerId}`, payload });
  return data;
};
