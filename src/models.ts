export type AccountProvider_type =
  /* An account provider. */
  'google' | 'github';

export interface Address_type {
  city: string /* The city component. */;
  country: string /* The country component. */;
  /* format:date-time, title:DateTime, description:The time and date the address was created. */
  created_at: string;
  id: Uuid_type /* The unique identifier of the address. */;
  state: string /* The state component. */;
  street1: string /* The first street component. */;
  street2: string /* The second street component. */;
  /* format:date-time, title:DateTime, description:The time and date the address was last updated. */
  updated_at: string;
  user_id: string /* The user ID that this address belongs to. */;
  zip: string /* The zip component. */;
}

export interface ApiCallQueryGroup_type {
  /*{
  "format": "int64"
}*/
  count: number;
  query: string;
}

export type ApiCallQueryGroupBy_type =
  /* The field of an API call to group by. */
  'email' | 'method' | 'endpoint' | 'user_id' | 'origin' | 'ip_address';

export type ApiCallStatus_type =
  /* The status of an async API call. */
  'Queued' | 'Uploaded' | 'In Progress' | 'Completed' | 'Failed';

export interface ApiCallWithPrice_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The date and time the API call completed billing."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The date and time the API call was created. */
  created_at: string;
  /*{
  "format": "duration",
  "nullable": true,
  "title": "int64",
  "description": "The duration of the API call."
}*/
  duration?: number;
  /* format:email, description:The user's email address. */
  email: string;
  endpoint: string /* The endpoint requested by the API call. */;
  id: Uuid_type /* The unique identifier for the API call. */;
  /*{
  "default": "",
  "format": "ip",
  "title": "String",
  "description": "The ip address of the origin."
}*/
  ip_address: string;
  method: Method_type /* The HTTP method requsted by the API call. */;
  /*{
  "format": "int32",
  "nullable": true,
  "description": "The number of minutes the API call was billed for."
}*/
  minutes?: number;
  origin: string /* The origin of the API call. */;
  /*{
  "format": "money-usd",
  "nullable": true,
  "title": "Number",
  "description": "The price of the API call."
}*/
  price?: number;
  /* nullable:true, description:The request body sent by the API call. */
  request_body?: string;
  request_query_params: string /* The request query params sent by the API call. */;
  /*{
  "nullable": true,
  "description": "The response body returned by the API call. We do not store this information if it is above a certain size."
}*/
  response_body?: string;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The date and time the API call started billing."
}*/
  started_at?: string;
  /*{
  "format": "int32",
  "nullable": true,
  "title": "int32",
  "description": "The status code returned by the API call."
}*/
  status_code?: number;
  stripe_invoice_item_id: string /* The Stripe invoice item ID of the API call if it is billable. */;
  token: Uuid_type /* The API token that made the API call. */;
  /* format:date-time, title:DateTime, description:The date and time the API call was last updated. */
  updated_at: string;
  user_agent: string /* The user agent of the request. */;
  user_id: string /* The ID of the user that made the API call. */;
}

export interface ApiCallWithPriceResultsPage_type {
  items: ApiCallWithPrice_type[] /* list of items on this page of results */;
  /*{
  "nullable": true,
  "description": "token used to fetch the next page of results (if any)"
}*/
  next_page?: string;
}

export interface ApiToken_type {
  /* format:date-time, title:DateTime, description:The date and time the API token was created. */
  created_at: string;
  id: string /* The unique identifier for the API token. */;
  is_valid: boolean /* If the token is valid. We never delete API tokens, but we can mark them as invalid. We save them for ever to preserve the history of the API token. */;
  token: Uuid_type /* The API token itself. */;
  /* format:date-time, title:DateTime, description:The date and time the API token was last updated. */
  updated_at: string;
  user_id: string /* The ID of the user that owns the API token. */;
}

export interface ApiTokenResultsPage_type {
  items: ApiToken_type[] /* list of items on this page of results */;
  /*{
  "nullable": true,
  "description": "token used to fetch the next page of results (if any)"
}*/
  next_page?: string;
}

export interface AsyncApiCall_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the async API call was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the async API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the async API call.

This is the same as the API call ID. */
  id: Uuid_type;
  input: string;
  output?: string;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the async API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the async API call. */;
  type: AsyncApiCallType_type /* The type of async API call. */;
  /*{
  "format": "date-time",
  "title": "DateTime",
  "description": "The time and date the async API call was last updated."
}*/
  updated_at: string;
  user_id: string /* The user ID of the user who created the async API call. */;
  worker: string /* The worker node that is performing or performed the async API call. */;
}

export type AsyncApiCallOutput_type =
  | {
      /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the file conversion was completed."
}*/
      completed_at?: string;
      /*{
  "format": "date-time",
  "title": "DateTime",
  "description": "The time and date the file conversion was created."
}*/
      created_at: string;
      /* nullable:true, description:The error the function returned, if any. */
      error?: string;
      /* The unique identifier of the file conversion.

This is the same as the API call ID. */
      id: Uuid_type;
      /*{
  "format": "byte",
  "nullable": true,
  "title": "String",
  "description": "The converted file, if completed, base64 encoded."
}*/
      output?: string;
      output_format: FileOutputFormat_type /* The output format of the file conversion. */;
      src_format: FileSourceFormat_type /* The source format of the file conversion. */;
      /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the file conversion was started."
}*/
      started_at?: string;
      status: ApiCallStatus_type /* The status of the file conversion. */;
      type: 'FileConversion';
      /*{
  "format": "date-time",
  "title": "DateTime",
  "description": "The time and date the file conversion was last updated."
}*/
      updated_at: string;
      user_id: string /* The user ID of the user who created the file conversion. */;
    }
  | {
      /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the mass was completed."
}*/
      completed_at?: string;
      /* format:date-time, title:DateTime, description:The time and date the mass was created. */
      created_at: string;
      /* nullable:true, description:The error the function returned, if any. */
      error?: string;
      /* The unique identifier of the mass request.

This is the same as the API call ID. */
      id: Uuid_type;
      /* format:double, nullable:true, description:The resulting mass. */
      mass?: number;
      /* default:0, format:float, description:The material density as denoted by the user. */
      material_density: number;
      src_format: FileSourceFormat_type /* The source format of the file. */;
      /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the mass was started."
}*/
      started_at?: string;
      status: ApiCallStatus_type /* The status of the mass. */;
      type: 'FileMass';
      /* format:date-time, title:DateTime, description:The time and date the mass was last updated. */
      updated_at: string;
      user_id: string /* The user ID of the user who created the mass. */;
    }
  | {
      /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the volume was completed."
}*/
      completed_at?: string;
      /* format:date-time, title:DateTime, description:The time and date the volume was created. */
      created_at: string;
      /* nullable:true, description:The error the function returned, if any. */
      error?: string;
      /* The unique identifier of the volume request.

This is the same as the API call ID. */
      id: Uuid_type;
      src_format: FileSourceFormat_type /* The source format of the file. */;
      /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the volume was started."
}*/
      started_at?: string;
      status: ApiCallStatus_type /* The status of the volume. */;
      type: 'FileVolume';
      /* format:date-time, title:DateTime, description:The time and date the volume was last updated. */
      updated_at: string;
      user_id: string /* The user ID of the user who created the volume. */;
      /* format:double, nullable:true, description:The resulting volume. */
      volume?: number;
    }
  | {
      /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the density was completed."
}*/
      completed_at?: string;
      /* format:date-time, title:DateTime, description:The time and date the density was created. */
      created_at: string;
      /* format:double, nullable:true, description:The resulting density. */
      density?: number;
      /* nullable:true, description:The error the function returned, if any. */
      error?: string;
      /* The unique identifier of the density request.

This is the same as the API call ID. */
      id: Uuid_type;
      /* default:0, format:float, description:The material mass as denoted by the user. */
      material_mass: number;
      src_format: FileSourceFormat_type /* The source format of the file. */;
      /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the density was started."
}*/
      started_at?: string;
      status: ApiCallStatus_type /* The status of the density. */;
      type: 'FileDensity';
      /* format:date-time, title:DateTime, description:The time and date the density was last updated. */
      updated_at: string;
      user_id: string /* The user ID of the user who created the density. */;
    };

