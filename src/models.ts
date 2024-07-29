export type AccountProvider_type =
  | 'apple'
  | 'discord'
  | 'google'
  | 'github'
  | 'microsoft'
  | 'saml'
  | 'tencent';

export interface AddOrgMember_type {
  /* format:email, description:The email address of the user to add to the org. */
  email: string;
  role: UserOrgRole_type /* The organization role to give the user. */;
}

export interface AddressDetails_type {
  city: string /* The city component. */;
  country: CountryCode_type /* The country component. This is a two-letter ISO country code. */;
  state: string /* The state component. */;
  street1: string /* The first street component. */;
  street2: string /* The second street component. */;
  zip: string /* The zip component. */;
}

export type AiFeedback_type = 'thumbs_up' | 'thumbs_down';

export interface AiPrompt_type {
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "When the prompt was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The date and time the AI prompt was created. */
  created_at: string;
  /* nullable:true, description:The error message if the prompt failed. */
  error?: string;
  /* nullable:true, description:Feedback from the user, if any. */
  feedback?: AiFeedback_type;
  id: Uuid_type /* The unique identifier for the AI Prompt. */;
  metadata: any;
  model_version: string /* The version of the model. */;
  /*{
  "nullable": true,
  "description": "The output file. In the case of TextToCad this is a link to a file in a GCP bucket."
}*/
  output_file?: string;
  prompt: string /* The prompt. */;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "When the prompt was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the prompt. */;
  type: AiPromptType_type /* The type of prompt. */;
  /* title:DateTime, format:date-time, description:The date and time the AI prompt was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the AI Prompt. */;
}

export interface AiPromptResultsPage_type {
  items: AiPrompt_type[] /* list of items on this page of results */;
  /*{
  "nullable": true,
  "description": "token used to fetch the next page of results (if any)"
}*/
  next_page?: string;
}

export type AiPromptType_type = 'text_to_cad';

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
  color?: Color_type;
  /* nullable:true, description:How to style the start and end of the line */
  line_ends?: AnnotationLineEndOptions_type;
  /* nullable:true, format:float, description:Width of the annotation's line */
  line_width?: number;
  /* nullable:true, description:Position to put the annotation */
  position?: Point3d_type;
  /* nullable:true, description:Text displayed on the annotation */
  text?: AnnotationTextOptions_type;
}

export type AnnotationTextAlignmentX_type =
  /* Horizontal Text alignment */
  'left' | 'center' | 'right';

export type AnnotationTextAlignmentY_type =
  /* Vertical Text alignment */
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
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The date and time the API call completed billing."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The date and time the API call was created. */
  created_at: string;
  /*{
  "nullable": true,
  "title": "int64",
  "format": "duration",
  "description": "The duration of the API call."
}*/
  duration?: number;
  /* format:email, description:The user's email address. */
  email: string;
  endpoint: string /* The endpoint requested by the API call. */;
  id: Uuid_type /* The unique identifier for the API call. */;
  /*{
  "title": "String",
  "default": "",
  "format": "ip",
  "description": "The ip address of the origin."
}*/
  ip_address: string;
  /*{
  "nullable": true,
  "description": "If the API call was spawned from the litterbox or not."
}*/
  litterbox?: boolean;
  method: Method_type /* The HTTP method requested by the API call. */;
  /*{
  "nullable": true,
  "format": "int32",
  "description": "The number of minutes the API call was billed for."
}*/
  minutes?: number;
  /*{
  "nullable": true,
  "description": "The organization ID of the API call if it is billable through an organization."
}*/
  org_id?: Uuid_type;
  origin: string /* The origin of the API call. */;
  /*{
  "nullable": true,
  "title": "double",
  "format": "money-usd",
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
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The date and time the API call started billing."
}*/
  started_at?: string;
  /*{
  "nullable": true,
  "title": "int32",
  "format": "int32",
  "description": "The status code returned by the API call."
}*/
  status_code?: number;
  stripe_invoice_item_id: string /* The Stripe invoice item ID of the API call if it is billable. */;
  token: Uuid_type /* The API token that made the API call. */;
  /* title:DateTime, format:date-time, description:The date and time the API call was last updated. */
  updated_at: string;
  user_agent: string /* The user agent of the request. */;
  user_id: Uuid_type /* The ID of the user that made the API call. */;
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
  /* title:DateTime, format:date-time, description:The date and time the API token was created. */
  created_at: string;
  id: Uuid_type /* The unique identifier for the API token. */;
  is_valid: boolean /* If the token is valid. We never delete API tokens, but we can mark them as invalid. We save them for ever to preserve the history of the API token. */;
  /* nullable:true, description:An optional label for the API token. */
  label?: string;
  token: StringUuid_type /* The API token itself. */;
  /* title:DateTime, format:date-time, description:The date and time the API token was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The ID of the user that owns the API token. */;
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
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the async API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the async API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the async API call.

This is the same as the API call ID. */
  id: Uuid_type;
  input: string;
  output: any;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the async API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the async API call. */;
  type: AsyncApiCallType_type /* The type of async API call. */;
  /*{
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the async API call was last updated."
}*/
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the async API call. */;
  worker: string /* The worker node that is performing or performed the async API call. */;
}

export type AsyncApiCallOutput_type =
  | {
      /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
      completed_at?: string;
      /* title:DateTime, format:date-time, description:The time and date the API call was created. */
      created_at: string;
      /* nullable:true, description:The error the function returned, if any. */
      error?: string;
      /* The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid_type;
      output_format: FileExportFormat_type /* The output format of the file conversion. */;
      /* nullable:true, description:The output format options of the file conversion. */
      output_format_options?: OutputFormat_type;
      outputs: {
        [key: string]: /*{
  "title": "String",
  "format": "byte"
}*/
        string;
      };
      src_format: FileImportFormat_type /* The source format of the file conversion. */;
      /* nullable:true, description:The source format options of the file conversion. */
      src_format_options?: InputFormat_type;
      /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
      started_at?: string;
      status: ApiCallStatus_type /* The status of the API call. */;
      type: 'file_conversion';
      /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
      updated_at: string;
      user_id: Uuid_type /* The user ID of the user who created the API call. */;
    }
  | {
      /* nullable:true, description:The resulting center of mass. */
      center_of_mass?: Point3d_type;
      /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
      completed_at?: string;
      /* title:DateTime, format:date-time, description:The time and date the API call was created. */
      created_at: string;
      /* nullable:true, description:The error the function returned, if any. */
      error?: string;
      /* The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid_type;
      output_unit: UnitLength_type /* The output unit for the center of mass. */;
      src_format: FileImportFormat_type /* The source format of the file. */;
      /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
      started_at?: string;
      status: ApiCallStatus_type /* The status of the API call. */;
      type: 'file_center_of_mass';
      /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
      updated_at: string;
      user_id: Uuid_type /* The user ID of the user who created the API call. */;
    }
  | {
      /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
      completed_at?: string;
      /* title:DateTime, format:date-time, description:The time and date the API call was created. */
      created_at: string;
      /* nullable:true, description:The error the function returned, if any. */
      error?: string;
      /* The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid_type;
      /* nullable:true, format:double, description:The resulting mass. */
      mass?: number;
      /* default:0, format:double, description:The material density as denoted by the user. */
      material_density: number;
      material_density_unit: UnitDensity_type /* The material density unit. */;
      output_unit: UnitMass_type /* The output unit for the mass. */;
      src_format: FileImportFormat_type /* The source format of the file. */;
      /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
      started_at?: string;
      status: ApiCallStatus_type /* The status of the API call. */;
      type: 'file_mass';
      /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
      updated_at: string;
      user_id: Uuid_type /* The user ID of the user who created the API call. */;
    }
  | {
      /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
      completed_at?: string;
      /* title:DateTime, format:date-time, description:The time and date the API call was created. */
      created_at: string;
      /* nullable:true, description:The error the function returned, if any. */
      error?: string;
      /* The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid_type;
      output_unit: UnitVolume_type /* The output unit for the volume. */;
      src_format: FileImportFormat_type /* The source format of the file. */;
      /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
      started_at?: string;
      status: ApiCallStatus_type /* The status of the API call. */;
      type: 'file_volume';
      /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
      updated_at: string;
      user_id: Uuid_type /* The user ID of the user who created the API call. */;
      /* nullable:true, format:double, description:The resulting volume. */
      volume?: number;
    }
  | {
      /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
      completed_at?: string;
      /* title:DateTime, format:date-time, description:The time and date the API call was created. */
      created_at: string;
      /* nullable:true, format:double, description:The resulting density. */
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
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
      started_at?: string;
      status: ApiCallStatus_type /* The status of the API call. */;
      type: 'file_density';
      /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
      updated_at: string;
      user_id: Uuid_type /* The user ID of the user who created the API call. */;
    }
  | {
      /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
      completed_at?: string;
      /* title:DateTime, format:date-time, description:The time and date the API call was created. */
      created_at: string;
      /* nullable:true, description:The error the function returned, if any. */
      error?: string;
      /* The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid_type;
      output_unit: UnitArea_type /* The output unit for the surface area. */;
      src_format: FileImportFormat_type /* The source format of the file. */;
      /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
      started_at?: string;
      status: ApiCallStatus_type /* The status of the API call. */;
      /* nullable:true, format:double, description:The resulting surface area. */
      surface_area?: number;
      type: 'file_surface_area';
      /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
      updated_at: string;
      user_id: Uuid_type /* The user ID of the user who created the API call. */;
    }
  | {
      /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
      completed_at?: string;
      /* title:DateTime, format:date-time, description:The time and date the API call was created. */
      created_at: string;
      /* nullable:true, description:The error the function returned, if any. */
      error?: string;
      /* nullable:true, description:Feedback from the user, if any. */
      feedback?: AiFeedback_type;
      /* The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid_type;
      model_version: string /* The version of the model. */;
      output_format: FileExportFormat_type /* The output format of the model. */;
      outputs: {
        [key: string]: /*{
  "title": "String",
  "format": "byte"
}*/
        string;
      };
      prompt: string /* The prompt. */;
      /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
      started_at?: string;
      status: ApiCallStatus_type /* The status of the API call. */;
      type: 'text_to_cad';
      /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
      updated_at: string;
      user_id: Uuid_type /* The user ID of the user who created the API call. */;
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
  | 'file_surface_area'
  | 'text_to_cad';

export interface AuthCallback_type {
  code: string /* The authorization code. */;
  /*{
  "nullable": true,
  "description": "For Apple only, a JSON web token containing the user’s identity information."
}*/
  id_token?: string;
  state: string /* The state that we had passed in through the user consent URL. */;
  /*{
  "nullable": true,
  "description": "For Apple only, a JSON string containing the data requested in the scope property. The returned data is in the following format: `{ \"name\": { \"firstName\": string, \"lastName\": string }, \"email\": string }`"
}*/
  user?: string;
}

export type Axis_type = 'y' | 'z';

export interface AxisDirectionPair_type {
  axis: Axis_type /* Axis specifier. */;
  direction: Direction_type /* Specifies which direction the axis is pointing. */;
}

export type BatchResponse_type =
  | {
      response: OkModelingCmdResponse_type /* Response to the modeling command. */;
    }
  | {
      errors: ApiError_type[] /* Errors that occurred during the modeling command. */;
    };

export interface BillingInfo_type {
  /* nullable:true, description:The address of the customer. */
  address?: AddressDetails_type;
  name: string /* The name of the customer. */;
  /*{
  "title": "String",
  "default": "",
  "format": "phone",
  "description": "The phone for the customer."
}*/
  phone: string;
}

export type BlockReason_type =
  | 'missing_payment_method'
  | 'payment_method_failed';

export interface CacheMetadata_type {
  ok: boolean /* If the cache returned an ok response from ping. */;
}

export interface CameraDragEnd_type {
  settings: CameraSettings_type /* Camera settings */;
}

export type CameraDragInteractionType_type = 'pan' | 'rotate' | 'zoom';

export interface CameraDragMove_type {
  settings: CameraSettings_type /* Camera settings */;
}

export interface CameraSettings_type {
  center: Point3d_type /* Camera's look-at center (center-pos gives viewing vector) */;
  /* nullable:true, format:float, description:Camera's field-of-view angle (if ortho is false) */
  fov_y?: number;
  orientation: Point4d_type /* The Camera's orientation (in the form of a quaternion) */;
  ortho: boolean /* Whether or not the camera is in ortho mode */;
  /*{
  "nullable": true,
  "format": "float",
  "description": "The camera's ortho scale (derived from viewing distance if ortho is true)"
}*/
  ortho_scale?: number;
  pos: Point3d_type /* Camera position (vantage) */;
  up: Point3d_type /* Camera's world-space up vector */;
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

export interface ClosePath_type {
  /*{
  "format": "uuid",
  "description": "The UUID of the lone face of the resulting solid2D."
}*/
  face_id: string;
}

export interface Cluster_type {
  /* nullable:true, description:The IP address of the cluster. */
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
  "nullable": true,
  "title": "double",
  "format": "money-usd",
  "description": "Amount (in the `currency` specified) that will be taken off the subtotal of any invoices for this customer."
}*/
  amount_off?: number;
  /* default:false, description:Always true for a deleted object. */
  deleted: boolean;
  id: string /* Unique identifier for the object. */;
  metadata: { [key: string]: string };
  /*{
  "nullable": true,
  "description": "Name of the coupon displayed to customers on, for instance invoices, or receipts.\n\nBy default the `id` is shown if `name` is not set."
}*/
  name?: string;
  /*{
  "nullable": true,
  "format": "double",
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
  address?: AddressDetails_type;
  /*{
  "title": "double",
  "default": 0,
  "format": "money-usd",
  "description": "Current balance, if any, being stored on the customer in the payments service.\n\nIf negative, the customer has credit to apply to their next invoice. If positive, the customer has an amount owed that will be added to their next invoice. The balance does not refer to any unpaid invoices; it solely takes into account amounts that have yet to be successfully applied to any invoice. This balance is only taken into account as invoices are finalized."
}*/
  balance: number;
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
  "title": "String",
  "default": "",
  "format": "phone",
  "description": "The customer's phone number."
}*/
  phone: string;
}

