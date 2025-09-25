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
  'create_file_execution',
  'create_file_execution',
  'update_subscription_for_user',
  // WebSocket classes require a WS runtime in tests
  'create_executor_term',
  'modeling_commands_ws',
  // Endpoints that can return 204/empty bodies causing JSON.parse to throw
  'put_public_subscribe',
  // WebSocket tests that are noisy or require special setup
  'ml_copilot_ws',
  'ml_reasoning_ws',
  // Payments subscription update test causes side effects; skip generation
  'update_user_subscription',

  // All of these randomly timeout. Unacceptable nondeterminism.
  'get_any_org',
  'delete_org',
  'delete_payment_method_for_user',
  'list_invoices_for_user',
  'get_payment_balance_for_any_user',
]

/**
 * Construct a test path string from a tag and operationId
 * to index into the arrays exported from this file
 */
export const toTestPathString = (tag: string, operationId: string) =>
  `${tag.trim()}.${operationId.trim()}`

/**
 * These tests are expected to timeout due to the behavior of the Dev API
 *
 * Underscores in the names before the period should be replaced with hyphens
 */
export const expectedToTimeout = [
  'ai.create_image_to_3d',
  'ai.create_text_to_3d',
  'meta.get_metadata',
  'payments.get_payment_balance_for_user',
  'orgs.get_org_member',
]

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
  // api-calls family with dummy UUIDs or invalid pagination tokens
  'api-calls.get_api_call_for_org',
  'api-calls.list_api_calls',
  'api-calls.list_api_calls_for_user',
  'api-calls.list_async_operations',
  'api-calls.org_list_api_calls',
  'api-calls.user_list_api_calls',
  // tokens
  'api-tokens.list_api_tokens_for_user',
  // apps
  'apps.apps_github_callback',
  // executor WebSocket test skipped above
  // file (multipart without boundary in example)
  'file.create_file_conversion_options',
  // meta
  'meta.community_sso',
  'meta.create_debug_uploads',
  // ml
  'ml.create_proprietary_to_kcl',
  'ml.create_text_to_cad_part_feedback',
  'ml.get_ml_prompt',
  'ml.get_text_to_cad_part_for_user',
  'ml.list_conversations_for_user',
  'ml.list_ml_prompts',
  'ml.list_text_to_cad_parts_for_user',
  // oauth2 urlencoded examples
  'oauth2.device_access_token',
  'oauth2.device_auth_request',
  'oauth2.oauth2_token_revoke',
  // orgs with URL/UUID placeholders
  'orgs.create_org',
  'orgs.create_org_saml_idp',
  'orgs.get_org_shortlinks',
  'orgs.list_org_members',
  'orgs.list_orgs',
  'orgs.update_org',
  'orgs.update_org_saml_idp',
  // payments with invalid country codes
  'payments.create_payment_information_for_org',
  'payments.create_payment_information_for_user',
  'payments.update_payment_information_for_org',
  'payments.update_payment_information_for_user',
  // service accounts pagination token
  'service-accounts.list_service_accounts_for_org',
  // users
  'users.create_user_shortlink',
  'users.get_user_shortlinks',
  'users.list_users',
  'users.list_users_extended',
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
  'orgs.create_org_saml_idp',
  'oauth2.device_auth_confirm',
  'unit-get_frequency_unit_conversion',
  'unit.get_power_unit_conversion',
  'users.delete_user_self',
  'users.get_user_extended',
  'users.get_user_front_hash_self',
  'users.get_user',
  'users.update_user_privacy_settings',
  'users.update_user_self',
  'users.patch_user_crm',
  'users.put_public_form',
  'users.put_user_form_self',
  'users.put_public_subscribe',
  'api-tokens.delete_api_token_for_user',
  'api-tokens.get_api_token_for_user',
  'service-accounts.delete_service_account_for_org',
  'service-accounts.get_service_account_for_org',
  'users.get_session_for_user',

  'orgs.delete_org_member',
  'orgs.delete_org_saml_idp',
  'orgs.get_org_privacy_settings',
  'orgs.get_org_saml_idp',
  'orgs.get_org',
  'orgs.get_user_org',
  'payments.create_payment_intent_for_org',
  'payments.delete_payment_information_for_org',
  'payments.delete_payment_method_for_org',
  'payments.get_org_subscription',
  'payments.get_payment_balance_for_any_org',
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
]
