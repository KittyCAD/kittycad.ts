export type AccountProvider =
  | 'apple'
  | 'discord'
  | 'google'
  | 'github'
  | 'microsoft'
  | 'saml'
  | 'tencent'

export interface AddHoleFromOffset {
  /**
   * {
   *   "format": "uuid"
   * }
   */
  entity_ids: string[]
}

export interface AddOrgMember {
  /** format:email, description:The email address of the user to add to the org. */
  email: string
  /** The organization role to give the user. */
  role: UserOrgRole
}

export interface AddressDetails {
  /** The city component. */
  city?: string
  /** The country component. This is a two-letter ISO country code. */
  country: CountryCode
  /** The state component. */
  state?: string
  /** The first street component. */
  street1?: string
  /** The second street component. */
  street2?: string
  /** The zip component. */
  zip?: string
}

export interface AdjacencyInfo {
  /** nullable:true, description:Adjacent edge and face info. */
  adjacent_info?: EdgeInfo
  /** nullable:true, description:Opposite edge and face info. */
  opposite_info?: EdgeInfo
  /** nullable:true, description:Original edge id and face info. */
  original_info?: EdgeInfo
}

export interface Angle {
  /** What unit is the measurement? */
  unit: UnitAngle
  /**
   * {
   *   "format": "double",
   *   "description": "The size of the angle, measured in the chosen unit."
   * }
   */
  value: number
}

export type AnnotationLineEnd =
  /** Annotation line end type */
  'none' | 'arrow'

export interface AnnotationLineEndOptions {
  /** How to style the end of the annotation line. */
  end: AnnotationLineEnd
  /** How to style the start of the annotation line. */
  start: AnnotationLineEnd
}

export interface AnnotationOptions {
  /** nullable:true, description:Color to render the annotation */
  color?: Color
  /** nullable:true, description:How to style the start and end of the line */
  line_ends?: AnnotationLineEndOptions
  /** nullable:true, format:float, description:Width of the annotation's line */
  line_width?: number
  /** nullable:true, description:Position to put the annotation */
  position?: Point3d
  /** nullable:true, description:Text displayed on the annotation */
  text?: AnnotationTextOptions
}

export type AnnotationTextAlignmentX =
  /** Horizontal Text alignment */
  'left' | 'center' | 'right'

export type AnnotationTextAlignmentY =
  /** Vertical Text alignment */
  'bottom' | 'center' | 'top'

export interface AnnotationTextOptions {
  /** format:uint32, minimum:0, description:Text font's point size */
  point_size: number
  /** Text displayed on the annotation */
  text: string
  /** Alignment along the X axis */
  x: AnnotationTextAlignmentX
  /** Alignment along the Y axis */
  y: AnnotationTextAlignmentY
}

export type AnnotationType = 't2d' | 't3d'

export interface ApiCallQueryGroup {
  /**
   * {
   *   "format": "int64"
   * }
   */
  count: number
  query: string
}

export type ApiCallQueryGroupBy =
  | 'email'
  | 'method'
  | 'endpoint'
  | 'user_id'
  | 'origin'
  | 'ip_address'

export type ApiCallStatus =
  | 'queued'
  | 'uploaded'
  | 'in_progress'
  | 'completed'
  | 'failed'

export interface ApiCallWithPrice {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The date and time the API call completed billing."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The date and time the API call was created. */
  created_at: string
  /**
   * {
   *   "nullable": true,
   *   "title": "int64",
   *   "format": "duration",
   *   "description": "The duration of the API call."
   * }
   */
  duration?: number
  /** format:email, description:The user's email address. */
  email?: string
  /** The endpoint requested by the API call. */
  endpoint?: string
  /** The unique identifier for the API call. */
  id: Uuid
  /**
   * {
   *   "title": "String",
   *   "default": "",
   *   "format": "ip",
   *   "description": "The ip address of the origin."
   * }
   */
  ip_address?: string
  /** The HTTP method requested by the API call. */
  method: Method
  /**
   * {
   *   "nullable": true,
   *   "format": "int32",
   *   "description": "The number of minutes the API call was billed for."
   * }
   */
  minutes?: number
  /**
   * {
   *   "nullable": true,
   *   "description": "The organization ID of the API call if it is billable through an organization."
   * }
   */
  org_id?: Uuid
  /** The origin of the API call. */
  origin?: string
  /**
   * {
   *   "nullable": true,
   *   "title": "double",
   *   "format": "money-usd",
   *   "description": "The price of the API call."
   * }
   */
  price?: number
  /** nullable:true, description:The request body sent by the API call. */
  request_body?: string
  /** The request query params sent by the API call. */
  request_query_params?: string
  /**
   * {
   *   "nullable": true,
   *   "description": "The response body returned by the API call. We do not store this information if it is above a certain size."
   * }
   */
  response_body?: string
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The date and time the API call started billing."
   * }
   */
  started_at?: string
  /**
   * {
   *   "nullable": true,
   *   "title": "int32",
   *   "format": "int32",
   *   "description": "The status code returned by the API call."
   * }
   */
  status_code?: number
  /** The Stripe invoice item ID of the API call if it is billable. */
  stripe_invoice_item_id?: string
  /** The API token that made the API call. */
  token: Uuid
  /** title:DateTime, format:date-time, description:The date and time the API call was last updated. */
  updated_at: string
  /** The user agent of the request. */
  user_agent: string
  /** The ID of the user that made the API call. */
  user_id: Uuid
}

export interface ApiCallWithPriceResultsPage {
  /** list of items on this page of results */
  items: ApiCallWithPrice[]
  /**
   * {
   *   "nullable": true,
   *   "description": "token used to fetch the next page of results (if any)"
   * }
   */
  next_page?: string
}

export type ApiEndpoint = 'modeling' | 'ml' | 'file'

export interface ApiError {
  /** The error code. */
  error_code: ErrorCode
  /** The error message. */
  message: string
}

export interface ApiToken {
  /** title:DateTime, format:date-time, description:The date and time the API token was created. */
  created_at: string
  /** The unique identifier for the API token. */
  id: Uuid
  /** If the token is valid. We never delete API tokens, but we can mark them as invalid. We save them for ever to preserve the history of the API token. */
  is_valid: boolean
  /** nullable:true, description:An optional label for the API token. */
  label?: string
  /** The API token itself. */
  token: ApiTokenUuid
  /** title:DateTime, format:date-time, description:The date and time the API token was last updated. */
  updated_at: string
  /** The ID of the user that owns the API token. */
  user_id: Uuid
}

export interface ApiTokenResultsPage {
  /** list of items on this page of results */
  items: ApiToken[]
  /**
   * {
   *   "nullable": true,
   *   "description": "token used to fetch the next page of results (if any)"
   * }
   */
  next_page?: string
}

export type ApiTokenUuid =
  /** An auth token. A uuid with a prefix of api- */
  string

export interface AppClientInfo {
  /** The URL for consent. */
  url?: string
}

export interface AsyncApiCall {
  /**
   * {
   *   "default": 0,
   *   "format": "int16",
   *   "description": "The number of times we've attempted to process this job."
   * }
   */
  attempts?: number
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the async API call was completed."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The time and date the async API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** The unique identifier of the async API call.

This is the same as the API call ID. */
  id: Uuid
  input?: string
  output: unknown
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the async API call was started."
   * }
   */
  started_at?: string
  /** The status of the async API call. */
  status: ApiCallStatus
  /** The type of async API call. */
  type: AsyncApiCallType
  /**
   * {
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the async API call was last updated."
   * }
   */
  updated_at: string
  /** The user ID of the user who created the async API call. */
  user_id: Uuid
  /** The worker node that is performing or performed the async API call. */
  worker?: string
}

export type AsyncApiCallOutput =
  | {
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was completed."
       * }
       */
      completed_at?: string
      /** title:DateTime, format:date-time, description:The time and date the API call was created. */
      created_at: string
      /** nullable:true, description:The error the function returned, if any. */
      error?: string
      /** The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid
      /** The output format of the file conversion. */
      output_format: FileExportFormat
      /** nullable:true, description:The output format options of the file conversion. */
      output_format_options?: OutputFormat3d
      outputs?: {
        [key: string]: /**
         * {
         *   "title": "String",
         *   "format": "byte"
         * }
         */
        string
      }
      /** The source format of the file conversion. */
      src_format: FileImportFormat
      /** nullable:true, description:The source format options of the file conversion. */
      src_format_options?: InputFormat3d
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was started."
       * }
       */
      started_at?: string
      /** The status of the API call. */
      status: ApiCallStatus
      type: 'file_conversion'
      /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
      updated_at: string
      /** The user ID of the user who created the API call. */
      user_id: Uuid
    }
  | {
      /** nullable:true, description:The resulting center of mass. */
      center_of_mass?: Point3d
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was completed."
       * }
       */
      completed_at?: string
      /** title:DateTime, format:date-time, description:The time and date the API call was created. */
      created_at: string
      /** nullable:true, description:The error the function returned, if any. */
      error?: string
      /** The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid
      /** The output unit for the center of mass. */
      output_unit: UnitLength
      /** The source format of the file. */
      src_format: FileImportFormat
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was started."
       * }
       */
      started_at?: string
      /** The status of the API call. */
      status: ApiCallStatus
      type: 'file_center_of_mass'
      /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
      updated_at: string
      /** The user ID of the user who created the API call. */
      user_id: Uuid
    }
  | {
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was completed."
       * }
       */
      completed_at?: string
      /** title:DateTime, format:date-time, description:The time and date the API call was created. */
      created_at: string
      /** nullable:true, description:The error the function returned, if any. */
      error?: string
      /** The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid
      /** nullable:true, format:double, description:The resulting mass. */
      mass?: number
      /** default:0, format:double, description:The material density as denoted by the user. */
      material_density?: number
      /** The material density unit. */
      material_density_unit: UnitDensity
      /** The output unit for the mass. */
      output_unit: UnitMass
      /** The source format of the file. */
      src_format: FileImportFormat
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was started."
       * }
       */
      started_at?: string
      /** The status of the API call. */
      status: ApiCallStatus
      type: 'file_mass'
      /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
      updated_at: string
      /** The user ID of the user who created the API call. */
      user_id: Uuid
    }
  | {
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was completed."
       * }
       */
      completed_at?: string
      /** title:DateTime, format:date-time, description:The time and date the API call was created. */
      created_at: string
      /** nullable:true, description:The error the function returned, if any. */
      error?: string
      /** The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid
      /** The output unit for the volume. */
      output_unit: UnitVolume
      /** The source format of the file. */
      src_format: FileImportFormat
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was started."
       * }
       */
      started_at?: string
      /** The status of the API call. */
      status: ApiCallStatus
      type: 'file_volume'
      /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
      updated_at: string
      /** The user ID of the user who created the API call. */
      user_id: Uuid
      /** nullable:true, format:double, description:The resulting volume. */
      volume?: number
    }
  | {
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was completed."
       * }
       */
      completed_at?: string
      /** title:DateTime, format:date-time, description:The time and date the API call was created. */
      created_at: string
      /** nullable:true, format:double, description:The resulting density. */
      density?: number
      /** nullable:true, description:The error the function returned, if any. */
      error?: string
      /** The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid
      /** default:0, format:double, description:The material mass as denoted by the user. */
      material_mass?: number
      /** The material mass unit. */
      material_mass_unit: UnitMass
      /** The output unit for the density. */
      output_unit: UnitDensity
      /** The source format of the file. */
      src_format: FileImportFormat
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was started."
       * }
       */
      started_at?: string
      /** The status of the API call. */
      status: ApiCallStatus
      type: 'file_density'
      /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
      updated_at: string
      /** The user ID of the user who created the API call. */
      user_id: Uuid
    }
  | {
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was completed."
       * }
       */
      completed_at?: string
      /** title:DateTime, format:date-time, description:The time and date the API call was created. */
      created_at: string
      /** nullable:true, description:The error the function returned, if any. */
      error?: string
      /** The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid
      /** The output unit for the surface area. */
      output_unit: UnitArea
      /** The source format of the file. */
      src_format: FileImportFormat
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was started."
       * }
       */
      started_at?: string
      /** The status of the API call. */
      status: ApiCallStatus
      /** nullable:true, format:double, description:The resulting surface area. */
      surface_area?: number
      type: 'file_surface_area'
      /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
      updated_at: string
      /** The user ID of the user who created the API call. */
      user_id: Uuid
    }
  | {
      /**
       * {
       *   "nullable": true,
       *   "description": "The code for the model. This is optional but will be required in the future once we are at v1."
       * }
       */
      code?: string
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was completed."
       * }
       */
      completed_at?: string
      /** The conversation ID Conversations group different prompts together. */
      conversation_id: Uuid
      /** title:DateTime, format:date-time, description:The time and date the API call was created. */
      created_at: string
      /** nullable:true, description:The error the function returned, if any. */
      error?: string
      /** nullable:true, description:Feedback from the user, if any. */
      feedback?: MlFeedback
      /** The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid
      /** nullable:true, description:The version of kcl requested. */
      kcl_version?: string
      /** The model being used. */
      model: TextToCadModel
      /** The version of the model. */
      model_version: string
      /** The output format of the model. */
      output_format: FileExportFormat
      outputs?: {
        [key: string]: /**
         * {
         *   "title": "String",
         *   "format": "byte"
         * }
         */
        string
      }
      /** The prompt. */
      prompt: string
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was started."
       * }
       */
      started_at?: string
      /** The status of the API call. */
      status: ApiCallStatus
      type: 'text_to_cad'
      /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
      updated_at: string
      /** The user ID of the user who created the API call. */
      user_id: Uuid
    }
  | {
      /** The code for the new model. */
      code: string
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was completed."
       * }
       */
      completed_at?: string
      /** The conversation ID Conversations group different prompts together. */
      conversation_id: Uuid
      /** title:DateTime, format:date-time, description:The time and date the API call was created. */
      created_at: string
      /** nullable:true, description:The error the function returned, if any. */
      error?: string
      /** nullable:true, description:Feedback from the user, if any. */
      feedback?: MlFeedback
      /** The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid
      /** The model being used. */
      model: TextToCadModel
      /** The version of the model. */
      model_version: string
      /** The original source code for the model, previous to the changes. */
      original_source_code: string
      /**
       * {
       *   "nullable": true,
       *   "description": "The prompt for the overall changes. This is optional if you only want changes on specific source ranges."
       * }
       */
      prompt?: string
      /** The source ranges the user suggested to change. */
      source_ranges: SourceRangePrompt[]
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was started."
       * }
       */
      started_at?: string
      /** The status of the API call. */
      status: ApiCallStatus
      type: 'text_to_cad_iteration'
      /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
      updated_at: string
      /** The user ID of the user who created the API call. */
      user_id: Uuid
    }
  | {
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was completed."
       * }
       */
      completed_at?: string
      /** The conversation ID Conversations group different prompts together. */
      conversation_id: Uuid
      /** title:DateTime, format:date-time, description:The time and date the API call was created. */
      created_at: string
      /** nullable:true, description:The error the function returned, if any. */
      error?: string
      /** nullable:true, description:Feedback from the user, if any. */
      feedback?: MlFeedback
      /** The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid
      /**
       * {
       *   "nullable": true,
       *   "description": "The version of kcl to use. If empty, the latest version will be used."
       * }
       */
      kcl_version?: string
      /** The model being used. */
      model: TextToCadModel
      /** The version of the model. */
      model_version: string
      outputs?: { [key: string]: string }
      /**
       * {
       *   "nullable": true,
       *   "description": "The project name. This is used to tie the prompt to a project. Which helps us make our models better over time."
       * }
       */
      project_name?: string
      /**
       * {
       *   "nullable": true,
       *   "description": "The prompt for the overall changes. This is optional if you only want changes on specific source ranges. This will apply to all the files."
       * }
       */
      prompt?: string
      /** The source ranges the user suggested to change. */
      source_ranges: SourceRangePrompt[]
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was started."
       * }
       */
      started_at?: string
      /** The status of the API call. */
      status: ApiCallStatus
      type: 'text_to_cad_multi_file_iteration'
      /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
      updated_at: string
      /** The user ID of the user who created the API call. */
      user_id: Uuid
    }

export interface AsyncApiCallResultsPage {
  /** list of items on this page of results */
  items: AsyncApiCall[]
  /**
   * {
   *   "nullable": true,
   *   "description": "token used to fetch the next page of results (if any)"
   * }
   */
  next_page?: string
}

export type AsyncApiCallType =
  | 'file_conversion'
  | 'file_volume'
  | 'file_center_of_mass'
  | 'file_mass'
  | 'file_density'
  | 'file_surface_area'
  | 'text_to_cad'
  | 'text_to_cad_iteration'
  | 'text_to_cad_multi_file_iteration'

export interface AuthApiKeyResponse {
  /** The session token */
  session_token: string
}

export interface AuthCallback {
  /** The authorization code. */
  code?: string
  /**
   * {
   *   "nullable": true,
   *   "description": "For Apple only, a JSON web token containing the user’s identity information."
   * }
   */
  id_token?: string
  /** The state that we had passed in through the user consent URL. */
  state?: string
  /**
   * {
   *   "nullable": true,
   *   "description": "For Apple only, a JSON string containing the data requested in the scope property. The returned data is in the following format: `{ \"name\": { \"firstName\": string, \"lastName\": string }, \"email\": string }`"
   * }
   */
  user?: string
}

export type Axis = 'y' | 'z'

export interface AxisDirectionPair {
  /** Axis specifier. */
  axis: Axis
  /** Specifies which direction the axis is pointing. */
  direction: Direction
}

export type BatchResponse =
  | {
      /** Response to the modeling command. */
      response: OkModelingCmdResponse
    }
  | {
      /** Errors that occurred during the modeling command. */
      errors: ApiError[]
    }

export interface BillingInfo {
  /** nullable:true, description:The address of the customer. */
  address?: AddressDetails
  /** The name of the customer. */
  name?: string
  /**
   * {
   *   "title": "String",
   *   "default": "",
   *   "format": "phone",
   *   "description": "The phone for the customer."
   * }
   */
  phone?: string
}

export type BlockReason = 'missing_payment_method' | 'payment_method_failed'

export interface BooleanIntersection {
  /**
   * {
   *   "format": "uuid"
   * }
   */
  extra_solid_ids?: string[]
}

export interface BooleanSubtract {
  /**
   * {
   *   "format": "uuid"
   * }
   */
  extra_solid_ids?: string[]
}

export interface BooleanUnion {
  /**
   * {
   *   "format": "uuid"
   * }
   */
  extra_solid_ids?: string[]
}

export interface CameraDragEnd {
  /** Camera settings */
  settings: CameraSettings
}

export type CameraDragInteractionType =
  | 'pan'
  | 'rotate'
  | 'rotatetrackball'
  | 'zoom'

export interface CameraDragMove {
  /** Camera settings */
  settings: CameraSettings
}

export interface CameraDragStart {} /* Empty object */

export type CameraMovement = 'vantage' | 'none'

export interface CameraSettings {
  /** Camera's look-at center (center-pos gives viewing vector) */
  center: Point3d
  /** nullable:true, format:float, description:Camera's field-of-view angle (if ortho is false) */
  fov_y?: number
  /** The Camera's orientation (in the form of a quaternion) */
  orientation: Point4d
  /** Whether or not the camera is in ortho mode */
  ortho: boolean
  /**
   * {
   *   "nullable": true,
   *   "format": "float",
   *   "description": "The camera's ortho scale (derived from viewing distance if ortho is true)"
   * }
   */
  ortho_scale?: number
  /** Camera position (vantage) */
  pos: Point3d
  /** Camera's world-space up vector */
  up: Point3d
}

export interface CameraViewState {
  /**
   * {
   *   "format": "float"
   * }
   */
  eye_offset: number
  /**
   * {
   *   "format": "float"
   * }
   */
  fov_y: number
  is_ortho: boolean
  ortho_scale_enabled: boolean
  /**
   * {
   *   "format": "float"
   * }
   */
  ortho_scale_factor: number
  /**
   * {
   *   "$ref": "#/components/schemas/Point3d"
   * }
   */
  pivot_position: Point3d
  /**
   * {
   *   "$ref": "#/components/schemas/Point4d"
   * }
   */
  pivot_rotation: Point4d
  /**
   * {
   *   "$ref": "#/components/schemas/WorldCoordinateSystem"
   * }
   */
  world_coord_system: WorldCoordinateSystem
}

export interface CardDetails {
  /** Card brand.

Can be `amex`, `diners`, `discover`, `jcb`, `mastercard`, `unionpay`, `visa`, or `unknown`. */
  brand?: string
  /** default:{}, description:Checks on Card address and CVC if provided. */
  checks?: PaymentMethodCardChecks
  /** Two-letter ISO code representing the country of the card. */
  country?: string
  /**
   * {
   *   "default": 0,
   *   "format": "int64",
   *   "description": "Two-digit number representing the card's expiration month."
   * }
   */
  exp_month?: number
  /**
   * {
   *   "default": 0,
   *   "format": "int64",
   *   "description": "Four-digit number representing the card's expiration year."
   * }
   */
  exp_year?: number
  /** Uniquely identifies this particular card number. */
  fingerprint?: string
  /** Card funding type.

Can be `credit`, `debit`, `prepaid`, or `unknown`. */
  funding?: string
  /** The last four digits of the card. */
  last4?: string
}

export interface CenterOfMass {
  /** The center of mass. */
  center_of_mass: Point3d
  /** The output unit for the center of mass. */
  output_unit: UnitLength
}

export interface ClientMetrics {
  /**
   * {
   *   "nullable": true,
   *   "format": "uint32",
   *   "minimum": 0,
   *   "description": "The height of the inbound video stream in pixels.\n\nhttps://www.w3.org/TR/webrtc-stats/#dom-rtcinboundrtpstreamstats-frameheight"
   * }
   */
  rtc_frame_height?: number
  /**
   * {
   *   "nullable": true,
   *   "format": "uint32",
   *   "minimum": 0,
   *   "description": "The width of the inbound video stream in pixels.\n\nhttps://www.w3.org/TR/webrtc-stats/#dom-rtcinboundrtpstreamstats-framewidth"
   * }
   */
  rtc_frame_width?: number
  /**
   * {
   *   "nullable": true,
   *   "format": "uint64",
   *   "minimum": 0,
   *   "description": "Counter of the number of WebRTC frames that the client has decoded from the inbound video stream.\n\nhttps://www.w3.org/TR/webrtc-stats/#dom-rtcinboundrtpstreamstats-freezecount"
   * }
   */
  rtc_frames_decoded?: number
  /**
   * {
   *   "nullable": true,
   *   "format": "uint32",
   *   "minimum": 0,
   *   "description": "Counter of the number of WebRTC frames the client has dropped from the inbound video stream.\n\nhttps://www.w3.org/TR/webrtc-stats/#dom-rtcinboundrtpstreamstats-framesdropped"
   * }
   */
  rtc_frames_dropped?: number
  /**
   * {
   *   "nullable": true,
   *   "format": "uint8",
   *   "minimum": 0,
   *   "description": "Current number of frames being rendered in the last second. A good target is 60 frames per second, but it can fluctuate depending on network conditions.\n\nhttps://www.w3.org/TR/webrtc-stats/#dom-rtcinboundrtpstreamstats-freezecount"
   * }
   */
  rtc_frames_per_second?: number
  /**
   * {
   *   "nullable": true,
   *   "format": "uint64",
   *   "minimum": 0,
   *   "description": "Counter of the number of WebRTC frames that the client has received from the inbound video stream.\n\nhttps://www.w3.org/TR/webrtc-stats/#dom-rtcinboundrtpstreamstats-freezecount"
   * }
   */
  rtc_frames_received?: number
  /**
   * {
   *   "nullable": true,
   *   "format": "uint32",
   *   "minimum": 0,
   *   "description": "Number of times the inbound video playback has frozen. This is usually due to network conditions.\n\nhttps://www.w3.org/TR/webrtc-stats/#dom-rtcinboundrtpstreamstats-freezecount"
   * }
   */
  rtc_freeze_count?: number
  /**
   * {
   *   "nullable": true,
   *   "format": "double",
   *   "description": "Amount of \"jitter\" in the inbound video stream. Network latency is the time it takes a packet to traverse the network. The amount that the latency varies is the jitter. Video latency is the time it takes to render a frame sent by the server (including network latency). A low jitter means the video latency can be reduced without impacting smooth playback. High jitter means clients will increase video latency to ensure smooth playback.\n\nhttps://www.w3.org/TR/webrtc-stats/#dom-rtcreceivedrtpstreamstats-jitter"
   * }
   */
  rtc_jitter_sec?: number
  /**
   * {
   *   "nullable": true,
   *   "format": "uint32",
   *   "minimum": 0,
   *   "description": "Number of \"key frames\" decoded in the inbound h.264 stream. A key frame is an expensive (bandwidth-wise) \"full image\" of the video frame. Data after the keyframe become -- effectively -- \"diff\" operations on that key frame. The Engine will only send a keyframe if required, which is an indication that some of the \"diffs\" have been lost, usually an indication of poor network conditions. We like this metric to understand times when the connection has had to recover.\n\nhttps://www.w3.org/TR/webrtc-stats/#dom-rtcinboundrtpstreamstats-keyframesdecoded"
   * }
   */
  rtc_keyframes_decoded?: number
  /**
   * {
   *   "nullable": true,
   *   "format": "uint32",
   *   "minimum": 0,
   *   "description": "Amount of packets lost in the inbound video stream.\n\nhttps://www.w3.org/TR/webrtc-stats/#dom-rtcreceivedrtpstreamstats-packetslost"
   * }
   */
  rtc_packets_lost?: number
  /**
   * {
   *   "nullable": true,
   *   "format": "uint32",
   *   "minimum": 0,
   *   "description": "Count of the total number of video pauses experienced by this receiver.\n\nhttps://www.w3.org/TR/webrtc-stats/#dom-rtcinboundrtpstreamstats-pausecount"
   * }
   */
  rtc_pause_count?: number
  /**
   * {
   *   "nullable": true,
   *   "format": "uint32",
   *   "minimum": 0,
   *   "description": "Count the total number of Picture Loss Indication (PLI) packets.\n\nhttps://www.w3.org/TR/webrtc-stats/#dom-rtcinboundrtpstreamstats-plicount"
   * }
   */
  rtc_pli_count?: number
  /**
   * {
   *   "nullable": true,
   *   "format": "float",
   *   "description": "Total duration of pauses in seconds.\n\nThis is the \"ping\" between the client and the STUN server. Not to be confused with the E2E RTT documented [here](https://www.w3.org/TR/webrtc-stats/#dom-rtcremoteinboundrtpstreamstats-roundtriptime)\n\nhttps://www.w3.org/TR/webrtc-stats/#dom-rtcicecandidatepairstats-currentroundtriptime"
   * }
   */
  rtc_stun_rtt_sec?: number
  /**
   * {
   *   "nullable": true,
   *   "format": "float",
   *   "description": "Number of seconds of frozen video the user has been subjected to.\n\nhttps://www.w3.org/TR/webrtc-stats/#dom-rtcinboundrtpstreamstats-totalfreezesduration"
   * }
   */
  rtc_total_freezes_duration_sec?: number
  /**
   * {
   *   "nullable": true,
   *   "format": "float",
   *   "description": "Count of the total number of video pauses experienced by this receiver.\n\nhttps://www.w3.org/TR/webrtc-stats/#dom-rtcinboundrtpstreamstats-totalpausesduration"
   * }
   */
  rtc_total_pauses_duration_sec?: number
}

