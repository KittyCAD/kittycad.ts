import fetch from 'node-fetch';
import { CodeOutput_type, Error_type } from '../../models.js';

interface Create_file_execution_params {
  lang: string;
  output: string;
  body: string;
}

type Create_file_execution_return = CodeOutput_type | Error_type;

export default async function create_file_execution({
  lang,
  output,
  body,
}: Create_file_execution_params): Promise<Create_file_execution_return> {
  const url = `/file/execute/${lang}?output=${output}`;
  const fullUrl = 'https://api.kittycad.io' + url;
  const kittycadToken = process.env.KITTYCAD_TOKEN || '';
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
