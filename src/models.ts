export type AccountProvider_type = 'google' | 'github';

export interface AiPluginApi_type {
  /* default:false, description:If the API is authenticated. */
  is_user_authenticated: boolean;
  /* default:openapi, description:The type of API. */
  type: AiPluginApiType_type;
  /* format:uri, description:The url to the API's schema. */
  url: string;
}

export type AiPluginApiType_type = 'openapi';

export interface AiPluginAuth_type {
  /* nullable:true, description:The type of http authorization. */
  authorization_type: AiPluginHttpAuthType_type;
  /* default:none, description:The type of authentication. */
  type: AiPluginAuthType_type;
}

export type AiPluginAuthType_type =
  | 'none'
  | 'user_http'
  | 'service_http'
  | 'oauth';

export type AiPluginHttpAuthType_type = 'basic' | 'bearer';

export interface AiPluginManifest_type {
  api: AiPluginApi_type /* API specification. */;
  auth: AiPluginAuth_type /* Authentication schema. */;
  /*{
  "format": "email",
  "description": "Email contact for safety/moderation reachout, support, and deactivation."
}*/
  contact_email: string;
  description_for_human: string /* Human-readable description of the plugin. */;
  description_for_model: string /* Description better tailored to the model, such as token context length considerations or keyword usage for improved plugin prompting. */;
  /*{
  "format": "uri",
  "description": "Redirect URL for users to view plugin information."
}*/
  legal_info_url: string;
  /* format:uri, description:URL used to fetch the plugin's logo. */
  logo_url: string;
  name_for_human: string /* Human-readable name, such as the full company name. */;
  name_for_model: string /* Name the model will used to target the plugin. */;
  schema_version: string /* Manifest schema version. */;
}

export interface Angle_type {
  unit: UnitAngle_type /* What unit is the measurement? */;
  /*{
  "format": "double",
  "description": "The size of the angle, measured in the chosen unit."
}*/
  value: number;
}

export type AnnotationLineEnd_type =
  /* Annotation line end type */
  'none' | 'arrow';

export interface AnnotationLineEndOptions_type {
  end: AnnotationLineEnd_type /* How to style the end of the annotation line. */;
  start: AnnotationLineEnd_type /* How to style the start of the annotation line. */;
}

export interface AnnotationOptions_type {
  /* nullable:true, description:Color to render the annotation */
  color: Color_type;
  /* nullable:true, description:How to style the start and end of the line */
  line_ends: AnnotationLineEndOptions_type;
  /* format:float, nullable:true, description:Width of the annotation's line */
  line_width?: number;
  /* nullable:true, description:Position to put the annotation */
  position: Point3d_type;
  /* nullable:true, description:Text displayed on the annotation */
  text: AnnotationTextOptions_type;
}

export type AnnotationTextAlignmentX_type =
  /* Horizontal Text aligment */
  'left' | 'center' | 'right';

export type AnnotationTextAlignmentY_type =
  /* Vertical Text aligment */
  'bottom' | 'center' | 'top';

export interface AnnotationTextOptions_type {
  /* format:uint32, minimum:0, description:Text font's point size */
  point_size: number;
  text: string /* Text displayed on the annotation */;
  x: AnnotationTextAlignmentX_type /* Alignment along the X axis */;
  y: AnnotationTextAlignmentY_type /* Alignment along the Y axis */;
}

export type AnnotationType_type = 't2d' | 't3d';

export interface ApiCallQueryGroup_type {
  /*{
  "format": "int64"
}*/
  count: number;
  query: string;
}

export type ApiCallQueryGroupBy_type =
  | 'email'
  | 'method'
  | 'endpoint'
  | 'user_id'
  | 'origin'
  | 'ip_address';

export type ApiCallStatus_type =
  | 'queued'
  | 'uploaded'
  | 'in_progress'
  | 'completed'
  | 'failed';

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
  /*{
  "nullable": true,
  "description": "If the API call was spawned from the litterbox or not."
}*/
  litterbox?: boolean;
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
  "pattern": "^-?[0-9]+(\\.[0-9]+)?$",
  "title": "Decimal",
  "description": "The price of the API call."
}*/
  price?: string;
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