export interface AsyncApiCallResultsPage_type {
  items: AsyncApiCall_type[] /* list of items on this page of results */;
  /*{
  "nullable": true,
  "description": "token used to fetch the next page of results (if any)"
}*/
  next_page?: string;
}

export type AsyncApiCallType_type =
  /* The type of async API call. */
  'FileConversion' | 'FileVolume' | 'FileMass' | 'FileDensity';

export interface BillingInfo_type {
  /* nullable:true, description:The address of the customer. */
  address: Address_type;
  name: string /* The name of the customer. */;
  /*{
  "default": "",
  "format": "phone",
  "title": "String",
  "description": "The phone for the customer."
}*/
  phone: string;
}

export interface CacheMetadata_type {
  ok: boolean /* If the cache returned an ok response from ping. */;
}

export interface CardDetails_type {
  /* Card brand.

Can be `amex`, `diners`, `discover`, `jcb`, `mastercard`, `unionpay`, `visa`, or `unknown`. */
  brand: string;
  /* default:{}, description:Checks on Card address and CVC if provided. */
  checks: PaymentMethodCardChecks_type;
  country: string /* Two-letter ISO code representing the country of the card. */;
  /*{
  "default": 0,
  "format": "int64",
  "description": "Two-digit number representing the card's expiration month."
}*/
  exp_month: number;
  /*{
  "default": 0,
  "format": "int64",
  "description": "Four-digit number representing the card's expiration year."
}*/
  exp_year: number;
  fingerprint: string /* Uniquely identifies this particular card number. */;
  /* Card funding type.

Can be `credit`, `debit`, `prepaid`, or `unknown`. */
  funding: string;
  last4: string /* The last four digits of the card. */;
}

export interface Cluster_type {
  /* format:ip, nullable:true, description:The IP address of the cluster. */
  addr?: string;
  /* default:0, format:int64, description:The auth timeout of the cluster. */
  auth_timeout: number;
  /* default:0, format:int64, description:The port of the cluster. */
  cluster_port: number;
  /* default:, description:The name of the cluster. */
  name: string;
  /* default:0, format:int64, description:The TLS timeout for the cluster. */
  tls_timeout: number;
  urls: string[];
}

export type CodeLanguage_type =
  /* The language code is written in. */
  'go' | 'python' | 'node';

export interface CodeOutput_type {
  output_files: OutputFile_type[] /* The contents of the files requested if they were passed. */;
  /* default:, description:The stderr of the code. */
  stderr: string;
  /* default:, description:The stdout of the code. */
  stdout: string;
}

export interface Commit_type {
  /*{
  "nullable": true,
  "description": "Commit ID of external tool expected by dockerd as set at build time."
}*/
  expected?: string;
  /* nullable:true, description:Actual commit ID of external tool. */
  id?: string;
}

export interface Connection_type {
  /* default:0, format:int64, description:The auth timeout of the server. */
  auth_timeout: number;
  /* default:{auth_timeout:0, cluster_port:0, name:, tls_timeout:0}, description:Information about the cluster. */
  cluster: Cluster_type;
  /* format:date-time, description:The time the configuration was loaded. */
  config_load_time: string;
  /* default:0, format:int64, description:The number of connections to the server. */
  connections: number;
  /* default:0, format:int64, description:The CPU core usage of the server. */
  cores: number;
  /*{
  "format": "double",
  "nullable": true
}*/
  cpu?: number;
  /* default:{auth_timeout:0, host:, name:, port:0, tls_timeout:0}, description:Information about the gateway. */
  gateway: Gateway_type;
  /* default:, description:The git commit. */
  git_commit: string;
  /* default:, description:The go version. */
  go: string;
  /* default:0, format:int64, description:`GOMAXPROCS` of the server. */
  gomaxprocs: number;
  /* format:ip, description:The host of the server. */
  host: string;
  /* default:, description:The http base path of the server. */
  http_base_path: string;
  /* default:, description:The http host of the server. */
  http_host: string;
  /* default:0, format:int64, description:The http port of the server. */
  http_port: number;
  http_req_stats: {
    [key: string]: /*{
  "format": "int64"
}*/
    number;
  };
  /* default:0, format:int64, description:The https port of the server. */
  https_port: number;
  /* default:0, format:int64, description:The count of inbound bytes for the server. */
  in_bytes: number;
  /* default:0, format:int64, description:The number of inbound messages for the server. */
  in_msgs: number;
  /* default:{config:{domain:, max_memory:0, max_storage:0, store_dir:}, meta:{cluster_size:0, leader:, name:}, stats:{accounts:0, api:{errors:0, inflight:0, total:0}, ha_assets:0, memory:0, reserved_memory:0, reserved_store:0, store:0}}, description:Jetstream information. */
  jetstream: Jetstream_type;
  /* default:{auth_timeout:0, host:, port:0, tls_timeout:0}, description:Information about leaf nodes. */
  leaf: LeafNode_type;
  /* default:0, format:int64, description:The number of leaf nodes for the server. */
  leafnodes: number;
  /* default:0, format:int64, description:The max connections of the server. */
  max_connections: number;
  /* default:0, format:int64, description:The max control line of the server. */
  max_control_line: number;
  /* default:0, format:int64, description:The max payload of the server. */
  max_payload: number;
  /* default:0, format:int64, description:The max pending of the server. */
  max_pending: number;
  /* default:0, format:int64, description:The memory usage of the server. */
  mem: number;
  /* format:date-time, description:The time now. */
  now: string;
  /* default:0, format:int64, description:The count of outbound bytes for the server. */
  out_bytes: number;
  /* default:0, format:int64, description:The number of outbound messages for the server. */
  out_msgs: number;
  /* default:0, format:int64, description:The ping interval of the server. */
  ping_interval: number;
  /* default:0, format:int64, description:The ping max of the server. */
  ping_max: number;
  /* default:0, format:int64, description:The port of the server. */
  port: number;
  /* default:0, format:int64, description:The protocol version. */
  proto: number;
  /* default:0, format:int64, description:The number of remotes for the server. */
  remotes: number;
  /* default:0, format:int64, description:The number of routes for the server. */
  routes: number;
  /* default:, description:The server ID. */
  server_id: string;
  /* default:, description:The server name. */
  server_name: string;
  /* default:0, format:int64, description:The number of slow consumers for the server. */
  slow_consumers: number;
  /* format:date-time, description:When the server was started. */
  start: string;
  /* default:0, format:int64, description:The number of subscriptions for the server. */
  subscriptions: number;
  /* default:, description:The system account. */
  system_account: string;
  /* default:0, format:int64, description:The TLS timeout of the server. */
  tls_timeout: number;
  /* default:0, format:int64, description:The total number of connections to the server. */
  total_connections: number;
  /* default:, description:The uptime of the server. */
  uptime: string;
  /* default:, description:The version of the service. */
  version: string;
  /* default:0, format:int64, description:The write deadline of the server. */
  write_deadline: number;
}

