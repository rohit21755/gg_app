# Data Requirements for App Functionalities

This document outlines the required data fields for all functionalities in the Grove Growth app, based on the API documentation.

## Registration (Required for App Access)

### Required Fields:
- `email` (string, email format)
- `password` (string, min 6 characters)
- `first_name` (string)
- `last_name` (string)

### Optional Fields:
- `phone` (string)
- `college_id` (integer) - **Important for leaderboards and college-based features**
- `referral_id` (string) - For referral tracking

**Note:** While `college_id` is optional during registration, it's required for:
- College leaderboards (`/colleges/{id}/leaderboard`)
- College-based gamification features
- Campus wars participation
- College-specific campaigns

---

## User Profile Update

### Optional Fields (can be updated later):
- `first_name` (string)
- `last_name` (string)
- `phone` (string)
- `college_id` (integer) - **Recommended to set for full functionality**
- `state_id` (integer) - **Required for state leaderboards**

**Important:** Users can update their profile after registration, but `college_id` and `state_id` are needed for:
- Leaderboard participation
- Campus wars
- State/College competitions

---

## Task & Submission Functionality

### Create Submission (Required):
- `task_id` (integer) - **Required**
- `proof_type` (string) - **Required**
- `proof_url` (string, URI) - **Required**
- `proof_text` (string) - Optional

### Appeal Submission:
- `reason` (string) - **Required**

---

## Gamification Features

### Award XP (Internal):
- `amount` (integer)
- `description` (string) - Optional

### Log Streak:
- `streak_type` (string) - **Required**

### Spin Wheel:
- No input required (uses user's existing data)

---

## Engagement Features

### Trivia Submission:
- `answers` (array of objects) - **Required**

### Weekly Challenge:
- `submission` (string) - **Required**

### Battle Submission:
- `submission` (string) - **Required**

### Survey Submission:
- `responses` (array of objects) - **Required**

### Secret Code Redemption:
- `code` (string, path parameter) - **Required**

---

## Social Features

### Create Post:
- `content` (string) - **Required**
- `media_urls` (string) - Optional
- `post_type` (string) - Optional
- `is_public` (boolean) - Optional, default: true

### Comment on Post:
- `content` (string) - **Required**

---

## Campaign Features

### Join Campaign:
- `id` (integer, path parameter) - **Required**

**Note:** Campaigns may have prerequisites based on:
- User's college_id
- User's state_id
- User's XP/level
- User's role

---

## Wallet Features

### Transfer Wallet Funds:
- `to_user_id` (integer) - **Required**
- `amount` (number, float, min 0.01) - **Required**
- `currency` (string, enum: 'coins' | 'cash') - **Required**

---

## Referral Features

### Send Referral Invite:
- `email` (string, email format) - **Required**

**Note:** Referral system requires:
- User must have a referral code (generated automatically)
- Referred users can use `referral_id` during registration

---

## Email Preferences

### Update Email Preferences:
- `marketing_emails` (boolean) - Optional
- `task_notifications` (boolean) - Optional
- `achievement_emails` (boolean) - Optional
- `weekly_digest` (boolean) - Optional

---

## Critical Data Dependencies

### For Full App Functionality, Users Should Have:

1. **Basic Profile (Required at Registration):**
   - ✅ email
   - ✅ password
   - ✅ first_name
   - ✅ last_name

2. **Recommended at Registration:**
   - ⚠️ `college_id` - Enables college leaderboards, campus wars, college campaigns
   - ⚠️ `phone` - For notifications and account recovery

3. **Can Be Added Later (via Profile Update):**
   - `state_id` - For state leaderboards
   - `college_id` - If not set during registration
   - `phone` - If not set during registration

4. **Auto-Generated/System Data:**
   - `id` - User ID (auto-generated)
   - `role` - User role (set by system)
   - `xp` - Experience points (starts at 0)
   - `referral_code` - Generated automatically
   - `wallet` - Created automatically with 0 balance

---

## Functionality Impact by Missing Data

### Without `college_id`:
- ❌ Cannot view college leaderboards
- ❌ Cannot participate in campus wars
- ❌ Cannot join college-specific campaigns
- ❌ Limited gamification features

### Without `state_id`:
- ❌ Cannot view state leaderboards
- ❌ Cannot participate in state-level competitions

### Without `phone`:
- ⚠️ Limited notification options
- ⚠️ Account recovery may be more difficult

---

## Recommendations for Registration Screen

Based on this analysis, the current registration screen should:

1. ✅ **Keep Required Fields:** email, password, first_name, last_name
2. ✅ **Keep Optional Fields:** phone, college_id, referral_id
3. ⚠️ **Consider Making College Required:** Since many features depend on it
4. ✅ **Add State Selection:** For state leaderboard functionality (can be added to profile later)

---

## Data Flow Summary

```
Registration
├── Required: email, password, first_name, last_name
├── Optional: phone, college_id, referral_id
└── Auto: id, role, xp, referral_code, wallet

Profile Update (Post-Registration)
├── Can add: college_id, state_id, phone
└── Can update: first_name, last_name

Feature Access
├── Basic Features: ✅ (only requires registration)
├── College Features: ⚠️ (requires college_id)
├── State Features: ⚠️ (requires state_id)
└── Social Features: ✅ (only requires registration)
```

---

## Next Steps

1. Consider making `college_id` required during registration
2. Add `state_id` selection to registration or profile update
3. Add validation to prompt users to complete profile for full functionality
4. Show feature availability based on user's data completeness
