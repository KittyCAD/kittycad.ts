import {
  CodeOutput_type,
  Error_type,
  CodeLanguage_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Create_file_execution_params {
  client?: Client;
  lang: CodeLanguage_type;
  output: string;
  body: string;
}

type Create_file_execution_return = CodeOutput_type | Error_type;

export default async function create_file_execution({
  client,
  lang,
  output,
  body,
}: Create_file_execution_params): Promise<Create_file_execution_return> {
  const url = `/file/execute/${lang}?output=${output}`;
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
    body,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Create_file_execution_return;
  return result;
}
