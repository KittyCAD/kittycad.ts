import {
  TextToCadIteration_type,
  Error_type,
  TextToCadIterationBody_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Create_text_to_cad_iteration_params {
  client?: Client;
  body: TextToCadIterationBody_type;
}

type Create_text_to_cad_iteration_return = TextToCadIteration_type | Error_type;

export default async function create_text_to_cad_iteration({
  client,
  body,
}: Create_text_to_cad_iteration_params): Promise<Create_text_to_cad_iteration_return> {
  const url = `/ml/text-to-cad/iteration`;
  const urlBase = process?.env?.BASE_URL || 'https://api.zoo.dev';
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
  const result = (await response.json()) as Create_text_to_cad_iteration_return;
  return result;
}
