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
    ? client.token
    : process.env.KITTYCAD_TOKEN ||
      process.env.KITTYCAD_API_TOKEN ||
      process.env.ZOO_API_TOKEN ||
      '';
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
