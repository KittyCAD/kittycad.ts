import fetch from 'node-fetch';
import {
  KclCodeCompletionResponse_type,
  Error_type,
  KclCodeCompletionRequest_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Create_kcl_code_completions_params {
  client?: Client;
  body: KclCodeCompletionRequest_type;
}

type Create_kcl_code_completions_return =
  | KclCodeCompletionResponse_type
  | Error_type;

export default async function create_kcl_code_completions({
  client,
  body,
}: Create_kcl_code_completions_params): Promise<Create_kcl_code_completions_return> {
  const url = `/ai/kcl/completions`;
  const urlBase = process?.env?.BASE_URL || 'https://api.kittycad.io';
  const fullUrl = urlBase + url;
  const kittycadToken = client
    ? client.token
    : process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Create_kcl_code_completions_return;
  return result;
}