export interface ApiError_type {
  error_code: ErrorCode_type /* The error code. */;
  message: string /* The error message. */;
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

export interface AppClientInfo_type {
  url: string /* The URL for consent. */;
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
  input: any;
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
  "description": "The time and date the API call was completed."
}*/
      completed_at?: string;
      /* format:date-time, title:DateTime, description:The time and date the API call was created. */
      created_at: string;
      /* nullable:true, description:The error the function returned, if any. */
      error?: string;
      /* The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid_type;
      output_format: FileExportFormat_type /* The output format of the file conversion. */;
      /* nullable:true, description:The output format options of the file conversion. */
      output_format_options: OutputFormat_type;
      outputs: {
        [key: string]: /*{
  "format": "byte",
  "title": "String"
}*/
        string;
      };
      src_format: FileImportFormat_type /* The source format of the file conversion. */;
      /* nullable:true, description:The source format options of the file conversion. */
      src_format_options: InputFormat_type;
      /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
      started_at?: string;
      status: ApiCallStatus_type /* The status of the API call. */;
      type: 'file_conversion';
      /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
      updated_at: string;
      user_id: string /* The user ID of the user who created the API call. */;
    }
  | {
      /* nullable:true, description:The resulting center of mass. */
      center_of_mass: Point3d_type;
      /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
      completed_at?: string;
      /* format:date-time, title:DateTime, description:The time and date the API call was created. */
      created_at: string;
      /* nullable:true, description:The error the function returned, if any. */
      error?: string;
      /* The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid_type;
      output_unit: UnitLength_type /* The output unit for the center of mass. */;
      src_format: FileImportFormat_type /* The source format of the file. */;
      /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
      started_at?: string;
      status: ApiCallStatus_type /* The status of the API call. */;
      type: 'file_center_of_mass';
      /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
      updated_at: string;
      user_id: string /* The user ID of the user who created the API call. */;
    }
  | {
      /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
      completed_at?: string;
      /* format:date-time, title:DateTime, description:The time and date the API call was created. */
      created_at: string;
      /* nullable:true, description:The error the function returned, if any. */
      error?: string;
      /* The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid_type;
      /* format:double, nullable:true, description:The resulting mass. */
      mass?: number;
      /* default:0, format:double, description:The material density as denoted by the user. */
      material_density: number;
      material_density_unit: UnitDensity_type /* The material density unit. */;
      output_unit: UnitMass_type /* The output unit for the mass. */;
      src_format: FileImportFormat_type /* The source format of the file. */;
      /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
      started_at?: string;
      status: ApiCallStatus_type /* The status of the API call. */;
      type: 'file_mass';
      /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
      updated_at: string;
      user_id: string /* The user ID of the user who created the API call. */;
    }
  | {
      /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
      completed_at?: string;
      /* format:date-time, title:DateTime, description:The time and date the API call was created. */
      created_at: string;
      /* nullable:true, description:The error the function returned, if any. */
      error?: string;
      /* The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid_type;
      output_unit: UnitVolume_type /* The output unit for the volume. */;
      src_format: FileImportFormat_type /* The source format of the file. */;
      /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
      started_at?: string;
      status: ApiCallStatus_type /* The status of the API call. */;
      type: 'file_volume';
      /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
      updated_at: string;
      user_id: string /* The user ID of the user who created the API call. */;
      /* format:double, nullable:true, description:The resulting volume. */
      volume?: number;
    }
  | {
      /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
      completed_at?: string;
      /* format:date-time, title:DateTime, description:The time and date the API call was created. */
      created_at: string;
      /* format:double, nullable:true, description:The resulting density. */
      density?: number;
      /* nullable:true, description:The error the function returned, if any. */
      error?: string;
      /* The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid_type;
      /* default:0, format:double, description:The material mass as denoted by the user. */
      material_mass: number;
      material_mass_unit: UnitMass_type /* The material mass unit. */;
      output_unit: UnitDensity_type /* The output unit for the density. */;
      src_format: FileImportFormat_type /* The source format of the file. */;
      /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
      started_at?: string;
      status: ApiCallStatus_type /* The status of the API call. */;
      type: 'file_density';
      /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
      updated_at: string;
      user_id: string /* The user ID of the user who created the API call. */;
    }
  | {
      /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
      completed_at?: string;
      /* format:date-time, title:DateTime, description:The time and date the API call was created. */
      created_at: string;
      /* nullable:true, description:The error the function returned, if any. */
      error?: string;
      /* The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid_type;
      output_unit: UnitArea_type /* The output unit for the surface area. */;
      src_format: FileImportFormat_type /* The source format of the file. */;
      /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
      started_at?: string;
      status: ApiCallStatus_type /* The status of the API call. */;
      /* format:double, nullable:true, description:The resulting surface area. */
      surface_area?: number;
      type: 'file_surface_area';
      /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
      updated_at: string;
      user_id: string /* The user ID of the user who created the API call. */;
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
  | 'file_conversion'
  | 'file_volume'
  | 'file_center_of_mass'
  | 'file_mass'
  | 'file_density'
  | 'file_surface_area';

export type Axis_type = 'y' | 'z';

export interface AxisDirectionPair_type {
  axis: Axis_type /* Axis specifier. */;
  direction: Direction_type /* Specifies which direction the axis is pointing. */;
}

export interface BillingInfo_type {
  /* nullable:true, description:The address of the customer. */
  address: NewAddress_type;
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

export type CameraDragInteractionType_type = 'pan' | 'rotate' | 'zoom';

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

export interface CenterOfMass_type {
  center_of_mass: Point3d_type /* The center of mass. */;
  output_unit: UnitLength_type /* The output unit for the center of mass. */;
}

export interface ClientMetrics_type {
  /*{
  "format": "uint64",
  "minimum": 0,
  "description": "Counter of the number of WebRTC frames that the client has decoded during this session."
}*/
  rtc_frames_decoded: number;
  /*{
  "format": "uint32",
  "minimum": 0,
  "description": "Counter of the number of WebRTC frames the client has dropped during this session."
}*/
  rtc_frames_dropped: number;
  /*{
  "format": "uint8",
  "minimum": 0,
  "description": "Current number of frames being rendered per second. A good target is 60 frames per second, but it can fluctuate depending on network conditions."
}*/
  rtc_frames_per_second: number;
  /*{
  "format": "uint64",
  "minimum": 0,
  "description": "Counter of the number of WebRTC frames that the client has received during this session."
}*/
  rtc_frames_received: number;
  /*{
  "format": "uint32",
  "minimum": 0,
  "description": "Number of times the WebRTC playback has frozen. This is usually due to network conditions."
}*/
  rtc_freeze_count: number;
  /*{
  "format": "float",
  "description": "Amount of \"jitter\" in the WebRTC session. Network latency is the time it takes a packet to traverse the network. The amount that the latency varies is the jitter. Video latency is the time it takes to render a frame sent by the server (including network latency). A low jitter means the video latency can be reduced without impacting smooth playback. High jitter means clients will increase video latency to ensure smooth playback."
}*/
  rtc_jitter_sec: number;
  /*{
  "format": "uint32",
  "minimum": 0,
  "description": "Number of \"key frames\" decoded in the underlying h.264 stream. A key frame is an expensive (bandwidth-wise) \"full image\" of the video frame. Data after the keyframe become -- effectively -- \"diff\" operations on that key frame. The Engine will only send a keyframe if required, which is an indication that some of the \"diffs\" have been lost, usually an indication of poor network conditions. We like this metric to understand times when the connection has had to recover."
}*/
  rtc_keyframes_decoded: number;
  /*{
  "format": "float",
  "description": "Number of seconds of frozen video the user has been subjected to."
}*/
  rtc_total_freezes_duration_sec: number;
}

export interface Cluster_type {
  /* default:null, nullable:true, description:The IP address of the cluster. */
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

export type CodeLanguage_type = 'go' | 'python' | 'node';

export interface CodeOutput_type {
  output_files: OutputFile_type[] /* The contents of the files requested if they were passed. */;
  /* default:, description:The stderr of the code. */
  stderr: string;
  /* default:, description:The stdout of the code. */
  stdout: string;
}

export interface Color_type {
  /* format:float, description:Alpha */
  a: number;
  /* format:float, description:Blue */
  b: number;
  /* format:float, description:Green */
  g: number;
  /* format:float, description:Red */
  r: number;
}

export interface Connection_type {
  /* default:0, format:int64, description:The auth timeout of the server. */
  auth_timeout: number;
  /* default:{addr:null, auth_timeout:0, cluster_port:0, name:, tls_timeout:0, urls:[]}, description:Information about the cluster. */
  cluster: Cluster_type;
  /* format:date-time, description:The time the configuration was loaded. */
  config_load_time: string;
  /* default:0, format:int64, description:The number of connections to the server. */
  connections: number;
  /* default:0, format:int64, description:The CPU core usage of the server. */
  cores: number;
  /* default:0, format:double, description:The CPU usage of the server. */
  cpu: number;
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

export type CountryCode_type =
  string; /* An ISO-3166 alpha-2 country code. Always uppercase. */

export interface Coupon_type {
  /*{
  "format": "money-usd",
  "nullable": true,
  "pattern": "^-?[0-9]+(\\.[0-9]+)?$",
  "title": "Decimal",
  "description": "Amount (in the `currency` specified) that will be taken off the subtotal of any invoices for this customer."
}*/
  amount_off?: string;
  /* default:false, description:Always true for a deleted object. */
  deleted: boolean;
  id: string /* Unique identifier for the object. */;
  /*{
  "format": "double",
  "nullable": true,
  "description": "Percent that will be taken off the subtotal of any invoices for this customer for the duration of the coupon.\n\nFor example, a coupon with percent_off of 50 will make a %s100 invoice %s50 instead."
}*/
  percent_off?: number;
}

export type CreatedAtSortMode_type =
  | 'created_at_ascending'
  | 'created_at_descending';

export type Currency_type =
  /* Currency is the list of supported currencies. Always lowercase.

This comes from the Stripe API docs: For more details see <https://support.stripe.com/questions/which-currencies-does-stripe-support>. */
  string;

export interface CurveGetControlPoints_type {
  control_points: Point3d_type[] /* Control points in the curve. */;
}

export interface CurveGetEndPoints_type {
  end: Point3d_type /* End */;
  start: Point3d_type /* Start */;
}

export interface CurveGetType_type {
  curve_type: CurveType_type /* Curve type */;
}

export type CurveType_type =
  /* The type of Curve (embedded within path) */
  'line' | 'arc' | 'nurbs';

export interface Customer_type {
  /* nullable:true, description:The customer's address. */
  address: NewAddress_type;
  /*{
  "default": 0,
  "format": "money-usd",
  "pattern": "^-?[0-9]+(\\.[0-9]+)?$",
  "title": "Decimal",
  "description": "Current balance, if any, being stored on the customer in the payments service.\n\nIf negative, the customer has credit to apply to their next invoice. If positive, the customer has an amount owed that will be added to their next invoice. The balance does not refer to any unpaid invoices; it solely takes into account amounts that have yet to be successfully applied to any invoice. This balance is only taken into account as invoices are finalized."
}*/
  balance: string;
  /* format:date-time, description:Time at which the object was created. */
  created_at: string;
  /*{
  "default": "usd",
  "description": "Three-letter ISO code for the currency the customer can be charged in for recurring billing purposes."
}*/
  currency: Currency_type;
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
  "pattern": "^-?[0-9]+(\\.[0-9]+)?$",
  "title": "Decimal",
  "description": "The monthy credits remaining in the balance. This gets re-upped every month, but if the credits are not used for a month they do not carry over to the next month. It is a stable amount granted to the user per month."
}*/
  monthly_credits_remaining: string;
  /*{
  "format": "money-usd",
  "pattern": "^-?[0-9]+(\\.[0-9]+)?$",
  "title": "Decimal",
  "description": "The amount of pre-pay cash remaining in the balance. This number goes down as the user uses their pre-paid credits. The reason we track this amount is if a user ever wants to withdraw their pre-pay cash, we can use this amount to determine how much to give them. Say a user has $100 in pre-paid cash, their bill is worth, $50 after subtracting any other credits (like monthly etc.) Their bill is $50, their pre-pay cash remaining will be subtracted by 50 to pay the bill and their `pre_pay_credits_remaining` will be subtracted by 50 to pay the bill. This way if they want to withdraw money after, they can only withdraw $50 since that is the amount of cash they have remaining."
}*/
  pre_pay_cash_remaining: string;
  /*{
  "format": "money-usd",
  "pattern": "^-?[0-9]+(\\.[0-9]+)?$",
  "title": "Decimal",
  "description": "The amount of credits remaining in the balance. This is typically the amount of cash * some multiplier they get for pre-paying their account. This number lowers every time a bill is paid with the balance. This number increases every time a user adds funds to their balance. This may be through a subscription or a one off payment."
}*/
  pre_pay_credits_remaining: string;
  /*{
  "format": "money-usd",
  "pattern": "^-?[0-9]+(\\.[0-9]+)?$",
  "title": "Decimal",
  "description": "This includes any outstanding, draft, or open invoices and any pending invoice items. This does not include any credits the user has on their account."
}*/
  total_due: string;
  /* format:date-time, title:DateTime, description:The date and time the balance was last updated. */
  updated_at: string;
  user_id: string /* The user ID the balance belongs to. */;
}

export interface Density_type {
  /* format:double, description:The density. */
  density: number;
  output_unit: UnitDensity_type /* The output unit for the density. */;
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

export type Direction_type = 'positive' | 'negative';

export interface Discount_type {
  coupon: Coupon_type /* The coupon that applied to create this discount. */;
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

export interface EntityGetAllChildUuids_type {
  /*{
  "format": "uuid"
}*/
  entity_ids: string[];
}

export interface EntityGetChildUuid_type {
  /* format:uuid, description:The UUID of the child entity. */
  entity_id: string;
}

export interface EntityGetNumChildren_type {
  /* format:uint32, minimum:0, description:The number of children the entity has. */
  num: number;
}

export interface EntityGetParentId_type {
  /* format:uuid, description:The UUID of the parent entity. */
  entity_id: string;
}

export type EntityType_type =
  /* The type of entity */
  | 'entity'
  | 'object'
  | 'path'
  | 'curve'
  | 'solid2d'
  | 'solid3d'
  | 'edge'
  | 'face'
  | 'plane';

export type Environment_type = 'DEVELOPMENT' | 'PREVIEW' | 'PRODUCTION';

export interface Error_type {
  error_code: string;
  message: string;
  request_id: string;
}

export type ErrorCode_type =
  | 'internal_engine'
  | 'internal_api'
  | 'bad_request'
  | 'invalid_json'
  | 'invalid_bson'
  | 'wrong_protocol'
  | 'connection_problem'
  | 'message_type_not_accepted'
  | 'message_type_not_accepted_for_web_r_t_c';

export interface Export_type {
  files: ExportFile_type[] /* The files that were exported. */;
}

export interface ExportFile_type {
  /* format:byte, title:String, description:The contents of the file, base64 encoded. */
  contents: string;
  name: string /* The name of the file. */;
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
  /*{
  "nullable": true,
  "description": "The user's Front ID. This is mostly used for internal mapping."
}*/
  front_id?: string;
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
}

export interface ExtendedUserResultsPage_type {
  items: ExtendedUser_type[] /* list of items on this page of results */;
  /*{
  "nullable": true,
  "description": "token used to fetch the next page of results (if any)"
}*/
  next_page?: string;
}

export interface FailureWebSocketResponse_type {
  errors: ApiError_type[] /* The errors that occurred. */;
  /*{
  "format": "uuid",
  "nullable": true,
  "description": "Which request this is a response to. If the request was a modeling command, this is the modeling command ID. If no request ID was sent, this will be null."
}*/
  request_id?: string;
  success: false;
}

export type FbxStorage_type = 'ascii' | 'binary';

export interface FileCenterOfMass_type {
  /* nullable:true, description:The resulting center of mass. */
  center_of_mass: Point3d_type;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  output_unit: UnitLength_type /* The output unit for the center of mass. */;
  src_format: FileImportFormat_type /* The source format of the file. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the API call. */;
}

export interface FileConversion_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  output_format: FileExportFormat_type /* The output format of the file conversion. */;
  /* nullable:true, description:The output format options of the file conversion. */
  output_format_options: OutputFormat_type;
  outputs: {
    [key: string]: /*{
  "format": "byte",
  "title": "String"
}*/
    string;
  };
  src_format: FileImportFormat_type /* The source format of the file conversion. */;
  /* nullable:true, description:The source format options of the file conversion. */
  src_format_options: InputFormat_type;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the API call. */;
}

export interface FileDensity_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the API call was created. */
  created_at: string;
  /* format:double, nullable:true, description:The resulting density. */
  density?: number;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The material mass as denoted by the user. */
  material_mass: number;
  material_mass_unit: UnitMass_type /* The material mass unit. */;
  output_unit: UnitDensity_type /* The output unit for the density. */;
  src_format: FileImportFormat_type /* The source format of the file. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the API call. */;
}

export type FileExportFormat_type =
  | 'fbx'
  | 'glb'
  | 'gltf'
  | 'obj'
  | 'ply'
  | 'step'
  | 'stl';

export type FileImportFormat_type =
  | 'fbx'
  | 'gltf'
  | 'obj'
  | 'ply'
  | 'sldprt'
  | 'step'
  | 'stl';

export interface FileMass_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* format:double, nullable:true, description:The resulting mass. */
  mass?: number;
  /* default:0, format:double, description:The material density as denoted by the user. */
  material_density: number;
  material_density_unit: UnitDensity_type /* The material density unit. */;
  output_unit: UnitMass_type /* The output unit for the mass. */;
  src_format: FileImportFormat_type /* The source format of the file. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the API call. */;
}

export interface FileSurfaceArea_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  output_unit: UnitArea_type /* The output unit for the surface area. */;
  src_format: FileImportFormat_type /* The source format of the file. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* format:double, nullable:true, description:The resulting surface area. */
  surface_area?: number;
  /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the API call. */;
}

export interface FileSystemMetadata_type {
  ok: boolean /* If the file system passed a sanity check. */;
}

export interface FileVolume_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  output_unit: UnitVolume_type /* The output unit for the volume. */;
  src_format: FileImportFormat_type /* The source format of the file. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the API call. */;
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

export interface GetEntityType_type {
  entity_type: EntityType_type /* The type of the entity. */;
}

export type GltfPresentation_type = 'compact' | 'pretty';

export type GltfStorage_type = 'binary' | 'standard' | 'embedded';

export interface HighlightSetEntity_type {
  /* format:uuid, nullable:true, description:The UUID of the entity that was highlighted. */
  entity_id?: string;
  /*{
  "format": "uint32",
  "minimum": 0,
  "nullable": true,
  "description": "If the client sent a sequence ID with its request, the backend sends it back."
}*/
  sequence?: number;
}

export interface IceServer_type {
  /* nullable:true, description:Credentials for a given TURN server. */
  credential?: string;
  urls: string[];
  /* nullable:true, description:Username for a given TURN server. */
  username?: string;
}

export type ImageFormat_type = 'png' | 'jpeg';

export type ImageType_type =
  /* An enumeration. */
  'png' | 'jpg';

export interface ImportFile_type {
  /*{
  "format": "uint8",
  "minimum": 0
}*/
  data: number[];
  path: string /* The file's full path, including file extension. */;
}

export interface ImportFiles_type {
  /* format:uuid, description:ID of the imported 3D models within the scene. */
  object_id: string;
}

export type InputFormat_type =
  | { type: 'fbx' }
  | { type: 'gltf' }
  | {
      /* Co-ordinate system of input data.

Defaults to the [KittyCAD co-ordinate system].

[KittyCAD co-ordinate system]: ../coord/constant.KITTYCAD.html */
      coords: System_type;
      type: 'obj';
      /* The units of the input data. This is very important for correct scaling and when calculating physics properties like mass, etc.

Defaults to meters. */
      units: UnitLength_type;
    }
  | {
      /* Co-ordinate system of input data.

Defaults to the [KittyCAD co-ordinate system].

[KittyCAD co-ordinate system]: ../coord/constant.KITTYCAD.html */
      coords: System_type;
      type: 'ply';
      units: UnitLength_type /* The units of the input data. This is very important for correct scaling and when calculating physics properties like mass, etc. */;
    }
  | { type: 'sldprt' }
  | { type: 'step' }
  | {
      /* Co-ordinate system of input data.

Defaults to the [KittyCAD co-ordinate system].

[KittyCAD co-ordinate system]: ../coord/constant.KITTYCAD.html */
      coords: System_type;
      type: 'stl';
      units: UnitLength_type /* The units of the input data. This is very important for correct scaling and when calculating physics properties like mass, etc. */;
    };

export interface Invoice_type {
  /*{
  "default": 0,
  "format": "money-usd",
  "pattern": "^-?[0-9]+(\\.[0-9]+)?$",
  "title": "Decimal",
  "description": "Final amount due at this time for this invoice.\n\nIf the invoice's total is smaller than the minimum charge amount, for example, or if there is account credit that can be applied to the invoice, the `amount_due` may be 0. If there is a positive `starting_balance` for the invoice (the customer owes money), the `amount_due` will also take that into account. The charge that gets generated for the invoice will be for the amount specified in `amount_due`."
}*/
  amount_due: string;
  /*{
  "default": 0,
  "format": "money-usd",
  "pattern": "^-?[0-9]+(\\.[0-9]+)?$",
  "title": "Decimal",
  "description": "The amount, in USD, that was paid."
}*/
  amount_paid: string;
  /*{
  "default": 0,
  "format": "money-usd",
  "pattern": "^-?[0-9]+(\\.[0-9]+)?$",
  "title": "Decimal",
  "description": "The amount remaining, in USD, that is due."
}*/
  amount_remaining: string;
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
  /*{
  "default": "usd",
  "description": "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase."
}*/
  currency: Currency_type;
  /*{
  "format": "email",
  "description": "The email address for the customer. Until the invoice is finalized, this field will equal customer.email. Once the invoice is finalized, this field will no longer be updated."
}*/
  customer_email: string;
  customer_id: string /* Customer ID. The unique identifier for the customer this invoice belongs to. This is the customer ID in the payments service, not our database customer ID. */;
  default_payment_method: string /* Default payment method. */;
  description: string /* Description of the invoice. */;
  discounts: Discount_type[] /* The discounts applied to the invoice. This is an array of discount objects. */;
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
  "pattern": "^-?[0-9]+(\\.[0-9]+)?$",
  "title": "Decimal",
  "description": "Total of all subscriptions, invoice items, and prorations on the invoice before any invoice level discount or tax is applied.\n\nItem discounts are already incorporated."
}*/
  subtotal: string;
  /*{
  "default": 0,
  "format": "money-usd",
  "pattern": "^-?[0-9]+(\\.[0-9]+)?$",
  "title": "Decimal",
  "description": "The amount of tax on this invoice.\n\nThis is the sum of all the tax amounts on this invoice."
}*/
  tax: string;
  /*{
  "default": 0,
  "format": "money-usd",
  "pattern": "^-?[0-9]+(\\.[0-9]+)?$",
  "title": "Decimal",
  "description": "Total after discounts and taxes."
}*/
  total: string;
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
  "pattern": "^-?[0-9]+(\\.[0-9]+)?$",
  "title": "Decimal",
  "description": "The amount, in USD."
}*/
  amount: string;
  /*{
  "default": "usd",
  "description": "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase."
}*/
  currency: Currency_type;
  description: string /* The description. */;
  id: string /* Unique identifier for the object. */;
  invoice_item: string /* The ID of the invoice item associated with this line item if any. */;
  metadata: { [key: string]: string };
}

