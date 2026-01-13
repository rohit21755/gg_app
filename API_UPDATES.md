# API Updates Summary

This document summarizes the changes made to API calls based on the updated OpenAPI specification.

## Key Changes

### 1. Response Structure Handling
All API endpoints now handle the wrapped response structure:
- API may return: `{ data: {...} }` or just `{...}`
- All API functions now use: `res.data.data || res.data`

### 2. New Endpoints

#### POST /colleges
- **Purpose**: Create or get college (Public - No Auth Required)
- **Location**: `api/rest/public.ts`
- **Function**: `createOrGetCollege(data: CreateOrGetCollegeRequest)`
- **Hook**: `useCreateOrGetCollege()`
- **Request**: 
  ```typescript
  {
    name: string;        // Required
    code?: string;       // Optional
    state_id?: number;   // Optional
  }
  ```
- **Response**: Returns college object with message

### 3. Updated Endpoints

#### GET /streaks
- **New Parameter**: `type` query parameter
- **Default**: `'daily_engagement'`
- **Options**: `'daily_engagement' | 'daily_login' | 'weekly_task' | 'campaign'`
- **Updated Function**: `getStreaks(type?: StreakType)`
- **Updated Hook**: `useStreaks(type?: StreakType)`
- **Response Structure**:
  ```typescript
  {
    streak_type: string;
    current_streak: number;
    longest_streak: number;
    total_days: number;
    last_activity: string;
    calendar_dates: string[];      // Array of YYYY-MM-DD dates
    engagement_dates: string[];     // Full date-time objects
    recent_logs: Array<{
      id: number;
      activity_date: string;
      earned_xp: number;
    }>;
  }
  ```

### 4. Response Structure Updates

All API endpoints have been updated to handle wrapped responses:

#### Updated Files:
- ✅ `api/rest/auth.ts` - Login, Register, Refresh Token
- ✅ `api/rest/public.ts` - Colleges, States, Leaderboards
- ✅ `api/rest/tasks.ts` - All task endpoints
- ✅ `api/rest/submissions.ts` - All submission endpoints
- ✅ `api/rest/users.ts` - All user endpoints
- ✅ `api/rest/campaigns.ts` - All campaign endpoints
- ✅ `api/rest/gamification.ts` - XP, Levels, Badges, Streaks, Spin Wheel
- ✅ `api/rest/engagement.ts` - Flash challenges, Trivia, Mystery boxes, etc.
- ✅ `api/rest/rewards.ts` - All reward endpoints
- ✅ `api/rest/referrals.ts` - All referral endpoints
- ✅ `api/rest/surveys.ts` - All survey endpoints
- ✅ `api/rest/campus-wars.ts` - All war endpoints
- ✅ `api/rest/notifications.ts` - All notification endpoints
- ✅ `api/rest/wallet.ts` - All wallet endpoints
- ✅ `api/rest/social.ts` - All social/feed endpoints
- ✅ `api/rest/activities.ts` - All activity endpoints
- ✅ `api/rest/dashboard.ts` - Dashboard endpoints
- ✅ `api/rest/email.ts` - Email preference endpoints

### 5. New Type Definitions

Added to `api/types.ts`:
```typescript
export interface CreateOrGetCollegeRequest {
  name: string;
  code?: string;
  state_id?: number;
}
```

## Usage Examples

### Create or Get College
```typescript
import { useCreateOrGetCollege } from '@/api/rest/public';

const createCollege = useCreateOrGetCollege();

createCollege.mutate({
  name: 'Massachusetts Institute of Technology',
  code: 'MIT',
  state_id: 1
});
```

### Get Streaks with Type
```typescript
import { useStreaks } from '@/api/rest/gamification';

// Get daily engagement streaks (default)
const { data } = useStreaks();

// Get daily login streaks
const { data: loginStreaks } = useStreaks('daily_login');

// Get weekly task streaks
const { data: weeklyStreaks } = useStreaks('weekly_task');
```

## Breaking Changes

None - All changes are backward compatible. The response handling supports both:
- Old format: Direct response `{...}`
- New format: Wrapped response `{ data: {...} }`

## Testing

All API calls should now work correctly with the updated backend response structure. If you encounter any issues, check:
1. Response structure matches expected format
2. Error handling for wrapped responses
3. Type definitions match API responses