export interface CustomerBalance_type {
  /* title:DateTime, format:date-time, description:The date and time the balance was created. */
  created_at: string;
  id: Uuid_type /* The unique identifier for the balance. */;
  map_id: Uuid_type /* The mapping id of the user or org. */;
  /*{
  "nullable": true,
  "description": "The enterprise price for the Modeling App subscription, if they are on the enterprise plan."
}*/
  modeling_app_enterprise_price?: SubscriptionTierPrice_type;
  /*{
  "title": "double",
  "format": "money-usd",
  "description": "The monthy credits remaining in the balance. This gets re-upped every month, but if the credits are not used for a month they do not carry over to the next month. It is a stable amount granted to the customer per month."
}*/
  monthly_credits_remaining: number;
  /*{
  "title": "double",
  "format": "money-usd",
  "description": "The amount of pre-pay cash remaining in the balance. This number goes down as the customer uses their pre-paid credits. The reason we track this amount is if a customer ever wants to withdraw their pre-pay cash, we can use this amount to determine how much to give them. Say a customer has $100 in pre-paid cash, their bill is worth, $50 after subtracting any other credits (like monthly etc.) Their bill is $50, their pre-pay cash remaining will be subtracted by 50 to pay the bill and their `pre_pay_credits_remaining` will be subtracted by 50 to pay the bill. This way if they want to withdraw money after, they can only withdraw $50 since that is the amount of cash they have remaining."
}*/
  pre_pay_cash_remaining: number;
  /*{
  "title": "double",
  "format": "money-usd",
  "description": "The amount of credits remaining in the balance. This is typically the amount of cash * some multiplier they get for pre-paying their account. This number lowers every time a bill is paid with the balance. This number increases every time a customer adds funds to their balance. This may be through a subscription or a one off payment."
}*/
  pre_pay_credits_remaining: number;
  /* nullable:true, description:Details about the subscription. */
  subscription_details?: ZooProductSubscriptions_type;
  /* nullable:true, description:The subscription ID for the user. */
  subscription_id?: string;
  /*{
  "title": "double",
  "format": "money-usd",
  "description": "This includes any outstanding, draft, or open invoices and any pending invoice items. This does not include any credits the customer has on their account."
}*/
  total_due: number;
  /* title:DateTime, format:date-time, description:The date and time the balance was last updated. */
  updated_at: string;
}

export type CutType_type = 'fillet' | 'chamfer';

export type DefaultCameraFocusOn_type = any;

export interface DefaultCameraGetSettings_type {
  settings: CameraSettings_type /* Camera settings */;
}

export interface DefaultCameraZoom_type {
  settings: CameraSettings_type /* Camera settings */;
}

export interface Density_type {
  /* format:double, description:The density. */
  density: number;
  output_unit: UnitDensity_type /* The output unit for the density. */;
}