export type InvoiceStatus_type =
  | 'deleted'
  | 'draft'
  | 'open'
  | 'paid'
  | 'uncollectible'
  | 'void';

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

export interface Mass_type {
  /* format:double, description:The mass. */
  mass: number;
  output_unit: UnitMass_type /* The output unit for the mass. */;
}

export interface Mesh_type {
  mesh: string;
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
  environment: Environment_type /* The environment we are running in. */;
  fs: FileSystemMetadata_type /* Metadata about our file system. */;
  git_hash: string /* The git hash of the server. */;
  point_e: PointEMetadata_type /* Metadata about our point-e instance. */;
  pubsub: Connection_type /* Metadata about our pub-sub connection. */;
}

export type Method_type =
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

export type ModelingCmd_type =
  | { type: 'start_path' }
  | {
      path: ModelingCmdId_type /* The ID of the command which created the path. */;
      to: Point3d_type /* Where the path's pen should be. */;
      type: 'move_path_pen';
    }
  | {
      path: ModelingCmdId_type /* The ID of the command which created the path. */;
      segment: PathSegment_type /* Segment to append to the path. This segment will implicitly begin at the current "pen" location. */;
      type: 'extend_path';
    }
  | {
      cap: boolean /* Whether to cap the extrusion with a face, or not. If true, the resulting solid will be closed on all sides, like a dice. If false, it will be open on one side, like a drinking glass. */;
      /* format:double, description:How far off the plane to extrude */
      distance: number;
      target: ModelingCmdId_type /* Which sketch to extrude. Must be a closed 2D solid. */;
      type: 'extrude';
    }
  | {
      /* format:uuid, description:Which path to close. */
      path_id: string;
      type: 'close_path';
    }
  | {
      interaction: CameraDragInteractionType_type /* The type of camera drag interaction. */;
      type: 'camera_drag_start';
      window: Point2d_type /* The initial mouse position. */;
    }
  | {
      interaction: CameraDragInteractionType_type /* The type of camera drag interaction. */;
      /*{
  "format": "uint32",
  "minimum": 0,
  "nullable": true,
  "description": "Logical timestamp. The client should increment this with every event in the current mouse drag. That way, if the events are being sent over an unordered channel, the API can ignore the older events."
}*/
      sequence?: number;
      type: 'camera_drag_move';
      window: Point2d_type /* The current mouse position. */;
    }
  | {
      interaction: CameraDragInteractionType_type /* The type of camera drag interaction. */;
      type: 'camera_drag_end';
      window: Point2d_type /* The final mouse position. */;
    }
  | {
      center: Point3d_type /* What the camera is looking at. Center of the camera's field of vision */;
      type: 'default_camera_look_at';
      up: Point3d_type /* Which way is "up", from the camera's point of view. */;
      vantage: Point3d_type /* Where the camera is positioned */;
    }
  | {
      /*{
  "format": "float",
  "description": "Move the camera forward along the vector it's looking at, by this magnitudedefaultCameraZoom. Basically, how much should the camera move forward by."
}*/
      magnitude: number;
      type: 'default_camera_zoom';
    }
  | {
      animated: boolean /* Should we animate or snap for the camera transition? */;
      /* format:float, description:How far to the sketching plane? */
      distance_to_plane: number;
      origin: Point3d_type /* What's the origin of the sketching plane? */;
      ortho: boolean /* Should the camera use orthographic projection? In other words, should an object's size in the rendered image stay constant regardless of its distance from the camera. */;
      type: 'default_camera_enable_sketch_mode';
      x_axis: Point3d_type /* Which 3D axis of the scene should be the X axis of the sketching plane? */;
      y_axis: Point3d_type /* Which 3D axis of the scene should be the Y axis of the sketching plane? */;
    }
  | { type: 'default_camera_disable_sketch_mode' }
  | {
      /*{
  "format": "uuid"
}*/
      entity_ids: string[];
      format: OutputFormat_type /* The file format to export to. */;
      /* Select the unit interpretation of exported objects.

This is not the same as the export units. Setting export units is part of the format options. */
      source_unit: UnitLength_type;
      type: 'export';
    }
  | {
      /* format:uuid, description:ID of the entity being queried. */
      entity_id: string;
      type: 'entity_get_parent_id';
    }
  | {
      /* format:uuid, description:ID of the entity being queried. */
      entity_id: string;
      type: 'entity_get_num_children';
    }
  | {
      /* format:uint32, minimum:0, description:Index into the entity's list of children. */
      child_index: number;
      /* format:uuid, description:ID of the entity being queried. */
      entity_id: string;
      type: 'entity_get_child_uuid';
    }
  | {
      /* format:uuid, description:ID of the entity being queried. */
      entity_id: string;
      type: 'entity_get_all_child_uuids';
    }
  | {
      /* format:uuid, description:The edit target */
      target: string;
      type: 'edit_mode_enter';
    }
  | { type: 'edit_mode_exit' }
  | {
      selected_at_window: Point2d_type /* Where in the window was selected */;
      selection_type: SceneSelectionType_type /* What entity was selected? */;
      type: 'select_with_point';
    }
  | { type: 'select_clear' }
  | {
      /*{
  "format": "uuid"
}*/
      entities: string[];
      type: 'select_add';
    }
  | {
      /*{
  "format": "uuid"
}*/
      entities: string[];
      type: 'select_remove';
    }
  | {
      /*{
  "format": "uuid"
}*/
      entities: string[];
      type: 'select_replace';
    }
  | { type: 'select_get' }
  | {
      selected_at_window: Point2d_type /* Coordinates of the window being clicked */;
      /*{
  "format": "uint32",
  "minimum": 0,
  "nullable": true,
  "description": "Logical timestamp. The client should increment this with every event in the current mouse drag. That way, if the events are being sent over an unordered channel, the API can ignore the older events."
}*/
      sequence?: number;
      type: 'highlight_set_entity';
    }
  | {
      /*{
  "format": "uuid"
}*/
      entities: string[];
      type: 'highlight_set_entities';
    }
  | {
      annotation_type: AnnotationType_type /* What type of annotation to create. */;
      clobber: boolean /* If true, any existing drawables within the obj will be replaced (the object will be reset) */;
      options: AnnotationOptions_type /* What should the annotation contain? */;
      type: 'new_annotation';
    }
  | {
      /* format:uuid, description:Which annotation to update */
      annotation_id: string;
      options: AnnotationOptions_type /* If any of these fields are set, they will overwrite the previous options for the annotation. */;
      type: 'update_annotation';
    }
  | {
      hidden: boolean /* Whether or not the object should be hidden. */;
      /* format:uuid, description:Which object to change */
      object_id: string;
      type: 'object_visible';
    }
  | {
      /* format:uuid, description:ID of the entity being queried. */
      entity_id: string;
      type: 'get_entity_type';
    }
  | {
      /* format:uuid, description:Which edge you want the faces of. */
      edge_id: string;
      /* format:uuid, description:Which object is being queried. */
      object_id: string;
      type: 'solid3d_get_all_edge_faces';
    }
  | {
      /*{
  "nullable": true,
  "description": "If given, ohnly faces parallel to this vector will be considered."
}*/
      along_vector: Point3d_type;
      /* format:uuid, description:Which edge you want the opposites of. */
      edge_id: string;
      /* format:uuid, description:Which object is being queried. */
      object_id: string;
      type: 'solid3d_get_all_opposite_edges';
    }
  | {
      /* format:uuid, description:Which edge you want the opposite of. */
      edge_id: string;
      /*{
  "format": "uuid",
  "description": "Which face is used to figure out the opposite edge?"
}*/
      face_id: string;
      /* format:uuid, description:Which object is being queried. */
      object_id: string;
      type: 'solid3d_get_opposite_edge';
    }
  | {
      /* format:uuid, description:Which edge you want the opposite of. */
      edge_id: string;
      /*{
  "format": "uuid",
  "description": "Which face is used to figure out the opposite edge?"
}*/
      face_id: string;
      /* format:uuid, description:Which object is being queried. */
      object_id: string;
      type: 'solid3d_get_next_adjacent_edge';
    }
  | {
      /* format:uuid, description:Which edge you want the opposite of. */
      edge_id: string;
      /*{
  "format": "uuid",
  "description": "Which face is used to figure out the opposite edge?"
}*/
      face_id: string;
      /* format:uuid, description:Which object is being queried. */
      object_id: string;
      type: 'solid3d_get_prev_adjacent_edge';
    }
  | {
      front: boolean /* Bring to front = true, send to back = false. */;
      /* format:uuid, description:Which object is being changed. */
      object_id: string;
      type: 'send_object';
    }
  | {
      /* format:uuid, description:Which entity is being changed. */
      entity_id: string;
      /*{
  "format": "float",
  "description": "How transparent should it be? 0 or lower is totally transparent. 1 or greater is totally opaque."
}*/
      opacity: number;
      type: 'entity_set_opacity';
    }
  | {
      /* default:0.4000000059604645, format:float, description:How many seconds the animation should take. */
      duration_seconds: number;
      /* format:uuid, description:Which entity is being changed. */
      entity_id: string;
      fade_in: boolean /* Fade in = true, fade out = false. */;
      type: 'entity_fade';
    }
  | {
      clobber: boolean /* If true, any existing drawables within the obj will be replaced (the object will be reset) */;
      origin: Point3d_type /* Origin of the plane */;
      /*{
  "format": "double",
  "description": "What should the plane's span/extent? When rendered visually, this is both the width and height along X and Y axis respectively."
}*/
      size: number;
      type: 'make_plane';
      x_axis: Point3d_type /* What should the plane's X axis be? */;
      y_axis: Point3d_type /* What should the plane's Y axis be? */;
    }
  | {
      color: Color_type /* What color it should be. */;
      /* format:uuid, description:Which plane is being changed. */
      plane_id: string;
      type: 'plane_set_color';
    }
  | {
      tool: SceneToolType_type /* What tool should be active. */;
      type: 'set_tool';
    }
  | {
      /*{
  "format": "uint32",
  "minimum": 0,
  "nullable": true,
  "description": "Logical timestamp. The client should increment this with every event in the current mouse drag. That way, if the events are being sent over an unordered channel, the API can ignore the older events."
}*/
      sequence?: number;
      type: 'mouse_move';
      window: Point2d_type /* Where the mouse is */;
    }
  | { type: 'mouse_click'; window: Point2d_type /* Where the mouse is */ }
  | {
      animated: boolean /* Animate the transition to sketch mode. */;
      ortho: boolean /* Use an orthographic camera. */;
      /* format:uuid, description:Sketch on this plane. */
      plane_id: string;
      type: 'sketch_mode_enable';
    }
  | { type: 'sketch_mode_disable' }
  | {
      /* format:uuid, description:Which curve to query. */
      curve_id: string;
      type: 'curve_get_type';
    }
  | {
      /* format:uuid, description:Which curve to query. */
      curve_id: string;
      type: 'curve_get_control_points';
    }
  | {
      format: ImageFormat_type /* What image format to return. */;
      type: 'take_snapshot';
    }
  | {
      clobber: boolean /* If true, any existing drawables within the obj will be replaced (the object will be reset) */;
      gizmo_mode: boolean /* If true, axes gizmo will be placed in the corner of the screen. If false, it will be placed at the origin of the scene. */;
      type: 'make_axes_gizmo';
    }
  | {
      /* format:uuid, description:Which path to query */
      path_id: string;
      type: 'path_get_info';
    }
  | {
      /* format:uuid, description:Which path to query */
      path_id: string;
      type: 'path_get_curve_uuids_for_vertices';
      /*{
  "format": "uuid"
}*/
      vertex_ids: string[];
    }
  | {
      type: 'handle_mouse_drag_start';
      window: Point2d_type /* The mouse position. */;
    }
  | {
      /*{
  "format": "uint32",
  "minimum": 0,
  "nullable": true,
  "description": "Logical timestamp. The client should increment this with every event in the current mouse drag. That way, if the events are being sent over an unordered channel, the API can ignore the older events."
}*/
      sequence?: number;
      type: 'handle_mouse_drag_move';
      window: Point2d_type /* The mouse position. */;
    }
  | {
      type: 'handle_mouse_drag_end';
      window: Point2d_type /* The mouse position. */;
    }
  | {
      /*{
  "format": "uuid"
}*/
      object_ids: string[];
      type: 'remove_scene_objects';
    }
  | {
      /* format:uuid, description:The plane you're intersecting against. */
      plane_id: string;
      type: 'plane_intersect_and_project';
      window: Point2d_type /* Window coordinates where the ray cast should be aimed. */;
    }
  | {
      /* format:uuid, description:ID of the curve being queried. */
      curve_id: string;
      type: 'curve_get_end_points';
    }
  | {
      /* format:uint32, minimum:0, description:Frames per second. */
      fps: number;
      /* format:uint32, minimum:0, description:Height of the stream. */
      height: number;
      type: 'reconfigure_stream';
      /* format:uint32, minimum:0, description:Width of the stream. */
      width: number;
    }
  | { files: ImportFile_type[] /* Files to import */; type: 'import_files' }
  | {
      /*{
  "format": "uuid"
}*/
      entity_ids: string[];
      /* format:double, description:The material density. */
      material_density: number;
      material_density_unit: UnitDensity_type /* The material density unit. */;
      output_unit: UnitMass_type /* The output unit for the mass. */;
      source_unit: UnitLength_type /* Select the unit interpretation of distances in the scene. */;
      type: 'mass';
    }
  | {
      /*{
  "format": "uuid"
}*/
      entity_ids: string[];
      /* format:double, description:The material mass. */
      material_mass: number;
      material_mass_unit: UnitMass_type /* The material mass unit. */;
      output_unit: UnitDensity_type /* The output unit for the density. */;
      source_unit: UnitLength_type /* Select the unit interpretation of distances in the scene. */;
      type: 'density';
    }
  | {
      /*{
  "format": "uuid"
}*/
      entity_ids: string[];
      output_unit: UnitVolume_type /* The output unit for the volume. */;
      source_unit: UnitLength_type /* Select the unit interpretation of distances in the scene. */;
      type: 'volume';
    }
  | {
      /*{
  "format": "uuid"
}*/
      entity_ids: string[];
      output_unit: UnitLength_type /* The output unit for the center of mass. */;
      source_unit: UnitLength_type /* Select the unit interpretation of distances in the scene. */;
      type: 'center_of_mass';
    }
  | {
      /*{
  "format": "uuid"
}*/
      entity_ids: string[];
      output_unit: UnitArea_type /* The output unit for the surface area. */;
      source_unit: UnitLength_type /* Select the unit interpretation of distances in the scene. */;
      type: 'surface_area';
    };