export interface ClosePath {
  /**
   * {
   *   "format": "uuid",
   *   "description": "The UUID of the lone face of the resulting solid2D."
   * }
   */
  face_id: string
}

export type CodeLanguage = 'go' | 'python' | 'node'

export type CodeOption =
  /** Code option for running and verifying kcl.

<details><summary>JSON schema</summary>

```json { "title": "CodeOption", "description": "Code option for running and verifying kcl.", "type": "string", "enum": [ "parse", "execute", "cleanup", "mock_execute" ] } ``` </details> */
  'parse' | 'execute' | 'cleanup' | 'mock_execute'

export interface CodeOutput {
  /** The contents of the files requested if they were passed. */
  output_files?: OutputFile[]
  /** default:, description:The stderr of the code. */
  stderr?: string
  /** default:, description:The stdout of the code. */
  stdout?: string
}

export interface Color {
  /** format:float, description:Alpha */
  a: number
  /** format:float, description:Blue */
  b: number
  /** format:float, description:Green */
  g: number
  /** format:float, description:Red */
  r: number
}

export interface ComplementaryEdges {
  /**
   * {
   *   "format": "uuid"
   * }
   */
  adjacent_ids: string[]
  /**
   * {
   *   "nullable": true,
   *   "format": "uuid",
   *   "description": "The opposite edge has no common vertices with the original edge. A wall may not have an opposite edge (i.e. a revolve that touches the axis of rotation)."
   * }
   */
  opposite_id?: string
}

export interface ComponentTransform {
  /**
   * {
   *   "nullable": true,
   *   "description": "Rotate component of the transform. The rotation is specified as an axis and an angle (xyz are the components of the axis, w is the angle in degrees)."
   * }
   */
  rotate_angle_axis?: TransformByForPoint4d
  /**
   * {
   *   "nullable": true,
   *   "description": "Rotate component of the transform. The rotation is specified as a roll, pitch, yaw."
   * }
   */
  rotate_rpy?: TransformByForPoint3d
  /** nullable:true, description:Scale component of the transform. */
  scale?: TransformByForPoint3d
  /** nullable:true, description:Translate component of the transform. */
  translate?: TransformByForPoint3d
}

export interface Conversation {
  /** title:DateTime, format:date-time, description:The date and time the conversation was created. */
  created_at: string
  /** The prompt that started this conversation. */
  first_prompt: string
  /** The unique identifier for the conversation. */
  id: Uuid
  /**
   * {
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The date and time the conversation was last updated."
   * }
   */
  updated_at: string
  /** The user ID of the user who created the conversation. */
  user_id: Uuid
}

export interface ConversationResultsPage {
  /** list of items on this page of results */
  items: Conversation[]
  /**
   * {
   *   "nullable": true,
   *   "description": "token used to fetch the next page of results (if any)"
   * }
   */
  next_page?: string
}

export interface ConversionParams {
  /** Describes the output file(s). */
  output_format: OutputFormat3d
  /** Describes the input file(s). */
  src_format: InputFormat3d
}

export type CountryCode =
  /** An ISO-3166 alpha-2 country code. Always uppercase. */
  string

export interface Coupon {
  /**
   * {
   *   "nullable": true,
   *   "title": "double",
   *   "format": "money-usd",
   *   "description": "Amount (in the `currency` specified) that will be taken off the subtotal of any invoices for this customer."
   * }
   */
  amount_off?: number
  /** default:false, description:Always true for a deleted object. */
  deleted?: boolean
  /** Unique identifier for the object. */
  id?: string
  metadata?: { [key: string]: string }
  /**
   * {
   *   "nullable": true,
   *   "description": "Name of the coupon displayed to customers on, for instance invoices, or receipts.\n\nBy default the `id` is shown if `name` is not set."
   * }
   */
  name?: string
  /**
   * {
   *   "nullable": true,
   *   "format": "double",
   *   "description": "Percent that will be taken off the subtotal of any invoices for this customer for the duration of the coupon.\n\nFor example, a coupon with percent_off of 50 will make a %s100 invoice %s50 instead."
   * }
   */
  percent_off?: number
}

export interface CreateShortlinkRequest {
  /**
   * {
   *   "nullable": true,
   *   "description": "The password for the shortlink, if you want to restrict access to it. This can only be set if your subscription allows for it. Otherwise, it will return an error. When you access the link it will be required to enter this password through basic auth. The username will be `{anything}` and the password will be the password you set here."
   * }
   */
  password?: string
  /**
   * {
   *   "default": false,
   *   "description": "If the shortlink should be restricted to the user's organization to view. This only applies to org shortlinks. If you are creating a user shortlink and you are not a member of a team or enterprise and you try to set this to true, it will fail."
   * }
   */
  restrict_to_org?: boolean
  /** format:uri, description:The URL to redirect back to. */
  url: string
}

export interface CreateShortlinkResponse {
  /** The key for this url. This is what you use to update or delete the specific shortlink. */
  key: string
  /** format:uri, description:The shortened url. */
  url: string
}

export type CreatedAtSortMode = 'created_at_ascending' | 'created_at_descending'

export interface CrmData {
  /** nullable:true, description:The industry of the user. */
  cad_industry?: string
  /** nullable:true, description:The user type. */
  cad_user_type?: string
  /** nullable:true, description:The user count of the user. */
  number_of_cad_users?: string
}

export type Currency =
  /** Currency is the list of supported currencies. Always lowercase.

This comes from the Stripe API docs: For more details see <https://support.stripe.com/questions/which-currencies-does-stripe-support>. */
  string

export interface CurveGetControlPoints {
  /** Control points in the curve. */
  control_points: Point3d[]
}

export interface CurveGetEndPoints {
  /** End */
  end: Point3d
  /** Start */
  start: Point3d
}

export interface CurveGetType {
  /** Curve type */
  curve_type: CurveType
}

export interface CurveSetConstraint {} /* Empty object */

export type CurveType =
  /** The type of Curve (embedded within path) */
  'line' | 'arc' | 'nurbs'

export interface Customer {
  /** nullable:true, description:The customer's address. */
  address?: AddressDetails
  /**
   * {
   *   "title": "double",
   *   "default": 0,
   *   "format": "money-usd",
   *   "description": "Current balance, if any, being stored on the customer in the payments service.\n\nIf negative, the customer has credit to apply to their next invoice. If positive, the customer has an amount owed that will be added to their next invoice. The balance does not refer to any unpaid invoices; it solely takes into account amounts that have yet to be successfully applied to any invoice. This balance is only taken into account as invoices are finalized."
   * }
   */
  balance?: number
  /** format:date-time, description:Time at which the object was created. */
  created_at: string
  /**
   * {
   *   "default": "usd",
   *   "description": "Three-letter ISO code for the currency the customer can be charged in for recurring billing purposes."
   * }
   */
  currency?: Currency
  /**
   * {
   *   "default": false,
   *   "description": "When the customer's latest invoice is billed by charging automatically, `delinquent` is `true` if the invoice's latest charge failed.\n\nWhen the customer's latest invoice is billed by sending an invoice, `delinquent` is `true` if the invoice isn't paid by its due date.  If an invoice is marked uncollectible by dunning, `delinquent` doesn't get reset to `false`."
   * }
   */
  delinquent?: boolean
  /** format:email, description:The customer's email address. */
  email?: string
  /** Unique identifier for the object. */
  id?: string
  metadata?: { [key: string]: string }
  /** The customer's full name or business name. */
  name?: string
  /**
   * {
   *   "title": "String",
   *   "default": "",
   *   "format": "phone",
   *   "description": "The customer's phone number."
   * }
   */
  phone?: string
}

export interface CustomerBalance {
  /** title:DateTime, format:date-time, description:The date and time the balance was created. */
  created_at: string
  /** The unique identifier for the balance. */
  id: Uuid
  /** The mapping id of the user or org. */
  map_id: Uuid
  /**
   * {
   *   "nullable": true,
   *   "description": "The enterprise price for the Modeling App subscription, if they are on the enterprise plan."
   * }
   */
  modeling_app_enterprise_price?: SubscriptionTierPrice
  /**
   * {
   *   "format": "uint64",
   *   "minimum": 0,
   *   "description": "The number of monthly API credits remaining in the balance. This is the number of credits remaining in the balance.\n\nBoth the monetary value and the number of credits are returned, but they reflect the same value in the database."
   * }
   */
  monthly_api_credits_remaining: number
  /**
   * {
   *   "title": "double",
   *   "format": "money-usd",
   *   "description": "The monetary value of the monthly API credits remaining in the balance. This gets re-upped every month, but if the credits are not used for a month they do not carry over to the next month.\n\nBoth the monetary value and the number of credits are returned, but they reflect the same value in the database."
   * }
   */
  monthly_api_credits_remaining_monetary_value: number
  /**
   * {
   *   "format": "uint64",
   *   "minimum": 0,
   *   "description": "The number of stable API credits remaining in the balance. These do not get reset or re-upped every month. This is separate from the monthly credits. Credits will first pull from the monthly credits, then the stable credits. Stable just means that they do not get reset every month. A user will have stable credits if a Zoo employee granted them credits.\n\nBoth the monetary value and the number of credits are returned, but they reflect the same value in the database."
   * }
   */
  stable_api_credits_remaining: number
  /**
   * {
   *   "title": "double",
   *   "format": "money-usd",
   *   "description": "The monetary value of stable API credits remaining in the balance. These do not get reset or re-upped every month. This is separate from the monthly credits. Credits will first pull from the monthly credits, then the stable credits. Stable just means that they do not get reset every month. A user will have stable credits if a Zoo employee granted them credits.\n\nBoth the monetary value and the number of credits are returned, but they reflect the same value in the database."
   * }
   */
  stable_api_credits_remaining_monetary_value: number
  /** nullable:true, description:Details about the subscription. */
  subscription_details?: ZooProductSubscriptions
  /** nullable:true, description:The subscription ID for the user. */
  subscription_id?: string
  /**
   * {
   *   "nullable": true,
   *   "title": "double",
   *   "format": "money-usd",
   *   "description": "This includes any outstanding, draft, or open invoices and any pending invoice items. This does not include any credits the customer has on their account. This amount is only returned if requested from the api."
   * }
   */
  total_due?: number
  /** title:DateTime, format:date-time, description:The date and time the balance was last updated. */
  updated_at: string
}

export type CutStrategy = 'basic' | 'csg' | 'automatic'

export type CutType = 'fillet' | 'chamfer'

export interface DefaultCameraCenterToScene {} /* Empty object */

export interface DefaultCameraCenterToSelection {} /* Empty object */

export interface DefaultCameraFocusOn {} /* Empty object */

export interface DefaultCameraGetSettings {
  /** Camera settings */
  settings: CameraSettings
}

export interface DefaultCameraGetView {
  /** Camera view state */
  view: CameraViewState
}

export interface DefaultCameraLookAt {} /* Empty object */

export interface DefaultCameraPerspectiveSettings {} /* Empty object */

export interface DefaultCameraSetOrthographic {} /* Empty object */

export interface DefaultCameraSetPerspective {} /* Empty object */

export interface DefaultCameraSetView {} /* Empty object */

export interface DefaultCameraZoom {
  /** Camera settings */
  settings: CameraSettings
}

export interface Density {
  /** format:double, description:The density. */
  density: number
  /** The output unit for the density. */
  output_unit: UnitDensity
}

export interface DerEncodedKeyPair {
  /** title:String, format:byte, description:The request signing private key (pem file). */
  private_key: string
  /**
   * {
   *   "title": "String",
   *   "format": "byte",
   *   "description": "The request signing public certificate (pem file)."
   * }
   */
  public_cert: string
}

export interface DeviceAccessTokenRequestForm {
  /** format:uuid, description:The client ID. */
  client_id: string
  /** format:uuid, description:The device code. */
  device_code: string
  /** The grant type. */
  grant_type: OAuth2GrantType
}

export type DeviceAccessTokenUuid =
  /** An auth token. A uuid with a prefix of dev- */
  string

export interface DeviceAuthConfirmParams {
  /** The user code. */
  user_code: string
}

export interface DeviceAuthRequestForm {
  /** format:uuid, description:The client ID. */
  client_id: string
}

export type Direction = 'positive' | 'negative'

export interface DisableDryRun {} /* Empty object */

export interface Discount {
  /** The coupon that applied to create this discount. */
  coupon: Coupon
}

export interface DiscountCode {
  /** The code for the discount. */
  code: string
  /** nullable:true, format:date-time, description:The date the discount code expires. */
  expires_at?: string
  /** format:uint32, minimum:0, description:The percent off for the discount. */
  percent_off: number
}

export type DistanceType =
  | { type: 'euclidean' }
  | {
      /** Global axis */
      axis: GlobalAxis
      type: 'on_axis'
    }

export type DxfStorage = 'ascii' | 'binary'

export interface EdgeInfo {
  /** format:uuid, description:The UUID of the id. */
  edge_id: string
  /**
   * {
   *   "format": "uuid"
   * }
   */
  faces: string[]
}

export interface EdgeLinesVisible {} /* Empty object */

export interface EmailAuthenticationForm {
  /**
   * {
   *   "nullable": true,
   *   "format": "uri",
   *   "description": "The URL to redirect back to after we have authenticated."
   * }
   */
  callback_url?: string
  /** format:email, description:The user's email. */
  email: string
}

export interface EnableDryRun {} /* Empty object */

export interface EnableSketchMode {} /* Empty object */

export interface EngineUtilEvaluatePath {
  /** The evaluated path curve position */
  pos: Point3d
}

export type EnterpriseSubscriptionTierPrice =
  | {
      /** The interval the price is charged. */
      interval: PlanInterval
      /** title:double, format:money-usd, description:The price. */
      price: number
      type: 'flat'
    }
  | {
      /** The interval the price is charged. */
      interval: PlanInterval
      /** title:double, format:money-usd, description:The price. */
      price: number
      type: 'per_user'
    }

export interface EntityCircularPattern {
  /** The Face, edge, and entity ids of the patterned entities. */
  entity_face_edge_ids?: FaceEdgeInfo[]
}

export interface EntityClone {
  /** The Face and Edge Ids of the cloned entity. */
  face_edge_ids?: FaceEdgeInfo[]
}

export interface EntityFade {} /* Empty object */

export interface EntityGetAllChildUuids {
  /**
   * {
   *   "format": "uuid"
   * }
   */
  entity_ids: string[]
}

export interface EntityGetChildUuid {
  /** format:uuid, description:The UUID of the child entity. */
  entity_id: string
}

export interface EntityGetDistance {
  /** The maximum distance between the input entities. */
  max_distance: LengthUnit
  /** The minimum distance between the input entities. */
  min_distance: LengthUnit
}

export interface EntityGetNumChildren {
  /** format:uint32, minimum:0, description:The number of children the entity has. */
  num: number
}

export interface EntityGetParentId {
  /** format:uuid, description:The UUID of the parent entity. */
  entity_id: string
}

export interface EntityGetSketchPaths {
  /**
   * {
   *   "format": "uuid"
   * }
   */
  entity_ids: string[]
}

export interface EntityLinearPattern {
  /** The Face, edge, and entity ids of the patterned entities. */
  entity_face_edge_ids?: FaceEdgeInfo[]
}

export interface EntityLinearPatternTransform {
  /** The Face, edge, and entity ids of the patterned entities. */
  entity_face_edge_ids?: FaceEdgeInfo[]
}

export interface EntityMakeHelix {} /* Empty object */

export interface EntityMakeHelixFromEdge {} /* Empty object */

export interface EntityMakeHelixFromParams {} /* Empty object */

export interface EntityMirror {
  /** The Face, edge, and entity ids of the patterned entities. */
  entity_face_edge_ids?: FaceEdgeInfo[]
}

export interface EntityMirrorAcrossEdge {
  /** The Face, edge, and entity ids of the patterned entities. */
  entity_face_edge_ids?: FaceEdgeInfo[]
}

export interface EntitySetOpacity {} /* Empty object */

export type EntityType =
  /** The type of entity */
  | 'entity'
  | 'object'
  | 'path'
  | 'curve'
  | 'solid2d'
  | 'solid3d'
  | 'edge'
  | 'face'
  | 'plane'
  | 'vertex'

export interface Error {
  error_code?: string
  message: string
  request_id: string
}

export type ErrorCode =
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
  | 'message_type_not_accepted_for_web_r_t_c'

export type Event = {
  /**
   * {
   *   "nullable": true,
   *   "description": "Attachment URI for where the attachment is stored."
   * }
   */
  attachment_uri?: string
  /** format:date-time, description:Time this event was created. */
  created_at: string
  /** The specific event type from the modeling app. */
  event_type: ModelingAppEventType
  /** nullable:true, format:date-time, description:Time the associated attachment was last compiled. */
  last_compiled_at?: string
  /** nullable:true, description:Project descriptino as given by the user. */
  project_description?: string
  /** Project name as given by the user. */
  project_name: string
  /**
   * {
   *   "format": "uuid",
   *   "description": "The source app for this event, uuid that is unique to the app."
   * }
   */
  source_id: string
  type: 'modeling_app_event'
  /** An anonymous user id generated client-side. */
  user_id: string
}

export interface Export {
  /** The files that were exported. */
  files: ExportFile[]
}

export interface Export2d {
  /** The files that were exported. */
  files: ExportFile[]
}

export interface Export3d {
  /** The files that were exported. */
  files: ExportFile[]
}

export interface ExportFile {
  /** title:String, format:byte, description:The contents of the file, base64 encoded. */
  contents: string
  /** The name of the file. */
  name: string
}

export interface ExtendPath {} /* Empty object */

export interface ExtendedUser {
  /** nullable:true, description:If the user should be blocked and the reason why. */
  block?: BlockReason
  /**
   * {
   *   "default": false,
   *   "description": "If we can train on the user's data. If the user is a member of an organization, the organization's setting will override this."
   * }
   */
  can_train_on_data?: boolean
  /** The user's company. */
  company?: string
  /** title:DateTime, format:date-time, description:The date and time the user was created. */
  created_at: string
  /** default:false, description:If the user is scheduled for deletion */
  deletion_scheduled?: boolean
  /** The user's Discord handle. */
  discord?: string
  /** format:email, description:The email address of the user. */
  email?: string
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The date and time the email address was verified."
   * }
   */
  email_verified?: string
  /** The user's first name. */
  first_name?: string
  /** The user's GitHub handle. */
  github?: string
  /**
   * {
   *   "nullable": true,
   *   "description": "The user's Hubspot ID. This is mostly used for internal mapping."
   * }
   */
  hubspot_contact_id?: string
  /** The unique identifier for the user. */
  id: Uuid
  /** title:String, format:uri, description:The image avatar for the user. This is a URL. */
  image: string
  /** default:false, description:If the user has finished onboarding. */
  is_onboarded?: boolean
  /** default:false, description:If the user is tied to a service account. */
  is_service_account?: boolean
  /** The user's last name. */
  last_name?: string
  /** The name of the user. This is auto populated at first from the authentication provider (if there was a name). It can be updated by the user by updating their `first_name` and `last_name` fields. */
  name?: string
  /**
   * {
   *   "title": "String",
   *   "default": "",
   *   "format": "phone",
   *   "description": "The user's phone number."
   * }
   */
  phone?: string
  /**
   * {
   *   "nullable": true,
   *   "description": "The user's Stripe ID. This is mostly used for internal mapping."
   * }
   */
  stripe_id?: string
  /** title:DateTime, format:date-time, description:The date and time the user was last updated. */
  updated_at: string
}

export interface ExtendedUserResultsPage {
  /** list of items on this page of results */
  items: ExtendedUser[]
  /**
   * {
   *   "nullable": true,
   *   "description": "token used to fetch the next page of results (if any)"
   * }
   */
  next_page?: string
}

export interface Extrude {} /* Empty object */

export type ExtrudeMethod = 'new' | 'merge'

export interface ExtrudedFaceInfo {
  /**
   * {
   *   "nullable": true,
   *   "format": "uuid",
   *   "description": "The face made from the original 2D shape being extruded. If the solid is extruded from a shape which already has an ID (e.g. extruding something which was sketched on a face), this doesn't need to be sent."
   * }
   */
  bottom?: string
  /** Any intermediate sides between the top and bottom. */
  sides: SideFace[]
  /**
   * {
   *   "format": "uuid",
   *   "description": "Top face of the extrusion (parallel and further away from the original 2D shape being extruded)."
   * }
   */
  top: string
}

export type ExtrusionFaceCapType = 'none' | 'top' | 'bottom' | 'both'

export interface ExtrusionFaceInfo {
  /** Whether or not this extrusion face is a top/bottom cap face or not. Note that top/bottom cap faces will not have associated curve IDs. */
  cap: ExtrusionFaceCapType
  /** nullable:true, format:uuid, description:Path component (curve) UUID. */
  curve_id?: string
  /** nullable:true, format:uuid, description:Face uuid. */
  face_id?: string
}

export interface FaceEdgeInfo {
  /**
   * {
   *   "format": "uuid"
   * }
   */
  edges: string[]
  /**
   * {
   *   "format": "uuid"
   * }
   */
  faces: string[]
  /** format:uuid, description:The UUID of the object. */
  object_id: string
}

export interface FaceGetCenter {
  /** The 3D position on the surface center of mass */
  pos: Point3d
}

export interface FaceGetGradient {
  /** dFdu */
  df_du: Point3d
  /** dFdv */
  df_dv: Point3d
  /** Normal (||dFdu x dFdv||) */
  normal: Point3d
}

export interface FaceGetPosition {
  /** The 3D position on the surface that was evaluated */
  pos: Point3d
}

export interface FaceIsPlanar {
  /** nullable:true, description:plane's origin */
  origin?: Point3d
  /** nullable:true, description:plane's local x-axis */
  x_axis?: Point3d
  /** nullable:true, description:plane's local y-axis */
  y_axis?: Point3d
  /** nullable:true, description:plane's local z-axis (normal) */
  z_axis?: Point3d
}

export interface FailureWebSocketResponse {
  /** The errors that occurred. */
  errors: ApiError[]
  /**
   * {
   *   "nullable": true,
   *   "format": "uuid",
   *   "description": "Which request this is a response to. If the request was a modeling command, this is the modeling command ID. If no request ID was sent, this will be null."
   * }
   */
  request_id?: string
  /** Always false */
  success: boolean
}

export type FbxStorage = 'ascii' | 'binary'