export type CreatedAtSortMode_type =
  /* Supported set of sort modes for scanning by created_at only.

Currently, we only support scanning in ascending order. */
  'created-at-ascending' | 'created-at-descending';

export type Currency_type =
  /* Currency is the list of supported currencies.

For more details see <https://support.stripe.com/questions/which-currencies-does-stripe-support>. */
  | 'aed'
  | 'afn'
  | 'all'
  | 'amd'
  | 'ang'
  | 'aoa'
  | 'ars'
  | 'aud'
  | 'awg'
  | 'azn'
  | 'bam'
  | 'bbd'
  | 'bdt'
  | 'bgn'
  | 'bif'
  | 'bmd'
  | 'bnd'
  | 'bob'
  | 'brl'
  | 'bsd'
  | 'bwp'
  | 'bzd'
  | 'cad'
  | 'cdf'
  | 'chf'
  | 'clp'
  | 'cny'
  | 'cop'
  | 'crc'
  | 'cve'
  | 'czk'
  | 'djf'
  | 'dkk'
  | 'dop'
  | 'dzd'
  | 'eek'
  | 'egp'
  | 'etb'
  | 'eur'
  | 'fjd'
  | 'fkp'
  | 'gbp'
  | 'gel'
  | 'gip'
  | 'gmd'
  | 'gnf'
  | 'gtq'
  | 'gyd'
  | 'hkd'
  | 'hnl'
  | 'hrk'
  | 'htg'
  | 'huf'
  | 'idr'
  | 'ils'
  | 'inr'
  | 'isk'
  | 'jmd'
  | 'jpy'
  | 'kes'
  | 'kgs'
  | 'khr'
  | 'kmf'
  | 'krw'
  | 'kyd'
  | 'kzt'
  | 'lak'
  | 'lbp'
  | 'lkr'
  | 'lrd'
  | 'lsl'
  | 'ltl'
  | 'lvl'
  | 'mad'
  | 'mdl'
  | 'mga'
  | 'mkd'
  | 'mnt'
  | 'mop'
  | 'mro'
  | 'mur'
  | 'mvr'
  | 'mwk'
  | 'mxn'
  | 'myr'
  | 'mzn'
  | 'nad'
  | 'ngn'
  | 'nio'
  | 'nok'
  | 'npr'
  | 'nzd'
  | 'pab'
  | 'pen'
  | 'pgk'
  | 'php'
  | 'pkr'
  | 'pln'
  | 'pyg'
  | 'qar'
  | 'ron'
  | 'rsd'
  | 'rub'
  | 'rwf'
  | 'sar'
  | 'sbd'
  | 'scr'
  | 'sek'
  | 'sgd'
  | 'shp'
  | 'sll'
  | 'sos'
  | 'srd'
  | 'std'
  | 'svc'
  | 'szl'
  | 'thb'
  | 'tjs'
  | 'top'
  | 'try'
  | 'ttd'
  | 'twd'
  | 'tzs'
  | 'uah'
  | 'ugx'
  | 'usd'
  | 'uyu'
  | 'uzs'
  | 'vef'
  | 'vnd'
  | 'vuv'
  | 'wst'
  | 'xaf'
  | 'xcd'
  | 'xof'
  | 'xpf'
  | 'yer'
  | 'zar'
  | 'zmw';

export interface Customer_type {
  /* nullable:true, description:The customer's address. */
  address: Address_type;
  /*{
  "default": 0,
  "format": "money-usd",
  "title": "Number",
  "description": "Current balance, if any, being stored on the customer in the payments service.\n\nIf negative, the customer has credit to apply to their next invoice. If positive, the customer has an amount owed that will be added to their next invoice. The balance does not refer to any unpaid invoices; it solely takes into account amounts that have yet to be successfully applied to any invoice. This balance is only taken into account as invoices are finalized."
}*/
  balance: number;
  /* format:date-time, description:Time at which the object was created. */
  created_at: string;
  currency: Currency_type /* Three-letter ISO code for the currency the customer can be charged in for recurring billing purposes. */;
  /*{
  "default": false,
  "description": "When the customer's latest invoice is billed by charging automatically, `delinquent` is `true` if the invoice's latest charge failed.\n\nWhen the customer's latest invoice is billed by sending an invoice, `delinquent` is `true` if the invoice isn't paid by its due date.  If an invoice is marked uncollectible by dunning, `delinquent` doesn't get reset to `false`."
}*/
  delinquent: boolean;
  /* format:email, description:The customer's email address. */
  email: string;
  id: string /* Unique identifier for the object. */;
  metadata: { [key: string]: string };
  name: string /* The customer's full name or business name. */;
  /*{
  "default": "",
  "format": "phone",
  "title": "String",
  "description": "The customer's phone number."
}*/
  phone: string;
}

export interface CustomerBalance_type {
  /* format:date-time, title:DateTime, description:The date and time the balance was created. */
  created_at: string;
  id: Uuid_type /* The unique identifier for the balance. */;
  /*{
  "format": "money-usd",
  "title": "Number",
  "description": "The monthy credits remaining in the balance. This gets re-upped every month, but if the credits are not used for a month they do not carry over to the next month. It is a stable amount granted to the user per month."
}*/
  monthly_credits_remaining: number;
  /*{
  "format": "money-usd",
  "title": "Number",
  "description": "The amount of pre-pay cash remaining in the balance. This number goes down as the user uses their pre-paid credits. The reason we track this amount is if a user ever wants to withdraw their pre-pay cash, we can use this amount to determine how much to give them. Say a user has $100 in pre-paid cash, their bill is worth, $50 after subtracting any other credits (like monthly etc.) Their bill is $50, their pre-pay cash remaining will be subtracted by 50 to pay the bill and their `pre_pay_credits_remaining` will be subtracted by 50 to pay the bill. This way if they want to withdraw money after, they can only withdraw $50 since that is the amount of cash they have remaining."
}*/
  pre_pay_cash_remaining: number;
  /*{
  "format": "money-usd",
  "title": "Number",
  "description": "The amount of credits remaining in the balance. This is typically the amount of cash * some multiplier they get for pre-paying their account. This number lowers every time a bill is paid with the balance. This number increases every time a user adds funds to their balance. This may be through a subscription or a one off payment."
}*/
  pre_pay_credits_remaining: number;
  /*{
  "format": "money-usd",
  "title": "Number",
  "description": "This includes any outstanding, draft, or open invoices and any pending invoice items. This does not include any credits the user has on their account."
}*/
  total_due: number;
  /* format:date-time, title:DateTime, description:The date and time the balance was last updated. */
  updated_at: string;
  user_id: string /* The user ID the balance belongs to. */;
}