export type ModelingCmdId_type =
  /*{
  "format": "uuid",
  "description": "All commands have unique IDs. These should be randomly generated."
}*/
  string;

export interface MouseClick_type {
  /*{
  "format": "uuid"
}*/
  entities_modified: string[];
  /*{
  "format": "uuid"
}*/
  entities_selected: string[];
}

export interface NewAddress_type {
  city: string /* The city component. */;
  country: CountryCode_type /* The country component. This is a two-letter ISO country code. */;
  state: string /* The state component. */;
  street1: string /* The first street component. */;
  street2: string /* The second street component. */;
  user_id: string /* The user ID that this address belongs to. */;
  zip: string /* The zip component. */;
}

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
  'urn:ietf:params:oauth:grant-type:device_code';

export type OkModelingCmdResponse_type =
  | { type: 'empty' }
  | {
      /*{
  "$ref": "#/components/schemas/Export"
}*/
      data: Export_type;
      type: 'export';
    }
  | {
      /*{
  "$ref": "#/components/schemas/SelectWithPoint"
}*/
      data: SelectWithPoint_type;
      type: 'select_with_point';
    }
  | {
      /*{
  "$ref": "#/components/schemas/HighlightSetEntity"
}*/
      data: HighlightSetEntity_type;
      type: 'highlight_set_entity';
    }
  | {
      /*{
  "$ref": "#/components/schemas/EntityGetChildUuid"
}*/
      data: EntityGetChildUuid_type;
      type: 'entity_get_child_uuid';
    }
  | {
      /*{
  "$ref": "#/components/schemas/EntityGetNumChildren"
}*/
      data: EntityGetNumChildren_type;
      type: 'entity_get_num_children';
    }
  | {
      /*{
  "$ref": "#/components/schemas/EntityGetParentId"
}*/
      data: EntityGetParentId_type;
      type: 'entity_get_parent_id';
    }
  | {
      /*{
  "$ref": "#/components/schemas/EntityGetAllChildUuids"
}*/
      data: EntityGetAllChildUuids_type;
      type: 'entity_get_all_child_uuids';
    }
  | {
      /*{
  "$ref": "#/components/schemas/SelectGet"
}*/
      data: SelectGet_type;
      type: 'select_get';
    }
  | {
      /*{
  "$ref": "#/components/schemas/GetEntityType"
}*/
      data: GetEntityType_type;
      type: 'get_entity_type';
    }
  | {
      /*{
  "$ref": "#/components/schemas/Solid3dGetAllEdgeFaces"
}*/
      data: Solid3dGetAllEdgeFaces_type;
      type: 'solid3d_get_all_edge_faces';
    }
  | {
      /*{
  "$ref": "#/components/schemas/Solid3dGetAllOppositeEdges"
}*/
      data: Solid3dGetAllOppositeEdges_type;
      type: 'solid3d_get_all_opposite_edges';
    }
  | {
      /*{
  "$ref": "#/components/schemas/Solid3dGetOppositeEdge"
}*/
      data: Solid3dGetOppositeEdge_type;
      type: 'solid3d_get_opposite_edge';
    }
  | {
      /*{
  "$ref": "#/components/schemas/Solid3dGetPrevAdjacentEdge"
}*/
      data: Solid3dGetPrevAdjacentEdge_type;
      type: 'solid3d_get_prev_adjacent_edge';
    }
  | {
      /*{
  "$ref": "#/components/schemas/Solid3dGetNextAdjacentEdge"
}*/
      data: Solid3dGetNextAdjacentEdge_type;
      type: 'solid3d_get_next_adjacent_edge';
    }
  | {
      /*{
  "$ref": "#/components/schemas/MouseClick"
}*/
      data: MouseClick_type;
      type: 'mouse_click';
    }
  | {
      /*{
  "$ref": "#/components/schemas/CurveGetType"
}*/
      data: CurveGetType_type;
      type: 'curve_get_type';
    }
  | {
      /*{
  "$ref": "#/components/schemas/CurveGetControlPoints"
}*/
      data: CurveGetControlPoints_type;
      type: 'curve_get_control_points';
    }
  | {
      /*{
  "$ref": "#/components/schemas/TakeSnapshot"
}*/
      data: TakeSnapshot_type;
      type: 'take_snapshot';
    }
  | {
      /*{
  "$ref": "#/components/schemas/PathGetInfo"
}*/
      data: PathGetInfo_type;
      type: 'path_get_info';
    }
  | {
      /*{
  "$ref": "#/components/schemas/PathGetCurveUuidsForVertices"
}*/
      data: PathGetCurveUuidsForVertices_type;
      type: 'path_get_curve_uuids_for_vertices';
    }
  | {
      /*{
  "$ref": "#/components/schemas/PlaneIntersectAndProject"
}*/
      data: PlaneIntersectAndProject_type;
      type: 'plane_intersect_and_project';
    }
  | {
      /*{
  "$ref": "#/components/schemas/CurveGetEndPoints"
}*/
      data: CurveGetEndPoints_type;
      type: 'curve_get_end_points';
    }
  | {
      /*{
  "$ref": "#/components/schemas/ImportFiles"
}*/
      data: ImportFiles_type;
      type: 'import_files';
    }
  | {
      /*{
  "$ref": "#/components/schemas/Mass"
}*/
      data: Mass_type;
      type: 'mass';
    }
  | {
      /*{
  "$ref": "#/components/schemas/Volume"
}*/
      data: Volume_type;
      type: 'volume';
    }
  | {
      /*{
  "$ref": "#/components/schemas/Density"
}*/
      data: Density_type;
      type: 'density';
    }
  | {
      /*{
  "$ref": "#/components/schemas/SurfaceArea"
}*/
      data: SurfaceArea_type;
      type: 'surface_area';
    }
  | {
      /*{
  "$ref": "#/components/schemas/CenterOfMass"
}*/
      data: CenterOfMass_type;
      type: 'center_of_mass';
    };