export interface FileCenterOfMass {
  /** nullable:true, description:The resulting center of mass. */
  center_of_mass?: Point3d
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** The output unit for the center of mass. */
  output_unit: UnitLength
  /** The source format of the file. */
  src_format: FileImportFormat
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export interface FileConversion {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** The output format of the file conversion. */
  output_format: FileExportFormat
  /** nullable:true, description:The output format options of the file conversion. */
  output_format_options?: OutputFormat3d
  outputs?: {
    [key: string]: /**
     * {
     *   "title": "String",
     *   "format": "byte"
     * }
     */
    string
  }
  /** The source format of the file conversion. */
  src_format: FileImportFormat
  /** nullable:true, description:The source format options of the file conversion. */
  src_format_options?: InputFormat3d
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export interface FileDensity {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, format:double, description:The resulting density. */
  density?: number
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** default:0, format:double, description:The material mass as denoted by the user. */
  material_mass?: number
  /** The material mass unit. */
  material_mass_unit: UnitMass
  /** The output unit for the density. */
  output_unit: UnitDensity
  /** The source format of the file. */
  src_format: FileImportFormat
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export type FileExportFormat =
  | 'fbx'
  | 'glb'
  | 'gltf'
  | 'obj'
  | 'ply'
  | 'step'
  | 'stl'

export type FileImportFormat =
  | 'fbx'
  | 'gltf'
  | 'obj'
  | 'ply'
  | 'sldprt'
  | 'step'
  | 'stl'

export interface FileMass {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** nullable:true, format:double, description:The resulting mass. */
  mass?: number
  /** default:0, format:double, description:The material density as denoted by the user. */
  material_density?: number
  /** The material density unit. */
  material_density_unit: UnitDensity
  /** The output unit for the mass. */
  output_unit: UnitMass
  /** The source format of the file. */
  src_format: FileImportFormat
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export interface FileSurfaceArea {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** The output unit for the surface area. */
  output_unit: UnitArea
  /** The source format of the file. */
  src_format: FileImportFormat
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** nullable:true, format:double, description:The resulting surface area. */
  surface_area?: number
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export interface FileVolume {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** The output unit for the volume. */
  output_unit: UnitVolume
  /** The source format of the file. */
  src_format: FileImportFormat
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
  /** nullable:true, format:double, description:The resulting volume. */
  volume?: number
}

export interface GetEntityType {
  /** The type of the entity. */
  entity_type: EntityType
}

export interface GetNumObjects {
  /** format:uint32, minimum:0, description:The number of objects in the scene. */
  num_objects: number
}

export interface GetSketchModePlane {
  /** The origin. */
  origin: Point3d
  /** The x axis. */
  x_axis: Point3d
  /** The y axis. */
  y_axis: Point3d
  /** The z axis (normal). */
  z_axis: Point3d
}

export type GlobalAxis = 'x' | 'y' | 'z'

export type GltfPresentation = 'compact' | 'pretty'

export type GltfStorage = 'binary' | 'standard' | 'embedded'

export interface HandleMouseDragEnd {} /* Empty object */

export interface HandleMouseDragMove {} /* Empty object */

export interface HandleMouseDragStart {} /* Empty object */

export interface HighlightSetEntities {} /* Empty object */

export interface HighlightSetEntity {
  /** nullable:true, format:uuid, description:The UUID of the entity that was highlighted. */
  entity_id?: string
  /**
   * {
   *   "nullable": true,
   *   "format": "uint32",
   *   "minimum": 0,
   *   "description": "If the client sent a sequence ID with its request, the backend sends it back."
   * }
   */
  sequence?: number
}

export interface IceServer {
  /** nullable:true, description:Credentials for a given TURN server. */
  credential?: string
  urls: string[]
  /** nullable:true, description:Username for a given TURN server. */
  username?: string
}

export type IdpMetadataSource =
  | {
      type: 'url'
      /**
       * {
       *   "title": "String",
       *   "format": "uri",
       *   "description": "The URL of the identity provider metadata descriptor."
       * }
       */
      url: string
    }
  | {
      /**
       * {
       *   "title": "String",
       *   "format": "byte",
       *   "description": "The base64 encoded XML document containing the identity provider metadata descriptor."
       * }
       */
      data: string
      type: 'base64_encoded_xml'
    }

export type ImageFormat = 'png' | 'jpeg'

export interface ImportFile {
  /**
   * {
   *   "format": "uint8",
   *   "minimum": 0
   * }
   */
  data: number[]
  /** The file's full path, including file extension. */
  path: string
}

export interface ImportFiles {
  /** format:uuid, description:ID of the imported 3D models within the scene. */
  object_id: string
}

export interface ImportedGeometry {
  /** format:uuid, description:ID of the imported 3D models within the scene. */
  id: string
  value: string[]
}

export type InputFormat3d =
  | { type: 'fbx' }
  | { type: 'gltf' }
  | {
      /** Co-ordinate system of input data.

Defaults to the [KittyCAD co-ordinate system].

[KittyCAD co-ordinate system]: ../coord/constant.KITTYCAD.html */
      coords: System
      type: 'obj'
      /** The units of the input data.

This is very important for correct scaling and when calculating physics properties like mass, etc.

Defaults to millimeters. */
      units: UnitLength
    }
  | {
      /** Co-ordinate system of input data.

Defaults to the [KittyCAD co-ordinate system].

[KittyCAD co-ordinate system]: ../coord/constant.KITTYCAD.html */
      coords: System
      type: 'ply'
      /** The units of the input data.

This is very important for correct scaling and when calculating physics properties like mass, etc.

Defaults to millimeters. */
      units: UnitLength
    }
  | {
      /**
       * {
       *   "default": false,
       *   "description": "Splits all closed faces into two open faces.\n\nDefaults to `false` but is implicitly `true` when importing into the engine."
       * }
       */
      split_closed_faces?: boolean
      type: 'sldprt'
    }
  | {
      /**
       * {
       *   "default": false,
       *   "description": "Splits all closed faces into two open faces.\n\nDefaults to `false` but is implicitly `true` when importing into the engine."
       * }
       */
      split_closed_faces?: boolean
      type: 'step'
    }
  | {
      /** Co-ordinate system of input data.

Defaults to the [KittyCAD co-ordinate system].

[KittyCAD co-ordinate system]: ../coord/constant.KITTYCAD.html */
      coords: System
      type: 'stl'
      /** The units of the input data.

This is very important for correct scaling and when calculating physics properties like mass, etc.

Defaults to millimeters. */
      units: UnitLength
    }

export interface InquiryForm {
  /** nullable:true, description:The company name. */
  company?: string
  /** format:email, description:The email address of the user. */
  email: string
  /** The first name of the user. */
  first_name: string
  /** nullable:true, description:The industry of the user. */
  industry?: string
  /** The type of inquiry. */
  inquiry_type: InquiryType
  /** The last name of the user. */
  last_name: string
  /** The message content. */
  message: string
  /** nullable:true, description:The phone number of the user. */
  phone?: string
}

export type InquiryType =
  | 'general_inquiry'
  | 'sales_question'
  | 'developer_inquiry'
  | 'partnership_opportunity'
  | 'other_sales_inquiry'
  | 'technical_support'
  | 'account_management'
  | 'other_support_inquiry'

export interface Invoice {
  /**
   * {
   *   "title": "double",
   *   "default": 0,
   *   "format": "money-usd",
   *   "description": "Final amount due at this time for this invoice.\n\nIf the invoice's total is smaller than the minimum charge amount, for example, or if there is account credit that can be applied to the invoice, the `amount_due` may be 0. If there is a positive `starting_balance` for the invoice (the customer owes money), the `amount_due` will also take that into account. The charge that gets generated for the invoice will be for the amount specified in `amount_due`."
   * }
   */
  amount_due?: number
  /**
   * {
   *   "title": "double",
   *   "default": 0,
   *   "format": "money-usd",
   *   "description": "The amount, in USD, that was paid."
   * }
   */
  amount_paid?: number
  /**
   * {
   *   "title": "double",
   *   "default": 0,
   *   "format": "money-usd",
   *   "description": "The amount remaining, in USD, that is due."
   * }
   */
  amount_remaining?: number
  /**
   * {
   *   "default": 0,
   *   "format": "uint64",
   *   "minimum": 0,
   *   "description": "Number of payment attempts made for this invoice, from the perspective of the payment retry schedule.\n\nAny payment attempt counts as the first attempt, and subsequently only automatic retries increment the attempt count. In other words, manual payment attempts after the first attempt do not affect the retry schedule."
   * }
   */
  attempt_count?: number
  /**
   * {
   *   "default": false,
   *   "description": "Whether an attempt has been made to pay the invoice.\n\nAn invoice is not attempted until 1 hour after the `invoice.created` webhook, for example, so you might not want to display that invoice as unpaid to your users."
   * }
   */
  attempted?: boolean
  /** format:date-time, description:Time at which the object was created. */
  created_at: string
  /**
   * {
   *   "default": "usd",
   *   "description": "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase."
   * }
   */
  currency?: Currency
  /**
   * {
   *   "format": "email",
   *   "description": "The email address for the customer. Until the invoice is finalized, this field will equal customer.email. Once the invoice is finalized, this field will no longer be updated."
   * }
   */
  customer_email?: string
  /** Customer ID. The unique identifier for the customer this invoice belongs to. This is the customer ID in the payments service, not our database customer ID. */
  customer_id?: string
  /** Default payment method. */
  default_payment_method?: string
  /** Description of the invoice. */
  description?: string
  /** The discounts applied to the invoice. This is an array of discount objects. */
  discounts?: Discount[]
  /** Unique identifier for the object. */
  id?: string
  /** The individual line items that make up the invoice.

`lines` is sorted as follows: invoice items in reverse chronological order, followed by the subscription, if any. */
  lines?: InvoiceLineItem[]
  metadata?: { [key: string]: string }
  /** A unique, identifying string that appears on emails sent to the customer for this invoice. */
  number?: string
  /**
   * {
   *   "default": false,
   *   "description": "Whether payment was successfully collected for this invoice.\n\nAn invoice can be paid (most commonly) with a charge or with credit from the customer's account balance."
   * }
   */
  paid?: boolean
  /** nullable:true, format:uri, description:The link to download the PDF for the invoice. */
  pdf?: string
  /** This is the transaction number that appears on email receipts sent for this invoice. */
  receipt_number?: string
  /** Extra information about an invoice for the customer's credit card statement. */
  statement_descriptor?: string
  /**
   * {
   *   "nullable": true,
   *   "description": "The status of the invoice, one of `draft`, `open`, `paid`, `uncollectible`, or `void`."
   * }
   */
  status?: InvoiceStatus
  /**
   * {
   *   "title": "double",
   *   "default": 0,
   *   "format": "money-usd",
   *   "description": "Total of all subscriptions, invoice items, and prorations on the invoice before any invoice level discount or tax is applied.\n\nItem discounts are already incorporated."
   * }
   */
  subtotal?: number
  /**
   * {
   *   "title": "double",
   *   "default": 0,
   *   "format": "money-usd",
   *   "description": "The amount of tax on this invoice.\n\nThis is the sum of all the tax amounts on this invoice."
   * }
   */
  tax?: number
  /**
   * {
   *   "title": "double",
   *   "default": 0,
   *   "format": "money-usd",
   *   "description": "Total after discounts and taxes."
   * }
   */
  total?: number
  /**
   * {
   *   "nullable": true,
   *   "format": "uri",
   *   "description": "The URL for the hosted invoice page, which allows customers to view and pay an invoice."
   * }
   */
  url?: string
}

export interface InvoiceLineItem {
  /**
   * {
   *   "title": "double",
   *   "default": 0,
   *   "format": "money-usd",
   *   "description": "The amount, in USD."
   * }
   */
  amount?: number
  /**
   * {
   *   "default": "usd",
   *   "description": "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase."
   * }
   */
  currency?: Currency
  /** The description. */
  description?: string
  /** Unique identifier for the object. */
  id?: string
  /** The ID of the invoice item associated with this line item if any. */
  invoice_item?: string
  metadata?: { [key: string]: string }
}

export type InvoiceStatus = 'draft' | 'open' | 'paid' | 'uncollectible' | 'void'

export interface IpAddrInfo {
  /** nullable:true, format:int64, description:Autonomous System Number. */
  asn?: number
  /** nullable:true, description:City name. */
  city?: string
  /** nullable:true, description:Continent code (e.g., \EU\ for Europe). */
  continent_code?: string
  /** nullable:true, description:Country name. */
  country?: string
  /**
   * {
   *   "nullable": true,
   *   "description": "Two-letter country code (e.g., \"NL\" for Netherlands)."
   * }
   */
  country_code?: CountryCode
  /**
   * {
   *   "nullable": true,
   *   "description": "Three-letter country code (e.g., \"NLD\" for Netherlands)."
   * }
   */
  country_code3?: string
  /**
   * {
   *   "title": "String",
   *   "default": "",
   *   "format": "ip",
   *   "description": "IP address of the user."
   * }
   */
  ip?: string
  /**
   * {
   *   "nullable": true,
   *   "description": "Flag indicating whether the country is in the European Union."
   * }
   */
  is_in_european_union?: boolean
  /** nullable:true, format:double, description:Geographic latitude. */
  latitude?: number
  /** nullable:true, format:double, description:Geographic longitude. */
  longitude?: number
  /** nullable:true, format:int64, description:Time offset in seconds from UTC. */
  offset?: number
  /** nullable:true, description:Organization name (e.g., \RIPE NCC\). */
  organization?: string
  /** nullable:true, description:Postal code. */
  postal_code?: string
  /** nullable:true, description:Name of the region (e.g., \North Holland\). */
  region?: string
  /** nullable:true, description:Region code (e.g., \NH\ for North Holland). */
  region_code?: string
  /** nullable:true, description:Timezone (e.g., \Europe/Amsterdam\). */
  timezone?: string
}

export interface KclCodeCompletionParams {
  /** default:, description:The language of the code. */
  language?: string
  /**
   * {
   *   "nullable": true,
   *   "format": "uint8",
   *   "minimum": 0,
   *   "description": "The next indent of the code."
   * }
   */
  next_indent?: number
  /**
   * {
   *   "nullable": true,
   *   "format": "uint32",
   *   "minimum": 0,
   *   "description": "The prompt tokens for the completions."
   * }
   */
  prompt_tokens?: number
  /**
   * {
   *   "nullable": true,
   *   "format": "uint32",
   *   "minimum": 0,
   *   "description": "The suffix tokens for the completions."
   * }
   */
  suffix_tokens?: number
  /** default:false, description:If we should trim by indentation. */
  trim_by_indentation?: boolean
}

export interface KclCodeCompletionRequest {
  /** default:{language:, trim_by_indentation:false}, description:Extra parameters for the completions. */
  extra?: KclCodeCompletionParams
  /**
   * {
   *   "nullable": true,
   *   "format": "uint16",
   *   "minimum": 0,
   *   "description": "The maximum number of tokens that can be generated for the completions. The total length of input tokens and generated tokens is limited by the model’s context length."
   * }
   */
  max_tokens?: number
  /**
   * {
   *   "nullable": true,
   *   "format": "uint8",
   *   "minimum": 0,
   *   "description": "How many completion choices to generate for each input message."
   * }
   */
  n?: number
  /**
   * {
   *   "nullable": true,
   *   "description": "For GitHub copilot this is the `{org}/{repo}`. This does not do anything yet. But we wanted the same API as GitHub Copilot. It might be used in the future."
   * }
   */
  nwo?: string
  /** default:, description:The prompt for the model. */
  prompt?: string
  stop?: string[]
  /**
   * {
   *   "default": false,
   *   "description": "If set, partial message deltas will be sent, like in ChatGPT or OpenAPI. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message."
   * }
   */
  stream?: boolean
  /** default:, description:The suffix for the model. */
  suffix?: string
  /** nullable:true, format:float, description:The temperature for the model. */
  temperature?: number
  /** nullable:true, format:float, description:The top p for the model. */
  top_p?: number
}

export interface KclCodeCompletionResponse {
  completions: string[]
}

export interface KclModel {
  /** The KCL code. */
  code: string
}

export type LengthUnit = number

export interface Loft {
  /** format:uuid, description:The UUID of the newly created solid loft. */
  solid_id: string
}

export interface MakeAxesGizmo {} /* Empty object */

export interface MakeOffsetPath {
  /**
   * {
   *   "format": "uuid"
   * }
   */
  entity_ids: string[]
}

export interface MakePlane {} /* Empty object */

export interface Mass {
  /** format:double, description:The mass. */
  mass: number
  /** The output unit for the mass. */
  output_unit: UnitMass
}

export type Method =
  | 'OPTIONS'
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'HEAD'
  | 'TRACE'
  | 'CONNECT'
  | 'PATCH'
  | 'EXTENSION'

export type MlCopilotClientMessage =
  | { headers: { [key: string]: string }; type: 'headers' }
  | {
      /** The content of the user's message. */
      content: string
      current_files?: {
        [key: string]: /**
         * {
         *   "format": "uint8",
         *   "minimum": 0
         * }
         */
        number[]
      }
      /** The user can force specific tools to be used for this message. */
      forced_tools?: MlCopilotTool[]
      /**
       * {
       *   "nullable": true,
       *   "description": "The project name, if any. This can be used to associate the message with a specific project."
       * }
       */
      project_name?: string
      /** The source ranges the user suggested to change. If empty, the content (prompt) will be used and is required. */
      source_ranges?: SourceRangePrompt[]
      type: 'user'
    }
  | {
      /** The content of the system message. */
      command: MlCopilotSystemCommand
      type: 'system'
    }

export type MlCopilotServerMessage =
  | {
      conversation_id: {
        /** The unique identifier for the conversation. */
        conversation_id: string
      }
    }
  | {
      delta: {
        /** The delta text, which is a part of the response that is being streamed. */
        delta: string
      }
    }
  | {
      tool_output: {
        /** The result of the tool call. */
        result: MlToolResult
      }
    }
  | {
      error: {
        /** The error message. */
        detail: string
      }
    }
  | {
      info: {
        /** The informational text. */
        text: string
      }
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/ReasoningMessage"
       * }
       */
      reasoning: ReasoningMessage
    }
  | {
      end_of_stream: {
        /**
         * {
         *   "nullable": true,
         *   "description": "The whole response text, which is the final output of the AI. This is only relevant if in copilot mode, where the AI is expected to return the whole response at once."
         * }
         */
        whole_response?: string
      }
    }

export type MlCopilotSystemCommand = 'new' | 'bye'

export type MlCopilotTool =
  | 'edit_kcl_code'
  | 'text_to_cad'
  | 'mechanical_knowledge_base'
  | 'explain_kcl_file'
  | 'web_search'

export type MlFeedback = 'thumbs_up' | 'thumbs_down' | 'accepted' | 'rejected'

export interface MlPrompt {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "When the prompt was completed."
   * }
   */
  completed_at?: string
  /**
   * {
   *   "nullable": true,
   *   "description": "The id for the conversation related to this prompt."
   * }
   */
  conversation_id?: Uuid
  /** title:DateTime, format:date-time, description:The date and time the ML prompt was created. */
  created_at: string
  /** nullable:true, description:The error message if the prompt failed. */
  error?: string
  /** nullable:true, description:Feedback from the user, if any. */
  feedback?: MlFeedback
  /** The unique identifier for the ML prompt. */
  id: Uuid
  /** nullable:true, description:The KCL version being used. */
  kcl_version?: string
  /** nullable:true, description:The metadata for the prompt. */
  metadata?: MlPromptMetadata
  /** The version of the model. */
  model_version: string
  /**
   * {
   *   "nullable": true,
   *   "description": "The output file. In the case of TextToCad this is a link to a file in a GCP bucket."
   * }
   */
  output_file?: string
  /**
   * {
   *   "nullable": true,
   *   "description": "The name of the project, if any. This allows us to group prompts together that come from the same project and user."
   * }
   */
  project_name?: string
  /** The prompt. */
  prompt: string
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "When the prompt was started."
   * }
   */
  started_at?: string
  /** The status of the prompt. */
  status: ApiCallStatus
  /** The type of prompt. */
  type: MlPromptType
  /** title:DateTime, format:date-time, description:The date and time the ML prompt was last updated. */
  updated_at: string
  /** The user ID of the user who created the ML prompt. */
  user_id: Uuid
}

export interface MlPromptMetadata {
  /** nullable:true, description:Code for the model. */
  code?: string
  /** nullable:true, description:The original source code for the model. */
  original_source_code?: string
  /** The source ranges the user suggested to change. */
  source_ranges?: SourceRangePrompt[]
}

export interface MlPromptResultsPage {
  /** list of items on this page of results */
  items: MlPrompt[]
  /**
   * {
   *   "nullable": true,
   *   "description": "token used to fetch the next page of results (if any)"
   * }
   */
  next_page?: string
}

export type MlPromptType =
  | 'text_to_cad'
  | 'text_to_kcl'
  | 'text_to_kcl_iteration'
  | 'text_to_kcl_multi_file_iteration'

export type MlToolResult =
  | {
      /**
       * {
       *   "nullable": true,
       *   "description": "Any error that occurred during the tool execution."
       * }
       */
      error?: string
      outputs?: { [key: string]: string }
      /** nullable:true, description:The name of the project, if any. */
      project_name?: string
      /** title:int32, format:int32, description:The status code of the tool execution. */
      status_code: number
      type: 'text_to_cad'
    }
  | {
      /**
       * {
       *   "nullable": true,
       *   "description": "Any error that occurred during the tool execution."
       * }
       */
      error?: string
      outputs?: { [key: string]: string }
      /** nullable:true, description:The name of the project, if any. */
      project_name?: string
      /** title:int32, format:int32, description:The status code of the tool execution. */
      status_code: number
      type: 'edit_kcl_code'
    }
  | {
      /** The response from the mechanical knowledge base. */
      response: string
      type: 'mechanical_knowledge_base'
    }
  | {
      /** The response from explaining the kcl file. */
      response: string
      type: 'explain_kcl_file'
    }

export type ModelingAppEventType = 'successful_compile_before_close'

export type ModelingAppIndividualSubscriptionTier = 'free' | 'plus' | 'pro'

export type ModelingAppOrganizationSubscriptionTier = 'team' | 'enterprise'

export type ModelingAppShareLinks =
  | 'public'
  | 'password_protected'
  | 'organization_only'

export interface ModelingAppSubscriptionTier {
  /**
   * {
   *   "nullable": true,
   *   "format": "double",
   *   "description": "Annual discount. The percentage off the monthly price if the user pays annually."
   * }
   */
  annual_discount?: number
  /** A description of the tier. */
  description: string
  /** The Zoo API endpoints that are included when through an approved zoo tool. */
  endpoints_included?: ApiEndpoint[]
  /** minItems:0, maxItems:15, description:Features that are included in the subscription. */
  features?: SubscriptionTierFeature[]
  /**
   * {
   *   "default": 0,
   *   "format": "uint64",
   *   "minimum": 0,
   *   "description": "The amount of pay-as-you-go API credits the individual or org gets outside the modeling app per month. This re-ups on the 1st of each month. This is equivalent to the monetary value divided by the price of an API credit."
   * }
   */
  monthly_pay_as_you_go_api_credits?: number
  /**
   * {
   *   "title": "double",
   *   "format": "money-usd",
   *   "description": "The monetary value of pay-as-you-go API credits the individual or org gets outside the modeling app per month. This re-ups on the 1st of each month."
   * }
   */
  monthly_pay_as_you_go_api_credits_monetary_value: number
  /** The name of the tier. */
  name: ModelingAppSubscriptionTierName
  /**
   * {
   *   "title": "double",
   *   "default": 0,
   *   "format": "money-usd",
   *   "description": "The price of an API credit (meaning 1 credit = 1 minute of API usage)."
   * }
   */
  pay_as_you_go_api_credit_price?: number
  /** The price of the tier per month. If this is for an individual, this is the price they pay. If this is for an organization, this is the price the organization pays per member in the org. This is in USD. */
  price: SubscriptionTierPrice
  /** The options for sharable links through the modeling app. */
  share_links?: ModelingAppShareLinks[]
  /** The support tier the subscription provides. */
  support_tier: SupportTier
  /** The behavior of the users data (can it be used for training, etc). */
  training_data_behavior: SubscriptionTrainingDataBehavior
  /** If the tier is offered for an individual or an org. */
  type: SubscriptionTierType
  /** The Zoo tools that you can call unlimited times with this tier. */
  zoo_tools_included?: ZooTool[]
}

export type ModelingAppSubscriptionTierName =
  | 'free'
  | 'plus'
  | 'pro'
  | 'team'
  | 'enterprise'

export type ModelingCmd =
  | {
      /** The path in json form (the serialized result of the kcl Sketch/Path object */
      path_json: string
      /**
       * {
       *   "format": "double",
       *   "description": "The evaluation parameter (path curve parameter in the normalized domain [0, 1])"
       * }
       */
      t: number
      type: 'engine_util_evaluate_path'
    }
  | { type: 'start_path' }
  | {
      /** The ID of the command which created the path. */
      path: ModelingCmdId
      /** Where the path's pen should be. */
      to: Point3d
      type: 'move_path_pen'
    }
  | {
      /** The ID of the command which created the path. */
      path: ModelingCmdId
      /** Segment to append to the path. This segment will implicitly begin at the current "pen" location. */
      segment: PathSegment
      type: 'extend_path'
    }
  | {
      /** How far off the plane to extrude */
      distance: LengthUnit
      /**
       * {
       *   "default": "merge",
       *   "description": "Should the extrusion create a new object or be part of the existing object."
       * }
       */
      extrude_method?: ExtrudeMethod
      /**
       * {
       *   "nullable": true,
       *   "description": "Which IDs should the new faces have? If this isn't given, the engine will generate IDs."
       * }
       */
      faces?: ExtrudedFaceInfo
      /**
       * {
       *   "default": "None",
       *   "description": "Should the extrusion also extrude in the opposite direction? If so, this specifies its distance."
       * }
       */
      opposite?: OppositeForLengthUnit
      /** Which sketch to extrude. Must be a closed 2D solid. */
      target: ModelingCmdId
      type: 'extrude'
    }
  | {
      /**
       * {
       *   "default": {
       *     "unit": "degrees",
       *     "value": 15
       *   },
       *   "description": "Angle step interval (converted to whole number degrees and bounded between 4° and 90°)"
       * }
       */
      angle_step_size?: Angle
      /** default:{x:0, y:0}, description:Center to twist about (relative to 2D sketch) */
      center_2d?: Point2d
      /** How far off the plane to extrude */
      distance: LengthUnit
      /**
       * {
       *   "nullable": true,
       *   "description": "Which IDs should the new faces have? If this isn't given, the engine will generate IDs."
       * }
       */
      faces?: ExtrudedFaceInfo
      /** Which sketch to extrude. Must be a closed 2D solid. */
      target: ModelingCmdId
      /** The twisted surface loft tolerance */
      tolerance: LengthUnit
      /** Total rotation of the section */
      total_rotation_angle: Angle
      type: 'twist_extrude'
    }
  | {
      /** default:sketch_plane, description:What is this sweep relative to? */
      relative_to?: RelativeTo
      /** If true, the sweep will be broken up into sub-sweeps (extrusions, revolves, sweeps) based on the trajectory path components. */
      sectional: boolean
      /** Which sketch to sweep. Must be a closed 2D solid. */
      target: ModelingCmdId
      /** The maximum acceptable surface gap computed between the revolution surface joints. Must be positive (i.e. greater than zero). */
      tolerance: LengthUnit
      /** Path along which to sweep. */
      trajectory: ModelingCmdId
      type: 'sweep'
    }
  | {
      /** The signed angle of revolution (in degrees, must be <= 360 in either direction) */
      angle: Angle
      /** The axis of the extrusion (taken from the origin) */
      axis: Point3d
      /** If true, the axis is interpreted within the 2D space of the solid 2D's plane */
      axis_is_2d: boolean
      /**
       * {
       *   "default": "None",
       *   "description": "Should the revolution also revolve in the opposite direction along the given axis? If so, this specifies its angle."
       * }
       */
      opposite?: OppositeForAngle
      /** The origin of the extrusion axis */
      origin: Point3d
      /** Which sketch to revolve. Must be a closed 2D solid. */
      target: ModelingCmdId
      /** The maximum acceptable surface gap computed between the revolution surface joints. Must be positive (i.e. greater than zero). */
      tolerance: LengthUnit
      type: 'revolve'
    }
  | {
      /**
       * {
       *   "format": "uuid"
       * }
       */
      face_ids: string[]
      /**
       * {
       *   "default": false,
       *   "description": "If true, the Solid3D is made hollow instead of removing the selected faces"
       * }
       */
      hollow?: boolean
      /** format:uuid, description:Which Solid3D is being shelled. */
      object_id: string
      /** How thick the shell should be. Smaller values mean a thinner shell. */
      shell_thickness: LengthUnit
      type: 'solid3d_shell_face'
    }
  | {
      /** The signed angle of revolution (in degrees, must be <= 360 in either direction) */
      angle: Angle
      /**
       * {
       *   "format": "uuid",
       *   "description": "The edge to use as the axis of revolution, must be linear and lie in the plane of the solid"
       * }
       */
      edge_id: string
      /**
       * {
       *   "default": "None",
       *   "description": "Should the revolution also revolve in the opposite direction along the given axis? If so, this specifies its angle."
       * }
       */
      opposite?: OppositeForAngle
      /** Which sketch to revolve. Must be a closed 2D solid. */
      target: ModelingCmdId
      /** The maximum acceptable surface gap computed between the revolution surface joints. Must be positive (i.e. greater than zero). */
      tolerance: LengthUnit
      type: 'revolve_about_edge'
    }
  | {
      /**
       * {
       *   "nullable": true,
       *   "format": "uint32",
       *   "minimum": 0,
       *   "description": "This can be set to override the automatically determined topological base curve, which is usually the first section encountered."
       * }
       */
      base_curve_index?: number
      /** Attempt to approximate rational curves (such as arcs) using a bezier. This will remove banding around interpolations between arcs and non-arcs.  It may produce errors in other scenarios Over time, this field won't be necessary. */
      bez_approximate_rational: boolean
      /**
       * {
       *   "format": "uuid"
       * }
       */
      section_ids: string[]
      /** Tolerance */
      tolerance: LengthUnit
      type: 'loft'
      /**
       * {
       *   "format": "uint32",
       *   "minimum": 1,
       *   "description": "Degree of the interpolation. Must be greater than zero. For example, use 2 for quadratic, or 3 for cubic interpolation in the V direction."
       * }
       */
      v_degree: number
    }
  | {
      /** format:uuid, description:Which path to close. */
      path_id: string
      type: 'close_path'
    }
  | {
      /** The type of camera drag interaction. */
      interaction: CameraDragInteractionType
      type: 'camera_drag_start'
      /** The initial mouse position. */
      window: Point2d
    }
  | {
      /** The type of camera drag interaction. */
      interaction: CameraDragInteractionType
      /**
       * {
       *   "nullable": true,
       *   "format": "uint32",
       *   "minimum": 0,
       *   "description": "Logical timestamp. The client should increment this with every event in the current mouse drag. That way, if the events are being sent over an unordered channel, the API can ignore the older events."
       * }
       */
      sequence?: number
      type: 'camera_drag_move'
      /** The current mouse position. */
      window: Point2d
    }
  | {
      /** The type of camera drag interaction. */
      interaction: CameraDragInteractionType
      type: 'camera_drag_end'
      /** The final mouse position. */
      window: Point2d
    }
  | { type: 'default_camera_get_settings' }
  | { type: 'default_camera_get_view' }
  | {
      type: 'default_camera_set_view'
      /** Camera view state */
      view: CameraViewState
    }
  | {
      /** What the camera is looking at. Center of the camera's field of vision */
      center: Point3d
      /**
       * {
       *   "nullable": true,
       *   "format": "uint32",
       *   "minimum": 0,
       *   "description": "Logical timestamp. The client should increment this with every event in the current mouse drag. That way, if the events are being sent over an unordered channel, the API can ignore the older events."
       * }
       */
      sequence?: number
      type: 'default_camera_look_at'
      /** Which way is "up", from the camera's point of view. */
      up: Point3d
      /** Where the camera is positioned */
      vantage: Point3d
    }
  | {
      /** What the camera is looking at. Center of the camera's field of vision */
      center: Point3d
      /**
       * {
       *   "nullable": true,
       *   "format": "float",
       *   "description": "The field of view angle in the y direction, in degrees."
       * }
       */
      fov_y?: number
      /**
       * {
       *   "nullable": true,
       *   "format": "uint32",
       *   "minimum": 0,
       *   "description": "Logical timestamp. The client should increment this with every event in the current mouse drag. That way, if the events are being sent over an unordered channel, the API can ignore the older events."
       * }
       */
      sequence?: number
      type: 'default_camera_perspective_settings'
      /** Which way is "up", from the camera's point of view. */
      up: Point3d
      /** Where the camera is positioned */
      vantage: Point3d
      /** nullable:true, format:float, description:The distance to the far clipping plane. */
      z_far?: number
      /** nullable:true, format:float, description:The distance to the near clipping plane. */
      z_near?: number
    }
  | {
      /**
       * {
       *   "format": "float",
       *   "description": "Move the camera forward along the vector it's looking at, by this magnitudedefaultCameraZoom. Basically, how much should the camera move forward by."
       * }
       */
      magnitude: number
      type: 'default_camera_zoom'
    }
  | {
      /**
       * {
       *   "format": "uuid"
       * }
       */
      entity_ids: string[]
      /** The file format to export to. */
      format: OutputFormat2d
      type: 'export2d'
    }
  | {
      /**
       * {
       *   "format": "uuid"
       * }
       */
      entity_ids: string[]
      /** The file format to export to. */
      format: OutputFormat3d
      type: 'export3d'
    }
  | {
      /**
       * {
       *   "format": "uuid"
       * }
       */
      entity_ids: string[]
      /** The file format to export to. */
      format: OutputFormat3d
      type: 'export'
    }
  | {
      /** format:uuid, description:ID of the entity being queried. */
      entity_id: string
      type: 'entity_get_parent_id'
    }
  | {
      /** format:uuid, description:ID of the entity being queried. */
      entity_id: string
      type: 'entity_get_num_children'
    }
  | {
      /** format:uint32, minimum:0, description:Index into the entity's list of children. */
      child_index: number
      /** format:uuid, description:ID of the entity being queried. */
      entity_id: string
      type: 'entity_get_child_uuid'
    }
  | {
      /** format:uuid, description:ID of the entity being queried. */
      entity_id: string
      type: 'entity_get_all_child_uuids'
    }
  | {
      /** format:uuid, description:ID of the entity being queried. */
      entity_id: string
      type: 'entity_get_sketch_paths'
    }
  | {
      /** Type of distance to be measured. */
      distance_type: DistanceType
      /** format:uuid, description:ID of the first entity being queried. */
      entity_id1: string
      /** format:uuid, description:ID of the second entity being queried. */
      entity_id2: string
      type: 'entity_get_distance'
    }
  | {
      /** format:uuid, description:ID of the entity being cloned. */
      entity_id: string
      type: 'entity_clone'
    }
  | {
      /** format:uuid, description:ID of the entity being copied. */
      entity_id: string
      /**
       * {
       *   "default": [],
       *   "description": "How to transform each repeated solid. The 0th transform will create the first copy of the entity. The total number of (optional) repetitions equals the size of this list."
       * }
       */
      transform?: Transform[]
      transforms?: Transform[][]
      type: 'entity_linear_pattern_transform'
    }
  | {
      /** Axis along which to make the copies. For Solid2d patterns, the z component is ignored. */
      axis: Point3d
      /** format:uuid, description:ID of the entity being copied. */
      entity_id: string
      /** format:uint32, minimum:0, description:Number of repetitions to make. */
      num_repetitions: number
      /** Spacing between repetitions. */
      spacing: LengthUnit
      type: 'entity_linear_pattern'
    }
  | {
      /**
       * {
       *   "format": "double",
       *   "description": "Arc angle (in degrees) to place repetitions along."
       * }
       */
      arc_degrees: number
      /** Axis around which to make the copies. For Solid2d patterns, this is ignored. */
      axis: Point3d
      /** Point around which to make the copies. For Solid2d patterns, the z component is ignored. */
      center: Point3d
      /** format:uuid, description:ID of the entity being copied. */
      entity_id: string
      /** format:uint32, minimum:0, description:Number of repetitions to make. */
      num_repetitions: number
      /** Whether or not to rotate the objects as they are copied. */
      rotate_duplicates: boolean
      type: 'entity_circular_pattern'
    }
  | {
      /** format:uuid, description:ID of the cylinder. */
      cylinder_id: string
      /** Is the helix rotation clockwise? */
      is_clockwise: boolean
      /** Length of the helix. */
      length: LengthUnit
      /** format:double, description:Number of revolutions. */
      revolutions: number
      /** default:{unit:degrees, value:0}, description:Start angle. */
      start_angle?: Angle
      type: 'entity_make_helix'
    }
  | {
      /** Axis of the helix. The helix will be created around and in the direction of this axis. */
      axis: Point3d
      /** Center of the helix at the base of the helix. */
      center: Point3d
      /** Is the helix rotation clockwise? */
      is_clockwise: boolean
      /** Length of the helix. */
      length: LengthUnit
      /** Radius of the helix. */
      radius: LengthUnit
      /** format:double, description:Number of revolutions. */
      revolutions: number
      /** default:{unit:degrees, value:0}, description:Start angle. */
      start_angle?: Angle
      type: 'entity_make_helix_from_params'
    }
  | {
      /** format:uuid, description:Edge about which to make the helix. */
      edge_id: string
      /** Is the helix rotation clockwise? */
      is_clockwise: boolean
      /**
       * {
       *   "nullable": true,
       *   "description": "Length of the helix. If None, the length of the edge will be used instead."
       * }
       */
      length?: LengthUnit
      /** Radius of the helix. */
      radius: LengthUnit
      /** format:double, description:Number of revolutions. */
      revolutions: number
      /** default:{unit:degrees, value:0}, description:Start angle. */
      start_angle?: Angle
      type: 'entity_make_helix_from_edge'
    }
  | {
      /** Axis to use as mirror. */
      axis: Point3d
      /**
       * {
       *   "format": "uuid"
       * }
       */
      ids: string[]
      /** Point through which the mirror axis passes. */
      point: Point3d
      type: 'entity_mirror'
    }
  | {
      /**
       * {
       *   "format": "uuid",
       *   "description": "The edge to use as the mirror axis, must be linear and lie in the plane of the solid"
       * }
       */
      edge_id: string
      /**
       * {
       *   "format": "uuid"
       * }
       */
      ids: string[]
      type: 'entity_mirror_across_edge'
    }
  | {
      /** Where in the window was selected */
      selected_at_window: Point2d
      /** What entity was selected? */
      selection_type: SceneSelectionType
      type: 'select_with_point'
    }
  | {
      /**
       * {
       *   "format": "uuid"
       * }
       */
      entities: string[]
      type: 'select_add'
    }
  | {
      /**
       * {
       *   "format": "uuid"
       * }
       */
      entities: string[]
      type: 'select_remove'
    }
  | { type: 'scene_clear_all' }
  | {
      /**
       * {
       *   "format": "uuid"
       * }
       */
      entities: string[]
      type: 'select_replace'
    }
  | {
      /** Coordinates of the window being clicked */
      selected_at_window: Point2d
      /**
       * {
       *   "nullable": true,
       *   "format": "uint32",
       *   "minimum": 0,
       *   "description": "Logical timestamp. The client should increment this with every event in the current mouse drag. That way, if the events are being sent over an unordered channel, the API can ignore the older events."
       * }
       */
      sequence?: number
      type: 'highlight_set_entity'
    }
  | {
      /**
       * {
       *   "format": "uuid"
       * }
       */
      entities: string[]
      type: 'highlight_set_entities'
    }
  | {
      /** What type of annotation to create. */
      annotation_type: AnnotationType
      /** If true, any existing drawables within the obj will be replaced (the object will be reset) */
      clobber: boolean
      /** What should the annotation contain? */
      options: AnnotationOptions
      type: 'new_annotation'
    }
  | {
      /** format:uuid, description:Which annotation to update */
      annotation_id: string
      /** If any of these fields are set, they will overwrite the previous options for the annotation. */
      options: AnnotationOptions
      type: 'update_annotation'
    }
  | {
      /** Whether or not the edge lines should be hidden. */
      hidden: boolean
      type: 'edge_lines_visible'
    }
  | {
      /** Whether or not the object should be hidden. */
      hidden: boolean
      /** format:uuid, description:Which object to change */
      object_id: string
      type: 'object_visible'
    }
  | {
      /** format:uuid, description:Which object to change */
      object_id: string
      type: 'object_bring_to_front'
    }
  | {
      /** format:float, description:Ambient Occlusion of the new material */
      ambient_occlusion: number
      /** Color of the new material */
      color: Color
      /** format:float, description:Metalness of the new material */
      metalness: number
      /** format:uuid, description:Which object to change */
      object_id: string
      /** format:float, description:Roughness of the new material */
      roughness: number
      type: 'object_set_material_params_pbr'
    }
  | {
      /** format:uuid, description:ID of the entity being queried. */
      entity_id: string
      type: 'get_entity_type'
    }
  | {
      /** format:uuid, description:Which edge you want the faces of. */
      edge_id: string
      /** format:uuid, description:Which object is being queried. */
      object_id: string
      type: 'solid3d_get_all_edge_faces'
    }
  | {
      /**
       * {
       *   "format": "uuid",
       *   "description": "The id of the path to use as the inner profile (hole)."
       * }
       */
      hole_id: string
      /** format:uuid, description:Which object to add the hole to. */
      object_id: string
      type: 'solid2d_add_hole'
    }
  | {
      /**
       * {
       *   "nullable": true,
       *   "description": "If given, only faces parallel to this vector will be considered."
       * }
       */
      along_vector?: Point3d
      /** format:uuid, description:Which edge you want the opposites of. */
      edge_id: string
      /** format:uuid, description:Which object is being queried. */
      object_id: string
      type: 'solid3d_get_all_opposite_edges'
    }
  | {
      /** format:uuid, description:Which edge you want the opposite of. */
      edge_id: string
      /**
       * {
       *   "format": "uuid",
       *   "description": "Which face is used to figure out the opposite edge?"
       * }
       */
      face_id: string
      /** format:uuid, description:Which object is being queried. */
      object_id: string
      type: 'solid3d_get_opposite_edge'
    }
  | {
      /** format:uuid, description:Which edge you want the opposite of. */
      edge_id: string
      /**
       * {
       *   "format": "uuid",
       *   "description": "Which face is used to figure out the opposite edge?"
       * }
       */
      face_id: string
      /** format:uuid, description:Which object is being queried. */
      object_id: string
      type: 'solid3d_get_next_adjacent_edge'
    }
  | {
      /** format:uuid, description:Which edge you want the opposite of. */
      edge_id: string
      /**
       * {
       *   "format": "uuid",
       *   "description": "Which face is used to figure out the opposite edge?"
       * }
       */
      face_id: string
      /** format:uuid, description:Which object is being queried. */
      object_id: string
      type: 'solid3d_get_prev_adjacent_edge'
    }
  | {
      /**
       * {
       *   "format": "uuid"
       * }
       */
      face_ids: string[]
      /** format:uuid, description:Which object is being queried. */
      object_id: string
      type: 'solid3d_get_common_edge'
    }
  | {
      /** default:fillet, description:How to apply the cut. */
      cut_type?: CutType
      /** nullable:true, format:uuid, description:Which edge you want to fillet. */
      edge_id?: string
      /**
       * {
       *   "format": "uuid"
       * }
       */
      edge_ids?: string[]
      /**
       * {
       *   "format": "uuid"
       * }
       */
      extra_face_ids?: string[]
      /** format:uuid, description:Which object is being filletted. */
      object_id: string
      /** The radius of the fillet. Measured in length (using the same units that the current sketch uses). Must be positive (i.e. greater than zero). */
      radius: LengthUnit
      /** default:automatic, description:Which cutting algorithm to use. */
      strategy?: CutStrategy
      /** The maximum acceptable surface gap computed between the filleted surfaces. Must be positive (i.e. greater than zero). */
      tolerance: LengthUnit
      type: 'solid3d_fillet_edge'
    }
  | {
      /** format:uuid, description:Which face is being queried. */
      object_id: string
      type: 'face_is_planar'
    }
  | {
      /** format:uuid, description:Which face is being queried. */
      object_id: string
      type: 'face_get_position'
      /** The 2D parameter-space u,v position to evaluate the surface at */
      uv: Point2d
    }
  | {
      /** format:uuid, description:Which face is being queried. */
      object_id: string
      type: 'face_get_center'
    }
  | {
      /** format:uuid, description:Which face is being queried. */
      object_id: string
      type: 'face_get_gradient'
      /** The 2D parameter-space u,v position to evaluate the surface at */
      uv: Point2d
    }
  | {
      /** Bring to front = true, send to back = false. */
      front: boolean
      /** format:uuid, description:Which object is being changed. */
      object_id: string
      type: 'send_object'
    }
  | {
      /** format:uuid, description:Which entity is being changed. */
      entity_id: string
      /**
       * {
       *   "format": "float",
       *   "description": "How transparent should it be? 0 or lower is totally transparent. 1 or greater is totally opaque."
       * }
       */
      opacity: number
      type: 'entity_set_opacity'
    }
  | {
      /** default:0.4, format:double, description:How many seconds the animation should take. */
      duration_seconds?: number
      /** format:uuid, description:Which entity is being changed. */
      entity_id: string
      /** Fade in = true, fade out = false. */
      fade_in: boolean
      type: 'entity_fade'
    }
  | {
      /** If true, any existing drawables within the obj will be replaced (the object will be reset) */
      clobber: boolean
      /**
       * {
       *   "nullable": true,
       *   "description": "If true, the plane will be created but hidden initially."
       * }
       */
      hide?: boolean
      /** Origin of the plane */
      origin: Point3d
      /** What should the plane's span/extent? When rendered visually, this is both the width and height along X and Y axis respectively. */
      size: LengthUnit
      type: 'make_plane'
      /** What should the plane's X axis be? */
      x_axis: Point3d
      /** What should the plane's Y axis be? */
      y_axis: Point3d
    }
  | {
      /** What color it should be. */
      color: Color
      /** format:uuid, description:Which plane is being changed. */
      plane_id: string
      type: 'plane_set_color'
    }
  | {
      /** What tool should be active. */
      tool: SceneToolType
      type: 'set_tool'
    }
  | {
      /**
       * {
       *   "nullable": true,
       *   "format": "uint32",
       *   "minimum": 0,
       *   "description": "Logical timestamp. The client should increment this with every event in the current mouse drag. That way, if the events are being sent over an unordered channel, the API can ignore the older events."
       * }
       */
      sequence?: number
      type: 'mouse_move'
      /** Where the mouse is */
      window: Point2d
    }
  | {
      type: 'mouse_click'
      /** Where the mouse is */
      window: Point2d
    }
  | { type: 'sketch_mode_disable' }
  | { type: 'get_sketch_mode_plane' }
  | {
      /** Which constraint to apply. */
      constraint_bound: PathComponentConstraintBound
      /** What part of the curve should be constrained. */
      constraint_type: PathComponentConstraintType
      /** format:uuid, description:Which curve to constrain. */
      object_id: string
      type: 'curve_set_constraint'
    }
  | {
      /** Should the camera move at all? */
      adjust_camera: boolean
      /** Should we animate or snap for the camera transition? */
      animated: boolean
      /** format:uuid, description:Which entity to sketch on. */
      entity_id: string
      /** Should the camera use orthographic projection? In other words, should an object's size in the rendered image stay constant regardless of its distance from the camera. */
      ortho: boolean
      /**
       * {
       *   "nullable": true,
       *   "description": "If provided, ensures that the normal of the sketch plane must be aligned with this supplied normal (otherwise the camera position will be used to infer the normal to point towards the viewer)"
       * }
       */
      planar_normal?: Point3d
      type: 'enable_sketch_mode'
    }
  | { type: 'enable_dry_run' }
  | { type: 'disable_dry_run' }
  | {
      /** The color to set the background to. */
      color: Color
      type: 'set_background_color'
    }
  | {
      /** nullable:true, description:The color to set the tool line to. */
      color?: Color
      type: 'set_current_tool_properties'
    }
  | {
      /** nullable:true, description:The default system color. */
      color?: Color
      type: 'set_default_system_properties'
    }
  | {
      /** format:uuid, description:Which curve to query. */
      curve_id: string
      type: 'curve_get_type'
    }
  | {
      /** format:uuid, description:Which curve to query. */
      curve_id: string
      type: 'curve_get_control_points'
    }
  | {
      /** format:uuid, description:Which entity to project (vertex or edge). */
      entity_id: string
      /** format:uuid, description:Which plane to project entity_id onto. */
      plane_id: string
      type: 'project_entity_to_plane'
      /** If true: the projected points are returned in the plane_id's coordinate system, else: the projected points are returned in the world coordinate system. */
      use_plane_coords: boolean
    }
  | {
      /** format:uuid, description:The id of the plane used for the projection. */
      plane_id: string
      /** The list of points that will be projected. */
      points: Point3d[]
      type: 'project_points_to_plane'
      /** If true: the projected points are returned in the plane_id's coordinate sysetm. else: the projected points are returned in the world coordinate system. */
      use_plane_coords: boolean
    }
  | {
      /** What image format to return. */
      format: ImageFormat
      type: 'take_snapshot'
    }
  | {
      /** If true, any existing drawables within the obj will be replaced (the object will be reset) */
      clobber: boolean
      /** If true, axes gizmo will be placed in the corner of the screen. If false, it will be placed at the origin of the scene. */
      gizmo_mode: boolean
      type: 'make_axes_gizmo'
    }
  | {
      /** format:uuid, description:Which path to query */
      path_id: string
      type: 'path_get_info'
    }
  | {
      /** format:uuid, description:Which path to query */
      path_id: string
      type: 'path_get_curve_uuids_for_vertices'
      /**
       * {
       *   "format": "uuid"
       * }
       */
      vertex_ids: string[]
    }
  | {
      /**
       * {
       *   "format": "uint32",
       *   "minimum": 0,
       *   "description": "IDs of the vertices for which to obtain curve ids from"
       * }
       */
      index: number
      /** format:uuid, description:Which path to query */
      path_id: string
      type: 'path_get_curve_uuid'
    }
  | {
      /** format:uuid, description:Which path to query */
      path_id: string
      type: 'path_get_vertex_uuids'
    }
  | {
      /** format:uuid, description:Which path to query */
      path_id: string
      type: 'path_get_sketch_target_uuid'
    }
  | {
      type: 'handle_mouse_drag_start'
      /** The mouse position. */
      window: Point2d
    }
  | {
      /**
       * {
       *   "nullable": true,
       *   "format": "uint32",
       *   "minimum": 0,
       *   "description": "Logical timestamp. The client should increment this with every event in the current mouse drag. That way, if the events are being sent over an unordered channel, the API can ignore the older events."
       * }
       */
      sequence?: number
      type: 'handle_mouse_drag_move'
      /** The mouse position. */
      window: Point2d
    }
  | {
      type: 'handle_mouse_drag_end'
      /** The mouse position. */
      window: Point2d
    }
  | {
      /**
       * {
       *   "format": "uuid"
       * }
       */
      object_ids: string[]
      type: 'remove_scene_objects'
    }
  | {
      /** format:uuid, description:The plane you're intersecting against. */
      plane_id: string
      type: 'plane_intersect_and_project'
      /** Window coordinates where the ray cast should be aimed. */
      window: Point2d
    }
  | {
      /** format:uuid, description:ID of the curve being queried. */
      curve_id: string
      type: 'curve_get_end_points'
    }
  | {
      /**
       * {
       *   "nullable": true,
       *   "format": "uint32",
       *   "minimum": 0,
       *   "description": "Video feed's constant bitrate (CBR)"
       * }
       */
      bitrate?: number
      /** format:uint32, minimum:0, description:Frames per second. */
      fps: number
      /** format:uint32, minimum:0, description:Height of the stream. */
      height: number
      type: 'reconfigure_stream'
      /** format:uint32, minimum:0, description:Width of the stream. */
      width: number
    }
  | {
      /** Files to import. */
      files: ImportFile[]
      /** Input file format. */
      format: InputFormat3d
      type: 'import_files'
    }
  | {
      type: 'set_scene_units'
      /** Which units the scene uses. */
      unit: UnitLength
    }
  | {
      /**
       * {
       *   "format": "uuid"
       * }
       */
      entity_ids: string[]
      /** format:double, description:The material density. */
      material_density: number
      /** The material density unit. */
      material_density_unit: UnitDensity
      /** The output unit for the mass. */
      output_unit: UnitMass
      type: 'mass'
    }
  | {
      /**
       * {
       *   "format": "uuid"
       * }
       */
      entity_ids: string[]
      /** format:double, description:The material mass. */
      material_mass: number
      /** The material mass unit. */
      material_mass_unit: UnitMass
      /** The output unit for the density. */
      output_unit: UnitDensity
      type: 'density'
    }
  | {
      /**
       * {
       *   "format": "uuid"
       * }
       */
      entity_ids: string[]
      /** The output unit for the volume. */
      output_unit: UnitVolume
      type: 'volume'
    }
  | {
      /**
       * {
       *   "format": "uuid"
       * }
       */
      entity_ids: string[]
      /** The output unit for the center of mass. */
      output_unit: UnitLength
      type: 'center_of_mass'
    }
  | {
      /**
       * {
       *   "format": "uuid"
       * }
       */
      entity_ids: string[]
      /** The output unit for the surface area. */
      output_unit: UnitArea
      type: 'surface_area'
    }
  | {
      type: 'default_camera_focus_on'
      /** format:uuid, description:UUID of object to focus on. */
      uuid: string
    }
  | {
      /** What type of selection should occur when you select something? */
      selection_type: SceneSelectionType
      type: 'set_selection_type'
    }
  | {
      /** If vector is empty, clear all filters. If vector is non-empty, only the given entity types will be selectable. */
      filter: EntityType[]
      type: 'set_selection_filter'
    }
  | { type: 'default_camera_set_orthographic' }
  | {
      /**
       * {
       *   "nullable": true,
       *   "description": "If this is not given, use the same parameters as last time the perspective camera was used."
       * }
       */
      parameters?: PerspectiveCameraParameters
      type: 'default_camera_set_perspective'
    }
  | {
      /**
       * {
       *   "default": "vantage",
       *   "description": "Dictates whether or not the camera position should be adjusted during this operation If no movement is requested, the camera will orbit around the new center from its current position"
       * }
       */
      camera_movement?: CameraMovement
      type: 'default_camera_center_to_selection'
    }
  | {
      /**
       * {
       *   "default": "vantage",
       *   "description": "Dictates whether or not the camera position should be adjusted during this operation If no movement is requested, the camera will orbit around the new center from its current position"
       * }
       */
      camera_movement?: CameraMovement
      type: 'default_camera_center_to_scene'
    }
  | {
      /** default:false, description:Whether or not to animate the camera movement. */
      animated?: boolean
      /**
       * {
       *   "format": "uuid"
       * }
       */
      object_ids?: string[]
      /**
       * {
       *   "default": 0,
       *   "format": "float",
       *   "description": "How much to pad the view frame by, as a fraction of the object(s) bounding box size. Negative padding will crop the view of the object proportionally. e.g. padding = 0.2 means the view will span 120% of the object(s) bounding box, and padding = -0.2 means the view will span 80% of the object(s) bounding box."
       * }
       */
      padding?: number
      type: 'zoom_to_fit'
    }
  | {
      /**
       * {
       *   "default": false,
       *   "description": "Whether or not to animate the camera movement. (Animation is currently not supported.)"
       * }
       */
      animated?: boolean
      /**
       * {
       *   "format": "uuid",
       *   "description": "Which face to orient camera to. If the face is not planar, no action will occur."
       * }
       */
      face_id: string
      /**
       * {
       *   "default": 0,
       *   "format": "float",
       *   "description": "How much to pad the view frame by, as a fraction of the face bounding box size. Negative padding will crop the view of the face proportionally. e.g. padding = 0.2 means the view will span 120% of the face bounding box, and padding = -0.2 means the view will span 80% of the face bounding box."
       * }
       */
      padding?: number
      type: 'orient_to_face'
    }
  | {
      /**
       * {
       *   "default": 0,
       *   "format": "float",
       *   "description": "How much to pad the view frame by, as a fraction of the object(s) bounding box size. Negative padding will crop the view of the object proportionally. e.g. padding = 0.2 means the view will span 120% of the object(s) bounding box, and padding = -0.2 means the view will span 80% of the object(s) bounding box."
       * }
       */
      padding?: number
      type: 'view_isometric'
    }
  | {
      /** format:uuid, description:Any edge that lies on the extrusion base path. */
      edge_id: string
      /**
       * {
       *   "format": "uuid",
       *   "description": "The Solid3d object whose extrusion is being queried."
       * }
       */
      object_id: string
      type: 'solid3d_get_extrusion_face_info'
    }
  | {
      /** format:uuid, description:Any edge that lies on the extrusion base path. */
      edge_id: string
      /** format:uuid, description:The Solid3d object whose info is being queried. */
      object_id: string
      type: 'solid3d_get_adjacency_info'
    }
  | { type: 'select_clear' }
  | { type: 'select_get' }
  | { type: 'get_num_objects' }
  | {
      /** format:uuid, description:Id of the object whose transform is to be set. */
      object_id: string
      /** List of transforms to be applied to the object. */
      transforms: ComponentTransform[]
      type: 'set_object_transform'
    }
  | {
      /**
       * {
       *   "format": "uuid"
       * }
       */
      solid_ids: string[]
      /** The maximum acceptable surface gap computed between the joined solids. Must be positive (i.e. greater than zero). */
      tolerance: LengthUnit
      type: 'boolean_union'
    }
  | {
      /**
       * {
       *   "format": "uuid"
       * }
       */
      solid_ids: string[]
      /** The maximum acceptable surface gap computed between the joined solids. Must be positive (i.e. greater than zero). */
      tolerance: LengthUnit
      type: 'boolean_intersection'
    }
  | {
      /**
       * {
       *   "format": "uuid"
       * }
       */
      target_ids: string[]
      /** The maximum acceptable surface gap computed between the target and the solids cut out from it. Must be positive (i.e. greater than zero). */
      tolerance: LengthUnit
      /**
       * {
       *   "format": "uuid"
       * }
       */
      tool_ids: string[]
      type: 'boolean_subtract'
    }
  | {
      /**
       * {
       *   "nullable": true,
       *   "format": "uuid",
       *   "description": "If the object is a solid, this is the ID of the face to base the offset on. If given, and `object_id` refers to a solid, then this face on the solid will be offset. If given but `object_id` doesn't refer to a solid, responds with an error. If not given, then `object_id` itself will be offset directly."
       * }
       */
      face_id?: string
      /**
       * {
       *   "format": "uuid",
       *   "description": "The object that will be offset (can be a path, sketch, or a solid)"
       * }
       */
      object_id: string
      /** The distance to offset the path (positive for outset, negative for inset) */
      offset: LengthUnit
      type: 'make_offset_path'
    }
  | {
      /** format:uuid, description:The closed path to add a hole to. */
      object_id: string
      /** The distance to offset the path (positive for outset, negative for inset) */
      offset: LengthUnit
      type: 'add_hole_from_offset'
    }
  | {
      /** format:uuid, description:The grid to be moved. */
      grid_id: string
      /**
       * {
       *   "format": "uuid",
       *   "description": "The plane or face that the grid will be aligned to. If a face, it must be planar to succeed."
       * }
       */
      reference_id: string
      type: 'set_grid_reference_plane'
    }
  | {
      type: 'set_grid_scale'
      /** Which units the `value` field uses. */
      units: UnitLength
      /**
       * {
       *   "format": "float",
       *   "description": "Distance between grid lines represents this much distance."
       * }
       */
      value: number
    }
  | { type: 'set_grid_auto_scale' }

export type ModelingCmdId =
  /**
   * {
   *   "format": "uuid",
   *   "description": "All commands have unique IDs. These should be randomly generated."
   * }
   */
  string

export interface ModelingCmdReq {
  /** Which command to submit to the Kittycad engine. */
  cmd: ModelingCmd
  /** ID of command being submitted. */
  cmd_id: ModelingCmdId
}

export interface ModelingSessionData {
  /** ID of the API call this modeling session is using. Useful for tracing and debugging. */
  api_call_id: string
}

export interface MouseClick {
  /**
   * {
   *   "format": "uuid"
   * }
   */
  entities_modified: string[]
  /**
   * {
   *   "format": "uuid"
   * }
   */
  entities_selected: string[]
}

export interface MouseMove {} /* Empty object */

export interface MovePathPen {} /* Empty object */

export interface NewAnnotation {} /* Empty object */

export interface OAuth2ClientInfo {
  /** Value used for [CSRF](https://tools.ietf.org/html/rfc6749#section-10.12) protection via the `state` parameter. */
  csrf_token?: string
  /** nullable:true, description:Nonce required for OIDC flows. */
  oidc_nonce?: string
  /**
   * {
   *   "nullable": true,
   *   "description": "Code Verifier used for [PKCE]((https://tools.ietf.org/html/rfc7636)) protection via the `code_verifier` parameter. The value must have a minimum length of 43 characters and a maximum length of 128 characters.  Each character must be ASCII alphanumeric or one of the characters \"-\" / \".\" / \"_\" / \"~\"."
   * }
   */
  pkce_code_verifier?: string
  /** The URL for consent. */
  url?: string
}

export type OAuth2GrantType = 'urn:ietf:params:oauth:grant-type:device_code'

export interface ObjectBringToFront {} /* Empty object */

export interface ObjectSetMaterialParamsPbr {} /* Empty object */

export interface ObjectVisible {} /* Empty object */

export type OkModelingCmdResponse =
  | { type: 'empty' }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EngineUtilEvaluatePath"
       * }
       */
      data: EngineUtilEvaluatePath
      type: 'engine_util_evaluate_path'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/StartPath"
       * }
       */
      data: StartPath
      type: 'start_path'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/MovePathPen"
       * }
       */
      data: MovePathPen
      type: 'move_path_pen'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/ExtendPath"
       * }
       */
      data: ExtendPath
      type: 'extend_path'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Extrude"
       * }
       */
      data: Extrude
      type: 'extrude'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/TwistExtrude"
       * }
       */
      data: TwistExtrude
      type: 'twist_extrude'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Sweep"
       * }
       */
      data: Sweep
      type: 'sweep'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Revolve"
       * }
       */
      data: Revolve
      type: 'revolve'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Solid3dShellFace"
       * }
       */
      data: Solid3dShellFace
      type: 'solid3d_shell_face'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/RevolveAboutEdge"
       * }
       */
      data: RevolveAboutEdge
      type: 'revolve_about_edge'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/CameraDragStart"
       * }
       */
      data: CameraDragStart
      type: 'camera_drag_start'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/DefaultCameraLookAt"
       * }
       */
      data: DefaultCameraLookAt
      type: 'default_camera_look_at'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/DefaultCameraPerspectiveSettings"
       * }
       */
      data: DefaultCameraPerspectiveSettings
      type: 'default_camera_perspective_settings'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SelectAdd"
       * }
       */
      data: SelectAdd
      type: 'select_add'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SelectRemove"
       * }
       */
      data: SelectRemove
      type: 'select_remove'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SceneClearAll"
       * }
       */
      data: SceneClearAll
      type: 'scene_clear_all'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SelectReplace"
       * }
       */
      data: SelectReplace
      type: 'select_replace'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/HighlightSetEntities"
       * }
       */
      data: HighlightSetEntities
      type: 'highlight_set_entities'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/NewAnnotation"
       * }
       */
      data: NewAnnotation
      type: 'new_annotation'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/UpdateAnnotation"
       * }
       */
      data: UpdateAnnotation
      type: 'update_annotation'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EdgeLinesVisible"
       * }
       */
      data: EdgeLinesVisible
      type: 'edge_lines_visible'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/ObjectVisible"
       * }
       */
      data: ObjectVisible
      type: 'object_visible'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/ObjectBringToFront"
       * }
       */
      data: ObjectBringToFront
      type: 'object_bring_to_front'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/ObjectSetMaterialParamsPbr"
       * }
       */
      data: ObjectSetMaterialParamsPbr
      type: 'object_set_material_params_pbr'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Solid2dAddHole"
       * }
       */
      data: Solid2dAddHole
      type: 'solid2d_add_hole'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Solid3dFilletEdge"
       * }
       */
      data: Solid3dFilletEdge
      type: 'solid3d_fillet_edge'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SendObject"
       * }
       */
      data: SendObject
      type: 'send_object'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EntitySetOpacity"
       * }
       */
      data: EntitySetOpacity
      type: 'entity_set_opacity'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EntityFade"
       * }
       */
      data: EntityFade
      type: 'entity_fade'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/MakePlane"
       * }
       */
      data: MakePlane
      type: 'make_plane'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/PlaneSetColor"
       * }
       */
      data: PlaneSetColor
      type: 'plane_set_color'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SetTool"
       * }
       */
      data: SetTool
      type: 'set_tool'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/MouseMove"
       * }
       */
      data: MouseMove
      type: 'mouse_move'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SketchModeDisable"
       * }
       */
      data: SketchModeDisable
      type: 'sketch_mode_disable'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EnableDryRun"
       * }
       */
      data: EnableDryRun
      type: 'enable_dry_run'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/DisableDryRun"
       * }
       */
      data: DisableDryRun
      type: 'disable_dry_run'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/CurveSetConstraint"
       * }
       */
      data: CurveSetConstraint
      type: 'curve_set_constraint'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EnableSketchMode"
       * }
       */
      data: EnableSketchMode
      type: 'enable_sketch_mode'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SetBackgroundColor"
       * }
       */
      data: SetBackgroundColor
      type: 'set_background_color'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SetCurrentToolProperties"
       * }
       */
      data: SetCurrentToolProperties
      type: 'set_current_tool_properties'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SetDefaultSystemProperties"
       * }
       */
      data: SetDefaultSystemProperties
      type: 'set_default_system_properties'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/MakeAxesGizmo"
       * }
       */
      data: MakeAxesGizmo
      type: 'make_axes_gizmo'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/HandleMouseDragStart"
       * }
       */
      data: HandleMouseDragStart
      type: 'handle_mouse_drag_start'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/HandleMouseDragMove"
       * }
       */
      data: HandleMouseDragMove
      type: 'handle_mouse_drag_move'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/HandleMouseDragEnd"
       * }
       */
      data: HandleMouseDragEnd
      type: 'handle_mouse_drag_end'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/RemoveSceneObjects"
       * }
       */
      data: RemoveSceneObjects
      type: 'remove_scene_objects'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/ReconfigureStream"
       * }
       */
      data: ReconfigureStream
      type: 'reconfigure_stream'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SetSceneUnits"
       * }
       */
      data: SetSceneUnits
      type: 'set_scene_units'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SetSelectionType"
       * }
       */
      data: SetSelectionType
      type: 'set_selection_type'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SetSelectionFilter"
       * }
       */
      data: SetSelectionFilter
      type: 'set_selection_filter'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/DefaultCameraSetOrthographic"
       * }
       */
      data: DefaultCameraSetOrthographic
      type: 'default_camera_set_orthographic'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/DefaultCameraSetPerspective"
       * }
       */
      data: DefaultCameraSetPerspective
      type: 'default_camera_set_perspective'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/DefaultCameraCenterToSelection"
       * }
       */
      data: DefaultCameraCenterToSelection
      type: 'default_camera_center_to_selection'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/DefaultCameraCenterToScene"
       * }
       */
      data: DefaultCameraCenterToScene
      type: 'default_camera_center_to_scene'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SelectClear"
       * }
       */
      data: SelectClear
      type: 'select_clear'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Export2d"
       * }
       */
      data: Export2d
      type: 'export2d'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Export3d"
       * }
       */
      data: Export3d
      type: 'export3d'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Export"
       * }
       */
      data: Export
      type: 'export'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SelectWithPoint"
       * }
       */
      data: SelectWithPoint
      type: 'select_with_point'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/HighlightSetEntity"
       * }
       */
      data: HighlightSetEntity
      type: 'highlight_set_entity'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EntityGetChildUuid"
       * }
       */
      data: EntityGetChildUuid
      type: 'entity_get_child_uuid'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EntityGetNumChildren"
       * }
       */
      data: EntityGetNumChildren
      type: 'entity_get_num_children'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EntityGetParentId"
       * }
       */
      data: EntityGetParentId
      type: 'entity_get_parent_id'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EntityGetAllChildUuids"
       * }
       */
      data: EntityGetAllChildUuids
      type: 'entity_get_all_child_uuids'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EntityGetSketchPaths"
       * }
       */
      data: EntityGetSketchPaths
      type: 'entity_get_sketch_paths'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Loft"
       * }
       */
      data: Loft
      type: 'loft'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/ClosePath"
       * }
       */
      data: ClosePath
      type: 'close_path'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/CameraDragMove"
       * }
       */
      data: CameraDragMove
      type: 'camera_drag_move'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/CameraDragEnd"
       * }
       */
      data: CameraDragEnd
      type: 'camera_drag_end'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/DefaultCameraGetSettings"
       * }
       */
      data: DefaultCameraGetSettings
      type: 'default_camera_get_settings'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/DefaultCameraGetView"
       * }
       */
      data: DefaultCameraGetView
      type: 'default_camera_get_view'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/DefaultCameraSetView"
       * }
       */
      data: DefaultCameraSetView
      type: 'default_camera_set_view'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/DefaultCameraZoom"
       * }
       */
      data: DefaultCameraZoom
      type: 'default_camera_zoom'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/ZoomToFit"
       * }
       */
      data: ZoomToFit
      type: 'zoom_to_fit'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/OrientToFace"
       * }
       */
      data: OrientToFace
      type: 'orient_to_face'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/ViewIsometric"
       * }
       */
      data: ViewIsometric
      type: 'view_isometric'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/GetNumObjects"
       * }
       */
      data: GetNumObjects
      type: 'get_num_objects'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/MakeOffsetPath"
       * }
       */
      data: MakeOffsetPath
      type: 'make_offset_path'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SetObjectTransform"
       * }
       */
      data: SetObjectTransform
      type: 'set_object_transform'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/AddHoleFromOffset"
       * }
       */
      data: AddHoleFromOffset
      type: 'add_hole_from_offset'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/DefaultCameraFocusOn"
       * }
       */
      data: DefaultCameraFocusOn
      type: 'default_camera_focus_on'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SelectGet"
       * }
       */
      data: SelectGet
      type: 'select_get'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Solid3dGetAdjacencyInfo"
       * }
       */
      data: Solid3dGetAdjacencyInfo
      type: 'solid3d_get_adjacency_info'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Solid3dGetAllEdgeFaces"
       * }
       */
      data: Solid3dGetAllEdgeFaces
      type: 'solid3d_get_all_edge_faces'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Solid3dGetAllOppositeEdges"
       * }
       */
      data: Solid3dGetAllOppositeEdges
      type: 'solid3d_get_all_opposite_edges'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Solid3dGetOppositeEdge"
       * }
       */
      data: Solid3dGetOppositeEdge
      type: 'solid3d_get_opposite_edge'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Solid3dGetNextAdjacentEdge"
       * }
       */
      data: Solid3dGetNextAdjacentEdge
      type: 'solid3d_get_next_adjacent_edge'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Solid3dGetPrevAdjacentEdge"
       * }
       */
      data: Solid3dGetPrevAdjacentEdge
      type: 'solid3d_get_prev_adjacent_edge'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Solid3dGetCommonEdge"
       * }
       */
      data: Solid3dGetCommonEdge
      type: 'solid3d_get_common_edge'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/GetEntityType"
       * }
       */
      data: GetEntityType
      type: 'get_entity_type'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/CurveGetControlPoints"
       * }
       */
      data: CurveGetControlPoints
      type: 'curve_get_control_points'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/ProjectEntityToPlane"
       * }
       */
      data: ProjectEntityToPlane
      type: 'project_entity_to_plane'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/ProjectPointsToPlane"
       * }
       */
      data: ProjectPointsToPlane
      type: 'project_points_to_plane'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/CurveGetType"
       * }
       */
      data: CurveGetType
      type: 'curve_get_type'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/MouseClick"
       * }
       */
      data: MouseClick
      type: 'mouse_click'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/TakeSnapshot"
       * }
       */
      data: TakeSnapshot
      type: 'take_snapshot'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/PathGetInfo"
       * }
       */
      data: PathGetInfo
      type: 'path_get_info'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/PathSegmentInfo"
       * }
       */
      data: PathSegmentInfo
      type: 'path_segment_info'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/PathGetCurveUuidsForVertices"
       * }
       */
      data: PathGetCurveUuidsForVertices
      type: 'path_get_curve_uuids_for_vertices'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/PathGetCurveUuid"
       * }
       */
      data: PathGetCurveUuid
      type: 'path_get_curve_uuid'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/PathGetVertexUuids"
       * }
       */
      data: PathGetVertexUuids
      type: 'path_get_vertex_uuids'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/PathGetSketchTargetUuid"
       * }
       */
      data: PathGetSketchTargetUuid
      type: 'path_get_sketch_target_uuid'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/CurveGetEndPoints"
       * }
       */
      data: CurveGetEndPoints
      type: 'curve_get_end_points'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/FaceIsPlanar"
       * }
       */
      data: FaceIsPlanar
      type: 'face_is_planar'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/FaceGetPosition"
       * }
       */
      data: FaceGetPosition
      type: 'face_get_position'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/FaceGetCenter"
       * }
       */
      data: FaceGetCenter
      type: 'face_get_center'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/FaceGetGradient"
       * }
       */
      data: FaceGetGradient
      type: 'face_get_gradient'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/PlaneIntersectAndProject"
       * }
       */
      data: PlaneIntersectAndProject
      type: 'plane_intersect_and_project'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/ImportFiles"
       * }
       */
      data: ImportFiles
      type: 'import_files'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/ImportedGeometry"
       * }
       */
      data: ImportedGeometry
      type: 'imported_geometry'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Mass"
       * }
       */
      data: Mass
      type: 'mass'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Volume"
       * }
       */
      data: Volume
      type: 'volume'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Density"
       * }
       */
      data: Density
      type: 'density'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SurfaceArea"
       * }
       */
      data: SurfaceArea
      type: 'surface_area'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/CenterOfMass"
       * }
       */
      data: CenterOfMass
      type: 'center_of_mass'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/GetSketchModePlane"
       * }
       */
      data: GetSketchModePlane
      type: 'get_sketch_mode_plane'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EntityGetDistance"
       * }
       */
      data: EntityGetDistance
      type: 'entity_get_distance'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/FaceEdgeInfo"
       * }
       */
      data: FaceEdgeInfo
      type: 'face_edge_info'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EdgeInfo"
       * }
       */
      data: EdgeInfo
      type: 'edge_info'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EntityClone"
       * }
       */
      data: EntityClone
      type: 'entity_clone'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EntityLinearPatternTransform"
       * }
       */
      data: EntityLinearPatternTransform
      type: 'entity_linear_pattern_transform'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EntityLinearPattern"
       * }
       */
      data: EntityLinearPattern
      type: 'entity_linear_pattern'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EntityCircularPattern"
       * }
       */
      data: EntityCircularPattern
      type: 'entity_circular_pattern'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EntityMirror"
       * }
       */
      data: EntityMirror
      type: 'entity_mirror'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EntityMirrorAcrossEdge"
       * }
       */
      data: EntityMirrorAcrossEdge
      type: 'entity_mirror_across_edge'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EntityMakeHelix"
       * }
       */
      data: EntityMakeHelix
      type: 'entity_make_helix'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EntityMakeHelixFromParams"
       * }
       */
      data: EntityMakeHelixFromParams
      type: 'entity_make_helix_from_params'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/EntityMakeHelixFromEdge"
       * }
       */
      data: EntityMakeHelixFromEdge
      type: 'entity_make_helix_from_edge'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/Solid3dGetExtrusionFaceInfo"
       * }
       */
      data: Solid3dGetExtrusionFaceInfo
      type: 'solid3d_get_extrusion_face_info'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/ExtrusionFaceInfo"
       * }
       */
      data: ExtrusionFaceInfo
      type: 'extrusion_face_info'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/ComplementaryEdges"
       * }
       */
      data: ComplementaryEdges
      type: 'complementary_edges'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/AdjacencyInfo"
       * }
       */
      data: AdjacencyInfo
      type: 'adjacency_info'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SetGridReferencePlane"
       * }
       */
      data: SetGridReferencePlane
      type: 'set_grid_reference_plane'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/BooleanUnion"
       * }
       */
      data: BooleanUnion
      type: 'boolean_union'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/BooleanIntersection"
       * }
       */
      data: BooleanIntersection
      type: 'boolean_intersection'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/BooleanSubtract"
       * }
       */
      data: BooleanSubtract
      type: 'boolean_subtract'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SetGridScale"
       * }
       */
      data: SetGridScale
      type: 'set_grid_scale'
    }
  | {
      /**
       * {
       *   "$ref": "#/components/schemas/SetGridAutoScale"
       * }
       */
      data: SetGridAutoScale
      type: 'set_grid_auto_scale'
    }