export interface DerEncodedKeyPair_type {
  /* title:String, format:byte, description:The request signing private key (pem file). */
  private_key: string;
  /*{
  "title": "String",
  "format": "byte",
  "description": "The request signing public certificate (pem file)."
}*/
  public_cert: string;
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

export interface DiscountCode_type {
  code: string /* The code for the discount. */;
  /* nullable:true, format:date-time, description:The date the discount code expires. */
  expires_at?: string;
  /* format:uint32, minimum:0, description:The percent off for the discount. */
  percent_off: number;
}

export type DistanceType_type =
  | { type: 'euclidean' }
  | { axis: GlobalAxis_type /* Global axis */; type: 'on_axis' };

export interface EmailAuthenticationForm_type {
  /*{
  "nullable": true,
  "format": "uri",
  "description": "The URL to redirect back to after we have authenticated."
}*/
  callback_url?: string;
  /* format:email, description:The user's email. */
  email: string;
}

export interface EntityCircularPattern_type {
  /*{
  "format": "uuid"
}*/
  entity_ids: string[];
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

export interface EntityGetDistance_type {
  max_distance: LengthUnit_type /* The maximum distance between the input entities. */;
  min_distance: LengthUnit_type /* The minimum distance between the input entities. */;
}

export interface EntityGetNumChildren_type {
  /* format:uint32, minimum:0, description:The number of children the entity has. */
  num: number;
}

export interface EntityGetParentId_type {
  /* format:uuid, description:The UUID of the parent entity. */
  entity_id: string;
}

export interface EntityGetSketchPaths_type {
  /*{
  "format": "uuid"
}*/
  entity_ids: string[];
}

export interface EntityLinearPattern_type {
  /*{
  "format": "uuid"
}*/
  entity_ids: string[];
}

export interface EntityLinearPatternTransform_type {
  /*{
  "format": "uuid"
}*/
  entity_ids: string[];
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
  | 'plane'
  | 'vertex';

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
  | 'auth_token_missing'
  | 'auth_token_invalid'
  | 'invalid_json'
  | 'invalid_bson'
  | 'wrong_protocol'
  | 'connection_problem'
  | 'message_type_not_accepted'
  | 'message_type_not_accepted_for_web_r_t_c';

export type Event_type = {
  /*{
  "nullable": true,
  "description": "Attachment URI for where the attachment is stored."
}*/
  attachment_uri?: string;
  /* format:date-time, description:Time this event was created. */
  created_at: string;
  event_type: ModelingAppEventType_type /* The specific event type from the modeling app. */;
  /* nullable:true, format:date-time, description:Time the associated attachment was last compiled. */
  last_compiled_at?: string;
  /* nullable:true, description:Project descriptino as given by the user. */
  project_description?: string;
  project_name: string /* Project name as given by the user. */;
  /*{
  "format": "uuid",
  "description": "The source app for this event, uuid that is unique to the app."
}*/
  source_id: string;
  type: 'modeling_app_event';
  user_id: string /* An anonymous user id generated client-side. */;
};

export interface Export_type {
  files: ExportFile_type[] /* The files that were exported. */;
}

export interface ExportFile_type {
  /* title:String, format:byte, description:The contents of the file, base64 encoded. */
  contents: string;
  name: string /* The name of the file. */;
}

export interface ExtendedUser_type {
  /* nullable:true, description:If the user should be blocked and the reason why. */
  block?: BlockReason_type;
  /*{
  "default": false,
  "description": "If we can train on the user's data. If the user is a member of an organization, the organization's setting will override this."
}*/
  can_train_on_data: boolean;
  company: string /* The user's company. */;
  /* title:DateTime, format:date-time, description:The date and time the user was created. */
  created_at: string;
  discord: string /* The user's Discord handle. */;
  /* format:email, description:The email address of the user. */
  email: string;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
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
  id: Uuid_type /* The unique identifier for the user. */;
  /* title:String, format:uri, description:The image avatar for the user. This is a URL. */
  image: string;
  /* default:false, description:If the user is tied to a service account. */
  is_service_account: boolean;
  last_name: string /* The user's last name. */;
  /*{
  "nullable": true,
  "description": "The user's MailChimp ID. This is mostly used for internal mapping."
}*/
  mailchimp_id?: string;
  name: string /* The name of the user. This is auto populated at first from the authentication provider (if there was a name). It can be updated by the user by updating their `first_name` and `last_name` fields. */;
  /*{
  "title": "String",
  "default": "",
  "format": "phone",
  "description": "The user's phone number."
}*/
  phone: string;
  /*{
  "nullable": true,
  "description": "The user's Stripe ID. This is mostly used for internal mapping."
}*/
  stripe_id?: string;
  /* title:DateTime, format:date-time, description:The date and time the user was last updated. */
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

export type ExtrusionFaceCapType_type = 'none' | 'top' | 'bottom';

export interface ExtrusionFaceInfo_type {
  cap: ExtrusionFaceCapType_type /* Whether or not this extrusion face is a top/bottom cap face or not. Note that top/bottom cap faces will not have associated curve IDs. */;
  /* nullable:true, format:uuid, description:Path component (curve) UUID. */
  curve_id?: string;
  /* nullable:true, format:uuid, description:Face uuid. */
  face_id?: string;
}

export interface FaceGetCenter_type {
  pos: Point3d_type /* The 3D position on the surface center of mass */;
}

export interface FaceGetGradient_type {
  df_du: Point3d_type /* dFdu */;
  df_dv: Point3d_type /* dFdv */;
  normal: Point3d_type /* Normal (||dFdu x dFdv||) */;
}

export interface FaceGetPosition_type {
  pos: Point3d_type /* The 3D position on the surface that was evaluated */;
}

export interface FaceIsPlanar_type {
  /* nullable:true, description:plane's origin */
  origin?: Point3d_type;
  /* nullable:true, description:plane's local x-axis */
  x_axis?: Point3d_type;
  /* nullable:true, description:plane's local y-axis */
  y_axis?: Point3d_type;
  /* nullable:true, description:plane's local z-axis (normal) */
  z_axis?: Point3d_type;
}

export interface FailureWebSocketResponse_type {
  errors: ApiError_type[] /* The errors that occurred. */;
  /*{
  "nullable": true,
  "format": "uuid",
  "description": "Which request this is a response to. If the request was a modeling command, this is the modeling command ID. If no request ID was sent, this will be null."
}*/
  request_id?: string;
  success: false;
}

export type FbxStorage_type = 'ascii' | 'binary';

export interface FileCenterOfMass_type {
  /* nullable:true, description:The resulting center of mass. */
  center_of_mass?: Point3d_type;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  output_unit: UnitLength_type /* The output unit for the center of mass. */;
  src_format: FileImportFormat_type /* The source format of the file. */;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the API call. */;
}

export interface FileConversion_type {
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  output_format: FileExportFormat_type /* The output format of the file conversion. */;
  /* nullable:true, description:The output format options of the file conversion. */
  output_format_options?: OutputFormat_type;
  outputs: {
    [key: string]: /*{
  "title": "String",
  "format": "byte"
}*/
    string;
  };
  src_format: FileImportFormat_type /* The source format of the file conversion. */;
  /* nullable:true, description:The source format options of the file conversion. */
  src_format_options?: InputFormat_type;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the API call. */;
}

export interface FileDensity_type {
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, format:double, description:The resulting density. */
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
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the API call. */;
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
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* nullable:true, format:double, description:The resulting mass. */
  mass?: number;
  /* default:0, format:double, description:The material density as denoted by the user. */
  material_density: number;
  material_density_unit: UnitDensity_type /* The material density unit. */;
  output_unit: UnitMass_type /* The output unit for the mass. */;
  src_format: FileImportFormat_type /* The source format of the file. */;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the API call. */;
}

export interface FileSurfaceArea_type {
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  output_unit: UnitArea_type /* The output unit for the surface area. */;
  src_format: FileImportFormat_type /* The source format of the file. */;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* nullable:true, format:double, description:The resulting surface area. */
  surface_area?: number;
  /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the API call. */;
}

export interface FileSystemMetadata_type {
  ok: boolean /* If the file system passed a sanity check. */;
}

export interface FileVolume_type {
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  output_unit: UnitVolume_type /* The output unit for the volume. */;
  src_format: FileImportFormat_type /* The source format of the file. */;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the API call. */;
  /* nullable:true, format:double, description:The resulting volume. */
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

export interface GetNumObjects_type {
  /* format:uint32, minimum:0, description:The number of objects in the scene. */
  num_objects: number;
}

export interface GetSketchModePlane_type {
  origin: Point3d_type /* The origin. */;
  x_axis: Point3d_type /* The x axis. */;
  y_axis: Point3d_type /* The y axis. */;
  z_axis: Point3d_type /* The z axis (normal). */;
}

export type GlobalAxis_type = 'x' | 'y' | 'z';

export type GltfPresentation_type = 'compact' | 'pretty';

export type GltfStorage_type = 'binary' | 'standard' | 'embedded';

export interface HighlightSetEntity_type {
  /* nullable:true, format:uuid, description:The UUID of the entity that was highlighted. */
  entity_id?: string;
  /*{
  "nullable": true,
  "format": "uint32",
  "minimum": 0,
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

export type IdpMetadataSource_type =
  | {
      type: 'url';
      /*{
  "title": "String",
  "format": "uri",
  "description": "The URL of the identity provider metadata descriptor."
}*/
      url: string;
    }
  | {
      /*{
  "title": "String",
  "format": "byte",
  "description": "The base64 encoded XML document containing the identity provider metadata descriptor."
}*/
      data: string;
      type: 'base64_encoded_xml';
    };

export type ImageFormat_type = 'png' | 'jpeg';

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

export interface ImportedGeometry_type {
  /* format:uuid, description:ID of the imported 3D models within the scene. */
  id: string;
  value: string[];
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
  "title": "double",
  "default": 0,
  "format": "money-usd",
  "description": "Final amount due at this time for this invoice.\n\nIf the invoice's total is smaller than the minimum charge amount, for example, or if there is account credit that can be applied to the invoice, the `amount_due` may be 0. If there is a positive `starting_balance` for the invoice (the customer owes money), the `amount_due` will also take that into account. The charge that gets generated for the invoice will be for the amount specified in `amount_due`."
}*/
  amount_due: number;
  /*{
  "title": "double",
  "default": 0,
  "format": "money-usd",
  "description": "The amount, in USD, that was paid."
}*/
  amount_paid: number;
  /*{
  "title": "double",
  "default": 0,
  "format": "money-usd",
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
  /* nullable:true, format:uri, description:The link to download the PDF for the invoice. */
  pdf?: string;
  receipt_number: string /* This is the transaction number that appears on email receipts sent for this invoice. */;
  statement_descriptor: string /* Extra information about an invoice for the customer's credit card statement. */;
  /*{
  "nullable": true,
  "description": "The status of the invoice, one of `draft`, `open`, `paid`, `uncollectible`, or `void`."
}*/
  status?: InvoiceStatus_type;
  /*{
  "title": "double",
  "default": 0,
  "format": "money-usd",
  "description": "Total of all subscriptions, invoice items, and prorations on the invoice before any invoice level discount or tax is applied.\n\nItem discounts are already incorporated."
}*/
  subtotal: number;
  /*{
  "title": "double",
  "default": 0,
  "format": "money-usd",
  "description": "The amount of tax on this invoice.\n\nThis is the sum of all the tax amounts on this invoice."
}*/
  tax: number;
  /*{
  "title": "double",
  "default": 0,
  "format": "money-usd",
  "description": "Total after discounts and taxes."
}*/
  total: number;
  /*{
  "nullable": true,
  "format": "uri",
  "description": "The URL for the hosted invoice page, which allows customers to view and pay an invoice."
}*/
  url?: string;
}

export interface InvoiceLineItem_type {
  /*{
  "title": "double",
  "default": 0,
  "format": "money-usd",
  "description": "The amount, in USD."
}*/
  amount: number;
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
  | 'draft'
  | 'open'
  | 'paid'
  | 'uncollectible'
  | 'void';

export interface IpAddrInfo_type {
  /* nullable:true, format:int64, description:Autonomous System Number. */
  asn?: number;
  /* nullable:true, description:City name. */
  city?: string;
  /* nullable:true, description:Continent code (e.g., \EU\ for Europe). */
  continent_code?: string;
  /* nullable:true, description:Country name. */
  country?: string;
  /*{
  "nullable": true,
  "description": "Two-letter country code (e.g., \"NL\" for Netherlands)."
}*/
  country_code?: CountryCode_type;
  /*{
  "nullable": true,
  "description": "Three-letter country code (e.g., \"NLD\" for Netherlands)."
}*/
  country_code3?: string;
  /*{
  "title": "String",
  "default": "",
  "format": "ip",
  "description": "IP address of the user."
}*/
  ip: string;
  /*{
  "nullable": true,
  "description": "Flag indicating whether the country is in the European Union."
}*/
  is_in_european_union?: boolean;
  /* nullable:true, format:double, description:Geographic latitude. */
  latitude?: number;
  /* nullable:true, format:double, description:Geographic longitude. */
  longitude?: number;
  /* nullable:true, format:int64, description:Time offset in seconds from UTC. */
  offset?: number;
  /* nullable:true, description:Organization name (e.g., \RIPE NCC\). */
  organization?: string;
  /* nullable:true, description:Postal code. */
  postal_code?: string;
  /* nullable:true, description:Name of the region (e.g., \North Holland\). */
  region?: string;
  /* nullable:true, description:Region code (e.g., \NH\ for North Holland). */
  region_code?: string;
  /* nullable:true, description:Timezone (e.g., \Europe/Amsterdam\). */
  timezone?: string;
}

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

export interface KclCodeCompletionParams_type {
  /* default:, description:The language of the code. */
  language: string;
  /*{
  "nullable": true,
  "format": "uint8",
  "minimum": 0,
  "description": "The next indent of the code."
}*/
  next_indent?: number;
  /*{
  "nullable": true,
  "format": "uint32",
  "minimum": 0,
  "description": "The prompt tokens for the completions."
}*/
  prompt_tokens?: number;
  /*{
  "nullable": true,
  "format": "uint32",
  "minimum": 0,
  "description": "The suffix tokens for the completions."
}*/
  suffix_tokens?: number;
  /* default:false, description:If we should trim by indentation. */
  trim_by_indentation: boolean;
}

export interface KclCodeCompletionRequest_type {
  /* default:{language:, trim_by_indentation:false}, description:Extra parameters for the completions. */
  extra: KclCodeCompletionParams_type;
  /*{
  "nullable": true,
  "format": "uint16",
  "minimum": 0,
  "description": "The maximum number of tokens that can be generated for the completions. The total length of input tokens and generated tokens is limited by the model’s context length."
}*/
  max_tokens?: number;
  /*{
  "nullable": true,
  "format": "uint8",
  "minimum": 0,
  "description": "How many completion choices to generate for each input message."
}*/
  n?: number;
  /*{
  "nullable": true,
  "description": "For GitHub copilot this is the `{org}/{repo}`. This does not do anything yet. But we wanted the same API as GitHub Copilot. It might be used in the future."
}*/
  nwo?: string;
  /* default:, description:The prompt for the model. */
  prompt: string;
  stop: string[];
  /*{
  "default": false,
  "description": "If set, partial message deltas will be sent, like in ChatGPT or OpenAPI. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message."
}*/
  stream: boolean;
  /* default:, description:The suffix for the model. */
  suffix: string;
  /* nullable:true, format:float, description:The temperature for the model. */
  temperature?: number;
  /* nullable:true, format:float, description:The top p for the model. */
  top_p?: number;
}

export interface KclCodeCompletionResponse_type {
  completions: string[];
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

export type LengthUnit_type = number;

export interface LinearTransform_type {
  /*{
  "default": true,
  "description": "Whether to replicate the original solid in this instance."
}*/
  replicate: boolean;
  /*{
  "default": {
    "x": 1,
    "y": 1,
    "z": 1
  },
  "description": "Scale the replica's size along each axis. Defaults to (1, 1, 1) (i.e. the same size as the original)."
}*/
  scale: Point3d_type;
  /*{
  "default": {
    "x": 0,
    "y": 0,
    "z": 0
  },
  "description": "Translate the replica this far along each dimension. Defaults to zero vector (i.e. same position as the original)."
}*/
  translate: Point3d_type;
}

export interface Mass_type {
  /* format:double, description:The mass. */
  mass: number;
  output_unit: UnitMass_type /* The output unit for the mass. */;
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

export type ModelingAppEventType_type = 'successful_compile_before_close';

export type ModelingAppIndividualSubscriptionTier_type = 'free' | 'pro';

export type ModelingAppOrganizationSubscriptionTier_type =
  | 'team'
  | 'enterprise';

export interface ModelingAppSubscriptionTier_type {
  description: string /* A description of the tier. */;
  /* minItems:0, maxItems:15, description:Features that are included in the subscription. */
  features: SubscriptionTierFeature_type[];
  name: ModelingAppSubscriptionTierName_type /* The name of the tier. */;
  /*{
  "title": "double",
  "format": "money-usd",
  "description": "The amount of pay-as-you-go credits the individual or org gets outside the modeling app."
}*/
  pay_as_you_go_credits: number;
  price: SubscriptionTierPrice_type /* The price of the tier per month. If this is for an individual, this is the price they pay. If this is for an organization, this is the price the organization pays per member in the org. This is in USD. */;
  support_tier: SupportTier_type /* The support tier the subscription provides. */;
  training_data_behavior: SubscriptionTrainingDataBehavior_type /* The behavior of the users data (can it be used for training, etc). */;
  type: SubscriptionTierType_type /* If the tier is offered for an individual or an org. */;
  zoo_tools_included: ZooTool_type[] /* The Zoo tools that you can call unlimited times with this tier. */;
}

export type ModelingAppSubscriptionTierName_type =
  | 'free'
  | 'pro'
  | 'team'
  | 'enterprise';

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
      distance: LengthUnit_type /* How far off the plane to extrude */;
      target: ModelingCmdId_type /* Which sketch to extrude. Must be a closed 2D solid. */;
      type: 'extrude';
    }
  | {
      angle: Angle_type /* The signed angle of revolution (in degrees, must be <= 360 in either direction) */;
      axis: Point3d_type /* The axis of the extrusion (taken from the origin) */;
      axis_is_2d: boolean /* If true, the axis is interpreted within the 2D space of the solid 2D's plane */;
      origin: Point3d_type /* The origin of the extrusion axis */;
      target: ModelingCmdId_type /* Which sketch to revolve. Must be a closed 2D solid. */;
      tolerance: LengthUnit_type /* The maximum acceptable surface gap computed between the revolution surface joints. Must be positive (i.e. greater than zero). */;
      type: 'revolve';
    }
  | {
      /*{
  "format": "uuid"
}*/
      face_ids: string[];
      /* format:uuid, description:Which Solid3D is being shelled. */
      object_id: string;
      shell_thickness: LengthUnit_type /* How thick the shell should be. Smaller values mean a thinner shell. */;
      type: 'solid3d_shell_face';
    }
  | {
      angle: Angle_type /* The signed angle of revolution (in degrees, must be <= 360 in either direction) */;
      /*{
  "format": "uuid",
  "description": "The edge to use as the axis of revolution, must be linear and lie in the plane of the solid"
}*/
      edge_id: string;
      target: ModelingCmdId_type /* Which sketch to revolve. Must be a closed 2D solid. */;
      tolerance: LengthUnit_type /* The maximum acceptable surface gap computed between the revolution surface joints. Must be positive (i.e. greater than zero). */;
      type: 'revolve_about_edge';
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
  "nullable": true,
  "format": "uint32",
  "minimum": 0,
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
  | { type: 'default_camera_get_settings' }
  | {
      center: Point3d_type /* What the camera is looking at. Center of the camera's field of vision */;
      /*{
  "nullable": true,
  "format": "uint32",
  "minimum": 0,
  "description": "Logical timestamp. The client should increment this with every event in the current mouse drag. That way, if the events are being sent over an unordered channel, the API can ignore the older events."
}*/
      sequence?: number;
      type: 'default_camera_look_at';
      up: Point3d_type /* Which way is "up", from the camera's point of view. */;
      vantage: Point3d_type /* Where the camera is positioned */;
    }
  | {
      center: Point3d_type /* What the camera is looking at. Center of the camera's field of vision */;
      /*{
  "nullable": true,
  "format": "float",
  "description": "The field of view angle in the y direction, in degrees."
}*/
      fov_y?: number;
      /*{
  "nullable": true,
  "format": "uint32",
  "minimum": 0,
  "description": "Logical timestamp. The client should increment this with every event in the current mouse drag. That way, if the events are being sent over an unordered channel, the API can ignore the older events."
}*/
      sequence?: number;
      type: 'default_camera_perspective_settings';
      up: Point3d_type /* Which way is "up", from the camera's point of view. */;
      vantage: Point3d_type /* Where the camera is positioned */;
      /* nullable:true, format:float, description:The distance to the far clipping plane. */
      z_far?: number;
      /* nullable:true, format:float, description:The distance to the near clipping plane. */
      z_near?: number;
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
      /*{
  "format": "uuid"
}*/
      entity_ids: string[];
      format: OutputFormat_type /* The file format to export to. */;
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
      /* format:uuid, description:ID of the entity being queried. */
      entity_id: string;
      type: 'entity_get_sketch_paths';
    }
  | {
      distance_type: DistanceType_type /* Type of distance to be measured. */;
      /* format:uuid, description:ID of the first entity being queried. */
      entity_id1: string;
      /* format:uuid, description:ID of the second entity being queried. */
      entity_id2: string;
      type: 'entity_get_distance';
    }
  | {
      /* format:uuid, description:ID of the entity being copied. */
      entity_id: string;
      transform: LinearTransform_type[] /* How to transform each repeated solid. The 0th transform will create the first copy of the entity. The total number of (optional) repetitions equals the size of this list. */;
      type: 'entity_linear_pattern_transform';
    }
  | {
      axis: Point3d_type /* Axis along which to make the copies. For Solid2d patterns, the z component is ignored. */;
      /* format:uuid, description:ID of the entity being copied. */
      entity_id: string;
      /* format:uint32, minimum:0, description:Number of repetitions to make. */
      num_repetitions: number;
      spacing: LengthUnit_type /* Spacing between repetitions. */;
      type: 'entity_linear_pattern';
    }
  | {
      /*{
  "format": "double",
  "description": "Arc angle (in degrees) to place repetitions along."
}*/
      arc_degrees: number;
      axis: Point3d_type /* Axis around which to make the copies. For Solid2d patterns, this is ignored. */;
      center: Point3d_type /* Point around which to make the copies. For Solid2d patterns, the z component is ignored. */;
      /* format:uuid, description:ID of the entity being copied. */
      entity_id: string;
      /* format:uint32, minimum:0, description:Number of repetitions to make. */
      num_repetitions: number;
      rotate_duplicates: boolean /* Whether or not to rotate the objects as they are copied. */;
      type: 'entity_circular_pattern';
    }
  | {
      /* format:uuid, description:ID of the cylinder. */
      cylinder_id: string;
      is_clockwise: boolean /* Is the helix rotation clockwise? */;
      length: LengthUnit_type /* Length of the helix. */;
      /* format:double, description:Number of revolutions. */
      revolutions: number;
      start_angle: Angle_type /* Start angle (in degrees). */;
      type: 'entity_make_helix';
    }
  | {
      axis: Point3d_type /* Axis to use as mirror. */;
      /*{
  "format": "uuid"
}*/
      ids: string[];
      point: Point3d_type /* Point through which the mirror axis passes. */;
      type: 'entity_mirror';
    }
  | {
      /*{
  "format": "uuid",
  "description": "The edge to use as the mirror axis, must be linear and lie in the plane of the solid"
}*/
      edge_id: string;
      /*{
  "format": "uuid"
}*/
      ids: string[];
      type: 'entity_mirror_across_edge';
    }
  | {
      /* format:uuid, description:The edit target */
      target: string;
      type: 'edit_mode_enter';
    }
  | {
      selected_at_window: Point2d_type /* Where in the window was selected */;
      selection_type: SceneSelectionType_type /* What entity was selected? */;
      type: 'select_with_point';
    }
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
  | { type: 'scene_clear_all' }
  | {
      /*{
  "format": "uuid"
}*/
      entities: string[];
      type: 'select_replace';
    }
  | {
      selected_at_window: Point2d_type /* Coordinates of the window being clicked */;
      /*{
  "nullable": true,
  "format": "uint32",
  "minimum": 0,
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
      hidden: boolean /* Whether or not the edge lines should be hidden. */;
      type: 'edge_lines_visible';
    }
  | {
      hidden: boolean /* Whether or not the object should be hidden. */;
      /* format:uuid, description:Which object to change */
      object_id: string;
      type: 'object_visible';
    }
  | {
      /* format:uuid, description:Which object to change */
      object_id: string;
      type: 'object_bring_to_front';
    }
  | {
      /* format:float, description:Ambient Occlusion of the new material */
      ambient_occlusion: number;
      color: Color_type /* Color of the new material */;
      /* format:float, description:Metalness of the new material */
      metalness: number;
      /* format:uuid, description:Which object to change */
      object_id: string;
      /* format:float, description:Roughness of the new material */
      roughness: number;
      type: 'object_set_material_params_pbr';
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
  "format": "uuid",
  "description": "The id of the path to use as the inner profile (hole)."
}*/
      hole_id: string;
      /* format:uuid, description:Which object to add the hole to. */
      object_id: string;
      type: 'solid2d_add_hole';
    }
  | {
      /*{
  "nullable": true,
  "description": "If given, only faces parallel to this vector will be considered."
}*/
      along_vector?: Point3d_type;
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
      /* default:fillet, description:How to apply the cut. */
      cut_type: CutType_type;
      /* format:uuid, description:Which edge you want to fillet. */
      edge_id: string;
      /* format:uuid, description:Which object is being filletted. */
      object_id: string;
      radius: LengthUnit_type /* The radius of the fillet. Measured in length (using the same units that the current sketch uses). Must be positive (i.e. greater than zero). */;
      tolerance: LengthUnit_type /* The maximum acceptable surface gap computed between the filleted surfaces. Must be positive (i.e. greater than zero). */;
      type: 'solid3d_fillet_edge';
    }
  | {
      /* format:uuid, description:Which face is being queried. */
      object_id: string;
      type: 'face_is_planar';
    }
  | {
      /* format:uuid, description:Which face is being queried. */
      object_id: string;
      type: 'face_get_position';
      uv: Point2d_type /* The 2D paramter-space u,v position to evaluate the surface at */;
    }
  | {
      /* format:uuid, description:Which face is being queried. */
      object_id: string;
      type: 'face_get_center';
    }
  | {
      /* format:uuid, description:Which face is being queried. */
      object_id: string;
      type: 'face_get_gradient';
      uv: Point2d_type /* The 2D paramter-space u,v position to evaluate the surface at */;
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
      /*{
  "nullable": true,
  "description": "If true, the plane will be created but hidden initially."
}*/
      hide?: boolean;
      origin: Point3d_type /* Origin of the plane */;
      size: LengthUnit_type /* What should the plane's span/extent? When rendered visually, this is both the width and height along X and Y axis respectively. */;
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
  "nullable": true,
  "format": "uint32",
  "minimum": 0,
  "description": "Logical timestamp. The client should increment this with every event in the current mouse drag. That way, if the events are being sent over an unordered channel, the API can ignore the older events."
}*/
      sequence?: number;
      type: 'mouse_move';
      window: Point2d_type /* Where the mouse is */;
    }
  | { type: 'mouse_click'; window: Point2d_type /* Where the mouse is */ }
  | { type: 'sketch_mode_disable' }
  | { type: 'get_sketch_mode_plane' }
  | {
      constraint_bound: PathComponentConstraintBound_type /* Which constraint to apply. */;
      constraint_type: PathComponentConstraintType_type /* What part of the curve should be constrained. */;
      /* format:uuid, description:Which curve to constrain. */
      object_id: string;
      type: 'curve_set_constraint';
    }
  | {
      adjust_camera: boolean /* Should the camera move at all? */;
      animated: boolean /* Should we animate or snap for the camera transition? */;
      /* format:uuid, description:Which entity to sketch on. */
      entity_id: string;
      ortho: boolean /* Should the camera use orthographic projection? In other words, should an object's size in the rendered image stay constant regardless of its distance from the camera. */;
      /*{
  "nullable": true,
  "description": "If provided, ensures that the normal of the sketch plane must be aligned with this supplied normal (otherwise the camera position will be used to infer the normal to point towards the viewer)"
}*/
      planar_normal?: Point3d_type;
      type: 'enable_sketch_mode';
    }
  | {
      color: Color_type /* The color to set the background to. */;
      type: 'set_background_color';
    }
  | {
      /* nullable:true, description:The color to set the tool line to. */
      color?: Color_type;
      type: 'set_current_tool_properties';
    }
  | {
      /* nullable:true, description:The default system color. */
      color?: Color_type;
      type: 'set_default_system_properties';
    }
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
      /*{
  "format": "uint32",
  "minimum": 0,
  "description": "IDs of the vertices for which to obtain curve ids from"
}*/
      index: number;
      /* format:uuid, description:Which path to query */
      path_id: string;
      type: 'path_get_curve_uuid';
    }
  | {
      /* format:uuid, description:Which path to query */
      path_id: string;
      type: 'path_get_vertex_uuids';
    }
  | {
      /* format:uuid, description:Which path to query */
      path_id: string;
      type: 'path_get_sketch_target_uuid';
    }
  | {
      type: 'handle_mouse_drag_start';
      window: Point2d_type /* The mouse position. */;
    }
  | {
      /*{
  "nullable": true,
  "format": "uint32",
  "minimum": 0,
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
  | {
      files: ImportFile_type[] /* Files to import. */;
      format: InputFormat_type /* Input file format. */;
      type: 'import_files';
    }
  | {
      type: 'set_scene_units';
      unit: UnitLength_type /* Which units the scene uses. */;
    }
  | {
      /*{
  "format": "uuid"
}*/
      entity_ids: string[];
      /* format:double, description:The material density. */
      material_density: number;
      material_density_unit: UnitDensity_type /* The material density unit. */;
      output_unit: UnitMass_type /* The output unit for the mass. */;
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
      type: 'density';
    }
  | {
      /*{
  "format": "uuid"
}*/
      entity_ids: string[];
      output_unit: UnitVolume_type /* The output unit for the volume. */;
      type: 'volume';
    }
  | {
      /*{
  "format": "uuid"
}*/
      entity_ids: string[];
      output_unit: UnitLength_type /* The output unit for the center of mass. */;
      type: 'center_of_mass';
    }
  | {
      /*{
  "format": "uuid"
}*/
      entity_ids: string[];
      output_unit: UnitArea_type /* The output unit for the surface area. */;
      type: 'surface_area';
    }
  | {
      type: 'default_camera_focus_on';
      /* format:uuid, description:UUID of object to focus on. */
      uuid: string;
    }
  | {
      selection_type: SceneSelectionType_type /* What type of selection should occur when you select something? */;
      type: 'set_selection_type';
    }
  | {
      filter: EntityType_type[] /* If vector is empty, clear all filters. If vector is non-empty, only the given entity types will be selectable. */;
      type: 'set_selection_filter';
    }
  | { type: 'default_camera_set_orthographic' }
  | {
      /*{
  "nullable": true,
  "description": "If this is not given, use the same parameters as last time the perspective camera was used."
}*/
      parameters?: PerspectiveCameraParameters_type;
      type: 'default_camera_set_perspective';
    }
  | {
      /*{
  "format": "uuid"
}*/
      object_ids: string[];
      /* format:float, description:How much to pad the view frame by. */
      padding: number;
      type: 'zoom_to_fit';
    }
  | {
      /* default:0, format:float, description:How much to pad the view frame by. */
      padding: number;
      type: 'view_isometric';
    }
  | {
      /* format:uuid, description:Any edge that lies on the extrusion base path. */
      edge_id: string;
      /*{
  "format": "uuid",
  "description": "The Solid3d object whose extrusion is being queried."
}*/
      object_id: string;
      type: 'solid3d_get_extrusion_face_info';
    }
  | { type: 'edit_mode_exit' }
  | { type: 'select_clear' }
  | { type: 'select_get' }
  | { type: 'get_num_objects' };

export type ModelingCmdId_type =
  /*{
  "format": "uuid",
  "description": "All commands have unique IDs. These should be randomly generated."
}*/
  string;

export interface ModelingCmdReq_type {
  cmd: ModelingCmd_type /* Which command to submit to the Kittycad engine. */;
  cmd_id: ModelingCmdId_type /* ID of command being submitted. */;
}

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
  "$ref": "#/components/schemas/EntityGetSketchPaths"
}*/
      data: EntityGetSketchPaths_type;
      type: 'entity_get_sketch_paths';
    }
  | {
      /*{
  "$ref": "#/components/schemas/ClosePath"
}*/
      data: ClosePath_type;
      type: 'close_path';
    }
  | {
      /*{
  "$ref": "#/components/schemas/CameraDragMove"
}*/
      data: CameraDragMove_type;
      type: 'camera_drag_move';
    }
  | {
      /*{
  "$ref": "#/components/schemas/CameraDragEnd"
}*/
      data: CameraDragEnd_type;
      type: 'camera_drag_end';
    }
  | {
      /*{
  "$ref": "#/components/schemas/DefaultCameraGetSettings"
}*/
      data: DefaultCameraGetSettings_type;
      type: 'default_camera_get_settings';
    }
  | {
      /*{
  "$ref": "#/components/schemas/DefaultCameraZoom"
}*/
      data: DefaultCameraZoom_type;
      type: 'default_camera_zoom';
    }
  | {
      /*{
  "$ref": "#/components/schemas/ZoomToFit"
}*/
      data: ZoomToFit_type;
      type: 'zoom_to_fit';
    }
  | {
      /*{
  "$ref": "#/components/schemas/ViewIsometric"
}*/
      data: ViewIsometric_type;
      type: 'view_isometric';
    }
  | {
      /*{
  "$ref": "#/components/schemas/GetNumObjects"
}*/
      data: GetNumObjects_type;
      type: 'get_num_objects';
    }
  | {
      /*{
  "$ref": "#/components/schemas/DefaultCameraFocusOn"
}*/
      data: DefaultCameraFocusOn_type;
      type: 'default_camera_focus_on';
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
  "$ref": "#/components/schemas/Solid3dGetNextAdjacentEdge"
}*/
      data: Solid3dGetNextAdjacentEdge_type;
      type: 'solid3d_get_next_adjacent_edge';
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
  "$ref": "#/components/schemas/GetEntityType"
}*/
      data: GetEntityType_type;
      type: 'get_entity_type';
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
  "$ref": "#/components/schemas/CurveGetType"
}*/
      data: CurveGetType_type;
      type: 'curve_get_type';
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
  "$ref": "#/components/schemas/PathSegmentInfo"
}*/
      data: PathSegmentInfo_type;
      type: 'path_segment_info';
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
  "$ref": "#/components/schemas/PathGetCurveUuid"
}*/
      data: PathGetCurveUuid_type;
      type: 'path_get_curve_uuid';
    }
  | {
      /*{
  "$ref": "#/components/schemas/PathGetVertexUuids"
}*/
      data: PathGetVertexUuids_type;
      type: 'path_get_vertex_uuids';
    }
  | {
      /*{
  "$ref": "#/components/schemas/PathGetSketchTargetUuid"
}*/
      data: PathGetSketchTargetUuid_type;
      type: 'path_get_sketch_target_uuid';
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
  "$ref": "#/components/schemas/FaceIsPlanar"
}*/
      data: FaceIsPlanar_type;
      type: 'face_is_planar';
    }
  | {
      /*{
  "$ref": "#/components/schemas/FaceGetPosition"
}*/
      data: FaceGetPosition_type;
      type: 'face_get_position';
    }
  | {
      /*{
  "$ref": "#/components/schemas/FaceGetCenter"
}*/
      data: FaceGetCenter_type;
      type: 'face_get_center';
    }
  | {
      /*{
  "$ref": "#/components/schemas/FaceGetGradient"
}*/
      data: FaceGetGradient_type;
      type: 'face_get_gradient';
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
  "$ref": "#/components/schemas/ImportFiles"
}*/
      data: ImportFiles_type;
      type: 'import_files';
    }
  | {
      /*{
  "$ref": "#/components/schemas/ImportedGeometry"
}*/
      data: ImportedGeometry_type;
      type: 'imported_geometry';
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
    }
  | {
      /*{
  "$ref": "#/components/schemas/GetSketchModePlane"
}*/
      data: GetSketchModePlane_type;
      type: 'get_sketch_mode_plane';
    }
  | {
      /*{
  "$ref": "#/components/schemas/EntityGetDistance"
}*/
      data: EntityGetDistance_type;
      type: 'entity_get_distance';
    }
  | {
      /*{
  "$ref": "#/components/schemas/EntityLinearPatternTransform"
}*/
      data: EntityLinearPatternTransform_type;
      type: 'entity_linear_pattern_transform';
    }
  | {
      /*{
  "$ref": "#/components/schemas/EntityLinearPattern"
}*/
      data: EntityLinearPattern_type;
      type: 'entity_linear_pattern';
    }
  | {
      /*{
  "$ref": "#/components/schemas/EntityCircularPattern"
}*/
      data: EntityCircularPattern_type;
      type: 'entity_circular_pattern';
    }
  | {
      /*{
  "$ref": "#/components/schemas/Solid3dGetExtrusionFaceInfo"
}*/
      data: Solid3dGetExtrusionFaceInfo_type;
      type: 'solid3d_get_extrusion_face_info';
    }
  | {
      /*{
  "$ref": "#/components/schemas/ExtrusionFaceInfo"
}*/
      data: ExtrusionFaceInfo_type;
      type: 'extrusion_face_info';
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
  | {
      data: {
        responses: {
          [key: string]: BatchResponse_type;
        } /* For each request in the batch, maps its ID to the request's outcome. */;
      };
      type: 'modeling_batch';
    }
  | { data: { files: RawFile_type[] /* The exported files */ }; type: 'export' }
  | { data: object; type: 'metrics_request' }
  | { data: object; type: 'pong' };

export interface Onboarding_type {
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "When the user first used the modeling app."
}*/
  first_call_from_modeling_app_date?: string;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "When the user first used text-to-CAD."
}*/
  first_call_from_text_to_cad_date?: string;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "When the user created their first token."
}*/
  first_token_date?: string;
}

