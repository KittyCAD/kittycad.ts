import { Error_type, Event_type } from '../../models.js';
import { File } from '../../models.js';
import { Client } from '../../client.js';

interface Create_event_params {
  client?: Client;
  body: Event_type;
  files: File[];
}

type Create_event_return = Error_type;

export default async function create_event({
  client,
  files,
  body,
}: Create_event_params): Promise<Create_event_return> {
  const url = `/events`;
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
    'Content-Type': 'multipart/form-data',
  };

  const formData = new FormData();
  files.forEach((file) => {
    formData.append(file.name, file.data, file.name);
  });
  formData.append('event', JSON.stringify(body));

  const fetchOptions = {
    method: 'POST',
    headers,
    body: formData,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Create_event_return;
  return result;
}
