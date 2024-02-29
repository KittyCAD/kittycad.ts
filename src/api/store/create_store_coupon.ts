import fetch from 'node-fetch';
import {
  DiscountCode_type,
  Error_type,
  StoreCouponParams_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Create_store_coupon_params {
  client?: Client;
  body: StoreCouponParams_type;
}

type Create_store_coupon_return = DiscountCode_type | Error_type;

export default async function create_store_coupon({
  client,
  body,
}: Create_store_coupon_params): Promise<Create_store_coupon_return> {
  const url = `/store/coupon`;
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
  const result = (await response.json()) as Create_store_coupon_return;
  return result;
}