export type OkWebSocketResponseData =
  | {
      data: {
        /** Information about the ICE servers. */
        ice_servers: IceServer[]
      }
      type: 'ice_server_info'
    }
  | {
      data: {
        /** Information about the ICE candidate. */
        candidate: RtcIceCandidateInit
      }
      type: 'trickle_ice'
    }
  | {
      data: {
        /** The session description. */
        answer: RtcSessionDescription
      }
      type: 'sdp_answer'
    }
  | {
      data: {
        /** The result of the command. */
        modeling_response: OkModelingCmdResponse
      }
      type: 'modeling'
    }
  | {
      data: {
        /** For each request in the batch, maps its ID to the request's outcome. */
        responses: { [key: string]: BatchResponse }
      }
      type: 'modeling_batch'
    }
  | {
      data: {
        /** The exported files */
        files: RawFile[]
      }
      type: 'export'
    }
  | { data: Record<string, unknown>; type: 'metrics_request' }
  | {
      data: {
        /** Data about the Modeling Session (application-level). */
        session: ModelingSessionData
      }
      type: 'modeling_session_data'
    }
  | { data: Record<string, unknown>; type: 'pong' }
  | {
      data: {
        /** Instance name. This may or may not mean something. */
        name: string
      }
      type: 'debug'
    }

