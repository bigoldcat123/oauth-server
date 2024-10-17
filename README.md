### /authorize Page
using clientid to get code, it will redirect to user-predefined authorizeCallbackURL with searchParam(code=< code >).


### /api/accesstoken POST
using code(obtained by searchParams in authorizeCallbackURL Page), clientId and secert to obtain token

### /api/user GET
using token by header to obtain user information
```
Authorization: Bearer <token>
```