export interface Org_type {
  /*{
  "nullable": true,
  "description": "If we should allow all future users who are created with email addresses from this domain to join the org."
}*/
  allow_users_in_domain_to_auto_join?: boolean;
  /* format:email, description:The billing email address of the org. */
  billing_email: string;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The date and time the billing email address was verified."
}*/
  billing_email_verified?: string;
  /* nullable:true, description:If the org should be blocked and the reason why. */
  block?: BlockReason_type;
  /*{
  "default": false,
  "description": "If we can train on the orgs's data. This value overrides any individual user's `can_train_on_data` value if they are a member of the org."
}*/
  can_train_on_data: boolean;
  /* title:DateTime, format:date-time, description:The date and time the org was created. */
  created_at: string;
  /* nullable:true, description:The org's domain. */
  domain?: string;
  id: Uuid_type /* The unique identifier for the org. */;
  /*{
  "nullable": true,
  "title": "String",
  "format": "uri",
  "description": "The image for the org. This is a URL."
}*/
  image?: string;
  name: string /* The name of the org. */;
  /*{
  "title": "String",
  "default": "",
  "format": "phone",
  "description": "The org's phone number."
}*/
  phone: string;
  /* nullable:true, description:The org's stripe id. */
  stripe_id?: string;
  /* title:DateTime, format:date-time, description:The date and time the org was last updated. */
  updated_at: string;
}