export type OppositeForAngle = string

export type OppositeForLengthUnit = string

export interface Org {
  /**
   * {
   *   "nullable": true,
   *   "description": "If we should allow all future users who are created with email addresses from this domain to join the org."
   * }
   */
  allow_users_in_domain_to_auto_join?: boolean
  /** format:email, description:The billing email address of the org. */
  billing_email: string
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The date and time the billing email address was verified."
   * }
   */
  billing_email_verified?: string
  /** nullable:true, description:If the org should be blocked and the reason why. */
  block?: BlockReason
  /**
   * {
   *   "default": false,
   *   "description": "If we can train on the orgs's data. This value overrides any individual user's `can_train_on_data` value if they are a member of the org."
   * }
   */
  can_train_on_data?: boolean
  /** title:DateTime, format:date-time, description:The date and time the org was created. */
  created_at: string
  /** nullable:true, description:The org's domain. */
  domain?: string
  /** The unique identifier for the org. */
  id: Uuid
  /**
   * {
   *   "nullable": true,
   *   "title": "String",
   *   "format": "uri",
   *   "description": "The image for the org. This is a URL."
   * }
   */
  image?: string
  /** The name of the org. */
  name?: string
  /**
   * {
   *   "title": "String",
   *   "default": "",
   *   "format": "phone",
   *   "description": "The org's phone number."
   * }
   */
  phone?: string
  /** nullable:true, description:The org's stripe id. */
  stripe_id?: string
  /** title:DateTime, format:date-time, description:The date and time the org was last updated. */
  updated_at: string
}