export type OkWebSocketResponseData_type =
  | {
      data: {
        ice_servers: IceServer_type[] /* Information about the ICE servers. */;
      };
      type: 'ice_server_info';
    }
  | {
      data: {
        candidate: RtcIceCandidateInit_type /* Information about the ICE candidate. */;
      };
      type: 'trickle_ice';
    }
  | {
      data: {
        answer: RtcSessionDescription_type /* The session description. */;
      };
      type: 'sdp_answer';
    }
  | {
      data: {
        modeling_response: OkModelingCmdResponse_type /* The result of the command. */;
      };
      type: 'modeling';
    }
  | { data: { files: RawFile_type[] /* The exported files */ }; type: 'export' }
  | { data: object; type: 'metrics_request' };

export interface Onboarding_type {
  first_call_from_their_machine_date: string /* When the user first called an endpoint from their machine (i.e. not a litterbox execution) */;
  first_litterbox_execute_date: string /* When the user first used the litterbox */;
  first_token_date: string /* When the user created their first token */;
}

export interface OutputFile_type {
  /*{
  "nullable": true,
  "description": "The contents of the file. This is base64 encoded so we can ensure it is UTF-8 for JSON."
}*/
  contents?: string;
  /* default:, description:The name of the file. */
  name: string;
}

export type OutputFormat_type =
  | {
      storage: FbxStorage_type /* Specifies which kind of FBX will be exported. */;
      type: 'fbx';
    }
  | {
      presentation: GltfPresentation_type /* Specifies how the JSON will be presented. */;
      storage: GltfStorage_type /* Specifies which kind of glTF 2.0 will be exported. */;
      type: 'gltf';
    }
  | {
      /* Co-ordinate system of output data.

Defaults to the [KittyCAD co-ordinate system].

[KittyCAD co-ordinate system]: ../coord/constant.KITTYCAD.html */
      coords: System_type;
      type: 'obj';
      /* Export length unit.

Defaults to meters. */
      units: UnitLength_type;
    }
  | {
      /* Co-ordinate system of output data.

Defaults to the [KittyCAD co-ordinate system].

[KittyCAD co-ordinate system]: ../coord/constant.KITTYCAD.html */
      coords: System_type;
      storage: PlyStorage_type /* The storage for the output PLY file. */;
      type: 'ply';
    }
  | {
      /* Co-ordinate system of output data.

Defaults to the [KittyCAD co-ordinate system].

[KittyCAD co-ordinate system]: ../coord/constant.KITTYCAD.html */
      coords: System_type;
      type: 'step';
    }
  | {
      /* Co-ordinate system of output data.

Defaults to the [KittyCAD co-ordinate system].

[KittyCAD co-ordinate system]: ../coord/constant.KITTYCAD.html */
      coords: System_type;
      storage: StlStorage_type /* Export storage. */;
      type: 'stl';
      /* Export length unit.

Defaults to meters. */
      units: UnitLength_type;
    };