export interface DeviceAccessTokenRequestForm_type {
  /* format:uuid, description:The client ID. */
  client_id: string;
  /* format:uuid, description:The device code. */
  device_code: string;
  grant_type: OAuth2GrantType_type /* The grant type. */;
}

export interface DeviceAuthRequestForm_type {
  /* format:uuid, description:The client ID. */
  client_id: string;
}

export interface DeviceAuthVerifyParams_type {
  user_code: string /* The user code. */;
}

export interface DockerSystemInfo_type {
  /*{
  "nullable": true,
  "description": "Hardware architecture of the host, as returned by the Go runtime (`GOARCH`).  A full list of possible values can be found in the [Go documentation](https://golang.org/doc/install/source#environment)."
}*/
  architecture?: string;
  /*{
  "nullable": true,
  "description": "Indicates if `bridge-nf-call-ip6tables` is available on the host."
}*/
  bridge_nf_ip6tables?: boolean;
  /*{
  "nullable": true,
  "description": "Indicates if `bridge-nf-call-iptables` is available on the host."
}*/
  bridge_nf_iptables?: boolean;
  /* nullable:true, description:The driver to use for managing cgroups. */
  cgroup_driver: SystemInfoCgroupDriverEnum_type;
  /* nullable:true, description:The version of the cgroup. */
  cgroup_version: SystemInfoCgroupVersionEnum_type;
  /*{
  "nullable": true,
  "description": "The network endpoint that the Engine advertises for the purpose of node discovery. ClusterAdvertise is a `host:port` combination on which the daemon is reachable by other hosts.\n\n**Deprecated**: This field is only propagated when using standalone Swarm mode, and overlay networking using an external k/v store. Overlay networks with Swarm mode enabled use the built-in raft store, and this field will be empty."
}*/
  cluster_advertise?: string;
  /*{
  "nullable": true,
  "description": "URL of the distributed storage backend.   The storage backend is used for multihost networking (to store network and endpoint information) and by the node discovery mechanism.\n\n**Deprecated**: This field is only propagated when using standalone Swarm mode, and overlay networking using an external k/v store. Overlay networks with Swarm mode enabled use the built-in raft store, and this field will be empty."
}*/
  cluster_store?: string;
  /*{
  "nullable": true
}*/
  containerd_commit: Commit_type;
  /* format:int64, nullable:true, description:Total number of containers on the host. */
  containers?: number;
  /* format:int64, nullable:true, description:Number of containers with status `\\\paused\\\`. */
  containers_paused?: number;
  /* format:int64, nullable:true, description:Number of containers with status `\\\running\\\`. */
  containers_running?: number;
  /* format:int64, nullable:true, description:Number of containers with status `\\\stopped\\\`. */
  containers_stopped?: number;
  /*{
  "nullable": true,
  "description": "Indicates if CPU CFS(Completely Fair Scheduler) period is supported by the host."
}*/
  cpu_cfs_period?: boolean;
  /*{
  "nullable": true,
  "description": "Indicates if CPU CFS(Completely Fair Scheduler) quota is supported by the host."
}*/
  cpu_cfs_quota?: boolean;
  /*{
  "nullable": true,
  "description": "Indicates if CPUsets (cpuset.cpus, cpuset.mems) are supported by the host.  See [cpuset(7)](https://www.kernel.org/doc/Documentation/cgroup-v1/cpusets.txt)"
}*/
  cpu_set?: boolean;
  /*{
  "nullable": true,
  "description": "Indicates if CPU Shares limiting is supported by the host."
}*/
  cpu_shares?: boolean;
  /*{
  "nullable": true,
  "description": "Indicates if the daemon is running in debug-mode / with debug-level logging enabled."
}*/
  debug?: boolean;
  default_address_pools: SystemInfoDefaultAddressPools_type[] /* List of custom default address pools for local networks, which can be specified in the daemon.json file or dockerd option.  Example: a Base \"10.10.0.0/16\" with Size 24 will define the set of 256 10.10.[0-255].0/24 address pools. */;
  /*{
  "nullable": true,
  "description": "Name of the default OCI runtime that is used when starting containers.  The default can be overridden per-container at create time."
}*/
  default_runtime?: string;
  /*{
  "nullable": true,
  "description": "Root directory of persistent Docker state.  Defaults to `/var/lib/docker` on Linux, and `C:\\\\ProgramData\\\\docker` on Windows."
}*/
  docker_root_dir?: string;
  /* nullable:true, description:Name of the storage driver in use. */
  driver?: string;
  driver_status: string[][];
  /*{
  "nullable": true,
  "description": "Indicates if experimental features are enabled on the daemon."
}*/
  experimental_build?: boolean;
  /*{
  "nullable": true,
  "description": "HTTP-proxy configured for the daemon. This value is obtained from the [`HTTP_PROXY`](https://www.gnu.org/software/wget/manual/html_node/Proxies.html) environment variable. Credentials ([user info component](https://tools.ietf.org/html/rfc3986#section-3.2.1)) in the proxy URL are masked in the API response.  Containers do not automatically inherit this configuration."
}*/
  http_proxy?: string;
  /*{
  "nullable": true,
  "description": "HTTPS-proxy configured for the daemon. This value is obtained from the [`HTTPS_PROXY`](https://www.gnu.org/software/wget/manual/html_node/Proxies.html) environment variable. Credentials ([user info component](https://tools.ietf.org/html/rfc3986#section-3.2.1)) in the proxy URL are masked in the API response.  Containers do not automatically inherit this configuration."
}*/
  https_proxy?: string;
  /*{
  "nullable": true,
  "description": "Unique identifier of the daemon.\n\n**Note**: The format of the ID itself is not part of the API, and should not be considered stable."
}*/
  id?: string;
  /*{
  "format": "int64",
  "nullable": true,
  "description": "Total number of images on the host. Both _tagged_ and _untagged_ (dangling) images are counted."
}*/
  images?: number;
  /*{
  "nullable": true,
  "description": "Address / URL of the index server that is used for image search, and as a default for user authentication for Docker Hub and Docker Cloud."
}*/
  index_server_address?: string;
  /*{
  "nullable": true,
  "description": "Name and, optional, path of the `docker-init` binary.  If the path is omitted, the daemon searches the host's `$PATH` for the binary and uses the first result."
}*/
  init_binary?: string;
  /*{
  "nullable": true
}*/
  init_commit: Commit_type;
  /* nullable:true, description:Indicates IPv4 forwarding is enabled. */
  ipv4_forwarding?: boolean;
  /*{
  "nullable": true,
  "description": "Represents the isolation technology to use as a default for containers. The supported values are platform-specific.  If no isolation value is specified on daemon start, on Windows client, the default is `hyperv`, and on Windows server, the default is `process`.  This option is currently not used on other platforms."
}*/
  isolation: SystemInfoIsolationEnum_type;
  /*{
  "nullable": true,
  "description": "Indicates if the host has kernel memory limit support enabled.\n\n**Deprecated**: This field is deprecated as the kernel 5.4 deprecated `kmem.limit_in_bytes`."
}*/
  kernel_memory?: boolean;
  /*{
  "nullable": true,
  "description": "Indicates if the host has kernel memory TCP limit support enabled.  Kernel memory TCP limits are not supported when using cgroups v2, which does not support the corresponding `memory.kmem.tcp.limit_in_bytes` cgroup."
}*/
  kernel_memory_tcp?: boolean;
  /*{
  "nullable": true,
  "description": "Kernel version of the host.  On Linux, this information obtained from `uname`. On Windows this information is queried from the <kbd>HKEY_LOCAL_MACHINE\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows NT\\\\\\\\CurrentVersion\\\\\\\\</kbd> registry value, for example _\\\"10.0 14393 (14393.1198.amd64fre.rs1_release_sec.170427-1353)\\\"_."
}*/
  kernel_version?: string;
  labels: string[];
  /*{
  "nullable": true,
  "description": "Indicates if live restore is enabled.  If enabled, containers are kept running when the daemon is shutdown or upon daemon start if running containers are detected."
}*/
  live_restore_enabled?: boolean;
  /*{
  "nullable": true,
  "description": "The logging driver to use as a default for new containers."
}*/
  logging_driver?: string;
  /*{
  "format": "int64",
  "nullable": true,
  "description": "Total amount of physical memory available on the host, in bytes."
}*/
  mem_total?: number;
  /*{
  "nullable": true,
  "description": "Indicates if the host has memory limit support enabled."
}*/
  memory_limit?: boolean;
  /* format:int64, nullable:true, description:Number of event listeners subscribed. */
  n_events_listener?: number;
  /*{
  "format": "int64",
  "nullable": true,
  "description": "The total number of file Descriptors in use by the daemon process.  This information is only returned if debug-mode is enabled."
}*/
  n_fd?: number;
  /* nullable:true, description:Hostname of the host. */
  name?: string;
  /*{
  "format": "int64",
  "nullable": true,
  "description": "The number of logical CPUs usable by the daemon.  The number of available CPUs is checked by querying the operating system when the daemon starts. Changes to operating system CPU allocation after the daemon is started are not reflected."
}*/
  ncpu?: number;
  /*{
  "nullable": true,
  "description": "Comma-separated list of domain extensions for which no proxy should be used. This value is obtained from the [`NO_PROXY`](https://www.gnu.org/software/wget/manual/html_node/Proxies.html) environment variable.  Containers do not automatically inherit this configuration."
}*/
  no_proxy?: string;
  /*{
  "nullable": true,
  "description": "Indicates if OOM killer disable is supported on the host."
}*/
  oom_kill_disable?: boolean;
  /*{
  "nullable": true,
  "description": "Name of the host's operating system, for example: \\\"Ubuntu 16.04.2 LTS\\\" or \\\"Windows Server 2016 Datacenter\\\""
}*/
  operating_system?: string;
  /*{
  "nullable": true,
  "description": "Generic type of the operating system of the host, as returned by the Go runtime (`GOOS`).  Currently returned values are \\\"linux\\\" and \\\"windows\\\". A full list of possible values can be found in the [Go documentation](https://golang.org/doc/install/source#environment)."
}*/
  os_type?: string;
  /*{
  "nullable": true,
  "description": "Version of the host's operating system\n\n**Note**: The information returned in this field, including its very existence, and the formatting of values, should not be considered stable, and may change without notice."
}*/
  os_version?: string;
  /*{
  "nullable": true,
  "description": "Indicates if the host kernel has PID limit support enabled."
}*/
  pids_limit?: boolean;
  /*{
  "nullable": true
}*/
  plugins: PluginsInfo_type;
  /*{
  "nullable": true,
  "description": "Reports a summary of the product license on the daemon.  If a commercial license has been applied to the daemon, information such as number of nodes, and expiration are included."
}*/
  product_license?: string;
  /*{
  "nullable": true
}*/
  registry_config: RegistryServiceConfig_type;
  /*{
  "nullable": true
}*/
  runc_commit: Commit_type;
  runtimes: { [key: string]: Runtime_type };
  security_options: string[];
  /*{
  "nullable": true,
  "description": "Version string of the daemon. **Note**: the [standalone Swarm API](https://docs.docker.com/swarm/swarm-api/) returns the Swarm version instead of the daemon  version, for example `swarm/1.2.8`."
}*/
  server_version?: string;
  /*{
  "nullable": true,
  "description": "Indicates if the host has memory swap limit support enabled."
}*/
  swap_limit?: boolean;
  /*{
  "nullable": true,
  "description": "The  number of goroutines that currently exist.  This information is only returned if debug-mode is enabled."
}*/
  system_time?: string;
  warnings: string[];
}