export interface OrgDetails {
  /**
   * {
   *   "nullable": true,
   *   "description": "If we should allow all future users who are created with email addresses from this domain to join the org."
   * }
   */
  allow_users_in_domain_to_auto_join?: boolean
  /** format:email, description:The billing email address of the org. */
  billing_email?: string
  /** nullable:true, description:The org's domain. */
  domain?: string
  /**
   * {
   *   "nullable": true,
   *   "title": "String",
   *   "format": "uri",
   *   "description": "The image for the org. This is a URL."
   * }
   */
  image?: string
  /** The name of the org. */
  name?: string
  /**
   * {
   *   "title": "String",
   *   "default": "",
   *   "format": "phone",
   *   "description": "The org's phone number."
   * }
   */
  phone?: string
}

export interface OrgMember {
  /** The user's company. */
  company?: string
  /** title:DateTime, format:date-time, description:The date and time the user was created. */
  created_at: string
  /** The user's Discord handle. */
  discord?: string
  /** format:email, description:The email address of the user. */
  email?: string
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The date and time the email address was verified."
   * }
   */
  email_verified?: string
  /** The user's first name. */
  first_name?: string
  /** The user's GitHub handle. */
  github?: string
  /** The unique identifier for the user. */
  id: Uuid
  /** title:String, format:uri, description:The image avatar for the user. This is a URL. */
  image: string
  /** The user's last name. */
  last_name?: string
  /** The name of the user. This is auto populated at first from the authentication provider (if there was a name). It can be updated by the user by updating their `first_name` and `last_name` fields. */
  name?: string
  /**
   * {
   *   "title": "String",
   *   "default": "",
   *   "format": "phone",
   *   "description": "The user's phone number."
   * }
   */
  phone?: string
  /** The user's role in the org. */
  role: OrgRole
  /** title:DateTime, format:date-time, description:The date and time the user was last updated. */
  updated_at: string
}

export interface OrgMemberResultsPage {
  /** list of items on this page of results */
  items: OrgMember[]
  /**
   * {
   *   "nullable": true,
   *   "description": "token used to fetch the next page of results (if any)"
   * }
   */
  next_page?: string
}

export interface OrgResultsPage {
  /** list of items on this page of results */
  items: Org[]
  /**
   * {
   *   "nullable": true,
   *   "description": "token used to fetch the next page of results (if any)"
   * }
   */
  next_page?: string
}

export type OrgRole = 'admin' | 'member' | 'service_account'

export interface OrientToFace {
  /** Camera settings */
  settings: CameraSettings
}

export type OriginType =
  | { type: 'local' }
  | { type: 'global' }
  | {
      /** Custom origin point. */
      origin: Point3d
      type: 'custom'
    }

export interface OutputFile {
  /**
   * {
   *   "nullable": true,
   *   "description": "The contents of the file. This is base64 encoded so we can ensure it is UTF-8 for JSON."
   * }
   */
  contents?: string
  /** default:, description:The name of the file. */
  name?: string
}

export type OutputFormat2d = {
  /** Export storage. */
  storage: DxfStorage
  type: 'dxf'
}

export type OutputFormat3d =
  | {
      /** nullable:true, format:date-time, description:Timestamp override. */
      created?: string
      /** Specifies which kind of FBX will be exported. */
      storage: FbxStorage
      type: 'fbx'
    }
  | {
      /** Specifies how the JSON will be presented. */
      presentation: GltfPresentation
      /** Specifies which kind of glTF 2.0 will be exported. */
      storage: GltfStorage
      type: 'gltf'
    }
  | {
      /** Co-ordinate system of output data.

Defaults to the [KittyCAD co-ordinate system].

[KittyCAD co-ordinate system]: ../coord/constant.KITTYCAD.html */
      coords: System
      type: 'obj'
      /** Export length unit.

Defaults to millimeters. */
      units: UnitLength
    }
  | {
      /** Co-ordinate system of output data.

Defaults to the [KittyCAD co-ordinate system].

[KittyCAD co-ordinate system]: ../coord/constant.KITTYCAD.html */
      coords: System
      /** Export selection. */
      selection: Selection
      /** The storage for the output PLY file. */
      storage: PlyStorage
      type: 'ply'
      /** Export length unit.

Defaults to millimeters. */
      units: UnitLength
    }
  | {
      /** Co-ordinate system of output data.

Defaults to the [KittyCAD co-ordinate system].

[KittyCAD co-ordinate system]: ../coord/constant.KITTYCAD.html */
      coords: System
      /** nullable:true, format:date-time, description:Timestamp override. */
      created?: string
      type: 'step'
    }
  | {
      /** Co-ordinate system of output data.

Defaults to the [KittyCAD co-ordinate system].

[KittyCAD co-ordinate system]: ../coord/constant.KITTYCAD.html */
      coords: System
      /** Export selection. */
      selection: Selection
      /** Export storage. */
      storage: StlStorage
      type: 'stl'
      /** Export length unit.

Defaults to millimeters. */
      units: UnitLength
    }

export type PathCommand =
  /** The path component command type (within a Path) */
  'move_to' | 'line_to' | 'bez_curve_to' | 'nurbs_curve_to' | 'add_arc'

export type PathComponentConstraintBound =
  /** The path component constraint bounds type */
  'unconstrained' | 'partially_constrained' | 'fully_constrained'

export type PathComponentConstraintType =
  /** The path component constraint type */
  | 'unconstrained'
  | 'vertical'
  | 'horizontal'
  | 'equal_length'
  | 'parallel'
  | 'angle_between'

export interface PathGetCurveUuid {
  /** format:uuid, description:The UUID of the curve entity. */
  curve_id: string
}

export interface PathGetCurveUuidsForVertices {
  /**
   * {
   *   "format": "uuid"
   * }
   */
  curve_ids: string[]
}

export interface PathGetInfo {
  /** All segments in the path, in the order they were added. */
  segments: PathSegmentInfo[]
}

export interface PathGetSketchTargetUuid {
  /** nullable:true, format:uuid, description:The UUID of the sketch target. */
  target_id?: string
}

export interface PathGetVertexUuids {
  /**
   * {
   *   "format": "uuid"
   * }
   */
  vertex_ids: string[]
}

export type PathSegment =
  | {
      /** End point of the line. */
      end: Point3d
      /** Whether or not this line is a relative offset */
      relative: boolean
      type: 'line'
    }
  | {
      /** Center of the circle */
      center: Point2d
      /** End of the arc along circle's perimeter. */
      end: Angle
      /** Radius of the circle */
      radius: LengthUnit
      /** Whether or not this arc is a relative offset */
      relative: boolean
      /** Start of the arc along circle's perimeter. */
      start: Angle
      type: 'arc'
    }
  | {
      /** First control point. */
      control1: Point3d
      /** Second control point. */
      control2: Point3d
      /** Final control point. */
      end: Point3d
      /** Whether or not this bezier is a relative offset */
      relative: boolean
      type: 'bezier'
    }
  | {
      /** Offset of the arc. Negative values will arc clockwise. */
      offset: Angle
      /** Radius of the arc. Not to be confused with Raiders of the Lost Ark. */
      radius: LengthUnit
      type: 'tangential_arc'
    }
  | {
      /** nullable:true, description:0 will be interpreted as none/null. */
      angle_snap_increment?: Angle
      /** Where the arc should end. Must lie in the same plane as the current path pen position. Must not be colinear with current path pen position. */
      to: Point3d
      type: 'tangential_arc_to'
    }
  | {
      /** End point of the arc. */
      end: Point3d
      /** Interior point of the arc. */
      interior: Point3d
      /** Whether or not interior and end are relative to the previous path position */
      relative: boolean
      type: 'arc_to'
    }
  | {
      /** The angle to rotate the involute by. A value of zero will produce a curve with a tangent along the x-axis at the start point of the curve. */
      angle: Angle
      /** The involute is described between two circles, end_radius is the radius of the outer circle. */
      end_radius: LengthUnit
      /** If reverse is true, the segment will start from the end of the involute, otherwise it will start from that start. */
      reverse: boolean
      /** The involute is described between two circles, start_radius is the radius of the inner circle. */
      start_radius: LengthUnit
      type: 'circular_involute'
    }
  | {
      /** The center point of the ellipse. */
      center: Point2d
      /** End of the path along the perimeter of the ellipse. */
      end_angle: Angle
      /** Major axis of the ellipse. */
      major_axis: Point2d
      /** Minor radius of the ellipse. */
      minor_radius: LengthUnit
      /** Start of the path along the perimeter of the ellipse. */
      start_angle: Angle
      type: 'ellipse'
    }
  | {
      /** End point of the conic. */
      end: Point2d
      /** Tangent at the end of the conic. */
      end_tangent: Point2d
      /** Interior point that lies on the conic. */
      interior: Point2d
      /** Whether or not the interior and end points are relative to the previous path position. */
      relative: boolean
      /** Tangent at the start of the conic. */
      start_tangent: Point2d
      type: 'conic_to'
    }

export interface PathSegmentInfo {
  /** What is the path segment? */
  command: PathCommand
  /**
   * {
   *   "nullable": true,
   *   "description": "Which command created this path? This field is absent if the path command is not actually creating a path segment, e.g. moving the pen doesn't create a path segment."
   * }
   */
  command_id?: ModelingCmdId
  /** Whether or not this segment is a relative offset */
  relative: boolean
}

export interface PaymentIntent {
  /** The client secret is used for client-side retrieval using a publishable key. The client secret can be used to complete payment setup from your frontend. It should not be stored, logged, or exposed to anyone other than the customer. Make sure that you have TLS enabled on any page that includes the client secret. */
  client_secret: string
}

export interface PaymentMethod {
  /** The billing info for the payment method. */
  billing_info: BillingInfo
  /**
   * {
   *   "nullable": true,
   *   "description": "The card, if it is one. For our purposes, this is the only type of payment method that we support."
   * }
   */
  card?: CardDetails
  /** format:date-time, description:Time at which the object was created. */
  created_at: string
  /** Unique identifier for the object. */
  id?: string
  metadata?: { [key: string]: string }
  /** The type of payment method. */
  type: PaymentMethodType
}

export interface PaymentMethodCardChecks {
  /** If a address line1 was provided, results of the check, one of `pass`, `fail`, `unavailable`, or `unchecked`. */
  address_line1_check?: string
  /** If a address postal code was provided, results of the check, one of `pass`, `fail`, `unavailable`, or `unchecked`. */
  address_postal_code_check?: string
  /** If a CVC was provided, results of the check, one of `pass`, `fail`, `unavailable`, or `unchecked`. */
  cvc_check?: string
}

export type PaymentMethodType = 'card'

export interface PerspectiveCameraParameters {
  /** nullable:true, format:float, description:Camera frustum vertical field of view. */
  fov_y?: number
  /** nullable:true, format:float, description:Camera frustum far plane. */
  z_far?: number
  /** nullable:true, format:float, description:Camera frustum near plane. */
  z_near?: number
}

export type PlanInterval = 'day' | 'month' | 'week' | 'year'

export interface PlanStep {
  /** The edit instructions for the step. */
  edit_instructions: string
  /** The file path it's editing. */
  filepath_to_edit: string
}

export interface PlaneIntersectAndProject {
  /**
   * {
   *   "nullable": true,
   *   "description": "Corresponding coordinates of given window coordinates, intersected on given plane."
   * }
   */
  plane_coordinates?: Point2d
}

export interface PlaneSetColor {} /* Empty object */

export type PlyStorage = 'ascii' | 'binary_little_endian' | 'binary_big_endian'

export interface Point2d {
  /**
   * {
   *   "$ref": "#/components/schemas/LengthUnit"
   * }
   */
  x: LengthUnit
  /**
   * {
   *   "$ref": "#/components/schemas/LengthUnit"
   * }
   */
  y: LengthUnit
}

export interface Point3d {
  /**
   * {
   *   "format": "float"
   * }
   */
  x: number
  /**
   * {
   *   "format": "float"
   * }
   */
  y: number
  /**
   * {
   *   "format": "float"
   * }
   */
  z: number
}

export interface Point4d {
  /**
   * {
   *   "format": "float"
   * }
   */
  w: number
  /**
   * {
   *   "format": "float"
   * }
   */
  x: number
  /**
   * {
   *   "format": "float"
   * }
   */
  y: number
  /**
   * {
   *   "format": "float"
   * }
   */
  z: number
}

export interface Pong {
  /** The pong response. */
  message: string
}

export type PostEffectType =
  /** Post effect type */
  'phosphor' | 'ssao' | 'noeffect'

export interface PrivacySettings {
  /** If we can train on the data. If the user is a member of an organization, the organization's setting will override this. The organization's setting takes priority. */
  can_train_on_data: boolean
}

export interface ProjectEntityToPlane {
  /** Projected points. */
  projected_points: Point3d[]
}

export interface ProjectPointsToPlane {
  /** Projected points. */
  projected_points: Point3d[]
}

export interface RawFile {
  /**
   * {
   *   "format": "uint8",
   *   "minimum": 0
   * }
   */
  contents: number[]
  /** The name of the file. */
  name: string
}

export type ReasoningMessage =
  | {
      /** The content of the reasoning. */
      content: string
      type: 'text'
    }
  | {
      /** The content of the reasoning. */
      content: string
      type: 'markdown'
    }
  | {
      /** The content of the reasoning. */
      content: string
      type: 'kcl_docs'
    }
  | {
      /** The content of the reasoning. */
      content: string
      type: 'kcl_code_examples'
    }
  | {
      /** The content of the reasoning. */
      content: string
      type: 'feature_tree_outline'
    }
  | {
      /** The steps in the design plan. */
      steps: PlanStep[]
      type: 'design_plan'
    }
  | {
      /** The content of the reasoning. */
      code: string
      type: 'generated_kcl_code'
    }
  | {
      /** The error message. */
      error: string
      type: 'kcl_code_error'
    }
  | {
      /** The content of the file. */
      content: string
      /** The file name. */
      file_name: string
      type: 'created_kcl_file'
    }
  | {
      /** The content of the file. */
      content: string
      /** The file name. */
      file_name: string
      type: 'updated_kcl_file'
    }
  | {
      /** The file name. */
      file_name: string
      type: 'deleted_kcl_file'
    }

export interface ReconfigureStream {} /* Empty object */

export type RelativeTo = 'sketch_plane' | 'trajectory_curve'

export interface RemoveSceneObjects {} /* Empty object */

export interface Revolve {} /* Empty object */

export interface RevolveAboutEdge {} /* Empty object */

export interface Rotation {
  /** Rotate this far about the rotation axis. Defaults to zero (i.e. no rotation). */
  angle: Angle
  /** Rotation axis. Defaults to (0, 0, 1) (i.e. the Z axis). */
  axis: Point3d
  /** Origin of the rotation. If one isn't provided, the object will rotate about its own bounding box center. */
  origin: OriginType
}

export interface RtcIceCandidateInit {
  /** The candidate string associated with the object. */
  candidate: string
  /**
   * {
   *   "nullable": true,
   *   "format": "uint16",
   *   "minimum": 0,
   *   "description": "The index (starting at zero) of the m-line in the SDP this candidate is associated with."
   * }
   */
  sdpMLineIndex?: number
  /**
   * {
   *   "nullable": true,
   *   "description": "The identifier of the \"media stream identification\" as defined in [RFC 8841](https://tools.ietf.org/html/rfc8841)."
   * }
   */
  sdpMid?: string
  /**
   * {
   *   "nullable": true,
   *   "description": "The username fragment (as defined in [RFC 8445](https://tools.ietf.org/html/rfc8445#section-5.2.1)) associated with the object."
   * }
   */
  usernameFragment?: string
}

export type RtcSdpType =
  | 'unspecified'
  | 'offer'
  | 'pranswer'
  | 'answer'
  | 'rollback'

export interface RtcSessionDescription {
  /** SDP string. */
  sdp: string
  /** SDP type. */
  type: RtcSdpType
}

export interface SamlIdentityProvider {
  /** title:String, format:uri, description:The ACS (Assertion Consumer Service) url. */
  acs_url: string
  /**
   * {
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The date and time the SAML identity provider was created."
   * }
   */
  created_at: string
  /** The unique identifier for the SAML identity provider. */
  id: Uuid
  /** The entity ID of the SAML identity provider. */
  idp_entity_id?: string
  /** The metadata document as a string. */
  idp_metadata_document_string?: string
  /** The organization ID the SAML identity provider belongs to. */
  org_id: Uuid
  /**
   * {
   *   "nullable": true,
   *   "title": "String",
   *   "format": "byte",
   *   "description": "The private key for the SAML identity provider. This is the PEM corresponding to the X509 pair."
   * }
   */
  private_key?: string
  /**
   * {
   *   "nullable": true,
   *   "title": "String",
   *   "format": "byte",
   *   "description": "The public certificate for the SAML identity provider. This is the PEM corresponding to the X509 pair."
   * }
   */
  public_cert?: string
  /** title:String, format:uri, description:The SLO (Single Logout) url. */
  slo_url: string
  /**
   * {
   *   "format": "email",
   *   "description": "The technical contact email address for the SAML identity provider."
   * }
   */
  technical_contact_email?: string
  /**
   * {
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The date and time the SAML identity provider was last updated."
   * }
   */
  updated_at: string
}

export interface SamlIdentityProviderCreate {
  /** The entity ID of the SAML identity provider. */
  idp_entity_id?: string
  /** The source of an identity provider metadata descriptor. */
  idp_metadata_source: IdpMetadataSource
  /** nullable:true, description:The request signing key pair. */
  signing_keypair?: DerEncodedKeyPair
  /**
   * {
   *   "format": "email",
   *   "description": "The technical contact email address for the SAML identity provider."
   * }
   */
  technical_contact_email?: string
}

export interface SceneClearAll {} /* Empty object */

export type SceneSelectionType = 'replace' | 'add' | 'remove'

export type SceneToolType =
  /** The type of scene's active tool */
  | 'camera_revolve'
  | 'select'
  | 'move'
  | 'sketch_line'
  | 'sketch_tangential_arc'
  | 'sketch_curve'
  | 'sketch_curve_mod'

export interface SelectAdd {} /* Empty object */

export interface SelectClear {} /* Empty object */

export interface SelectGet {
  /**
   * {
   *   "format": "uuid"
   * }
   */
  entity_ids: string[]
}

export interface SelectRemove {} /* Empty object */

export interface SelectReplace {} /* Empty object */

export interface SelectWithPoint {
  /** nullable:true, format:uuid, description:The UUID of the entity that was selected. */
  entity_id?: string
}

export type Selection =
  | { type: 'default_scene' }
  | {
      /** format:uint, minimum:0, description:The index. */
      index: number
      type: 'scene_by_index'
    }
  | {
      /** The name. */
      name: string
      type: 'scene_by_name'
    }
  | {
      /** format:uint, minimum:0, description:The index. */
      index: number
      type: 'mesh_by_index'
    }
  | {
      /** The name. */
      name: string
      type: 'mesh_by_name'
    }

export interface SendObject {} /* Empty object */

export interface ServiceAccount {
  /** title:DateTime, format:date-time, description:The date and time the API token was created. */
  created_at: string
  /** The unique identifier for the API token. */
  id: Uuid
  /** If the token is valid. We never delete API tokens, but we can mark them as invalid. We save them for ever to preserve the history of the API token. */
  is_valid: boolean
  /** nullable:true, description:An optional label for the API token. */
  label?: string
  /** The ID of the organization that owns the API token. */
  org_id: Uuid
  /** The API token itself. */
  token: ServiceAccountUuid
  /** title:DateTime, format:date-time, description:The date and time the API token was last updated. */
  updated_at: string
}

export interface ServiceAccountResultsPage {
  /** list of items on this page of results */
  items: ServiceAccount[]
  /**
   * {
   *   "nullable": true,
   *   "description": "token used to fetch the next page of results (if any)"
   * }
   */
  next_page?: string
}

export type ServiceAccountUuid =
  /** An auth token. A uuid with a prefix of svc- */
  string

export interface Session {
  /** title:DateTime, format:date-time, description:The date and time the session was created. */
  created_at: string
  /** title:DateTime, format:date-time, description:The date and time the session expires. */
  expires: string
  /** The unique identifier for the session. */
  id: Uuid
  /** The session token. */
  session_token: SessionUuid
  /** title:DateTime, format:date-time, description:The date and time the session was last updated. */
  updated_at: string
  /** The user ID of the user that the session belongs to. */
  user_id: Uuid
}

export type SessionUuid =
  /** An auth token. A uuid with a prefix of ses- */
  string

export interface SetBackgroundColor {} /* Empty object */

export interface SetCurrentToolProperties {} /* Empty object */

export interface SetDefaultSystemProperties {} /* Empty object */

export interface SetGridAutoScale {} /* Empty object */

export interface SetGridReferencePlane {} /* Empty object */

export interface SetGridScale {} /* Empty object */

export interface SetObjectTransform {} /* Empty object */

export interface SetSceneUnits {} /* Empty object */

export interface SetSelectionFilter {} /* Empty object */

export interface SetSelectionType {} /* Empty object */

export interface SetTool {} /* Empty object */

export interface Shortlink {
  /** title:DateTime, format:date-time, description:The date and time the shortlink was created. */
  created_at: string
  /** The unique identifier for the shortlink. */
  id: Uuid
  /** The key of the shortlink. This is the short part of the URL. */
  key: string
  /** nullable:true, description:The organization ID of the shortlink. */
  org_id?: Uuid
  /** nullable:true, description:The hash of the password for the shortlink. */
  password_hash?: string
  /**
   * {
   *   "default": false,
   *   "description": "If the shortlink should be restricted to the organization. This only applies to org shortlinks. If you are creating a user shortlink and you are not a member of a team or enterprise and you try to set this to true, it will fail."
   * }
   */
  restrict_to_org?: boolean
  /** title:DateTime, format:date-time, description:The date and time the shortlink was last updated. */
  updated_at: string
  /** The ID of the user that made the shortlink. */
  user_id: Uuid
  /** title:String, format:uri, description:The URL the shortlink redirects to. */
  value: string
}

export interface ShortlinkResultsPage {
  /** list of items on this page of results */
  items: Shortlink[]
  /**
   * {
   *   "nullable": true,
   *   "description": "token used to fetch the next page of results (if any)"
   * }
   */
  next_page?: string
}

export interface SideFace {
  /** format:uuid, description:Desired ID for the resulting face. */
  face_id: string
  /** format:uuid, description:ID of the path this face is being extruded from. */
  path_id: string
}

export interface SketchModeDisable {} /* Empty object */

export interface Solid2dAddHole {} /* Empty object */

export interface Solid3dFilletEdge {} /* Empty object */

export interface Solid3dGetAdjacencyInfo {
  /** Details of each edge. */
  edges: AdjacencyInfo[]
}

export interface Solid3dGetAllEdgeFaces {
  /**
   * {
   *   "format": "uuid"
   * }
   */
  faces: string[]
}

export interface Solid3dGetAllOppositeEdges {
  /**
   * {
   *   "format": "uuid"
   * }
   */
  edges: string[]
}

export interface Solid3dGetCommonEdge {
  /** nullable:true, format:uuid, description:The UUID of the common edge, if any. */
  edge?: string
}

export interface Solid3dGetExtrusionFaceInfo {
  /** Details of each face. */
  faces: ExtrusionFaceInfo[]
}

export interface Solid3dGetNextAdjacentEdge {
  /** nullable:true, format:uuid, description:The UUID of the edge. */
  edge?: string
}

export interface Solid3dGetOppositeEdge {
  /** format:uuid, description:The UUID of the edge. */
  edge: string
}

export interface Solid3dGetPrevAdjacentEdge {
  /** nullable:true, format:uuid, description:The UUID of the edge. */
  edge?: string
}

export interface Solid3dShellFace {} /* Empty object */

export interface SourcePosition {
  /** format:uint32, minimum:0, description:The column number. */
  column: number
  /** format:uint32, minimum:0, description:The line number. */
  line: number
}

export interface SourceRange {
  /** The end of the range. */
  end: SourcePosition
  /** The start of the range. */
  start: SourcePosition
}

export interface SourceRangePrompt {
  /**
   * {
   *   "nullable": true,
   *   "description": "The name of the file the source range applies to. This is the relative path to the file from the root of the project. This only applies to multi-file iterations."
   * }
   */
  file?: string
  /** The prompt for the changes. */
  prompt: string
  /** The range of the source code to change. If you want to apply the prompt to the whole file, set the start to 0 and the end to the end of the file. */
  range: SourceRange
}