export interface OrgDetails_type {
  /*{
  "nullable": true,
  "description": "If we should allow all future users who are created with email addresses from this domain to join the org."
}*/
  allow_users_in_domain_to_auto_join?: boolean;
  /* format:email, description:The billing email address of the org. */
  billing_email: string;
  /* nullable:true, description:The org's domain. */
  domain?: string;
  /*{
  "nullable": true,
  "title": "String",
  "format": "uri",
  "description": "The image for the org. This is a URL."
}*/
  image?: string;
  name: string /* The name of the org. */;
  /*{
  "title": "String",
  "default": "",
  "format": "phone",
  "description": "The org's phone number."
}*/
  phone: string;
}

export interface OrgMember_type {
  company: string /* The user's company. */;
  /* title:DateTime, format:date-time, description:The date and time the user was created. */
  created_at: string;
  discord: string /* The user's Discord handle. */;
  /* format:email, description:The email address of the user. */
  email: string;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The date and time the email address was verified."
}*/
  email_verified?: string;
  first_name: string /* The user's first name. */;
  github: string /* The user's GitHub handle. */;
  id: Uuid_type /* The unique identifier for the user. */;
  /* title:String, format:uri, description:The image avatar for the user. This is a URL. */
  image: string;
  last_name: string /* The user's last name. */;
  name: string /* The name of the user. This is auto populated at first from the authentication provider (if there was a name). It can be updated by the user by updating their `first_name` and `last_name` fields. */;
  /*{
  "title": "String",
  "default": "",
  "format": "phone",
  "description": "The user's phone number."
}*/
  phone: string;
  role: OrgRole_type /* The user's role in the org. */;
  /* title:DateTime, format:date-time, description:The date and time the user was last updated. */
  updated_at: string;
}

export interface OrgMemberResultsPage_type {
  items: OrgMember_type[] /* list of items on this page of results */;
  /*{
  "nullable": true,
  "description": "token used to fetch the next page of results (if any)"
}*/
  next_page?: string;
}

export interface OrgResultsPage_type {
  items: Org_type[] /* list of items on this page of results */;
  /*{
  "nullable": true,
  "description": "token used to fetch the next page of results (if any)"
}*/
  next_page?: string;
}

export type OrgRole_type = 'admin' | 'member' | 'service_account';

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
      selection: Selection_type /* Export selection. */;
      storage: PlyStorage_type /* The storage for the output PLY file. */;
      type: 'ply';
      /* Export length unit.

Defaults to meters. */
      units: UnitLength_type;
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
      selection: Selection_type /* Export selection. */;
      storage: StlStorage_type /* Export storage. */;
      type: 'stl';
      /* Export length unit.

Defaults to meters. */
      units: UnitLength_type;
    };

export type PathCommand_type =
  /* The path component command type (within a Path) */
  'move_to' | 'line_to' | 'bez_curve_to' | 'nurbs_curve_to' | 'add_arc';

export type PathComponentConstraintBound_type =
  /* The path component constraint bounds type */
  'unconstrained' | 'partially_constrained' | 'fully_constrained';