export interface EmailAuthenticationForm_type {
  /*{
  "format": "uri",
  "nullable": true,
  "description": "The URL to redirect back to after we have authenticated."
}*/
  callback_url?: string;
  /* format:email, description:The user's email. */
  email: string;
}

export interface EngineMetadata_type {
  async_jobs_running: boolean /* If any async job is currently running. */;
  cache: CacheMetadata_type /* Metadata about our cache. */;
  environment: Environment_type /* The environment we are running in. */;
  fs: FileSystemMetadata_type /* Metadata about our file system. */;
  git_hash: string /* The git hash of the server. */;
  pubsub: Connection_type /* Metadata about our pub-sub connection. */;
}

export type Environment_type =
  /* The environment the server is running in. */
  'DEVELOPMENT' | 'PREVIEW' | 'PRODUCTION';

export interface Error_type {
  error_code: string;
  message: string;
  request_id: string;
}

export interface ExecutorMetadata_type {
  docker_info: DockerSystemInfo_type /* Information about the docker daemon. */;
  environment: Environment_type /* The environment we are running in. */;
  git_hash: string /* The git hash of the server. */;
}

export interface ExtendedUser_type {
  company: string /* The user's company. */;
  /* format:date-time, title:DateTime, description:The date and time the user was created. */
  created_at: string;
  discord: string /* The user's Discord handle. */;
  /* format:email, description:The email address of the user. */
  email: string;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The date and time the email address was verified."
}*/
  email_verified?: string;
  first_name: string /* The user's first name. */;
  github: string /* The user's GitHub handle. */;
  id: string /* The unique identifier for the user. */;
  /* format:uri, title:String, description:The image avatar for the user. This is a URL. */
  image: string;
  last_name: string /* The user's last name. */;
  /*{
  "nullable": true,
  "description": "The user's MailChimp ID. This is mostly used for internal mapping."
}*/
  mailchimp_id?: string;
  name: string /* The name of the user. This is auto populated at first from the authentication provider (if there was a name). It can be updated by the user by updating their `first_name` and `last_name` fields. */;
  /*{
  "default": "",
  "format": "phone",
  "title": "String",
  "description": "The user's phone number."
}*/
  phone: string;
  /*{
  "nullable": true,
  "description": "The user's Stripe ID. This is mostly used for internal mapping."
}*/
  stripe_id?: string;
  /* format:date-time, title:DateTime, description:The date and time the user was last updated. */
  updated_at: string;
  /*{
  "nullable": true,
  "description": "The user's Zendesk ID. This is mostly used for internal mapping."
}*/
  zendesk_id?: string;
}

