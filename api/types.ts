// API Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  college_id?: number;
  referral_id?: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface UpdateProfileRequest {
  first_name?: string;
  last_name?: string;
  phone?: string;
  college_id?: number;
  state_id?: number;
}

export interface UpdateAvatarRequest {
  avatar_url: string;
}

export interface CreateSubmissionRequest {
  task_id: number;
  proof_type: string;
  proof_url: string;
  proof_text?: string;
}

export interface UpdateSubmissionRequest {
  proof_url?: string;
  proof_text?: string;
}

export interface AppealSubmissionRequest {
  reason: string;
}

export interface AwardXPRequest {
  amount: number;
  description?: string;
}

export interface LogStreakRequest {
  streak_type: string;
}

export interface SubmitTriviaAnswersRequest {
  answers: Array<Record<string, any>>;
}

export interface SubmitWeeklyChallengeRequest {
  submission: string;
}

export interface SubmitBattleRequest {
  submission: string;
}

export interface SubmitSurveyRequest {
  responses: Array<Record<string, any>>;
}

export interface CreatePostRequest {
  content: string;
  media_urls?: string;
  post_type?: string;
  is_public?: boolean;
}

export interface CommentRequest {
  content: string;
}

export interface TransferWalletRequest {
  to_user_id: number;
  amount: number;
  currency: 'coins' | 'cash';
}

export interface SendReferralInviteRequest {
  email: string;
}

export interface UpdateEmailPreferencesRequest {
  marketing_emails?: boolean;
  task_notifications?: boolean;
  achievement_emails?: boolean;
  weekly_digest?: boolean;
}

export interface QueryParams {
  limit?: number;
  offset?: number;
  q?: string;
  [key: string]: any;
}

export interface CreateOrGetCollegeRequest {
  name: string;
  code?: string;
  state_id?: number;
}

