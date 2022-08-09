import fetch from 'node-fetch';
import {
  OAuth2ClientInfo_type,
  Error_type,
  AccountProvider_type,
} from '../../models.js';

interface Listen_oauth2_provider_consent_params {
  provider: AccountProvider_type;
  callback_url: string;
}

type Listen_oauth2_provider_consent_return = OAuth2ClientInfo_type | Error_type;

export default async function listen_oauth2_provider_consent({
  provider,
  callback_url,
}: Listen_oauth2_provider_consent_params): Promise<Listen_oauth2_provider_consent_return> {
  const url = `/oauth2/provider/${provider}/consent?callback_url=${callback_url}`;
  const fullUrl = 'https://api.kittycad.io' + url;
  const kittycadToken = process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'POST',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result =
    (await response.json()) as Listen_oauth2_provider_consent_return;
  return result;
}
