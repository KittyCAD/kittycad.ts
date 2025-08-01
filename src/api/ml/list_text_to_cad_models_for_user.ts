import {
  TextToCadResponseResultsPage_type,
  Error_type,
  CreatedAtSortMode_type,
  Uuid_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface List_text_to_cad_models_for_user_params {
  client?: Client;
  limit: number;
  page_token: string;
  sort_by: CreatedAtSortMode_type;
  conversation_id: Uuid_type;
  no_models: boolean;
}

type List_text_to_cad_models_for_user_return =
  | TextToCadResponseResultsPage_type
  | Error_type;

export default async function list_text_to_cad_models_for_user({
  client,
  limit,
  page_token,
  sort_by,
  conversation_id,
  no_models,
}: List_text_to_cad_models_for_user_params): Promise<List_text_to_cad_models_for_user_return> {
  const url = `/user/text-to-cad?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}&conversation_id=${conversation_id}&no_models=${no_models}`;
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase =
    process?.env?.ZOO_HOST || process?.env?.BASE_URL || 'https://api.zoo.dev';
  const fullUrl = urlBase + url;
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client
    ? client.token || process.env.ZOO_API_TOKEN || ''
    : process.env.KITTYCAD_TOKEN ||
      process.env.KITTYCAD_API_TOKEN ||
      process.env.ZOO_API_TOKEN ||
      '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
    'Content-Type': 'text/plain',
  };
  const fetchOptions = {
    method: 'GET',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result =
    (await response.json()) as List_text_to_cad_models_for_user_return;
  return result;
}
