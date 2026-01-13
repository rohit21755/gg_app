# API cURL Examples

## Base URL
```
http://ec2-54-205-140-13.compute-1.amazonaws.com:8080/api/v1
```

---

## Login

### Request
```bash
curl -X POST http://ec2-54-205-140-13.compute-1.amazonaws.com:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Response (Success - 200)
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "ambassador",
    "xp": 0,
    "college_id": 1
  }
}
```

### Response (Error - 401)
```json
{
  "message": "Invalid credentials"
}
```

---

## Register

### Request
```bash
curl -X POST http://ec2-54-205-140-13.compute-1.amazonaws.com:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "first_name": "Jane",
    "last_name": "Smith",
    "phone": "+1234567890",
    "college_id": 1,
    "referral_id": "REF123"
  }'
```

### Response (Success - 201)
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "email": "newuser@example.com",
    "first_name": "Jane",
    "last_name": "Smith",
    "role": "ambassador",
    "xp": 0,
    "college_id": 1
  }
}
```

---

## Get User Profile (Protected)

### Request
```bash
curl -X GET http://ec2-54-205-140-13.compute-1.amazonaws.com:8080/api/v1/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

---

## Refresh Token

### Request
```bash
curl -X POST http://ec2-54-205-140-13.compute-1.amazonaws.com:8080/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "YOUR_REFRESH_TOKEN"
  }'
```

---

## Get All Colleges (Public)

### Request
```bash
curl -X GET http://ec2-54-205-140-13.compute-1.amazonaws.com:8080/api/v1/colleges \
  -H "Content-Type: application/json"
```

---

## Get All States (Public)

### Request
```bash
curl -X GET http://ec2-54-205-140-13.compute-1.amazonaws.com:8080/api/v1/states \
  -H "Content-Type: application/json"
```

---

## Notes

- Replace `YOUR_ACCESS_TOKEN` with the actual access token received from login
- Replace `YOUR_REFRESH_TOKEN` with the actual refresh token received from login
- All protected endpoints require the `Authorization: Bearer {token}` header
- Base URL can be changed in `api/rest/axiosClient.ts`