export interface ExtendedUserResultsPage_type {
  items: ExtendedUser_type[] /* list of items on this page of results */;
  /*{
  "nullable": true,
  "description": "token used to fetch the next page of results (if any)"
}*/
  next_page?: string;
}

export interface FileConversion_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the file conversion was completed."
}*/
  completed_at?: string;
  /*{
  "format": "date-time",
  "title": "DateTime",
  "description": "The time and date the file conversion was created."
}*/
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the file conversion.

This is the same as the API call ID. */
  id: Uuid_type;
  /*{
  "format": "byte",
  "nullable": true,
  "title": "String",
  "description": "The converted file, if completed, base64 encoded."
}*/
  output?: string;
  output_format: FileOutputFormat_type /* The output format of the file conversion. */;
  src_format: FileSourceFormat_type /* The source format of the file conversion. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the file conversion was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the file conversion. */;
  /*{
  "format": "date-time",
  "title": "DateTime",
  "description": "The time and date the file conversion was last updated."
}*/
  updated_at: string;
  user_id: string /* The user ID of the user who created the file conversion. */;
}

export interface FileDensity_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the density was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the density was created. */
  created_at: string;
  /* format:double, nullable:true, description:The resulting density. */
  density?: number;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the density request.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:float, description:The material mass as denoted by the user. */
  material_mass: number;
  src_format: FileSourceFormat_type /* The source format of the file. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the density was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the density. */;
  /* format:date-time, title:DateTime, description:The time and date the density was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the density. */;
}

export interface FileMass_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the mass was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the mass was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the mass request.

This is the same as the API call ID. */
  id: Uuid_type;
  /* format:double, nullable:true, description:The resulting mass. */
  mass?: number;
  /* default:0, format:float, description:The material density as denoted by the user. */
  material_density: number;
  src_format: FileSourceFormat_type /* The source format of the file. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the mass was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the mass. */;
  /* format:date-time, title:DateTime, description:The time and date the mass was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the mass. */;
}

export type FileOutputFormat_type =
  /* The valid types of output file formats. */
  'stl' | 'obj' | 'dae' | 'step' | 'fbx' | 'fbxb';

export type FileSourceFormat_type =
  /* The valid types of source file formats. */
  'stl' | 'obj' | 'dae' | 'step' | 'fbx';

export interface FileSystemMetadata_type {
  ok: boolean /* If the file system passed a sanity check. */;
}

export interface FileVolume_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the volume was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the volume was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the volume request.

This is the same as the API call ID. */
  id: Uuid_type;
  src_format: FileSourceFormat_type /* The source format of the file. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the volume was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the volume. */;
  /* format:date-time, title:DateTime, description:The time and date the volume was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the volume. */;
  /* format:double, nullable:true, description:The resulting volume. */
  volume?: number;
}

export interface Gateway_type {
  /* default:0, format:int64, description:The auth timeout of the gateway. */
  auth_timeout: number;
  /* default:, description:The host of the gateway. */
  host: string;
  /* default:, description:The name of the gateway. */
  name: string;
  /* default:0, format:int64, description:The port of the gateway. */
  port: number;
  /* default:0, format:int64, description:The TLS timeout for the gateway. */
  tls_timeout: number;
}

export interface IndexInfo_type {
  mirrors: string[];
  /* nullable:true, description:Name of the registry, such as \\\docker.io\\\. */
  name?: string;
  /*{
  "nullable": true,
  "description": "Indicates whether this is an official registry (i.e., Docker Hub / docker.io)"
}*/
  official?: boolean;
  /*{
  "nullable": true,
  "description": "Indicates if the registry is part of the list of insecure registries.  If `false`, the registry is insecure. Insecure registries accept un-encrypted (HTTP) and/or untrusted (HTTPS with certificates from unknown CAs) communication.\n\n**Warning**: Insecure registries can be useful when running a local registry. However, because its use creates security vulnerabilities it should ONLY be enabled for testing purposes. For increased security, users should add their CA to their system's list of trusted CAs instead of enabling this option."
}*/
  secure?: boolean;
}

