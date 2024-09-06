import { Error_type, MlFeedback_type } from '../../models.js';
import { Client } from '../../client.js';

interface Create_text_to_cad_model_feedback_params {
  client?: Client;
  id: string;
  feedback: MlFeedback_type;
}

type Create_text_to_cad_model_feedback_return = Error_type;

export default async function create_text_to_cad_model_feedback({
  client,
  id,
  feedback,
}: Create_text_to_cad_model_feedback_params): Promise<Create_text_to_cad_model_feedback_return> {
  const url = `/user/text-to-cad/${id}?feedback=${feedback}`;
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
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result =
    (await response.json()) as Create_text_to_cad_model_feedback_return;
  return result;
}
