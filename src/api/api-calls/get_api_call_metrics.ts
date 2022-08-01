import fetch from 'node-fetch';
import { ApiCallQueryGroup_type, Error_type } from '../../models.js';

interface Get_api_call_metrics_params {
  group_by: string;
}

type Get_api_call_metrics_return = ApiCallQueryGroup_type[] | Error_type;

export default async function get_api_call_metrics({
  group_by,
}: Get_api_call_metrics_params): Promise<Get_api_call_metrics_return> {
  const url = `/api-call-metrics?group_by=${group_by}`;
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
  const result = (await response.json()) as Get_api_call_metrics_return;
  return result;
}