export interface StartPath {} /* Empty object */

export type StlStorage = 'ascii' | 'binary'

export interface StoreCouponParams {
  /** format:uint32, minimum:0, description:The percentage off. */
  percent_off: number
}

export interface Subscribe {
  /** format:email, description:The email */
  email: string
}

export interface SubscriptionTierFeature {
  /** minLength:1, maxLength:80, description:Information about the feature. */
  info: string
}

export type SubscriptionTierPrice =
  | {
      /** The interval the price is charged. */
      interval: PlanInterval
      /** title:double, format:money-usd, description:The price. */
      price: number
      type: 'flat'
    }
  | {
      /** The interval the price is charged. */
      interval: PlanInterval
      /** title:double, format:money-usd, description:The price. */
      price: number
      type: 'per_user'
    }
  | { type: 'enterprise' }

export type SubscriptionTierType =
  | { type: 'individual' }
  | {
      /** Whether or not the subscription type supports SAML SSO. */
      saml_sso: boolean
      type: 'organization'
    }

export type SubscriptionTrainingDataBehavior =
  | 'always'
  | 'default_on'
  | 'default_off'

export interface SuccessWebSocketResponse {
  /**
   * {
   *   "nullable": true,
   *   "format": "uuid",
   *   "description": "Which request this is a response to. If the request was a modeling command, this is the modeling command ID. If no request ID was sent, this will be null."
   * }
   */
  request_id?: string
  /** The data sent with a successful response. This will be flattened into a 'type' and 'data' field. */
  resp: OkWebSocketResponseData
  /** Always true */
  success: boolean
}

export type SupportTier =
  | 'community'
  | 'standard_email'
  | 'priority_email'
  | 'premium'

export interface SurfaceArea {
  /** The output unit for the surface area. */
  output_unit: UnitArea
  /** format:double, description:The surface area. */
  surface_area: number
}

export interface Sweep {} /* Empty object */

export interface System {
  /** Axis the front face of a model looks along. */
  forward: AxisDirectionPair
  /** Axis pointing up and away from a model. */
  up: AxisDirectionPair
}

export interface TakeSnapshot {
  /** title:String, format:byte, description:Contents of the image. */
  contents: string
}

export interface TextToCad {
  /**
   * {
   *   "nullable": true,
   *   "description": "The code for the model. This is optional but will be required in the future once we are at v1."
   * }
   */
  code?: string
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** The conversation ID Conversations group different prompts together. */
  conversation_id: Uuid
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** nullable:true, description:Feedback from the user, if any. */
  feedback?: MlFeedback
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** nullable:true, description:The version of kcl requested. */
  kcl_version?: string
  /** The model being used. */
  model: TextToCadModel
  /** The version of the model. */
  model_version: string
  /** The output format of the model. */
  output_format: FileExportFormat
  outputs?: {
    [key: string]: /**
     * {
     *   "title": "String",
     *   "format": "byte"
     * }
     */
    string
  }
  /** The prompt. */
  prompt: string
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export interface TextToCadCreateBody {
  /**
   * {
   *   "nullable": true,
   *   "description": "The version of kcl to use. If empty, the latest version will be used."
   * }
   */
  kcl_version?: string
  /**
   * {
   *   "nullable": true,
   *   "description": "The project name. This is used to tie the prompt to a project. Which helps us make our models better over time."
   * }
   */
  project_name?: string
  /** The prompt for the model. */
  prompt: string
}

export interface TextToCadIteration {
  /** The code for the new model. */
  code: string
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** The conversation ID Conversations group different prompts together. */
  conversation_id: Uuid
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** nullable:true, description:Feedback from the user, if any. */
  feedback?: MlFeedback
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** The model being used. */
  model: TextToCadModel
  /** The version of the model. */
  model_version: string
  /** The original source code for the model, previous to the changes. */
  original_source_code: string
  /**
   * {
   *   "nullable": true,
   *   "description": "The prompt for the overall changes. This is optional if you only want changes on specific source ranges."
   * }
   */
  prompt?: string
  /** The source ranges the user suggested to change. */
  source_ranges: SourceRangePrompt[]
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export interface TextToCadIterationBody {
  /**
   * {
   *   "nullable": true,
   *   "description": "The version of kcl to use. If empty, the latest version will be used."
   * }
   */
  kcl_version?: string
  /** The source code for the model (in kcl) that is to be edited. */
  original_source_code: string
  /**
   * {
   *   "nullable": true,
   *   "description": "The project name. This is used to tie the prompt to a project. Which helps us make our models better over time."
   * }
   */
  project_name?: string
  /**
   * {
   *   "nullable": true,
   *   "description": "The prompt for the model, if not using source ranges."
   * }
   */
  prompt?: string
  /** The source ranges the user suggested to change. If empty, the prompt will be used and is required. */
  source_ranges: SourceRangePrompt[]
}

export type TextToCadModel = 'cad' | 'kcl' | 'kcl_iteration'

export interface TextToCadMultiFileIteration {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** The conversation ID Conversations group different prompts together. */
  conversation_id: Uuid
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** nullable:true, description:Feedback from the user, if any. */
  feedback?: MlFeedback
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /**
   * {
   *   "nullable": true,
   *   "description": "The version of kcl to use. If empty, the latest version will be used."
   * }
   */
  kcl_version?: string
  /** The model being used. */
  model: TextToCadModel
  /** The version of the model. */
  model_version: string
  outputs?: { [key: string]: string }
  /**
   * {
   *   "nullable": true,
   *   "description": "The project name. This is used to tie the prompt to a project. Which helps us make our models better over time."
   * }
   */
  project_name?: string
  /**
   * {
   *   "nullable": true,
   *   "description": "The prompt for the overall changes. This is optional if you only want changes on specific source ranges. This will apply to all the files."
   * }
   */
  prompt?: string
  /** The source ranges the user suggested to change. */
  source_ranges: SourceRangePrompt[]
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export interface TextToCadMultiFileIterationBody {
  /**
   * {
   *   "nullable": true,
   *   "description": "The conversation ID Conversations group different prompts together. This should be omitted when starting a new conversation. The conversation_id returned in the response should be used to link future messages in the same conversation."
   * }
   */
  conversation_id?: Uuid
  /**
   * {
   *   "nullable": true,
   *   "description": "The version of kcl to use. If empty, the latest version will be used."
   * }
   */
  kcl_version?: string
  /**
   * {
   *   "nullable": true,
   *   "description": "The project name. This is used to tie the prompt to a project. Which helps us make our models better over time."
   * }
   */
  project_name?: string
  /**
   * {
   *   "nullable": true,
   *   "description": "The prompt for the overall changes. This is optional if you only want changes on specific source ranges. This will apply to all the files. If you want to apply a prompt to just a single file, use the source_ranges field and you can leave this empty."
   * }
   */
  prompt?: string
  /** The source ranges the user suggested to change. If empty, the prompt will be used and is required. */
  source_ranges?: SourceRangePrompt[]
}

export type TextToCadResponse =
  | {
      /**
       * {
       *   "nullable": true,
       *   "description": "The code for the model. This is optional but will be required in the future once we are at v1."
       * }
       */
      code?: string
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was completed."
       * }
       */
      completed_at?: string
      /** The conversation ID Conversations group different prompts together. */
      conversation_id: Uuid
      /** title:DateTime, format:date-time, description:The time and date the API call was created. */
      created_at: string
      /** nullable:true, description:The error the function returned, if any. */
      error?: string
      /** nullable:true, description:Feedback from the user, if any. */
      feedback?: MlFeedback
      /** The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid
      /** nullable:true, description:The version of kcl requested. */
      kcl_version?: string
      /** The model being used. */
      model: TextToCadModel
      /** The version of the model. */
      model_version: string
      /** The output format of the model. */
      output_format: FileExportFormat
      outputs?: {
        [key: string]: /**
         * {
         *   "title": "String",
         *   "format": "byte"
         * }
         */
        string
      }
      /** The prompt. */
      prompt: string
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was started."
       * }
       */
      started_at?: string
      /** The status of the API call. */
      status: ApiCallStatus
      type: 'text_to_cad'
      /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
      updated_at: string
      /** The user ID of the user who created the API call. */
      user_id: Uuid
    }
  | {
      /** The code for the new model. */
      code: string
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was completed."
       * }
       */
      completed_at?: string
      /** The conversation ID Conversations group different prompts together. */
      conversation_id: Uuid
      /** title:DateTime, format:date-time, description:The time and date the API call was created. */
      created_at: string
      /** nullable:true, description:The error the function returned, if any. */
      error?: string
      /** nullable:true, description:Feedback from the user, if any. */
      feedback?: MlFeedback
      /** The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid
      /** The model being used. */
      model: TextToCadModel
      /** The version of the model. */
      model_version: string
      /** The original source code for the model, previous to the changes. */
      original_source_code: string
      /**
       * {
       *   "nullable": true,
       *   "description": "The prompt for the overall changes. This is optional if you only want changes on specific source ranges."
       * }
       */
      prompt?: string
      /** The source ranges the user suggested to change. */
      source_ranges: SourceRangePrompt[]
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was started."
       * }
       */
      started_at?: string
      /** The status of the API call. */
      status: ApiCallStatus
      type: 'text_to_cad_iteration'
      /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
      updated_at: string
      /** The user ID of the user who created the API call. */
      user_id: Uuid
    }
  | {
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was completed."
       * }
       */
      completed_at?: string
      /** The conversation ID Conversations group different prompts together. */
      conversation_id: Uuid
      /** title:DateTime, format:date-time, description:The time and date the API call was created. */
      created_at: string
      /** nullable:true, description:The error the function returned, if any. */
      error?: string
      /** nullable:true, description:Feedback from the user, if any. */
      feedback?: MlFeedback
      /** The unique identifier of the API call.

This is the same as the API call ID. */
      id: Uuid
      /**
       * {
       *   "nullable": true,
       *   "description": "The version of kcl to use. If empty, the latest version will be used."
       * }
       */
      kcl_version?: string
      /** The model being used. */
      model: TextToCadModel
      /** The version of the model. */
      model_version: string
      outputs?: { [key: string]: string }
      /**
       * {
       *   "nullable": true,
       *   "description": "The project name. This is used to tie the prompt to a project. Which helps us make our models better over time."
       * }
       */
      project_name?: string
      /**
       * {
       *   "nullable": true,
       *   "description": "The prompt for the overall changes. This is optional if you only want changes on specific source ranges. This will apply to all the files."
       * }
       */
      prompt?: string
      /** The source ranges the user suggested to change. */
      source_ranges: SourceRangePrompt[]
      /**
       * {
       *   "nullable": true,
       *   "title": "DateTime",
       *   "format": "date-time",
       *   "description": "The time and date the API call was started."
       * }
       */
      started_at?: string
      /** The status of the API call. */
      status: ApiCallStatus
      type: 'text_to_cad_multi_file_iteration'
      /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
      updated_at: string
      /** The user ID of the user who created the API call. */
      user_id: Uuid
    }

export interface TextToCadResponseResultsPage {
  /** list of items on this page of results */
  items: TextToCadResponse[]
  /**
   * {
   *   "nullable": true,
   *   "description": "token used to fetch the next page of results (if any)"
   * }
   */
  next_page?: string
}

export interface TokenRevokeRequestForm {
  /** format:uuid, description:The client ID. */
  client_id: string
  /** nullable:true, description:The client secret. */
  client_secret?: string
  /** The token to revoke. */
  token: DeviceAccessTokenUuid
}

export interface Transform {
  /**
   * {
   *   "default": true,
   *   "description": "Whether to replicate the original solid in this instance."
   * }
   */
  replicate?: boolean
  /**
   * {
   *   "default": {
   *     "angle": {
   *       "unit": "degrees",
   *       "value": 0
   *     },
   *     "axis": {
   *       "x": 0,
   *       "y": 0,
   *       "z": 1
   *     },
   *     "origin": {
   *       "type": "local"
   *     }
   *   },
   *   "description": "Rotate the replica about the specified rotation axis and origin. Defaults to no rotation."
   * }
   */
  rotation?: Rotation
  /**
   * {
   *   "default": {
   *     "x": 1,
   *     "y": 1,
   *     "z": 1
   *   },
   *   "description": "Scale the replica's size along each axis. Defaults to (1, 1, 1) (i.e. the same size as the original)."
   * }
   */
  scale?: Point3d
  /**
   * {
   *   "default": {
   *     "x": 0,
   *     "y": 0,
   *     "z": 0
   *   },
   *   "description": "Translate the replica this far along each dimension. Defaults to zero vector (i.e. same position as the original)."
   * }
   */
  translate?: Point3d
}

export interface TransformByForPoint3d {
  /**
   * {
   *   "deprecated": true,
   *   "description": "If true, the transform is applied in local space. If false, the transform is applied in global space."
   * }
   */
  is_local: boolean
  /**
   * {
   *   "nullable": true,
   *   "description": "What to use as the origin for the transformation. If not provided, will fall back to local or global origin, depending on whatever the `is_local` field was set to."
   * }
   */
  origin?: OriginType
  /** The scale, or rotation, or translation. */
  property: Point3d
  /** If true, overwrite the previous value with this. If false, the previous value will be modified. E.g. when translating, `set=true` will set a new location, and `set=false` will translate the current location by the given X/Y/Z. */
  set: boolean
}

export interface TransformByForPoint4d {
  /**
   * {
   *   "deprecated": true,
   *   "description": "If true, the transform is applied in local space. If false, the transform is applied in global space."
   * }
   */
  is_local: boolean
  /**
   * {
   *   "nullable": true,
   *   "description": "What to use as the origin for the transformation. If not provided, will fall back to local or global origin, depending on whatever the `is_local` field was set to."
   * }
   */
  origin?: OriginType
  /** The scale, or rotation, or translation. */
  property: Point4d
  /** If true, overwrite the previous value with this. If false, the previous value will be modified. E.g. when translating, `set=true` will set a new location, and `set=false` will translate the current location by the given X/Y/Z. */
  set: boolean
}

export interface TwistExtrude {} /* Empty object */

export type UnitAngle = 'degrees' | 'radians'