export interface Invoice_type {
  /*{
  "default": 0,
  "format": "money-usd",
  "title": "Number",
  "description": "Final amount due at this time for this invoice.\n\nIf the invoice's total is smaller than the minimum charge amount, for example, or if there is account credit that can be applied to the invoice, the `amount_due` may be 0. If there is a positive `starting_balance` for the invoice (the customer owes money), the `amount_due` will also take that into account. The charge that gets generated for the invoice will be for the amount specified in `amount_due`."
}*/
  amount_due: number;
  /*{
  "default": 0,
  "format": "money-usd",
  "title": "Number",
  "description": "The amount, in USD, that was paid."
}*/
  amount_paid: number;
  /*{
  "default": 0,
  "format": "money-usd",
  "title": "Number",
  "description": "The amount remaining, in USD, that is due."
}*/
  amount_remaining: number;
  /*{
  "default": 0,
  "format": "uint64",
  "minimum": 0,
  "description": "Number of payment attempts made for this invoice, from the perspective of the payment retry schedule.\n\nAny payment attempt counts as the first attempt, and subsequently only automatic retries increment the attempt count. In other words, manual payment attempts after the first attempt do not affect the retry schedule."
}*/
  attempt_count: number;
  /*{
  "default": false,
  "description": "Whether an attempt has been made to pay the invoice.\n\nAn invoice is not attempted until 1 hour after the `invoice.created` webhook, for example, so you might not want to display that invoice as unpaid to your users."
}*/
  attempted: boolean;
  /* format:date-time, description:Time at which the object was created. */
  created_at: string;
  currency: Currency_type /* Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. */;
  /*{
  "format": "email",
  "description": "The email address for the customer. Until the invoice is finalized, this field will equal customer.email. Once the invoice is finalized, this field will no longer be updated."
}*/
  customer_email: string;
  customer_id: string /* Customer ID. The unique identifier for the customer this invoice belongs to. This is the customer ID in the payments service, not our database customer ID. */;
  default_payment_method: string /* Default payment method. */;
  description: string /* Description of the invoice. */;
  id: string /* Unique identifier for the object. */;
  /* The individual line items that make up the invoice.

`lines` is sorted as follows: invoice items in reverse chronological order, followed by the subscription, if any. */
  lines: InvoiceLineItem_type[];
  metadata: { [key: string]: string };
  number: string /* A unique, identifying string that appears on emails sent to the customer for this invoice. */;
  /*{
  "default": false,
  "description": "Whether payment was successfully collected for this invoice.\n\nAn invoice can be paid (most commonly) with a charge or with credit from the customer's account balance."
}*/
  paid: boolean;
  /* format:uri, nullable:true, description:The link to download the PDF for the invoice. */
  pdf?: string;
  receipt_number: string /* This is the transaction number that appears on email receipts sent for this invoice. */;
  statement_descriptor: string /* Extra information about an invoice for the customer's credit card statement. */;
  /*{
  "nullable": true,
  "description": "The status of the invoice, one of `draft`, `open`, `paid`, `uncollectible`, or `void`.\n\n[Learn more](https://stripe.com/docs/billing/invoices/workflow#workflow-overview)."
}*/
  status: InvoiceStatus_type;
  /*{
  "default": 0,
  "format": "money-usd",
  "title": "Number",
  "description": "Total of all subscriptions, invoice items, and prorations on the invoice before any invoice level discount or tax is applied.\n\nItem discounts are already incorporated."
}*/
  subtotal: number;
  /*{
  "default": 0,
  "format": "money-usd",
  "title": "Number",
  "description": "The amount of tax on this invoice.\n\nThis is the sum of all the tax amounts on this invoice."
}*/
  tax: number;
  /*{
  "default": 0,
  "format": "money-usd",
  "title": "Number",
  "description": "Total after discounts and taxes."
}*/
  total: number;
  /*{
  "format": "uri",
  "nullable": true,
  "description": "The URL for the hosted invoice page, which allows customers to view and pay an invoice."
}*/
  url?: string;
}

export interface InvoiceLineItem_type {
  /*{
  "default": 0,
  "format": "money-usd",
  "title": "Number",
  "description": "The amount, in USD."
}*/
  amount: number;
  currency: Currency_type /* Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. */;
  description: string /* The description. */;
  id: string /* Unique identifier for the object. */;
  invoice_item: string /* The ID of the invoice item associated with this line item if any. */;
  metadata: { [key: string]: string };
}

export type InvoiceStatus_type =
  /* An enum representing the possible values of an `Invoice`'s `status` field. */
  'deleted' | 'draft' | 'open' | 'paid' | 'uncollectible' | 'void';

export interface Jetstream_type {
  /* default:{domain:, max_memory:0, max_storage:0, store_dir:}, description:The Jetstream config. */
  config: JetstreamConfig_type;
  /* default:{cluster_size:0, leader:, name:}, description:Meta information about the cluster. */
  meta: MetaClusterInfo_type;
  /* default:{accounts:0, api:{errors:0, inflight:0, total:0}, ha_assets:0, memory:0, reserved_memory:0, reserved_store:0, store:0}, description:Jetstream statistics. */
  stats: JetstreamStats_type;
}

export interface JetstreamApiStats_type {
  /* default:0, format:int64, description:The number of errors. */
  errors: number;
  /* default:0, format:int64, description:The number of inflight requests. */
  inflight: number;
  /* default:0, format:int64, description:The number of requests. */
  total: number;
}

export interface JetstreamConfig_type {
  /* default:, description:The domain. */
  domain: string;
  /* default:0, format:int64, description:The max memory. */
  max_memory: number;
  /* default:0, format:int64, description:The max storage. */
  max_storage: number;
  /* default:, description:The store directory. */
  store_dir: string;
}

export interface JetstreamStats_type {
  /* default:0, format:int64, description:The number of accounts. */
  accounts: number;
  /* default:{errors:0, inflight:0, total:0}, description:API stats. */
  api: JetstreamApiStats_type;
  /* default:0, format:int64, description:The number of HA assets. */
  ha_assets: number;
  /* default:0, format:int64, description:The memory used by the Jetstream server. */
  memory: number;
  /* default:0, format:int64, description:The reserved memory for the Jetstream server. */
  reserved_memory: number;
  /* default:0, format:int64, description:The reserved storage for the Jetstream server. */
  reserved_store: number;
  /* default:0, format:int64, description:The storage used by the Jetstream server. */
  store: number;
}

export interface LeafNode_type {
  /* default:0, format:int64, description:The auth timeout of the leaf node. */
  auth_timeout: number;
  /* default:, description:The host of the leaf node. */
  host: string;
  /* default:0, format:int64, description:The port of the leaf node. */
  port: number;
  /* default:0, format:int64, description:The TLS timeout for the leaf node. */
  tls_timeout: number;
}

export interface MetaClusterInfo_type {
  /* default:0, format:int64, description:The size of the cluster. */
  cluster_size: number;
  /* default:, description:The leader of the cluster. */
  leader: string;
  /* default:, description:The name of the cluster. */
  name: string;
}

export interface Metadata_type {
  cache: CacheMetadata_type /* Metadata about our cache. */;
  engine: EngineMetadata_type /* Metadata about our engine API connection. */;
  environment: Environment_type /* The environment we are running in. */;
  executor: ExecutorMetadata_type /* Metadata about our executor API connection. */;
  fs: FileSystemMetadata_type /* Metadata about our file system. */;
  git_hash: string /* The git hash of the server. */;
  pubsub: Connection_type /* Metadata about our pub-sub connection. */;
}

export type Method_type =
  /* The Request Method (VERB)

This type also contains constants for a number of common HTTP methods such as GET, POST, etc.

Currently includes 8 variants representing the 8 methods defined in [RFC 7230](https://tools.ietf.org/html/rfc7231#section-4.1), plus PATCH, and an Extension variant for all extensions. */
  | 'OPTIONS'
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'HEAD'
  | 'TRACE'
  | 'CONNECT'
  | 'PATCH'
  | 'EXTENSION';

export interface OAuth2ClientInfo_type {
  csrf_token: string /* Value used for [CSRF](https://tools.ietf.org/html/rfc6749#section-10.12) protection via the `state` parameter. */;
  /*{
  "nullable": true,
  "description": "Code Verifier used for [PKCE]((https://tools.ietf.org/html/rfc7636)) protection via the `code_verifier` parameter. The value must have a minimum length of 43 characters and a maximum length of 128 characters.  Each character must be ASCII alphanumeric or one of the characters \"-\" / \".\" / \"_\" / \"~\"."
}*/
  pkce_code_verifier?: string;
  url: string /* The URL for consent. */;
}

export type OAuth2GrantType_type =
  'urn:ietf:params:oauth:grant-type:device_code'; /* An OAuth 2.0 Grant Type. These are documented here: <https://oauth.net/2/grant-types/>. */