export type PathCommand_type =
  /* The path component command type (within a Path) */
  'move_to' | 'line_to' | 'bez_curve_to' | 'nurbs_curve_to' | 'add_arc';

export interface PathGetCurveUuidsForVertices_type {
  /*{
  "format": "uuid"
}*/
  curve_ids: string[];
}

export interface PathGetInfo_type {
  segments: PathSegmentInfo_type[] /* All segments in the path, in the order they were added. */;
}

export type PathSegment_type =
  | {
      end: Point3d_type /* End point of the line. */;
      relative: boolean /* Whether or not this line is a relative offset */;
      type: 'line';
    }
  | {
      /* format:double, description:Start of the arc along circle's perimeter. */
      angle_end: number;
      /* format:double, description:Start of the arc along circle's perimeter. */
      angle_start: number;
      center: Point2d_type /* Center of the circle */;
      /* format:double, description:Radius of the circle */
      radius: number;
      relative: boolean /* Whether or not this arc is a relative offset */;
      type: 'arc';
    }
  | {
      control1: Point3d_type /* First control point. */;
      control2: Point3d_type /* Second control point. */;
      end: Point3d_type /* Final control point. */;
      relative: boolean /* Whether or not this bezier is a relative offset */;
      type: 'bezier';
    }
  | {
      offset: Angle_type /* Offset of the arc. */;
      /*{
  "format": "double",
  "description": "Radius of the arc. Not to be confused with Raiders of the Lost Ark."
}*/
      radius: number;
      type: 'tangential_arc';
    }
  | {
      /* nullable:true, description:0 will be interpreted as none/null. */
      angle_snap_increment: Angle_type;
      to: Point3d_type /* Where the arc should end. Must lie in the same plane as the current path pen position. Must not be colinear with current path pen position. */;
      type: 'tangential_arc_to';
    };

export interface PathSegmentInfo_type {
  command: PathCommand_type /* What is the path segment? */;
  /*{
  "nullable": true,
  "description": "Which command created this path? This field is absent if the path command is not actually creating a path segment, e.g. moving the pen doesn't create a path segment."
}*/
  command_id: ModelingCmdId_type;
  relative: boolean /* Whether or not this segment is a relative offset */;
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

export type PaymentMethodType_type = 'card';

export interface PlaneIntersectAndProject_type {
  /*{
  "nullable": true,
  "description": "Corresponding coordinates of given window coordinates, intersected on given plane."
}*/
  plane_coordinates: Point2d_type;
}

export type PlyStorage_type =
  | 'ascii'
  | 'binary_little_endian'
  | 'binary_big_endian';

export interface Point2d_type {
  /*{
  "format": "double"
}*/
  x: number;
  /*{
  "format": "double"
}*/
  y: number;
}

export interface Point3d_type {
  /*{
  "format": "float"
}*/
  x: number;
  /*{
  "format": "float"
}*/
  y: number;
  /*{
  "format": "float"
}*/
  z: number;
}

export interface PointEMetadata_type {
  ok: boolean /* If the point-e service returned an ok response from ping. */;
}

export interface Pong_type {
  message: string /* The pong response. */;
}

export interface RawFile_type {
  /*{
  "format": "uint8",
  "minimum": 0
}*/
  contents: number[];
  name: string /* The name of the file. */;
}

export interface RtcIceCandidateInit_type {
  candidate: string /* The candidate string associated with the object. */;
  /*{
  "format": "uint16",
  "minimum": 0,
  "nullable": true,
  "description": "The index (starting at zero) of the m-line in the SDP this candidate is associated with."
}*/
  sdpMLineIndex?: number;
  /*{
  "nullable": true,
  "description": "The identifier of the \"media stream identification\" as defined in [RFC 8841](https://tools.ietf.org/html/rfc8841)."
}*/
  sdpMid?: string;
  /*{
  "nullable": true,
  "description": "The username fragment (as defined in [RFC 8445](https://tools.ietf.org/html/rfc8445#section-5.2.1)) associated with the object."
}*/
  usernameFragment?: string;
}

export type RtcSdpType_type =
  | 'unspecified'
  | 'offer'
  | 'pranswer'
  | 'answer'
  | 'rollback';

export interface RtcSessionDescription_type {
  sdp: string /* SDP string. */;
  type: RtcSdpType_type /* SDP type. */;
}

export type SceneSelectionType_type = 'replace' | 'add' | 'remove';

export type SceneToolType_type =
  /* The type of scene's active tool */
  | 'camera_revolve'
  | 'select'
  | 'move'
  | 'sketch_line'
  | 'sketch_curve'
  | 'sketch_curve_mod';

export interface SelectGet_type {
  /*{
  "format": "uuid"
}*/
  entity_ids: string[];
}

export interface SelectWithPoint_type {
  /* format:uuid, nullable:true, description:The UUID of the entity that was selected. */
  entity_id?: string;
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

export interface Solid3dGetAllEdgeFaces_type {
  /*{
  "format": "uuid"
}*/
  faces: string[];
}

export interface Solid3dGetAllOppositeEdges_type {
  /*{
  "format": "uuid"
}*/
  edges: string[];
}

export interface Solid3dGetNextAdjacentEdge_type {
  /* format:uuid, description:The UUID of the edge. */
  edge: string;
}

export interface Solid3dGetOppositeEdge_type {
  /* format:uuid, description:The UUID of the edge. */
  edge: string;
}

export interface Solid3dGetPrevAdjacentEdge_type {
  /* format:uuid, description:The UUID of the edge. */
  edge: string;
}

export type StlStorage_type = 'ascii' | 'binary';

export interface SuccessWebSocketResponse_type {
  /*{
  "format": "uuid",
  "nullable": true,
  "description": "Which request this is a response to. If the request was a modeling command, this is the modeling command ID. If no request ID was sent, this will be null."
}*/
  request_id?: string;
  resp: OkWebSocketResponseData_type /* The data sent with a successful response. This will be flattened into a 'type' and 'data' field. */;
  success: true;
}

export interface SurfaceArea_type {
  output_unit: UnitArea_type /* The output unit for the surface area. */;
  /* format:double, description:The surface area. */
  surface_area: number;
}

export interface System_type {
  forward: AxisDirectionPair_type /* Axis the front face of a model looks along. */;
  up: AxisDirectionPair_type /* Axis pointing up and away from a model. */;
}

export interface TakeSnapshot_type {
  /* format:byte, title:String, description:Contents of the image. */
  contents: string;
}

export type UnitAngle_type = 'degrees' | 'radians';

export interface UnitAngleConversion_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitAngle_type /* The source format of the unit conversion. */;
  /* format:double, nullable:true, description:The resulting value. */
  output?: number;
  output_unit: UnitAngle_type /* The output format of the unit conversion. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the API call. */;
}

export type UnitArea_type =
  | 'cm2'
  | 'dm2'
  | 'ft2'
  | 'in2'
  | 'km2'
  | 'm2'
  | 'mm2'
  | 'yd2';

export interface UnitAreaConversion_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitArea_type /* The source format of the unit conversion. */;
  /* format:double, nullable:true, description:The resulting value. */
  output?: number;
  output_unit: UnitArea_type /* The output format of the unit conversion. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the API call. */;
}