export type PathComponentConstraintType_type =
  /* The path component constraint type */
  | 'unconstrained'
  | 'vertical'
  | 'horizontal'
  | 'equal_length'
  | 'parallel'
  | 'angle_between';

export interface PathGetCurveUuid_type {
  /* format:uuid, description:The UUID of the curve entity. */
  curve_id: string;
}

export interface PathGetCurveUuidsForVertices_type {
  /*{
  "format": "uuid"
}*/
  curve_ids: string[];
}

export interface PathGetInfo_type {
  segments: PathSegmentInfo_type[] /* All segments in the path, in the order they were added. */;
}

export interface PathGetSketchTargetUuid_type {
  /* nullable:true, format:uuid, description:The UUID of the sketch target. */
  target_id?: string;
}

export interface PathGetVertexUuids_type {
  /*{
  "format": "uuid"
}*/
  vertex_ids: string[];
}

export type PathSegment_type =
  | {
      end: Point3d_type /* End point of the line. */;
      relative: boolean /* Whether or not this line is a relative offset */;
      type: 'line';
    }
  | {
      center: Point2d_type /* Center of the circle */;
      end: Angle_type /* End of the arc along circle's perimeter. */;
      radius: LengthUnit_type /* Radius of the circle */;
      relative: boolean /* Whether or not this arc is a relative offset */;
      start: Angle_type /* Start of the arc along circle's perimeter. */;
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
      offset: Angle_type /* Offset of the arc. Negative values will arc clockwise. */;
      radius: LengthUnit_type /* Radius of the arc. Not to be confused with Raiders of the Lost Ark. */;
      type: 'tangential_arc';
    }
  | {
      /* nullable:true, description:0 will be interpreted as none/null. */
      angle_snap_increment?: Angle_type;
      to: Point3d_type /* Where the arc should end. Must lie in the same plane as the current path pen position. Must not be colinear with current path pen position. */;
      type: 'tangential_arc_to';
    };

export interface PathSegmentInfo_type {
  command: PathCommand_type /* What is the path segment? */;
  /*{
  "nullable": true,
  "description": "Which command created this path? This field is absent if the path command is not actually creating a path segment, e.g. moving the pen doesn't create a path segment."
}*/
  command_id?: ModelingCmdId_type;
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
  card?: CardDetails_type;
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

export interface PerspectiveCameraParameters_type {
  /* nullable:true, format:float, description:Camera frustum vertical field of view. */
  fov_y?: number;
  /* nullable:true, format:float, description:Camera frustum far plane. */
  z_far?: number;
  /* nullable:true, format:float, description:Camera frustum near plane. */
  z_near?: number;
}

export type PlanInterval_type = 'day' | 'month' | 'week' | 'year';

export interface PlaneIntersectAndProject_type {
  /*{
  "nullable": true,
  "description": "Corresponding coordinates of given window coordinates, intersected on given plane."
}*/
  plane_coordinates?: Point2d_type;
}

export type PlyStorage_type =
  | 'ascii'
  | 'binary_little_endian'
  | 'binary_big_endian';

export interface Point2d_type {
  /*{
  "$ref": "#/components/schemas/LengthUnit"
}*/
  x: LengthUnit_type;
  /*{
  "$ref": "#/components/schemas/LengthUnit"
}*/
  y: LengthUnit_type;
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

export interface Point4d_type {
  /*{
  "format": "float"
}*/
  w: number;
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

export interface Pong_type {
  message: string /* The pong response. */;
}

export type PostEffectType_type =
  /* Post effect type */
  'phosphor' | 'ssao' | 'noeffect';

export interface PrivacySettings_type {
  can_train_on_data: boolean /* If we can train on the data. If the user is a member of an organization, the organization's setting will override this. The organization's setting takes priority. */;
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
  "nullable": true,
  "format": "uint16",
  "minimum": 0,
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

export interface SamlIdentityProvider_type {
  /* title:String, format:uri, description:The ACS (Assertion Consumer Service) url. */
  acs_url: string;
  /*{
  "title": "DateTime",
  "format": "date-time",
  "description": "The date and time the SAML identity provider was created."
}*/
  created_at: string;
  id: Uuid_type /* The unique identifier for the SAML identity provider. */;
  idp_entity_id: string /* The entity ID of the SAML identity provider. */;
  idp_metadata_document_string: string /* The metadata document as a string. */;
  org_id: Uuid_type /* The organization ID the SAML identity provider belongs to. */;
  /*{
  "nullable": true,
  "title": "String",
  "format": "byte",
  "description": "The private key for the SAML identity provider. This is the PEM corresponding to the X509 pair."
}*/
  private_key?: string;
  /*{
  "nullable": true,
  "title": "String",
  "format": "byte",
  "description": "The public certificate for the SAML identity provider. This is the PEM corresponding to the X509 pair."
}*/
  public_cert?: string;
  /* title:String, format:uri, description:The SLO (Single Logout) url. */
  slo_url: string;
  /*{
  "format": "email",
  "description": "The technical contact email address for the SAML identity provider."
}*/
  technical_contact_email: string;
  /*{
  "title": "DateTime",
  "format": "date-time",
  "description": "The date and time the SAML identity provider was last updated."
}*/
  updated_at: string;
}

export interface SamlIdentityProviderCreate_type {
  idp_entity_id: string /* The entity ID of the SAML identity provider. */;
  idp_metadata_source: IdpMetadataSource_type /* The source of an identity provider metadata descriptor. */;
  /* nullable:true, description:The request signing key pair. */
  signing_keypair?: DerEncodedKeyPair_type;
  /*{
  "format": "email",
  "description": "The technical contact email address for the SAML identity provider."
}*/
  technical_contact_email: string;
}

export type SceneSelectionType_type = 'replace' | 'add' | 'remove';

export type SceneToolType_type =
  /* The type of scene's active tool */
  | 'camera_revolve'
  | 'select'
  | 'move'
  | 'sketch_line'
  | 'sketch_tangential_arc'
  | 'sketch_curve'
  | 'sketch_curve_mod';

export interface SelectGet_type {
  /*{
  "format": "uuid"
}*/
  entity_ids: string[];
}

export interface SelectWithPoint_type {
  /* nullable:true, format:uuid, description:The UUID of the entity that was selected. */
  entity_id?: string;
}

export type Selection_type =
  | { type: 'default_scene' }
  | {
      /* format:uint, minimum:0, description:The index. */
      index: number;
      type: 'scene_by_index';
    }
  | { name: string /* The name. */; type: 'scene_by_name' }
  | {
      /* format:uint, minimum:0, description:The index. */
      index: number;
      type: 'mesh_by_index';
    }
  | { name: string /* The name. */; type: 'mesh_by_name' };

export interface ServiceAccount_type {
  /* title:DateTime, format:date-time, description:The date and time the API token was created. */
  created_at: string;
  id: Uuid_type /* The unique identifier for the API token. */;
  is_valid: boolean /* If the token is valid. We never delete API tokens, but we can mark them as invalid. We save them for ever to preserve the history of the API token. */;
  /* nullable:true, description:An optional label for the API token. */
  label?: string;
  org_id: Uuid_type /* The ID of the organization that owns the API token. */;
  token: StringUuid_type /* The API token itself. */;
  /* title:DateTime, format:date-time, description:The date and time the API token was last updated. */
  updated_at: string;
}

export interface ServiceAccountResultsPage_type {
  items: ServiceAccount_type[] /* list of items on this page of results */;
  /*{
  "nullable": true,
  "description": "token used to fetch the next page of results (if any)"
}*/
  next_page?: string;
}

export interface Session_type {
  /* title:DateTime, format:date-time, description:The date and time the session was created. */
  created_at: string;
  /* title:DateTime, format:date-time, description:The date and time the session expires. */
  expires: string;
  id: Uuid_type /* The unique identifier for the session. */;
  session_token: SessionTokenUuid_type /* The session token. */;
  /* title:DateTime, format:date-time, description:The date and time the session was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user that the session belongs to. */;
}

export type SessionTokenUuid_type =
  string; /* An auth token. A uuid with a prefix of ses- */

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

export interface Solid3dGetExtrusionFaceInfo_type {
  faces: ExtrusionFaceInfo_type[] /* Details of each face. */;
}

export interface Solid3dGetNextAdjacentEdge_type {
  /* nullable:true, format:uuid, description:The UUID of the edge. */
  edge?: string;
}

export interface Solid3dGetOppositeEdge_type {
  /* format:uuid, description:The UUID of the edge. */
  edge: string;
}

export interface Solid3dGetPrevAdjacentEdge_type {
  /* nullable:true, format:uuid, description:The UUID of the edge. */
  edge?: string;
}

export type StlStorage_type = 'ascii' | 'binary';

export interface StoreCouponParams_type {
  /* format:uint32, minimum:0, description:The percentage off. */
  percent_off: number;
}

export type StringUuid_type = string; /* An auth token. A UUIDv4 */

export interface SubscriptionTierFeature_type {
  /* minLength:1, maxLength:80, description:Information about the feature. */
  info: string;
}

export type SubscriptionTierPrice_type =
  | {
      interval: PlanInterval_type /* The interval the price is charged. */;
      /* title:double, format:money-usd, description:The price. */
      price: number;
      type: 'flat';
    }
  | {
      interval: PlanInterval_type /* The interval the price is charged. */;
      /* title:double, format:money-usd, description:The price. */
      price: number;
      type: 'per_user';
    }
  | { type: 'enterprise' };

export type SubscriptionTierType_type =
  | { type: 'individual' }
  | {
      saml_sso: boolean /* Whether or not the subscription type supports SAML SSO. */;
      type: 'organization';
    };

export type SubscriptionTrainingDataBehavior_type =
  | 'always'
  | 'default_on'
  | 'default_off';

export interface SuccessWebSocketResponse_type {
  /*{
  "nullable": true,
  "format": "uuid",
  "description": "Which request this is a response to. If the request was a modeling command, this is the modeling command ID. If no request ID was sent, this will be null."
}*/
  request_id?: string;
  resp: OkWebSocketResponseData_type /* The data sent with a successful response. This will be flattened into a 'type' and 'data' field. */;
  success: true;
}

export type SupportTier_type =
  | 'community'
  | 'standard'
  | 'premium'
  | 'priority';

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
  /* title:String, format:byte, description:Contents of the image. */
  contents: string;
}

export interface TextToCad_type {
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* nullable:true, description:Feedback from the user, if any. */
  feedback?: AiFeedback_type;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  model_version: string /* The version of the model. */;
  output_format: FileExportFormat_type /* The output format of the model. */;
  outputs: {
    [key: string]: /*{
  "title": "String",
  "format": "byte"
}*/
    string;
  };
  prompt: string /* The prompt. */;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the API call. */;
}

export interface TextToCadCreateBody_type {
  prompt: string /* The prompt for the model. */;
}

export interface TextToCadResultsPage_type {
  items: TextToCad_type[] /* list of items on this page of results */;
  /*{
  "nullable": true,
  "description": "token used to fetch the next page of results (if any)"
}*/
  next_page?: string;
}

export type UnitAngle_type = 'degrees' | 'radians';

export interface UnitAngleConversion_type {
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitAngle_type /* The source format of the unit conversion. */;
  /* nullable:true, format:double, description:The resulting value. */
  output?: number;
  output_unit: UnitAngle_type /* The output format of the unit conversion. */;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the API call. */;
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
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitArea_type /* The source format of the unit conversion. */;
  /* nullable:true, format:double, description:The resulting value. */
  output?: number;
  output_unit: UnitArea_type /* The output format of the unit conversion. */;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the API call. */;
}

export type UnitCurrent_type =
  | 'amperes'
  | 'microamperes'
  | 'milliamperes'
  | 'nanoamperes';

export interface UnitCurrentConversion_type {
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitCurrent_type /* The source format of the unit conversion. */;
  /* nullable:true, format:double, description:The resulting value. */
  output?: number;
  output_unit: UnitCurrent_type /* The output format of the unit conversion. */;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the API call. */;
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
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitEnergy_type /* The source format of the unit conversion. */;
  /* nullable:true, format:double, description:The resulting value. */
  output?: number;
  output_unit: UnitEnergy_type /* The output format of the unit conversion. */;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the API call. */;
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
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitForce_type /* The source format of the unit conversion. */;
  /* nullable:true, format:double, description:The resulting value. */
  output?: number;
  output_unit: UnitForce_type /* The output format of the unit conversion. */;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the API call. */;
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
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitFrequency_type /* The source format of the unit conversion. */;
  /* nullable:true, format:double, description:The resulting value. */
  output?: number;
  output_unit: UnitFrequency_type /* The output format of the unit conversion. */;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the API call. */;
}

export type UnitLength_type = 'cm' | 'ft' | 'in' | 'm' | 'mm' | 'yd';

export interface UnitLengthConversion_type {
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitLength_type /* The source format of the unit conversion. */;
  /* nullable:true, format:double, description:The resulting value. */
  output?: number;
  output_unit: UnitLength_type /* The output format of the unit conversion. */;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the API call. */;
}

export type UnitMass_type = 'g' | 'kg' | 'lb';

export interface UnitMassConversion_type {
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitMass_type /* The source format of the unit conversion. */;
  /* nullable:true, format:double, description:The resulting value. */
  output?: number;
  output_unit: UnitMass_type /* The output format of the unit conversion. */;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the API call. */;
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
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitPower_type /* The source format of the unit conversion. */;
  /* nullable:true, format:double, description:The resulting value. */
  output?: number;
  output_unit: UnitPower_type /* The output format of the unit conversion. */;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the API call. */;
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
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitPressure_type /* The source format of the unit conversion. */;
  /* nullable:true, format:double, description:The resulting value. */
  output?: number;
  output_unit: UnitPressure_type /* The output format of the unit conversion. */;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the API call. */;
}

export type UnitTemperature_type =
  | 'celsius'
  | 'fahrenheit'
  | 'kelvin'
  | 'rankine';

export interface UnitTemperatureConversion_type {
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitTemperature_type /* The source format of the unit conversion. */;
  /* nullable:true, format:double, description:The resulting value. */
  output?: number;
  output_unit: UnitTemperature_type /* The output format of the unit conversion. */;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the API call. */;
}

export type UnitTorque_type = 'newton_metres' | 'pound_foot';

export interface UnitTorqueConversion_type {
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitTorque_type /* The source format of the unit conversion. */;
  /* nullable:true, format:double, description:The resulting value. */
  output?: number;
  output_unit: UnitTorque_type /* The output format of the unit conversion. */;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the API call. */;
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
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was completed."
}*/
  completed_at?: string;
  /* title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string;
  /* nullable:true, description:The error the function returned, if any. */
  error?: string;
  /* The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid_type;
  /* default:0, format:double, description:The input value. */
  input: number;
  input_unit: UnitVolume_type /* The source format of the unit conversion. */;
  /* nullable:true, format:double, description:The resulting value. */
  output?: number;
  output_unit: UnitVolume_type /* The output format of the unit conversion. */;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The time and date the API call was started."
}*/
  started_at?: string;
  status: ApiCallStatus_type /* The status of the API call. */;
  /* title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string;
  user_id: Uuid_type /* The user ID of the user who created the API call. */;
}

export interface UpdateMemberToOrgBody_type {
  role: UserOrgRole_type /* The organization role to give the user. */;
}

export interface UpdatePaymentBalance_type {
  /*{
  "nullable": true,
  "title": "double",
  "format": "money-usd",
  "description": "The monthy credits remaining in the balance. This gets re-upped every month, but if the credits are not used for a month they do not carry over to the next month. It is a stable amount granted to the user per month."
}*/
  monthly_credits_remaining?: number;
  /*{
  "nullable": true,
  "title": "double",
  "format": "money-usd",
  "description": "The amount of pre-pay cash remaining in the balance. This number goes down as the user uses their pre-paid credits. The reason we track this amount is if a user ever wants to withdraw their pre-pay cash, we can use this amount to determine how much to give them. Say a user has $100 in pre-paid cash, their bill is worth, $50 after subtracting any other credits (like monthly etc.) Their bill is $50, their pre-pay cash remaining will be subtracted by 50 to pay the bill and their `pre_pay_credits_remaining` will be subtracted by 50 to pay the bill. This way if they want to withdraw money after, they can only withdraw $50 since that is the amount of cash they have remaining."
}*/
  pre_pay_cash_remaining?: number;
  /*{
  "nullable": true,
  "title": "double",
  "format": "money-usd",
  "description": "The amount of credits remaining in the balance. This is typically the amount of cash * some multiplier they get for pre-paying their account. This number lowers every time a bill is paid with the balance. This number increases every time a user adds funds to their balance. This may be through a subscription or a one off payment."
}*/
  pre_pay_credits_remaining?: number;
}

export interface UpdateUser_type {
  company: string /* The user's company. */;
  discord: string /* The user's Discord handle. */;
  first_name: string /* The user's first name. */;
  github: string /* The user's GitHub handle. */;
  /*{
  "title": "String",
  "format": "uri",
  "description": "The image URL for the user. NOTE: If the user uses an OAuth2 provider, this will be overwritten by the provider's image URL when the user logs in next."
}*/
  image: string;
  last_name: string /* The user's last name. */;
  /*{
  "title": "String",
  "default": "",
  "format": "phone",
  "description": "The user's phone number."
}*/
  phone: string;
}

export interface User_type {
  /* nullable:true, description:If the user should be blocked and the reason why. */
  block?: BlockReason_type;
  /*{
  "default": false,
  "description": "If we can train on the user's data. If the user is a member of an organization, the organization's setting will override this."
}*/
  can_train_on_data: boolean;
  company: string /* The user's company. */;
  /* title:DateTime, format:date-time, description:The date and time the user was created. */
  created_at: string;
  discord: string /* The user's Discord handle. */;
  /* format:email, description:The email address of the user. */
  email: string;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The date and time the email address was verified."
}*/
  email_verified?: string;
  first_name: string /* The user's first name. */;
  github: string /* The user's GitHub handle. */;
  id: Uuid_type /* The unique identifier for the user. */;
  /* title:String, format:uri, description:The image avatar for the user. This is a URL. */
  image: string;
  /* default:false, description:If the user is tied to a service account. */
  is_service_account: boolean;
  last_name: string /* The user's last name. */;
  name: string /* The name of the user. This is auto populated at first from the authentication provider (if there was a name). It can be updated by the user by updating their `first_name` and `last_name` fields. */;
  /*{
  "title": "String",
  "default": "",
  "format": "phone",
  "description": "The user's phone number."
}*/
  phone: string;
  /* title:DateTime, format:date-time, description:The date and time the user was last updated. */
  updated_at: string;
}

