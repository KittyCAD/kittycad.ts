import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { DatasetS3Policies } from '../../models.js'

interface OrgDatasetS3PoliciesInput {
  client?: Client
  uri: string
  role_arn: string
}

type OrgDatasetS3PoliciesReturn = DatasetS3Policies

/**
 * Return the IAM policies customers should apply when onboarding an S3 dataset.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {string} uri Dataset URI used to scope generated IAM policies. (query)
 * @property {string} role_arn IAM role ARN customers expect Zoo to assume when reading the dataset. (query)
 * @returns {Promise<OrgDatasetS3PoliciesReturn>} successful operation
 *
 * Possible return types: DatasetS3Policies
 */
export default async function org_dataset_s3_policies({
  client,
  uri,
  role_arn,
}: OrgDatasetS3PoliciesInput): Promise<OrgDatasetS3PoliciesReturn> {
  const path = `/org/dataset/s3/policies`
  const qs = buildQuery({ uri: uri, role_arn: role_arn })
  const url = path + qs
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase = client?.baseUrl || 'https://api.zoo.dev'
  const fullUrl = urlBase + url
  const kittycadToken = client ? client.token || '' : ''
  const headers: Record<string, string> = {}
  if (kittycadToken) headers.Authorization = `Bearer ${kittycadToken}`
  const fetchOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as OrgDatasetS3PoliciesReturn
  return result
}
