import fetch from 'node-fetch';
import {
  TextToCad_type,
  Error_type,
  FileExportFormat_type,
  TextToCadCreateBody_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Create_text_to_cad_params {
  client?: Client;
  output_format: FileExportFormat_type;
  kcl: boolean;
  body: TextToCadCreateBody_type;
}

type Create_text_to_cad_return = TextToCad_type | Error_type;

export default async function create_text_to_cad({
  client,
  output_format,
  kcl,
  body,
}: Create_text_to_cad_params): Promise<Create_text_to_cad_return> {
  const url = `/ai/text-to-cad/${output_format}?kcl=${kcl}`;
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
  const result = (await response.json()) as Create_text_to_cad_return;
  return result;
}
