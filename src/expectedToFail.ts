/**
 * These tests are not to be generated because they would cause
 * issues with running the rest of the test suite.
 *
 * Underscores in the names before the period should be replaced with hyphens
 */
// WATCH OUT. These do NOT respect the full path.
export const operationsToNotGenerateTestsFor = [
  'delete_user_self',
  'delete_payment_information_for_user',
  'oauth2_provider_callback_post',
  'get_any_org',
  'delete_payment_method_for_user',
  'list_invoices_for_user',
];

/**
 * Construct a test path string from a tag and operationId
 * to index into the arrays exported from this file
 */
export const toTestPathString = (tag: string, operationId: string) =>
  `${tag.trim()}.${operationId.trim()}`;

/**
 * These tests are expected to timeout due to the behavior of the Dev API
 *
 * Underscores in the names before the period should be replaced with hyphens
 */
export const expectedToTimeout = [
  'ai.create_image_to_3d',
  'ai.create_text_to_3d',
  'api-calls.get_api_call_metrics',
  'meta.get_metadata',
  'payments.get_payment_balance_for_user',
  'orgs.get_org_member',
];

/**
 * Tests that are expected to fail
 * They are not exactly ignored because we still hit the endpoint but might be rejected
 * because the dummy data in the tests is not valid
 * i.e. using a uuid like 000-000-....
 * The time spent making these all pass is not worth it because the endpoint already have tests
 * we mostly want to make sure the examples are valid aside from dummy data
 * or at the very least checked periodically.

 * Underscores in names before the period should be replaced with hyphens
 */
export const testsExpectedToThrow = [
  'api-calls.get_api_call_for_user',
  'api-calls.get_api_call',
  'api-calls.get_async_operation',
  'apps.apps_github_webhook',
  'meta.internal_get_api_token_for_discord_user',
  'oauth2.device_auth_verify',
  'oauth2.oauth2_provider_callback',
  'payments.validate_customer_tax_information_for_user',
  'payments.update_payment_balance_for_any_user',
  'payments.update_payment_balance_for_any_org',
  'payments.update_org_subscription',
  'payments.create_org_subscription',
  'orgs.update_org_privacy_settings',
  'orgs.update_org_member',
  'orgs.update_enterprise_pricing_for_org',
  'orgs.create_org_member',
  'oauth2.device_auth_confirm',
  'unit-get_frequency_unit_conversion',
  'unit.get_power_unit_conversion',
  'users.delete_user_self',
  'users.get_user_extended',
  'users.get_user_front_hash_self',
  'users.get_user',
  'users.update_user_privacy_settings',
  'api-tokens.delete_api_token_for_user',
  'api-tokens.get_api_token_for_user',
  'service-accounts.delete_service_account_for_org',
  'service-accounts.get_service_account_for_org',
  'users.get_session_for_user',

  'orgs.delete_org_member',
  'orgs.delete_org_saml_idp',
  'orgs.delete_org',
  'orgs.get_org_privacy_settings',
  'orgs.get_org_saml_idp',
  'orgs.get_org',
  'orgs.get_user_org',
  'payments.create_payment_intent_for_org',
  'payments.delete_payment_information_for_org',
  'payments.delete_payment_method_for_org',
  'payments.get_org_subscription',
  'payments.get_payment_balance_for_any_org',
  'payments.get_payment_balance_for_any_user',
  'payments.get_payment_balance_for_org',
  'payments.get_payment_information_for_org',
  'payments.get_user_subscription',
  'payments.list_invoices_for_org',
  'payments.list_payment_methods_for_org',
  'payments.create_payment_intent_for_user',
  'payments.get_payment_balance_for_user',
  'payments.get_payment_information_for_user',
  'payments.list_payment_methods_for_user',
  'payments.validate_customer_tax_information_for_org',
  'service-accounts.create_service_account_for_org',
  'users.get_user_privacy_settings',
  'meta.create_event',
  'ml.create_text_to_cad_multi_file_iteration',

  'users.delete_user_shortlink',
  'users.update_user_shortlink',

  'ml.create_text_to_cad_iteration',
  'ml.create_text_to_cad',
];