export type UnitCurrent_type =
  | 'amperes'
  | 'microamperes'
  | 'milliamperes'
  | 'nanoamperes';

export interface UnitCurrentConversion_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitCurrent_type /* The source format of the unit conversion. */;
  /* format:double, nullable:true, description:The resulting value. */
  output?: number;
  output_unit: UnitCurrent_type /* The output format of the unit conversion. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the API call. */;
}

export type UnitDensity_type = 'lb:ft3' | 'kg:m3';

export type UnitEnergy_type =
  | 'btu'
  | 'electronvolts'
  | 'joules'
  | 'kilocalories'
  | 'kilowatt_hours'
  | 'watt_hours';

export interface UnitEnergyConversion_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitEnergy_type /* The source format of the unit conversion. */;
  /* format:double, nullable:true, description:The resulting value. */
  output?: number;
  output_unit: UnitEnergy_type /* The output format of the unit conversion. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the API call. */;
}

export type UnitForce_type =
  | 'dynes'
  | 'kiloponds'
  | 'micronewtons'
  | 'millinewtons'
  | 'newtons'
  | 'poundals'
  | 'pounds';

export interface UnitForceConversion_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitForce_type /* The source format of the unit conversion. */;
  /* format:double, nullable:true, description:The resulting value. */
  output?: number;
  output_unit: UnitForce_type /* The output format of the unit conversion. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the API call. */;
}

export type UnitFrequency_type =
  | 'gigahertz'
  | 'hertz'
  | 'kilohertz'
  | 'megahertz'
  | 'microhertz'
  | 'millihertz'
  | 'nanohertz'
  | 'terahertz';

export interface UnitFrequencyConversion_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitFrequency_type /* The source format of the unit conversion. */;
  /* format:double, nullable:true, description:The resulting value. */
  output?: number;
  output_unit: UnitFrequency_type /* The output format of the unit conversion. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the API call. */;
}

export type UnitLength_type = 'cm' | 'ft' | 'in' | 'm' | 'mm' | 'yd';

export interface UnitLengthConversion_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitLength_type /* The source format of the unit conversion. */;
  /* format:double, nullable:true, description:The resulting value. */
  output?: number;
  output_unit: UnitLength_type /* The output format of the unit conversion. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the API call. */;
}

export type UnitMass_type = 'g' | 'kg' | 'lb';

export interface UnitMassConversion_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitMass_type /* The source format of the unit conversion. */;
  /* format:double, nullable:true, description:The resulting value. */
  output?: number;
  output_unit: UnitMass_type /* The output format of the unit conversion. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the API call. */;
}

export type UnitPower_type =
  | 'btu_per_minute'
  | 'horsepower'
  | 'kilowatts'
  | 'metric_horsepower'
  | 'microwatts'
  | 'milliwatts'
  | 'watts';

export interface UnitPowerConversion_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitPower_type /* The source format of the unit conversion. */;
  /* format:double, nullable:true, description:The resulting value. */
  output?: number;
  output_unit: UnitPower_type /* The output format of the unit conversion. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the API call. */;
}

export type UnitPressure_type =
  | 'atmospheres'
  | 'bars'
  | 'hectopascals'
  | 'kilopascals'
  | 'millibars'
  | 'pascals'
  | 'psi';

export interface UnitPressureConversion_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitPressure_type /* The source format of the unit conversion. */;
  /* format:double, nullable:true, description:The resulting value. */
  output?: number;
  output_unit: UnitPressure_type /* The output format of the unit conversion. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the API call. */;
}

export type UnitTemperature_type =
  | 'celsius'
  | 'fahrenheit'
  | 'kelvin'
  | 'rankine';

export interface UnitTemperatureConversion_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitTemperature_type /* The source format of the unit conversion. */;
  /* format:double, nullable:true, description:The resulting value. */
  output?: number;
  output_unit: UnitTemperature_type /* The output format of the unit conversion. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the API call. */;
}

export type UnitTorque_type = 'newton_metres' | 'pound_foot';

export interface UnitTorqueConversion_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitTorque_type /* The source format of the unit conversion. */;
  /* format:double, nullable:true, description:The resulting value. */
  output?: number;
  output_unit: UnitTorque_type /* The output format of the unit conversion. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the API call. */;
}

export type UnitVolume_type =
  | 'cm3'
  | 'ft3'
  | 'in3'
  | 'm3'
  | 'yd3'
  | 'usfloz'
  | 'usgal'
  | 'l'
  | 'ml';

export interface UnitVolumeConversion_type {
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* format:date-time, title:DateTime, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitVolume_type /* The source format of the unit conversion. */;
  /* format:double, nullable:true, description:The resulting value. */
  output?: number;
  output_unit: UnitVolume_type /* The output format of the unit conversion. */;
  /*{
  "format": "date-time",
  "nullable": true,
  "title": "DateTime",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* format:date-time, title:DateTime, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: string /* The user ID of the user who created the API call. */;
}

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

export interface Volume_type {
  output_unit: UnitVolume_type /* The output unit for the volume. */;
  /* format:double, description:The volume. */
  volume: number;
}

export type WebSocketRequest_type =
  | {
      candidate: RtcIceCandidateInit_type /* Information about the ICE candidate. */;
      type: 'trickle_ice';
    }
  | {
      offer: RtcSessionDescription_type /* The session description. */;
      type: 'sdp_offer';
    }
  | {
      cmd: ModelingCmd_type /* Which command to submit to the Kittycad engine. */;
      cmd_id: ModelingCmdId_type /* ID of command being submitted. */;
      type: 'modeling_cmd_req';
    }
  | { type: 'ping' }
  | {
      metrics: ClientMetrics_type /* Collected metrics from the Client's end of the engine connection. */;
      type: 'metrics_response';
    };

export type WebSocketResponse_type =
  | {
      /*{
  "format": "uuid",
  "nullable": true,
  "description": "Which request this is a response to. If the request was a modeling command, this is the modeling command ID. If no request ID was sent, this will be null."
}*/
      request_id?: string;
      resp: OkWebSocketResponseData_type /* The data sent with a successful response. This will be flattened into a 'type' and 'data' field. */;
      success: true;
    }
  | {
      errors: ApiError_type[] /* The errors that occurred. */;
      /*{
  "format": "uuid",
  "nullable": true,
  "description": "Which request this is a response to. If the request was a modeling command, this is the modeling command ID. If no request ID was sent, this will be null."
}*/
      request_id?: string;
      success: false;
    };

