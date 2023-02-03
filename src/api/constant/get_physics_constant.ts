import fetch from 'node-fetch';
import {
  PhysicsConstant_type,
  Error_type,
  PhysicsConstantName_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_physics_constant_params {
  client?: Client;
  constant: PhysicsConstantName_type;
}

type Get_physics_constant_return = PhysicsConstant_type | Error_type;

export default async function get_physics_constant({
  client,
  constant,
}: Get_physics_constant_params): Promise<Get_physics_constant_return> {
  const url = `/constant/physics/${constant}`;
  const urlBase = process?.env?.BASE_URL || 'https://api.kittycad.io';
  const fullUrl = urlBase + url;
  const kittycadToken = client
    ? client.token
    : process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'GET',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Get_physics_constant_return;
  return result;
}