export interface UnitAngleConversion {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** default:0, format:double, description:The input value. */
  input?: number
  /** The source format of the unit conversion. */
  input_unit: UnitAngle
  /** nullable:true, format:double, description:The resulting value. */
  output?: number
  /** The output format of the unit conversion. */
  output_unit: UnitAngle
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export type UnitArea =
  | 'cm2'
  | 'dm2'
  | 'ft2'
  | 'in2'
  | 'km2'
  | 'm2'
  | 'mm2'
  | 'yd2'

export interface UnitAreaConversion {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** default:0, format:double, description:The input value. */
  input?: number
  /** The source format of the unit conversion. */
  input_unit: UnitArea
  /** nullable:true, format:double, description:The resulting value. */
  output?: number
  /** The output format of the unit conversion. */
  output_unit: UnitArea
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export type UnitCurrent =
  | 'amperes'
  | 'microamperes'
  | 'milliamperes'
  | 'nanoamperes'

export interface UnitCurrentConversion {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** default:0, format:double, description:The input value. */
  input?: number
  /** The source format of the unit conversion. */
  input_unit: UnitCurrent
  /** nullable:true, format:double, description:The resulting value. */
  output?: number
  /** The output format of the unit conversion. */
  output_unit: UnitCurrent
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export type UnitDensity = 'lb:ft3' | 'kg:m3'

export type UnitEnergy =
  | 'btu'
  | 'electronvolts'
  | 'joules'
  | 'kilocalories'
  | 'kilowatt_hours'
  | 'watt_hours'

export interface UnitEnergyConversion {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** default:0, format:double, description:The input value. */
  input?: number
  /** The source format of the unit conversion. */
  input_unit: UnitEnergy
  /** nullable:true, format:double, description:The resulting value. */
  output?: number
  /** The output format of the unit conversion. */
  output_unit: UnitEnergy
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export type UnitForce =
  | 'dynes'
  | 'kiloponds'
  | 'micronewtons'
  | 'millinewtons'
  | 'newtons'
  | 'poundals'
  | 'pounds'

export interface UnitForceConversion {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** default:0, format:double, description:The input value. */
  input?: number
  /** The source format of the unit conversion. */
  input_unit: UnitForce
  /** nullable:true, format:double, description:The resulting value. */
  output?: number
  /** The output format of the unit conversion. */
  output_unit: UnitForce
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export type UnitFrequency =
  | 'gigahertz'
  | 'hertz'
  | 'kilohertz'
  | 'megahertz'
  | 'microhertz'
  | 'millihertz'
  | 'nanohertz'
  | 'terahertz'

export interface UnitFrequencyConversion {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** default:0, format:double, description:The input value. */
  input?: number
  /** The source format of the unit conversion. */
  input_unit: UnitFrequency
  /** nullable:true, format:double, description:The resulting value. */
  output?: number
  /** The output format of the unit conversion. */
  output_unit: UnitFrequency
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export type UnitLength = 'cm' | 'ft' | 'in' | 'm' | 'mm' | 'yd'

export interface UnitLengthConversion {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** default:0, format:double, description:The input value. */
  input?: number
  /** The source format of the unit conversion. */
  input_unit: UnitLength
  /** nullable:true, format:double, description:The resulting value. */
  output?: number
  /** The output format of the unit conversion. */
  output_unit: UnitLength
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export type UnitMass = 'g' | 'kg' | 'lb'

export interface UnitMassConversion {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** default:0, format:double, description:The input value. */
  input?: number
  /** The source format of the unit conversion. */
  input_unit: UnitMass
  /** nullable:true, format:double, description:The resulting value. */
  output?: number
  /** The output format of the unit conversion. */
  output_unit: UnitMass
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export type UnitPower =
  | 'btu_per_minute'
  | 'horsepower'
  | 'kilowatts'
  | 'metric_horsepower'
  | 'microwatts'
  | 'milliwatts'
  | 'watts'

export interface UnitPowerConversion {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** default:0, format:double, description:The input value. */
  input?: number
  /** The source format of the unit conversion. */
  input_unit: UnitPower
  /** nullable:true, format:double, description:The resulting value. */
  output?: number
  /** The output format of the unit conversion. */
  output_unit: UnitPower
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export type UnitPressure =
  | 'atmospheres'
  | 'bars'
  | 'hectopascals'
  | 'kilopascals'
  | 'millibars'
  | 'pascals'
  | 'psi'

export interface UnitPressureConversion {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** default:0, format:double, description:The input value. */
  input?: number
  /** The source format of the unit conversion. */
  input_unit: UnitPressure
  /** nullable:true, format:double, description:The resulting value. */
  output?: number
  /** The output format of the unit conversion. */
  output_unit: UnitPressure
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export type UnitTemperature = 'celsius' | 'fahrenheit' | 'kelvin' | 'rankine'

export interface UnitTemperatureConversion {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** default:0, format:double, description:The input value. */
  input?: number
  /** The source format of the unit conversion. */
  input_unit: UnitTemperature
  /** nullable:true, format:double, description:The resulting value. */
  output?: number
  /** The output format of the unit conversion. */
  output_unit: UnitTemperature
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export type UnitTorque = 'newton_metres' | 'pound_foot'

export interface UnitTorqueConversion {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** default:0, format:double, description:The input value. */
  input?: number
  /** The source format of the unit conversion. */
  input_unit: UnitTorque
  /** nullable:true, format:double, description:The resulting value. */
  output?: number
  /** The output format of the unit conversion. */
  output_unit: UnitTorque
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export type UnitVolume =
  | 'cm3'
  | 'ft3'
  | 'in3'
  | 'm3'
  | 'yd3'
  | 'usfloz'
  | 'usgal'
  | 'l'
  | 'ml'

export interface UnitVolumeConversion {
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was completed."
   * }
   */
  completed_at?: string
  /** title:DateTime, format:date-time, description:The time and date the API call was created. */
  created_at: string
  /** nullable:true, description:The error the function returned, if any. */
  error?: string
  /** The unique identifier of the API call.

This is the same as the API call ID. */
  id: Uuid
  /** default:0, format:double, description:The input value. */
  input?: number
  /** The source format of the unit conversion. */
  input_unit: UnitVolume
  /** nullable:true, format:double, description:The resulting value. */
  output?: number
  /** The output format of the unit conversion. */
  output_unit: UnitVolume
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The time and date the API call was started."
   * }
   */
  started_at?: string
  /** The status of the API call. */
  status: ApiCallStatus
  /** title:DateTime, format:date-time, description:The time and date the API call was last updated. */
  updated_at: string
  /** The user ID of the user who created the API call. */
  user_id: Uuid
}

export interface UpdateAnnotation {} /* Empty object */

export interface UpdateMemberToOrgBody {
  /** The organization role to give the user. */
  role: UserOrgRole
}

export interface UpdatePaymentBalance {
  /**
   * {
   *   "nullable": true,
   *   "title": "double",
   *   "format": "money-usd",
   *   "description": "The monetary value of the monthy API credits remaining in the balance. This gets re-upped every month,"
   * }
   */
  monthly_api_credits_remaining_monetary_value?: number
  /**
   * {
   *   "nullable": true,
   *   "title": "double",
   *   "format": "money-usd",
   *   "description": "The monetary value of stable API credits remaining in the balance. These do not get reset or re-upped every month. This is separate from the monthly credits. Credits will first pull from the monthly credits, then the stable credits. Stable just means that they do not get reset every month. A user will have stable credits if a Zoo employee granted them credits."
   * }
   */
  stable_api_credits_remaining_monetary_value?: number
}

export interface UpdateShortlinkRequest {
  /**
   * {
   *   "nullable": true,
   *   "description": "The password for the shortlink, if you want to restrict access to it. This can only be set if your subscription allows for it. Otherwise, it will return an error. When you access the link it will be required to enter this password through basic auth. The username will be `{anything}` and the password will be the password you set here."
   * }
   */
  password?: string
  /** If the shortlink should be restricted to the user's organization to view. This only applies to org shortlinks. If you are creating a user shortlink and you are not a member of a team or enterprise and you try to set this to true, it will fail. */
  restrict_to_org: boolean
}

export interface UpdateUser {
  /** The user's company. */
  company?: string
  /** The user's Discord handle. */
  discord?: string
  /** The user's first name. */
  first_name?: string
  /** The user's GitHub handle. */
  github?: string
  /**
   * {
   *   "title": "String",
   *   "format": "uri",
   *   "description": "The image URL for the user. NOTE: If the user uses an OAuth2 provider, this will be overwritten by the provider's image URL when the user logs in next."
   * }
   */
  image: string
  /** nullable:true, description:If the user is now onboarded. */
  is_onboarded?: boolean
  /** The user's last name. */
  last_name?: string
  /**
   * {
   *   "title": "String",
   *   "default": "",
   *   "format": "phone",
   *   "description": "The user's phone number."
   * }
   */
  phone?: string
}

export interface User {
  /** nullable:true, description:If the user should be blocked and the reason why. */
  block?: BlockReason
  /**
   * {
   *   "default": false,
   *   "description": "If we can train on the user's data. If the user is a member of an organization, the organization's setting will override this."
   * }
   */
  can_train_on_data?: boolean
  /** The user's company. */
  company?: string
  /** title:DateTime, format:date-time, description:The date and time the user was created. */
  created_at: string
  /** default:false, description:If the user is scheduled for deletion. */
  deletion_scheduled?: boolean
  /** The user's Discord handle. */
  discord?: string
  /** format:email, description:The email address of the user. */
  email?: string
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The date and time the email address was verified."
   * }
   */
  email_verified?: string
  /** The user's first name. */
  first_name?: string
  /** The user's GitHub handle. */
  github?: string
  /** The unique identifier for the user. */
  id: Uuid
  /** title:String, format:uri, description:The image avatar for the user. This is a URL. */
  image: string
  /** default:false, description:If the user has finished onboarding. */
  is_onboarded?: boolean
  /** default:false, description:If the user is tied to a service account. */
  is_service_account?: boolean
  /** The user's last name. */
  last_name?: string
  /** The name of the user. This is auto populated at first from the authentication provider (if there was a name). It can be updated by the user by updating their `first_name` and `last_name` fields. */
  name?: string
  /**
   * {
   *   "title": "String",
   *   "default": "",
   *   "format": "phone",
   *   "description": "The user's phone number."
   * }
   */
  phone?: string
  /** title:DateTime, format:date-time, description:The date and time the user was last updated. */
  updated_at: string
}

export type UserIdentifier = string

export interface UserOrgInfo {
  /**
   * {
   *   "nullable": true,
   *   "description": "If we should allow all future users who are created with email addresses from this domain to join the org."
   * }
   */
  allow_users_in_domain_to_auto_join?: boolean
  /** format:email, description:The billing email address of the org. */
  billing_email?: string
  /**
   * {
   *   "nullable": true,
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The date and time the billing email address was verified."
   * }
   */
  billing_email_verified?: string
  /** nullable:true, description:If the org should be blocked and the reason why. */
  block?: BlockReason
  /** title:DateTime, format:date-time, description:The date and time the org was created. */
  created_at: string
  /** nullable:true, description:The org's domain. */
  domain?: string
  /** The unique identifier for the org. */
  id: Uuid
  /**
   * {
   *   "nullable": true,
   *   "title": "String",
   *   "format": "uri",
   *   "description": "The image for the org. This is a URL."
   * }
   */
  image?: string
  /** The name of the org. */
  name?: string
  /**
   * {
   *   "title": "String",
   *   "default": "",
   *   "format": "phone",
   *   "description": "The org's phone number."
   * }
   */
  phone?: string
  /** The user's role in the org. */
  role: OrgRole
  /** nullable:true, description:The org's stripe id. */
  stripe_id?: string
  /** title:DateTime, format:date-time, description:The date and time the org was last updated. */
  updated_at: string
}

export type UserOrgRole = 'admin' | 'member'

export interface UserResultsPage {
  /** list of items on this page of results */
  items: User[]
  /**
   * {
   *   "nullable": true,
   *   "description": "token used to fetch the next page of results (if any)"
   * }
   */
  next_page?: string
}

export type Uuid =
  /** format:uuid, description:A UUID usually v4 or v7 */
  string

export interface VerificationTokenResponse {
  /**
   * {
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The date and time the verification token was created."
   * }
   */
  created_at: string
  /** title:DateTime, format:date-time, description:The date and time the verification token expires. */
  expires: string
  /** The token used for verification. This is used as the id for the table since it is unique per record. */
  id: Uuid
  /**
   * {
   *   "format": "email",
   *   "description": "The identifier for the user. This is typically the user's email address since that is what we are verifying."
   * }
   */
  identifier?: string
  /**
   * {
   *   "nullable": true,
   *   "title": "String",
   *   "format": "uri",
   *   "description": "The URL to redirect to if the user requires SAML authentication or belongs somewhere else."
   * }
   */
  redirect_url?: string
  /**
   * {
   *   "title": "DateTime",
   *   "format": "date-time",
   *   "description": "The date and time the verification token was last updated."
   * }
   */
  updated_at: string
}

export interface ViewIsometric {
  /** Camera settings */
  settings: CameraSettings
}

export interface Volume {
  /** The output unit for the volume. */
  output_unit: UnitVolume
  /** format:double, description:The volume. */
  volume: number
}

export type WebSocketRequest =
  | {
      /** Information about the ICE candidate. */
      candidate: RtcIceCandidateInit
      type: 'trickle_ice'
    }
  | {
      /** The session description. */
      offer: RtcSessionDescription
      type: 'sdp_offer'
    }
  | {
      /** Which command to submit to the Kittycad engine. */
      cmd: ModelingCmd
      /** ID of command being submitted. */
      cmd_id: ModelingCmdId
      type: 'modeling_cmd_req'
    }
  | {
      /** ID of batch being submitted. Each request has their own individual ModelingCmdId, but this is the ID of the overall batch. */
      batch_id: ModelingCmdId
      /** A sequence of modeling requests. If any request fails, following requests will not be tried. */
      requests: ModelingCmdReq[]
      /**
       * {
       *   "default": false,
       *   "description": "If false or omitted, responses to each batch command will just be Ok(()). If true, responses will be the actual response data for that modeling command."
       * }
       */
      responses?: boolean
      type: 'modeling_cmd_batch_req'
    }
  | { type: 'ping' }
  | {
      /** Collected metrics from the Client's end of the engine connection. */
      metrics: ClientMetrics
      type: 'metrics_response'
    }
  | { type: 'debug' }
  | { headers: { [key: string]: string }; type: 'headers' }

export type WebSocketResponse =
  | {
      /**
       * {
       *   "nullable": true,
       *   "format": "uuid",
       *   "description": "Which request this is a response to. If the request was a modeling command, this is the modeling command ID. If no request ID was sent, this will be null."
       * }
       */
      request_id?: string
      /** The data sent with a successful response. This will be flattened into a 'type' and 'data' field. */
      resp: OkWebSocketResponseData
      /** Always true */
      success: boolean
    }
  | {
      /** The errors that occurred. */
      errors: ApiError[]
      /**
       * {
       *   "nullable": true,
       *   "format": "uuid",
       *   "description": "Which request this is a response to. If the request was a modeling command, this is the modeling command ID. If no request ID was sent, this will be null."
       * }
       */
      request_id?: string
      /** Always false */
      success: boolean
    }

export type WorldCoordinateSystem = 'right_handed_up_z' | 'right_handed_up_y'

export type ZooProductSubscription = {
  /**
   * {
   *   "nullable": true,
   *   "format": "double",
   *   "description": "Annual discount. The percentage off the monthly price if the user pays annually."
   * }
   */
  annual_discount?: number
  /** A description of the tier. */
  description: string
  /** The Zoo API endpoints that are included when through an approved zoo tool. */
  endpoints_included?: ApiEndpoint[]
  /** minItems:0, maxItems:15, description:Features that are included in the subscription. */
  features?: SubscriptionTierFeature[]
  /**
   * {
   *   "default": 0,
   *   "format": "uint64",
   *   "minimum": 0,
   *   "description": "The amount of pay-as-you-go API credits the individual or org gets outside the modeling app per month. This re-ups on the 1st of each month. This is equivalent to the monetary value divided by the price of an API credit."
   * }
   */
  monthly_pay_as_you_go_api_credits?: number
  /**
   * {
   *   "title": "double",
   *   "format": "money-usd",
   *   "description": "The monetary value of pay-as-you-go API credits the individual or org gets outside the modeling app per month. This re-ups on the 1st of each month."
   * }
   */
  monthly_pay_as_you_go_api_credits_monetary_value: number
  /** The name of the tier. */
  name: ModelingAppSubscriptionTierName
  /**
   * {
   *   "title": "double",
   *   "default": 0,
   *   "format": "money-usd",
   *   "description": "The price of an API credit (meaning 1 credit = 1 minute of API usage)."
   * }
   */
  pay_as_you_go_api_credit_price?: number
  /** The price of the tier per month. If this is for an individual, this is the price they pay. If this is for an organization, this is the price the organization pays per member in the org. This is in USD. */
  price: SubscriptionTierPrice
  /** The options for sharable links through the modeling app. */
  share_links?: ModelingAppShareLinks[]
  /** The support tier the subscription provides. */
  support_tier: SupportTier
  /** The behavior of the users data (can it be used for training, etc). */
  training_data_behavior: SubscriptionTrainingDataBehavior
  /** If the tier is offered for an individual or an org. */
  type: SubscriptionTierType
  /** The Zoo tools that you can call unlimited times with this tier. */
  zoo_tools_included?: ZooTool[]
}

export interface ZooProductSubscriptions {
  /** A modeling app subscription. */
  modeling_app: ModelingAppSubscriptionTier
}

export interface ZooProductSubscriptionsOrgRequest {
  /** default:team, description:A modeling app subscription. */
  modeling_app?: ModelingAppOrganizationSubscriptionTier
  /**
   * {
   *   "nullable": true,
   *   "description": "If the customer chooses to pay annually or monthly, we can add that here. The annual discount will apply if there is a discount for the subscription."
   * }
   */
  pay_annually?: boolean
}

export interface ZooProductSubscriptionsUserRequest {
  /** default:free, description:A modeling app subscription. */
  modeling_app?: ModelingAppIndividualSubscriptionTier
  /**
   * {
   *   "nullable": true,
   *   "description": "If the customer chooses to pay annually or monthly, we can add that here. The annual discount will apply if there is a discount for the subscription."
   * }
   */
  pay_annually?: boolean
}

export type ZooTool = 'modeling_app' | 'diff_chrome_extension' | 'text_to_cad'

export interface ZoomToFit {
  /** Camera settings */
  settings: CameraSettings
}

export interface Models {
  AccountProvider: AccountProvider
  AddHoleFromOffset: AddHoleFromOffset
  AddOrgMember: AddOrgMember
  AddressDetails: AddressDetails
  AdjacencyInfo: AdjacencyInfo
  Angle: Angle
  AnnotationLineEnd: AnnotationLineEnd
  AnnotationLineEndOptions: AnnotationLineEndOptions
  AnnotationOptions: AnnotationOptions
  AnnotationTextAlignmentX: AnnotationTextAlignmentX
  AnnotationTextAlignmentY: AnnotationTextAlignmentY
  AnnotationTextOptions: AnnotationTextOptions
  AnnotationType: AnnotationType
  ApiCallQueryGroup: ApiCallQueryGroup
  ApiCallQueryGroupBy: ApiCallQueryGroupBy
  ApiCallStatus: ApiCallStatus
  ApiCallWithPrice: ApiCallWithPrice
  ApiCallWithPriceResultsPage: ApiCallWithPriceResultsPage
  ApiEndpoint: ApiEndpoint
  ApiError: ApiError
  ApiToken: ApiToken
  ApiTokenResultsPage: ApiTokenResultsPage
  ApiTokenUuid: ApiTokenUuid
  AppClientInfo: AppClientInfo
  AsyncApiCall: AsyncApiCall
  AsyncApiCallOutput: AsyncApiCallOutput
  AsyncApiCallResultsPage: AsyncApiCallResultsPage
  AsyncApiCallType: AsyncApiCallType
  AuthApiKeyResponse: AuthApiKeyResponse
  AuthCallback: AuthCallback
  Axis: Axis
  AxisDirectionPair: AxisDirectionPair
  BatchResponse: BatchResponse
  BillingInfo: BillingInfo
  BlockReason: BlockReason
  BooleanIntersection: BooleanIntersection
  BooleanSubtract: BooleanSubtract
  BooleanUnion: BooleanUnion
  CameraDragEnd: CameraDragEnd
  CameraDragInteractionType: CameraDragInteractionType
  CameraDragMove: CameraDragMove
  CameraDragStart: CameraDragStart
  CameraMovement: CameraMovement
  CameraSettings: CameraSettings
  CameraViewState: CameraViewState
  CardDetails: CardDetails
  CenterOfMass: CenterOfMass
  ClientMetrics: ClientMetrics
  ClosePath: ClosePath
  CodeLanguage: CodeLanguage
  CodeOption: CodeOption
  CodeOutput: CodeOutput
  Color: Color
  ComplementaryEdges: ComplementaryEdges
  ComponentTransform: ComponentTransform
  Conversation: Conversation
  ConversationResultsPage: ConversationResultsPage
  ConversionParams: ConversionParams
  CountryCode: CountryCode
  Coupon: Coupon
  CreateShortlinkRequest: CreateShortlinkRequest
  CreateShortlinkResponse: CreateShortlinkResponse
  CreatedAtSortMode: CreatedAtSortMode
  CrmData: CrmData
  Currency: Currency
  CurveGetControlPoints: CurveGetControlPoints
  CurveGetEndPoints: CurveGetEndPoints
  CurveGetType: CurveGetType
  CurveSetConstraint: CurveSetConstraint
  CurveType: CurveType
  Customer: Customer
  CustomerBalance: CustomerBalance
  CutStrategy: CutStrategy
  CutType: CutType
  DefaultCameraCenterToScene: DefaultCameraCenterToScene
  DefaultCameraCenterToSelection: DefaultCameraCenterToSelection
  DefaultCameraFocusOn: DefaultCameraFocusOn
  DefaultCameraGetSettings: DefaultCameraGetSettings
  DefaultCameraGetView: DefaultCameraGetView
  DefaultCameraLookAt: DefaultCameraLookAt
  DefaultCameraPerspectiveSettings: DefaultCameraPerspectiveSettings
  DefaultCameraSetOrthographic: DefaultCameraSetOrthographic
  DefaultCameraSetPerspective: DefaultCameraSetPerspective
  DefaultCameraSetView: DefaultCameraSetView
  DefaultCameraZoom: DefaultCameraZoom
  Density: Density
  DerEncodedKeyPair: DerEncodedKeyPair
  DeviceAccessTokenRequestForm: DeviceAccessTokenRequestForm
  DeviceAccessTokenUuid: DeviceAccessTokenUuid
  DeviceAuthConfirmParams: DeviceAuthConfirmParams
  DeviceAuthRequestForm: DeviceAuthRequestForm
  Direction: Direction
  DisableDryRun: DisableDryRun
  Discount: Discount
  DiscountCode: DiscountCode
  DistanceType: DistanceType
  DxfStorage: DxfStorage
  EdgeInfo: EdgeInfo
  EdgeLinesVisible: EdgeLinesVisible
  EmailAuthenticationForm: EmailAuthenticationForm
  EnableDryRun: EnableDryRun
  EnableSketchMode: EnableSketchMode
  EngineUtilEvaluatePath: EngineUtilEvaluatePath
  EnterpriseSubscriptionTierPrice: EnterpriseSubscriptionTierPrice
  EntityCircularPattern: EntityCircularPattern
  EntityClone: EntityClone
  EntityFade: EntityFade
  EntityGetAllChildUuids: EntityGetAllChildUuids
  EntityGetChildUuid: EntityGetChildUuid
  EntityGetDistance: EntityGetDistance
  EntityGetNumChildren: EntityGetNumChildren
  EntityGetParentId: EntityGetParentId
  EntityGetSketchPaths: EntityGetSketchPaths
  EntityLinearPattern: EntityLinearPattern
  EntityLinearPatternTransform: EntityLinearPatternTransform
  EntityMakeHelix: EntityMakeHelix
  EntityMakeHelixFromEdge: EntityMakeHelixFromEdge
  EntityMakeHelixFromParams: EntityMakeHelixFromParams
  EntityMirror: EntityMirror
  EntityMirrorAcrossEdge: EntityMirrorAcrossEdge
  EntitySetOpacity: EntitySetOpacity
  EntityType: EntityType
  Error: Error
  ErrorCode: ErrorCode
  Event: Event
  Export: Export
  Export2d: Export2d
  Export3d: Export3d
  ExportFile: ExportFile
  ExtendPath: ExtendPath
  ExtendedUser: ExtendedUser
  ExtendedUserResultsPage: ExtendedUserResultsPage
  Extrude: Extrude
  ExtrudeMethod: ExtrudeMethod
  ExtrudedFaceInfo: ExtrudedFaceInfo
  ExtrusionFaceCapType: ExtrusionFaceCapType
  ExtrusionFaceInfo: ExtrusionFaceInfo
  FaceEdgeInfo: FaceEdgeInfo
  FaceGetCenter: FaceGetCenter
  FaceGetGradient: FaceGetGradient
  FaceGetPosition: FaceGetPosition
  FaceIsPlanar: FaceIsPlanar
  FailureWebSocketResponse: FailureWebSocketResponse
  FbxStorage: FbxStorage
  FileCenterOfMass: FileCenterOfMass
  FileConversion: FileConversion
  FileDensity: FileDensity
  FileExportFormat: FileExportFormat
  FileImportFormat: FileImportFormat
  FileMass: FileMass
  FileSurfaceArea: FileSurfaceArea
  FileVolume: FileVolume
  GetEntityType: GetEntityType
  GetNumObjects: GetNumObjects
  GetSketchModePlane: GetSketchModePlane
  GlobalAxis: GlobalAxis
  GltfPresentation: GltfPresentation
  GltfStorage: GltfStorage
  HandleMouseDragEnd: HandleMouseDragEnd
  HandleMouseDragMove: HandleMouseDragMove
  HandleMouseDragStart: HandleMouseDragStart
  HighlightSetEntities: HighlightSetEntities
  HighlightSetEntity: HighlightSetEntity
  IceServer: IceServer
  IdpMetadataSource: IdpMetadataSource
  ImageFormat: ImageFormat
  ImportFile: ImportFile
  ImportFiles: ImportFiles
  ImportedGeometry: ImportedGeometry
  InputFormat3d: InputFormat3d
  InquiryForm: InquiryForm
  InquiryType: InquiryType
  Invoice: Invoice
  InvoiceLineItem: InvoiceLineItem
  InvoiceStatus: InvoiceStatus
  IpAddrInfo: IpAddrInfo
  KclCodeCompletionParams: KclCodeCompletionParams
  KclCodeCompletionRequest: KclCodeCompletionRequest
  KclCodeCompletionResponse: KclCodeCompletionResponse
  KclModel: KclModel
  LengthUnit: LengthUnit
  Loft: Loft
  MakeAxesGizmo: MakeAxesGizmo
  MakeOffsetPath: MakeOffsetPath
  MakePlane: MakePlane
  Mass: Mass
  Method: Method
  MlCopilotClientMessage: MlCopilotClientMessage
  MlCopilotServerMessage: MlCopilotServerMessage
  MlCopilotSystemCommand: MlCopilotSystemCommand
  MlCopilotTool: MlCopilotTool
  MlFeedback: MlFeedback
  MlPrompt: MlPrompt
  MlPromptMetadata: MlPromptMetadata
  MlPromptResultsPage: MlPromptResultsPage
  MlPromptType: MlPromptType
  MlToolResult: MlToolResult
  ModelingAppEventType: ModelingAppEventType
  ModelingAppIndividualSubscriptionTier: ModelingAppIndividualSubscriptionTier
  ModelingAppOrganizationSubscriptionTier: ModelingAppOrganizationSubscriptionTier
  ModelingAppShareLinks: ModelingAppShareLinks
  ModelingAppSubscriptionTier: ModelingAppSubscriptionTier
  ModelingAppSubscriptionTierName: ModelingAppSubscriptionTierName
  ModelingCmd: ModelingCmd
  ModelingCmdId: ModelingCmdId
  ModelingCmdReq: ModelingCmdReq
  ModelingSessionData: ModelingSessionData
  MouseClick: MouseClick
  MouseMove: MouseMove
  MovePathPen: MovePathPen
  NewAnnotation: NewAnnotation
  OAuth2ClientInfo: OAuth2ClientInfo
  OAuth2GrantType: OAuth2GrantType
  ObjectBringToFront: ObjectBringToFront
  ObjectSetMaterialParamsPbr: ObjectSetMaterialParamsPbr
  ObjectVisible: ObjectVisible
  OkModelingCmdResponse: OkModelingCmdResponse
  OkWebSocketResponseData: OkWebSocketResponseData
  OppositeForAngle: OppositeForAngle
  OppositeForLengthUnit: OppositeForLengthUnit
  Org: Org
  OrgDetails: OrgDetails
  OrgMember: OrgMember
  OrgMemberResultsPage: OrgMemberResultsPage
  OrgResultsPage: OrgResultsPage
  OrgRole: OrgRole
  OrientToFace: OrientToFace
  OriginType: OriginType
  OutputFile: OutputFile
  OutputFormat2d: OutputFormat2d
  OutputFormat3d: OutputFormat3d
  PathCommand: PathCommand
  PathComponentConstraintBound: PathComponentConstraintBound
  PathComponentConstraintType: PathComponentConstraintType
  PathGetCurveUuid: PathGetCurveUuid
  PathGetCurveUuidsForVertices: PathGetCurveUuidsForVertices
  PathGetInfo: PathGetInfo
  PathGetSketchTargetUuid: PathGetSketchTargetUuid
  PathGetVertexUuids: PathGetVertexUuids
  PathSegment: PathSegment
  PathSegmentInfo: PathSegmentInfo
  PaymentIntent: PaymentIntent
  PaymentMethod: PaymentMethod
  PaymentMethodCardChecks: PaymentMethodCardChecks
  PaymentMethodType: PaymentMethodType
  PerspectiveCameraParameters: PerspectiveCameraParameters
  PlanInterval: PlanInterval
  PlanStep: PlanStep
  PlaneIntersectAndProject: PlaneIntersectAndProject
  PlaneSetColor: PlaneSetColor
  PlyStorage: PlyStorage
  Point2d: Point2d
  Point3d: Point3d
  Point4d: Point4d
  Pong: Pong
  PostEffectType: PostEffectType
  PrivacySettings: PrivacySettings
  ProjectEntityToPlane: ProjectEntityToPlane
  ProjectPointsToPlane: ProjectPointsToPlane
  RawFile: RawFile
  ReasoningMessage: ReasoningMessage
  ReconfigureStream: ReconfigureStream
  RelativeTo: RelativeTo
  RemoveSceneObjects: RemoveSceneObjects
  Revolve: Revolve
  RevolveAboutEdge: RevolveAboutEdge
  Rotation: Rotation
  RtcIceCandidateInit: RtcIceCandidateInit
  RtcSdpType: RtcSdpType
  RtcSessionDescription: RtcSessionDescription
  SamlIdentityProvider: SamlIdentityProvider
  SamlIdentityProviderCreate: SamlIdentityProviderCreate
  SceneClearAll: SceneClearAll
  SceneSelectionType: SceneSelectionType
  SceneToolType: SceneToolType
  SelectAdd: SelectAdd
  SelectClear: SelectClear
  SelectGet: SelectGet
  SelectRemove: SelectRemove
  SelectReplace: SelectReplace
  SelectWithPoint: SelectWithPoint
  Selection: Selection
  SendObject: SendObject
  ServiceAccount: ServiceAccount
  ServiceAccountResultsPage: ServiceAccountResultsPage
  ServiceAccountUuid: ServiceAccountUuid
  Session: Session
  SessionUuid: SessionUuid
  SetBackgroundColor: SetBackgroundColor
  SetCurrentToolProperties: SetCurrentToolProperties
  SetDefaultSystemProperties: SetDefaultSystemProperties
  SetGridAutoScale: SetGridAutoScale
  SetGridReferencePlane: SetGridReferencePlane
  SetGridScale: SetGridScale
  SetObjectTransform: SetObjectTransform
  SetSceneUnits: SetSceneUnits
  SetSelectionFilter: SetSelectionFilter
  SetSelectionType: SetSelectionType
  SetTool: SetTool
  Shortlink: Shortlink
  ShortlinkResultsPage: ShortlinkResultsPage
  SideFace: SideFace
  SketchModeDisable: SketchModeDisable
  Solid2dAddHole: Solid2dAddHole
  Solid3dFilletEdge: Solid3dFilletEdge
  Solid3dGetAdjacencyInfo: Solid3dGetAdjacencyInfo
  Solid3dGetAllEdgeFaces: Solid3dGetAllEdgeFaces
  Solid3dGetAllOppositeEdges: Solid3dGetAllOppositeEdges
  Solid3dGetCommonEdge: Solid3dGetCommonEdge
  Solid3dGetExtrusionFaceInfo: Solid3dGetExtrusionFaceInfo
  Solid3dGetNextAdjacentEdge: Solid3dGetNextAdjacentEdge
  Solid3dGetOppositeEdge: Solid3dGetOppositeEdge
  Solid3dGetPrevAdjacentEdge: Solid3dGetPrevAdjacentEdge
  Solid3dShellFace: Solid3dShellFace
  SourcePosition: SourcePosition
  SourceRange: SourceRange
  SourceRangePrompt: SourceRangePrompt
  StartPath: StartPath
  StlStorage: StlStorage
  StoreCouponParams: StoreCouponParams
  Subscribe: Subscribe
  SubscriptionTierFeature: SubscriptionTierFeature
  SubscriptionTierPrice: SubscriptionTierPrice
  SubscriptionTierType: SubscriptionTierType
  SubscriptionTrainingDataBehavior: SubscriptionTrainingDataBehavior
  SuccessWebSocketResponse: SuccessWebSocketResponse
  SupportTier: SupportTier
  SurfaceArea: SurfaceArea
  Sweep: Sweep
  System: System
  TakeSnapshot: TakeSnapshot
  TextToCad: TextToCad
  TextToCadCreateBody: TextToCadCreateBody
  TextToCadIteration: TextToCadIteration
  TextToCadIterationBody: TextToCadIterationBody
  TextToCadModel: TextToCadModel
  TextToCadMultiFileIteration: TextToCadMultiFileIteration
  TextToCadMultiFileIterationBody: TextToCadMultiFileIterationBody
  TextToCadResponse: TextToCadResponse
  TextToCadResponseResultsPage: TextToCadResponseResultsPage
  TokenRevokeRequestForm: TokenRevokeRequestForm
  Transform: Transform
  TransformByForPoint3d: TransformByForPoint3d
  TransformByForPoint4d: TransformByForPoint4d
  TwistExtrude: TwistExtrude
  UnitAngle: UnitAngle
  UnitAngleConversion: UnitAngleConversion
  UnitArea: UnitArea
  UnitAreaConversion: UnitAreaConversion
  UnitCurrent: UnitCurrent
  UnitCurrentConversion: UnitCurrentConversion
  UnitDensity: UnitDensity
  UnitEnergy: UnitEnergy
  UnitEnergyConversion: UnitEnergyConversion
  UnitForce: UnitForce
  UnitForceConversion: UnitForceConversion
  UnitFrequency: UnitFrequency
  UnitFrequencyConversion: UnitFrequencyConversion
  UnitLength: UnitLength
  UnitLengthConversion: UnitLengthConversion
  UnitMass: UnitMass
  UnitMassConversion: UnitMassConversion
  UnitPower: UnitPower
  UnitPowerConversion: UnitPowerConversion
  UnitPressure: UnitPressure
  UnitPressureConversion: UnitPressureConversion
  UnitTemperature: UnitTemperature
  UnitTemperatureConversion: UnitTemperatureConversion
  UnitTorque: UnitTorque
  UnitTorqueConversion: UnitTorqueConversion
  UnitVolume: UnitVolume
  UnitVolumeConversion: UnitVolumeConversion
  UpdateAnnotation: UpdateAnnotation
  UpdateMemberToOrgBody: UpdateMemberToOrgBody
  UpdatePaymentBalance: UpdatePaymentBalance
  UpdateShortlinkRequest: UpdateShortlinkRequest
  UpdateUser: UpdateUser
  User: User
  UserIdentifier: UserIdentifier
  UserOrgInfo: UserOrgInfo
  UserOrgRole: UserOrgRole
  UserResultsPage: UserResultsPage
  Uuid: Uuid
  VerificationTokenResponse: VerificationTokenResponse
  ViewIsometric: ViewIsometric
  Volume: Volume
  WebSocketRequest: WebSocketRequest
  WebSocketResponse: WebSocketResponse
  WorldCoordinateSystem: WorldCoordinateSystem
  ZooProductSubscription: ZooProductSubscription
  ZooProductSubscriptions: ZooProductSubscriptions
  ZooProductSubscriptionsOrgRequest: ZooProductSubscriptionsOrgRequest
  ZooProductSubscriptionsUserRequest: ZooProductSubscriptionsUserRequest
  ZooTool: ZooTool
  ZoomToFit: ZoomToFit
}

export type File = { readonly name: string; readonly data: Blob }