export interface UserOrgInfo_type {
  /*{
  "nullable": true,
  "description": "If we should allow all future users who are created with email addresses from this domain to join the org."
}*/
  allow_users_in_domain_to_auto_join?: boolean;
  /* format:email, description:The billing email address of the org. */
  billing_email: string;
  /*{
  "nullable": true,
  "title": "DateTime",
  "format": "date-time",
  "description": "The date and time the billing email address was verified."
}*/
  billing_email_verified?: string;
  /* nullable:true, description:If the org should be blocked and the reason why. */
  block?: BlockReason_type;
  /* title:DateTime, format:date-time, description:The date and time the org was created. */
  created_at: string;
  /* nullable:true, description:The org's domain. */
  domain?: string;
  id: Uuid_type /* The unique identifier for the org. */;
  /*{
  "nullable": true,
  "title": "String",
  "format": "uri",
  "description": "The image for the org. This is a URL."
}*/
  image?: string;
  name: string /* The name of the org. */;
  /*{
  "title": "String",
  "default": "",
  "format": "phone",
  "description": "The org's phone number."
}*/
  phone: string;
  role: OrgRole_type /* The user's role in the org. */;
  /* nullable:true, description:The org's stripe id. */
  stripe_id?: string;
  /* title:DateTime, format:date-time, description:The date and time the org was last updated. */
  updated_at: string;
}

export type UserOrgRole_type = 'admin' | 'member';

export interface UserResultsPage_type {
  items: User_type[] /* list of items on this page of results */;
  /*{
  "nullable": true,
  "description": "token used to fetch the next page of results (if any)"
}*/
  next_page?: string;
}

export type Uuid_type =
  /* format:uuid, description:A UUID usually v4 or v7 */
  string;

export interface VerificationTokenResponse_type {
  /*{
  "title": "DateTime",
  "format": "date-time",
  "description": "The date and time the verification token was created."
}*/
  created_at: string;
  /* title:DateTime, format:date-time, description:The date and time the verification token expires. */
  expires: string;
  id: Uuid_type /* The token used for verification. This is used as the id for the table since it is unique per record. */;
  identifier: string /* The identifier for the user. This is typically the user's email address since that is what we are verifying. */;
  /*{
  "nullable": true,
  "title": "String",
  "format": "uri",
  "description": "The URL to redirect to if the user requires SAML authentication."
}*/
  saml_redirect_url?: string;
  /*{
  "title": "DateTime",
  "format": "date-time",
  "description": "The date and time the verification token was last updated."
}*/
  updated_at: string;
}

