import { KclModel_type, CodeOption_type } from '../../models.js';
import { File } from '../../models.js';
import { Client } from '../../client.js';
import { throwIfNotOk } from '../../errors.js';

interface Create_proprietary_to_kcl_params {
  client?: Client;
  code_option: CodeOption_type;
  files: File[];
}

type Create_proprietary_to_kcl_return = KclModel_type;

export default async function create_proprietary_to_kcl({
  client,
  files,
  code_option,
}: Create_proprietary_to_kcl_params): Promise<Create_proprietary_to_kcl_return> {
  const url = `/ml/convert/proprietary-to-kcl?code_option=${code_option}`;
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

  const fetchOptions = {
    method: 'POST',
    headers,
    body: formData,
  };
  const response = await fetch(fullUrl, fetchOptions);
  await throwIfNotOk(response);
  const result = (await response.json()) as Create_proprietary_to_kcl_return;
  return result;
}