export interface OutputFile_type {
  /*{
  "nullable": true,
  "description": "The contents of the file. This is base64 encoded so we can ensure it is UTF-8 for JSON."
}*/
  contents?: string;
  /* default:, description:The name of the file. */
  name: string;
}

export interface PaymentIntent_type {
  client_secret: string /* The client secret is used for client-side retrieval using a publishable key. The client secret can be used to complete payment setup from your frontend. It should not be stored, logged, or exposed to anyone other than the customer. Make sure that you have TLS enabled on any page that includes the client secret. */;
}

export interface PaymentMethod_type {
  billing_info: BillingInfo_type /* The billing info for the payment method. */;
  /*{
  "nullable": true,
  "description": "The card, if it is one. For our purposes, this is the only type of payment method that we support."
}*/
  card: CardDetails_type;
  /* format:date-time, description:Time at which the object was created. */
  created_at: string;
  id: string /* Unique identifier for the object. */;
  metadata: { [key: string]: string };
  type: PaymentMethodType_type /* The type of payment method. */;
}

export interface PaymentMethodCardChecks_type {
  address_line1_check: string /* If a address line1 was provided, results of the check, one of `pass`, `fail`, `unavailable`, or `unchecked`. */;
  address_postal_code_check: string /* If a address postal code was provided, results of the check, one of `pass`, `fail`, `unavailable`, or `unchecked`. */;
  cvc_check: string /* If a CVC was provided, results of the check, one of `pass`, `fail`, `unavailable`, or `unchecked`. */;
}

export type PaymentMethodType_type =
  'card'; /* An enum representing the possible values of an `PaymentMethod`'s `type` field. */

export interface PluginsInfo_type {
  authorization: string[];
  log: string[];
  network: string[];
  volume: string[];
}

export interface Pong_type {
  message: string /* The pong response. */;
}

export interface RegistryServiceConfig_type {
  allow_nondistributable_artifacts_cid_rs: string[];
  allow_nondistributable_artifacts_hostnames: string[];
  index_configs: { [key: string]: IndexInfo_type };
  insecure_registry_cid_rs: string[];
  mirrors: string[];
}

export interface Runtime_type {
  /*{
  "nullable": true,
  "description": "Name and, optional, path, of the OCI executable binary.  If the path is omitted, the daemon searches the host's `$PATH` for the binary and uses the first result."
}*/
  path?: string;
  runtime_args: string[];
}

export interface Session_type {
  /* format:date-time, title:DateTime, description:The date and time the session was created. */
  created_at: string;
  /* format:date-time, title:DateTime, description:The date and time the session expires. */
  expires: string;
  id: string /* The unique identifier for the session. */;
  session_token: Uuid_type /* The session token. */;
  /* format:date-time, title:DateTime, description:The date and time the session was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user that the session belongs to. */;
}

export type SystemInfoCgroupDriverEnum_type =
  | ''
  | 'cgroupfs'
  | 'systemd'
  | 'none';

export type SystemInfoCgroupVersionEnum_type = '' | '1' | '2';

export interface SystemInfoDefaultAddressPools_type {
  /* nullable:true, description:The network address in CIDR format */
  base?: string;
  /* format:int64, nullable:true, description:The network pool size */
  size?: number;
}

export type SystemInfoIsolationEnum_type =
  | ''
  | 'default'
  | 'hyperv'
  | 'process';

export interface UnitConversion_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the unit conversion was completed."
}*/
  completed_at?: string;
  /*{
  "format": "date-time",
  "title": "DateTime",
  "description": "The time and date the unit conversion was created."
}*/
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the unit conversion.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:float, description:The input value. */
  input: number;
  /* format:double, nullable:true, description:The resulting value. */
  output?: number;
  output_format: UnitMetricFormat_type /* The output format of the unit conversion. */;
  src_format: UnitMetricFormat_type /* The source format of the unit conversion. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the unit conversion was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the unit conversion. */;
  /*{
  "format": "date-time",
  "title": "DateTime",
  "description": "The time and date the unit conversion was last updated."
}*/
  updated_at: string;
  user_id: string /* The user ID of the user who created the unit conversion. */;
}

export type UnitMetricFormat_type =
  /* The valid types of metric unit formats. */
  | 'atto'
  | 'femto'
  | 'pico'
  | 'nano'
  | 'micro'
  | 'milli'
  | 'centi'
  | 'deci'
  | 'metric_unit'
  | 'deca'
  | 'hecto'
  | 'kilo'
  | 'mega'
  | 'giga'
  | 'tera'
  | 'peta'
  | 'exa';

export interface UpdateUser_type {
  company: string /* The user's company. */;
  discord: string /* The user's Discord handle. */;
  first_name: string /* The user's first name. */;
  github: string /* The user's GitHub handle. */;
  last_name: string /* The user's last name. */;
  /*{
  "default": "",
  "format": "phone",
  "title": "String",
  "description": "The user's phone number."
}*/
  phone: string;
}

export interface User_type {
  company: string /* The user's company. */;
  /* format:date-time, title:DateTime, description:The date and time the user was created. */
  created_at: string;
  discord: string /* The user's Discord handle. */;
  /* format:email, description:The email address of the user. */
  email: string;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The date and time the email address was verified."
}*/
  email_verified?: string;
  first_name: string /* The user's first name. */;
  github: string /* The user's GitHub handle. */;
  id: string /* The unique identifier for the user. */;
  /* format:uri, title:String, description:The image avatar for the user. This is a URL. */
  image: string;
  last_name: string /* The user's last name. */;
  name: string /* The name of the user. This is auto populated at first from the authentication provider (if there was a name). It can be updated by the user by updating their `first_name` and `last_name` fields. */;
  /*{
  "default": "",
  "format": "phone",
  "title": "String",
  "description": "The user's phone number."
}*/
  phone: string;
  /* format:date-time, title:DateTime, description:The date and time the user was last updated. */
  updated_at: string;
}

export interface UserResultsPage_type {
  items: User_type[] /* list of items on this page of results */;
  /*{
  "nullable": true,
  "description": "token used to fetch the next page of results (if any)"
}*/
  next_page?: string;
}

export type Uuid_type =
  /*{
  "format": "uuid",
  "description": "A uuid.\n\nA Version 4 UUID is a universally unique identifier that is generated using random numbers."
}*/
  string;

export interface VerificationToken_type {
  /*{
  "format": "date-time",
  "title": "DateTime",
  "description": "The date and time the verification token was created."
}*/
  created_at: string;
  /* format:date-time, title:DateTime, description:The date and time the verification token expires. */
  expires: string;
  id: string /* The token used for verification. This is used as the id for the table since it is unique per record. */;
  identifier: string /* The identifier for the user. This is typically the user's email address since that is what we are verifying. */;
  /*{
  "format": "date-time",
  "title": "DateTime",
  "description": "The date and time the verification token was last updated."
}*/
  updated_at: string;
}