export interface Models {
  AccountProvider_type: AccountProvider_type;
  AiPluginApi_type: AiPluginApi_type;
  AiPluginApiType_type: AiPluginApiType_type;
  AiPluginAuth_type: AiPluginAuth_type;
  AiPluginAuthType_type: AiPluginAuthType_type;
  AiPluginHttpAuthType_type: AiPluginHttpAuthType_type;
  AiPluginManifest_type: AiPluginManifest_type;
  Angle_type: Angle_type;
  AnnotationLineEnd_type: AnnotationLineEnd_type;
  AnnotationLineEndOptions_type: AnnotationLineEndOptions_type;
  AnnotationOptions_type: AnnotationOptions_type;
  AnnotationTextAlignmentX_type: AnnotationTextAlignmentX_type;
  AnnotationTextAlignmentY_type: AnnotationTextAlignmentY_type;
  AnnotationTextOptions_type: AnnotationTextOptions_type;
  AnnotationType_type: AnnotationType_type;
  ApiCallQueryGroup_type: ApiCallQueryGroup_type;
  ApiCallQueryGroupBy_type: ApiCallQueryGroupBy_type;
  ApiCallStatus_type: ApiCallStatus_type;
  ApiCallWithPrice_type: ApiCallWithPrice_type;
  ApiCallWithPriceResultsPage_type: ApiCallWithPriceResultsPage_type;
  ApiError_type: ApiError_type;
  ApiToken_type: ApiToken_type;
  ApiTokenResultsPage_type: ApiTokenResultsPage_type;
  AppClientInfo_type: AppClientInfo_type;
  AsyncApiCall_type: AsyncApiCall_type;
  AsyncApiCallOutput_type: AsyncApiCallOutput_type;
  AsyncApiCallResultsPage_type: AsyncApiCallResultsPage_type;
  AsyncApiCallType_type: AsyncApiCallType_type;
  Axis_type: Axis_type;
  AxisDirectionPair_type: AxisDirectionPair_type;
  BillingInfo_type: BillingInfo_type;
  CacheMetadata_type: CacheMetadata_type;
  CameraDragInteractionType_type: CameraDragInteractionType_type;
  CardDetails_type: CardDetails_type;
  CenterOfMass_type: CenterOfMass_type;
  ClientMetrics_type: ClientMetrics_type;
  Cluster_type: Cluster_type;
  CodeLanguage_type: CodeLanguage_type;
  CodeOutput_type: CodeOutput_type;
  Color_type: Color_type;
  Connection_type: Connection_type;
  CountryCode_type: CountryCode_type;
  Coupon_type: Coupon_type;
  CreatedAtSortMode_type: CreatedAtSortMode_type;
  Currency_type: Currency_type;
  CurveGetControlPoints_type: CurveGetControlPoints_type;
  CurveGetEndPoints_type: CurveGetEndPoints_type;
  CurveGetType_type: CurveGetType_type;
  CurveType_type: CurveType_type;
  Customer_type: Customer_type;
  CustomerBalance_type: CustomerBalance_type;
  Density_type: Density_type;
  DeviceAccessTokenRequestForm_type: DeviceAccessTokenRequestForm_type;
  DeviceAuthRequestForm_type: DeviceAuthRequestForm_type;
  DeviceAuthVerifyParams_type: DeviceAuthVerifyParams_type;
  Direction_type: Direction_type;
  Discount_type: Discount_type;
  EmailAuthenticationForm_type: EmailAuthenticationForm_type;
  EntityGetAllChildUuids_type: EntityGetAllChildUuids_type;
  EntityGetChildUuid_type: EntityGetChildUuid_type;
  EntityGetNumChildren_type: EntityGetNumChildren_type;
  EntityGetParentId_type: EntityGetParentId_type;
  EntityType_type: EntityType_type;
  Environment_type: Environment_type;
  Error_type: Error_type;
  ErrorCode_type: ErrorCode_type;
  Export_type: Export_type;
  ExportFile_type: ExportFile_type;
  ExtendedUser_type: ExtendedUser_type;
  ExtendedUserResultsPage_type: ExtendedUserResultsPage_type;
  FailureWebSocketResponse_type: FailureWebSocketResponse_type;
  FbxStorage_type: FbxStorage_type;
  FileCenterOfMass_type: FileCenterOfMass_type;
  FileConversion_type: FileConversion_type;
  FileDensity_type: FileDensity_type;
  FileExportFormat_type: FileExportFormat_type;
  FileImportFormat_type: FileImportFormat_type;
  FileMass_type: FileMass_type;
  FileSurfaceArea_type: FileSurfaceArea_type;
  FileSystemMetadata_type: FileSystemMetadata_type;
  FileVolume_type: FileVolume_type;
  Gateway_type: Gateway_type;
  GetEntityType_type: GetEntityType_type;
  GltfPresentation_type: GltfPresentation_type;
  GltfStorage_type: GltfStorage_type;
  HighlightSetEntity_type: HighlightSetEntity_type;
  IceServer_type: IceServer_type;
  ImageFormat_type: ImageFormat_type;
  ImageType_type: ImageType_type;
  ImportFile_type: ImportFile_type;
  ImportFiles_type: ImportFiles_type;
  InputFormat_type: InputFormat_type;
  Invoice_type: Invoice_type;
  InvoiceLineItem_type: InvoiceLineItem_type;
  InvoiceStatus_type: InvoiceStatus_type;
  Jetstream_type: Jetstream_type;
  JetstreamApiStats_type: JetstreamApiStats_type;
  JetstreamConfig_type: JetstreamConfig_type;
  JetstreamStats_type: JetstreamStats_type;
  LeafNode_type: LeafNode_type;
  Mass_type: Mass_type;
  Mesh_type: Mesh_type;
  MetaClusterInfo_type: MetaClusterInfo_type;
  Metadata_type: Metadata_type;
  Method_type: Method_type;
  ModelingCmd_type: ModelingCmd_type;
  ModelingCmdId_type: ModelingCmdId_type;
  MouseClick_type: MouseClick_type;
  NewAddress_type: NewAddress_type;
  OAuth2ClientInfo_type: OAuth2ClientInfo_type;
  OAuth2GrantType_type: OAuth2GrantType_type;
  OkModelingCmdResponse_type: OkModelingCmdResponse_type;
  OkWebSocketResponseData_type: OkWebSocketResponseData_type;
  Onboarding_type: Onboarding_type;
  OutputFile_type: OutputFile_type;
  OutputFormat_type: OutputFormat_type;
  PathCommand_type: PathCommand_type;
  PathGetCurveUuidsForVertices_type: PathGetCurveUuidsForVertices_type;
  PathGetInfo_type: PathGetInfo_type;
  PathSegment_type: PathSegment_type;
  PathSegmentInfo_type: PathSegmentInfo_type;
  PaymentIntent_type: PaymentIntent_type;
  PaymentMethod_type: PaymentMethod_type;
  PaymentMethodCardChecks_type: PaymentMethodCardChecks_type;
  PaymentMethodType_type: PaymentMethodType_type;
  PlaneIntersectAndProject_type: PlaneIntersectAndProject_type;
  PlyStorage_type: PlyStorage_type;
  Point2d_type: Point2d_type;
  Point3d_type: Point3d_type;
  PointEMetadata_type: PointEMetadata_type;
  Pong_type: Pong_type;
  RawFile_type: RawFile_type;
  RtcIceCandidateInit_type: RtcIceCandidateInit_type;
  RtcSdpType_type: RtcSdpType_type;
  RtcSessionDescription_type: RtcSessionDescription_type;
  SceneSelectionType_type: SceneSelectionType_type;
  SceneToolType_type: SceneToolType_type;
  SelectGet_type: SelectGet_type;
  SelectWithPoint_type: SelectWithPoint_type;
  Session_type: Session_type;
  Solid3dGetAllEdgeFaces_type: Solid3dGetAllEdgeFaces_type;
  Solid3dGetAllOppositeEdges_type: Solid3dGetAllOppositeEdges_type;
  Solid3dGetNextAdjacentEdge_type: Solid3dGetNextAdjacentEdge_type;
  Solid3dGetOppositeEdge_type: Solid3dGetOppositeEdge_type;
  Solid3dGetPrevAdjacentEdge_type: Solid3dGetPrevAdjacentEdge_type;
  StlStorage_type: StlStorage_type;
  SuccessWebSocketResponse_type: SuccessWebSocketResponse_type;
  SurfaceArea_type: SurfaceArea_type;
  System_type: System_type;
  TakeSnapshot_type: TakeSnapshot_type;
  UnitAngle_type: UnitAngle_type;
  UnitAngleConversion_type: UnitAngleConversion_type;
  UnitArea_type: UnitArea_type;
  UnitAreaConversion_type: UnitAreaConversion_type;
  UnitCurrent_type: UnitCurrent_type;
  UnitCurrentConversion_type: UnitCurrentConversion_type;
  UnitDensity_type: UnitDensity_type;
  UnitEnergy_type: UnitEnergy_type;
  UnitEnergyConversion_type: UnitEnergyConversion_type;
  UnitForce_type: UnitForce_type;
  UnitForceConversion_type: UnitForceConversion_type;
  UnitFrequency_type: UnitFrequency_type;
  UnitFrequencyConversion_type: UnitFrequencyConversion_type;
  UnitLength_type: UnitLength_type;
  UnitLengthConversion_type: UnitLengthConversion_type;
  UnitMass_type: UnitMass_type;
  UnitMassConversion_type: UnitMassConversion_type;
  UnitPower_type: UnitPower_type;
  UnitPowerConversion_type: UnitPowerConversion_type;
  UnitPressure_type: UnitPressure_type;
  UnitPressureConversion_type: UnitPressureConversion_type;
  UnitTemperature_type: UnitTemperature_type;
  UnitTemperatureConversion_type: UnitTemperatureConversion_type;
  UnitTorque_type: UnitTorque_type;
  UnitTorqueConversion_type: UnitTorqueConversion_type;
  UnitVolume_type: UnitVolume_type;
  UnitVolumeConversion_type: UnitVolumeConversion_type;
  UpdateUser_type: UpdateUser_type;
  User_type: User_type;
  UserResultsPage_type: UserResultsPage_type;
  Uuid_type: Uuid_type;
  VerificationToken_type: VerificationToken_type;
  Volume_type: Volume_type;
  WebSocketRequest_type: WebSocketRequest_type;
  WebSocketResponse_type: WebSocketResponse_type;
}
