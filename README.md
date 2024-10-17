# what is this used for?
For the Oauth2 Login in Wechat,Taobao and so on is not perfect I think, you have to use your phone to scan a QR cod which is to antihuman. So i decide to implement a similar system imtating the Github Oauth App for me to study auth 2.0.


## usage
### /authorize Page
using clientid to get code, it will redirect to user-predefined authorizeCallbackURL with searchParam(code=< code >).


### /api/accesstoken POST
using code(obtained by searchParams in authorizeCallbackURL Page), clientId and secert to obtain token

### /api/user GET
using token by header to obtain user information
```
Authorization: Bearer <token>
```