export interface ViewIsometric_type {
  settings: CameraSettings_type /* Camera settings */;
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
  | {
      batch_id: ModelingCmdId_type /* ID of batch being submitted. Each request has their own individual ModelingCmdId, but this is the ID of the overall batch. */;
      requests: ModelingCmdReq_type[] /* A sequence of modeling requests. If any request fails, following requests will not be tried. */;
      /*{
  "default": false,
  "description": "If false or omitted, responses to each batch command will just be Ok(()). If true, responses will be the actual response data for that modeling command."
}*/
      responses: boolean;
      type: 'modeling_cmd_batch_req';
    }
  | { type: 'ping' }
  | {
      metrics: ClientMetrics_type /* Collected metrics from the Client's end of the engine connection. */;
      type: 'metrics_response';
    }
  | { headers: { [key: string]: string }; type: 'headers' };

export type WebSocketResponse_type =
  | {
      /*{
  "nullable": true,
  "format": "uuid",
  "description": "Which request this is a response to. If the request was a modeling command, this is the modeling command ID. If no request ID was sent, this will be null."
}*/
      request_id?: string;
      resp: OkWebSocketResponseData_type /* The data sent with a successful response. This will be flattened into a 'type' and 'data' field. */;
      success: true;
    }
  | {
      errors: ApiError_type[] /* The errors that occurred. */;
      /*{
  "nullable": true,
  "format": "uuid",
  "description": "Which request this is a response to. If the request was a modeling command, this is the modeling command ID. If no request ID was sent, this will be null."
}*/
      request_id?: string;
      success: false;
    };

export type ZooProductSubscription_type = {
  description: string /* A description of the tier. */;
  /* minItems:0, maxItems:15, description:Features that are included in the subscription. */
  features: SubscriptionTierFeature_type[];
  name: ModelingAppSubscriptionTierName_type /* The name of the tier. */;
  /*{
  "title": "double",
  "format": "money-usd",
  "description": "The amount of pay-as-you-go credits the individual or org gets outside the modeling app."
}*/
  pay_as_you_go_credits: number;
  price: SubscriptionTierPrice_type /* The price of the tier per month. If this is for an individual, this is the price they pay. If this is for an organization, this is the price the organization pays per member in the org. This is in USD. */;
  support_tier: SupportTier_type /* The support tier the subscription provides. */;
  training_data_behavior: SubscriptionTrainingDataBehavior_type /* The behavior of the users data (can it be used for training, etc). */;
  type: SubscriptionTierType_type /* If the tier is offered for an individual or an org. */;
  zoo_tools_included: ZooTool_type[] /* The Zoo tools that you can call unlimited times with this tier. */;
};

export interface ZooProductSubscriptions_type {
  modeling_app: ModelingAppSubscriptionTier_type /* A modeling app subscription. */;
}

export interface ZooProductSubscriptionsOrgRequest_type {
  /* default:team, description:A modeling app subscription. */
  modeling_app: ModelingAppOrganizationSubscriptionTier_type;
}

export interface ZooProductSubscriptionsUserRequest_type {
  /* default:free, description:A modeling app subscription. */
  modeling_app: ModelingAppIndividualSubscriptionTier_type;
}

export type ZooTool_type =
  | 'modeling_app'
  | 'text_to_cad'
  | 'diff_chrome_extension';

export interface ZoomToFit_type {
  settings: CameraSettings_type /* Camera settings */;
}

export interface Models {
  AccountProvider_type: AccountProvider_type;
  AddOrgMember_type: AddOrgMember_type;
  AddressDetails_type: AddressDetails_type;
  AiFeedback_type: AiFeedback_type;
  AiPrompt_type: AiPrompt_type;
  AiPromptResultsPage_type: AiPromptResultsPage_type;
  AiPromptType_type: AiPromptType_type;
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
  AuthCallback_type: AuthCallback_type;
  Axis_type: Axis_type;
  AxisDirectionPair_type: AxisDirectionPair_type;
  BatchResponse_type: BatchResponse_type;
  BillingInfo_type: BillingInfo_type;
  BlockReason_type: BlockReason_type;
  CacheMetadata_type: CacheMetadata_type;
  CameraDragEnd_type: CameraDragEnd_type;
  CameraDragInteractionType_type: CameraDragInteractionType_type;
  CameraDragMove_type: CameraDragMove_type;
  CameraSettings_type: CameraSettings_type;
  CardDetails_type: CardDetails_type;
  CenterOfMass_type: CenterOfMass_type;
  ClientMetrics_type: ClientMetrics_type;
  ClosePath_type: ClosePath_type;
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
  CutType_type: CutType_type;
  DefaultCameraFocusOn_type: DefaultCameraFocusOn_type;
  DefaultCameraGetSettings_type: DefaultCameraGetSettings_type;
  DefaultCameraZoom_type: DefaultCameraZoom_type;
  Density_type: Density_type;
  DerEncodedKeyPair_type: DerEncodedKeyPair_type;
  DeviceAccessTokenRequestForm_type: DeviceAccessTokenRequestForm_type;
  DeviceAuthRequestForm_type: DeviceAuthRequestForm_type;
  DeviceAuthVerifyParams_type: DeviceAuthVerifyParams_type;
  Direction_type: Direction_type;
  Discount_type: Discount_type;
  DiscountCode_type: DiscountCode_type;
  DistanceType_type: DistanceType_type;
  EmailAuthenticationForm_type: EmailAuthenticationForm_type;
  EntityCircularPattern_type: EntityCircularPattern_type;
  EntityGetAllChildUuids_type: EntityGetAllChildUuids_type;
  EntityGetChildUuid_type: EntityGetChildUuid_type;
  EntityGetDistance_type: EntityGetDistance_type;
  EntityGetNumChildren_type: EntityGetNumChildren_type;
  EntityGetParentId_type: EntityGetParentId_type;
  EntityGetSketchPaths_type: EntityGetSketchPaths_type;
  EntityLinearPattern_type: EntityLinearPattern_type;
  EntityLinearPatternTransform_type: EntityLinearPatternTransform_type;
  EntityType_type: EntityType_type;
  Environment_type: Environment_type;
  Error_type: Error_type;
  ErrorCode_type: ErrorCode_type;
  Event_type: Event_type;
  Export_type: Export_type;
  ExportFile_type: ExportFile_type;
  ExtendedUser_type: ExtendedUser_type;
  ExtendedUserResultsPage_type: ExtendedUserResultsPage_type;
  ExtrusionFaceCapType_type: ExtrusionFaceCapType_type;
  ExtrusionFaceInfo_type: ExtrusionFaceInfo_type;
  FaceGetCenter_type: FaceGetCenter_type;
  FaceGetGradient_type: FaceGetGradient_type;
  FaceGetPosition_type: FaceGetPosition_type;
  FaceIsPlanar_type: FaceIsPlanar_type;
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
  GetNumObjects_type: GetNumObjects_type;
  GetSketchModePlane_type: GetSketchModePlane_type;
  GlobalAxis_type: GlobalAxis_type;
  GltfPresentation_type: GltfPresentation_type;
  GltfStorage_type: GltfStorage_type;
  HighlightSetEntity_type: HighlightSetEntity_type;
  IceServer_type: IceServer_type;
  IdpMetadataSource_type: IdpMetadataSource_type;
  ImageFormat_type: ImageFormat_type;
  ImportFile_type: ImportFile_type;
  ImportFiles_type: ImportFiles_type;
  ImportedGeometry_type: ImportedGeometry_type;
  InputFormat_type: InputFormat_type;
  Invoice_type: Invoice_type;
  InvoiceLineItem_type: InvoiceLineItem_type;
  InvoiceStatus_type: InvoiceStatus_type;
  IpAddrInfo_type: IpAddrInfo_type;
  Jetstream_type: Jetstream_type;
  JetstreamApiStats_type: JetstreamApiStats_type;
  JetstreamConfig_type: JetstreamConfig_type;
  JetstreamStats_type: JetstreamStats_type;
  KclCodeCompletionParams_type: KclCodeCompletionParams_type;
  KclCodeCompletionRequest_type: KclCodeCompletionRequest_type;
  KclCodeCompletionResponse_type: KclCodeCompletionResponse_type;
  LeafNode_type: LeafNode_type;
  LengthUnit_type: LengthUnit_type;
  LinearTransform_type: LinearTransform_type;
  Mass_type: Mass_type;
  MetaClusterInfo_type: MetaClusterInfo_type;
  Metadata_type: Metadata_type;
  Method_type: Method_type;
  ModelingAppEventType_type: ModelingAppEventType_type;
  ModelingAppIndividualSubscriptionTier_type: ModelingAppIndividualSubscriptionTier_type;
  ModelingAppOrganizationSubscriptionTier_type: ModelingAppOrganizationSubscriptionTier_type;
  ModelingAppSubscriptionTier_type: ModelingAppSubscriptionTier_type;
  ModelingAppSubscriptionTierName_type: ModelingAppSubscriptionTierName_type;
  ModelingCmd_type: ModelingCmd_type;
  ModelingCmdId_type: ModelingCmdId_type;
  ModelingCmdReq_type: ModelingCmdReq_type;
  MouseClick_type: MouseClick_type;
  OAuth2ClientInfo_type: OAuth2ClientInfo_type;
  OAuth2GrantType_type: OAuth2GrantType_type;
  OkModelingCmdResponse_type: OkModelingCmdResponse_type;
  OkWebSocketResponseData_type: OkWebSocketResponseData_type;
  Onboarding_type: Onboarding_type;
  Org_type: Org_type;
  OrgDetails_type: OrgDetails_type;
  OrgMember_type: OrgMember_type;
  OrgMemberResultsPage_type: OrgMemberResultsPage_type;
  OrgResultsPage_type: OrgResultsPage_type;
  OrgRole_type: OrgRole_type;
  OutputFile_type: OutputFile_type;
  OutputFormat_type: OutputFormat_type;
  PathCommand_type: PathCommand_type;
  PathComponentConstraintBound_type: PathComponentConstraintBound_type;
  PathComponentConstraintType_type: PathComponentConstraintType_type;
  PathGetCurveUuid_type: PathGetCurveUuid_type;
  PathGetCurveUuidsForVertices_type: PathGetCurveUuidsForVertices_type;
  PathGetInfo_type: PathGetInfo_type;
  PathGetSketchTargetUuid_type: PathGetSketchTargetUuid_type;
  PathGetVertexUuids_type: PathGetVertexUuids_type;
  PathSegment_type: PathSegment_type;
  PathSegmentInfo_type: PathSegmentInfo_type;
  PaymentIntent_type: PaymentIntent_type;
  PaymentMethod_type: PaymentMethod_type;
  PaymentMethodCardChecks_type: PaymentMethodCardChecks_type;
  PaymentMethodType_type: PaymentMethodType_type;
  PerspectiveCameraParameters_type: PerspectiveCameraParameters_type;
  PlanInterval_type: PlanInterval_type;
  PlaneIntersectAndProject_type: PlaneIntersectAndProject_type;
  PlyStorage_type: PlyStorage_type;
  Point2d_type: Point2d_type;
  Point3d_type: Point3d_type;
  Point4d_type: Point4d_type;
  Pong_type: Pong_type;
  PostEffectType_type: PostEffectType_type;
  PrivacySettings_type: PrivacySettings_type;
  RawFile_type: RawFile_type;
  RtcIceCandidateInit_type: RtcIceCandidateInit_type;
  RtcSdpType_type: RtcSdpType_type;
  RtcSessionDescription_type: RtcSessionDescription_type;
  SamlIdentityProvider_type: SamlIdentityProvider_type;
  SamlIdentityProviderCreate_type: SamlIdentityProviderCreate_type;
  SceneSelectionType_type: SceneSelectionType_type;
  SceneToolType_type: SceneToolType_type;
  SelectGet_type: SelectGet_type;
  SelectWithPoint_type: SelectWithPoint_type;
  Selection_type: Selection_type;
  ServiceAccount_type: ServiceAccount_type;
  ServiceAccountResultsPage_type: ServiceAccountResultsPage_type;
  Session_type: Session_type;
  SessionTokenUuid_type: SessionTokenUuid_type;
  Solid3dGetAllEdgeFaces_type: Solid3dGetAllEdgeFaces_type;
  Solid3dGetAllOppositeEdges_type: Solid3dGetAllOppositeEdges_type;
  Solid3dGetExtrusionFaceInfo_type: Solid3dGetExtrusionFaceInfo_type;
  Solid3dGetNextAdjacentEdge_type: Solid3dGetNextAdjacentEdge_type;
  Solid3dGetOppositeEdge_type: Solid3dGetOppositeEdge_type;
  Solid3dGetPrevAdjacentEdge_type: Solid3dGetPrevAdjacentEdge_type;
  StlStorage_type: StlStorage_type;
  StoreCouponParams_type: StoreCouponParams_type;
  StringUuid_type: StringUuid_type;
  SubscriptionTierFeature_type: SubscriptionTierFeature_type;
  SubscriptionTierPrice_type: SubscriptionTierPrice_type;
  SubscriptionTierType_type: SubscriptionTierType_type;
  SubscriptionTrainingDataBehavior_type: SubscriptionTrainingDataBehavior_type;
  SuccessWebSocketResponse_type: SuccessWebSocketResponse_type;
  SupportTier_type: SupportTier_type;
  SurfaceArea_type: SurfaceArea_type;
  System_type: System_type;
  TakeSnapshot_type: TakeSnapshot_type;
  TextToCad_type: TextToCad_type;
  TextToCadCreateBody_type: TextToCadCreateBody_type;
  TextToCadResultsPage_type: TextToCadResultsPage_type;
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
  UpdateMemberToOrgBody_type: UpdateMemberToOrgBody_type;
  UpdatePaymentBalance_type: UpdatePaymentBalance_type;
  UpdateUser_type: UpdateUser_type;
  User_type: User_type;
  UserOrgInfo_type: UserOrgInfo_type;
  UserOrgRole_type: UserOrgRole_type;
  UserResultsPage_type: UserResultsPage_type;
  Uuid_type: Uuid_type;
  VerificationTokenResponse_type: VerificationTokenResponse_type;
  ViewIsometric_type: ViewIsometric_type;
  Volume_type: Volume_type;
  WebSocketRequest_type: WebSocketRequest_type;
  WebSocketResponse_type: WebSocketResponse_type;
  ZooProductSubscription_type: ZooProductSubscription_type;
  ZooProductSubscriptions_type: ZooProductSubscriptions_type;
  ZooProductSubscriptionsOrgRequest_type: ZooProductSubscriptionsOrgRequest_type;
  ZooProductSubscriptionsUserRequest_type: ZooProductSubscriptionsUserRequest_type;
  ZooTool_type: ZooTool_type;
  ZoomToFit_type: ZoomToFit_type;
}
