export const testsExpectedToFail =
  // Tests that are expected to fail
  // They are not exactly ignored because we still hit the endpoint but might be rejected
  // because the dummy data in the tests is not valid
  // i.e. using a uuid like 000-000-....
  // The time spent making these all pass is not worth it because the endpoint already have tests
  // we mostly want to make sure the examples are valid aside from dummy data
  // or at the very least checked periodically.

  // underscores before the period should be replaced with hyphens
  [
    'api-calls.get_api_call_for_user',
    'api-calls.get_api_call',
    'api-calls.get_async_operation',
    'apps.apps_github_webhook',
    'meta.internal_get_api_token_for_discord_user',
    'oauth2.device_auth_verify',
    'oauth2.oauth2_provider_callback',
    'payments-get_payment_balance_for_user',
    'payments.delete_payment_information_for_user',
    'payments.delete_payment_method_for_user',
    'payments.validate_customer_tax_information_for_user',
    'unit-get_frequency_unit_conversion',
    'unit.get_power_unit_conversion',
    'users.delete_user_self',
    'users.get_user_extended',
    'users.get_user_front_hash_self',
    'users.get_user',
    'api-tokens.delete_api_token_for_user',
    'api-tokens.get_api_token_for_user',
    'service-accounts.delete_service_account_for_org',
    'service-accounts.get_service_account_for_org',
    'users.get_session_for_user',

    // it's possible some of these org tests are failing because Kurt's account and token
    // used in these test are not in an org
    'orgs.delete_org_member',
    'orgs.delete_org_saml_idp',
    'orgs.delete_org',
    'orgs.get_any_org',
    'orgs.get_org_member',
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
    'payments.validate_customer_tax_information_for_org',
    'service-accounts.create_service_account_for_org',
    'users.get_user_privacy_settings',

    // stateful. what matters is the creation variants succeed.
    'users.delete_user_shortlink',
  ];
