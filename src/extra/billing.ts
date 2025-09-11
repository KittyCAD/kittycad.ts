/**
 * Adapted from https://github.com/KittyCAD/text-to-cad-ui/blob/309a2e756732b7b9a2b095d6a0f99bc23872d542/src/lib/billing.ts
 */

import { orgs, payments } from '..'
import { Client } from '../client'
import {
  CustomerBalance,
  UserOrgInfo,
  ZooProductSubscriptions,
} from '../models'

export enum EBillingError {
  NotOk,
  UnexpectedStatus,
  CatastrophicRequest,
  JSONParse,
}

export interface IBillingErrorNotOk {
  type: EBillingError.NotOk
  data: string
  response: Response
  message: string
}

export interface IBillingErrorUnexpectedStatus {
  type: EBillingError.UnexpectedStatus
  code: number
}

export interface IBillingErrorCatastrophicRequest {
  type: EBillingError.CatastrophicRequest
  url?: string
}

export interface IBillingErrorJSONParse {
  type: EBillingError.JSONParse
  error: Error
}

export type _IBillingError =
  | IBillingErrorNotOk
  | IBillingErrorUnexpectedStatus
  | IBillingErrorCatastrophicRequest
  | IBillingErrorJSONParse
export type IBillingError = _IBillingError extends { type: EBillingError }
  ? _IBillingError
  : never

export class BillingError {
  constructor(public error: IBillingError) {}

  static from(v: any): v is BillingError {
    return (
      typeof v === 'object' &&
      'error' in v &&
      'type' in v.error &&
      Object.values(EBillingError).some((x) => x === v.error.type)
    )
  }
}

async function fetchBilling<T, TT>(
  fn: (args: TT) => Promise<T>,
  options: TT
): Promise<T | BillingError> {
  try {
    const response = await fn(options)
    if (response === null) {
      return new BillingError({
        type: EBillingError.CatastrophicRequest,
        // url: dunno?
      })
    }

    if (typeof response === 'number') {
      return new BillingError({
        type: EBillingError.UnexpectedStatus,
        code: Number(response),
      })
    }
    return response
  } catch (e) {
    if ('status' in e) {
      const fallbackErrorMessage = `Failed to request endpoint: ${e.status}`
      const data = e.body
      const resolvedMessage =
        data instanceof Object && 'message' in data
          ? data.message
          : fallbackErrorMessage
      return new BillingError({
        type: EBillingError.NotOk,
        response: e,
        data: JSON.stringify(data),
        message: resolvedMessage,
      })
    }

    if (e instanceof SyntaxError) {
      return new BillingError({
        type: EBillingError.JSONParse,
        error: e,
      })
    }
    return e
  }
}

export enum Tier {
  Free = 'free',
  Plus = 'plus',
  Pro = 'pro',
  Organization = 'organization',
  Unknown = 'unknown',
}

type OrgOrError = UserOrgInfo | BillingError
type SubscriptionsOrError = ZooProductSubscriptions | BillingError
type TierBasedOn = {
  org: OrgOrError
  subscriptions: SubscriptionsOrError
}

const toTierFrom = (args: TierBasedOn): Tier => {
  if (!BillingError.from(args.org)) {
    return Tier.Organization
  } else if (!BillingError.from(args.subscriptions)) {
    if (args.subscriptions?.modeling_app?.name === 'pro') {
      return Tier.Pro
    } else if (args.subscriptions?.modeling_app?.name === 'plus') {
      return Tier.Plus
    } else {
      return Tier.Free
    }
  }

  return Tier.Unknown
}

export async function getBillingInfo(
  client: Client
): Promise<BillingError | { credits: number; allowance?: number; tier: Tier }> {
  const billing = await fetchBilling<
    CustomerBalance,
    { client: Client; include_total_due: boolean }
  >(payments.get_payment_balance_for_user, { client, include_total_due: false })

  if (BillingError.from(billing)) {
    return billing
  }

  const subscriptions = await fetchBilling<
    ZooProductSubscriptions,
    { client: Client }
  >(payments.get_user_subscription, { client })

  const org = await fetchBilling<UserOrgInfo, { client: Client }>(
    orgs.get_user_org,
    { client }
  )

  const tier = toTierFrom({
    org,
    subscriptions,
  })

  let credits =
    Number(billing.monthly_api_credits_remaining) +
    Number(billing.stable_api_credits_remaining)
  let allowance = undefined

  switch (tier) {
    case Tier.Organization:
    case Tier.Pro:
      credits = Infinity
      break
    case Tier.Free:
    case Tier.Plus:
      if (!BillingError.from(subscriptions)) {
        allowance = Number(
          subscriptions?.modeling_app?.monthly_pay_as_you_go_api_credits
        )
      }
      break
    case Tier.Unknown:
      break
  }

  return {
    tier,
    credits,
    allowance,
  }
}
