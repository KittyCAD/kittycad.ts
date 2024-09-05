import {
  ApiCallQueryGroup_type,
  Error_type,
  ApiCallQueryGroupBy_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_api_call_metrics_params {
  client?: Client;
  group_by: ApiCallQueryGroupBy_type;
}

type Get_api_call_metrics_return = ApiCallQueryGroup_type[] | Error_type;

export default async function get_api_call_metrics({
  client,
  group_by,
}: Get_api_call_metrics_params): Promise<Get_api_call_metrics_return> {
  const url = `/api-call-metrics?group_by=${group_by}`;
  const urlBase = process?.env?.BASE_URL || 'https://api.zoo.dev';
  const fullUrl = urlBase + url;
  const kittycadToken = client
    ? client.token
    : process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'GET',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Get_api_call_metrics_return;
  return result;
}
