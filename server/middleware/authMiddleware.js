import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    // Extract authHeader from request -> headers -> authorization
    const authHeader = req.headers.authorization;

    // If missing or invalid `authHeader`
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    /*
        When frontend sends:
        `Authorization: Bearer abc123xyz`
        Backend receives:
        `authHeader = "Bearer abc123xyz"`

        - remove 'Bearer' and keep only the JWT token
    */
    const token = authHeader.split(" ")[1];

    /*
        JWT verification process:

        1. Splits token into header, payload, signature
        A JWT looks like this: 
        - `header.payload.signature`
        - `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

        header:
        {
            "alg": "HS256",
            "typ": "JWT"
        }
        payload:
        {
            "id": "123",
            "iat": 1710000000,
            "exp": 1710086400
        }

        2. Recreates a NEW signature using:
        header + payload + your JWT secret
        - Compares the newly created signature with the signature from the token

        3. Token verification
        - If they match:
            → token is valid (not tampered, correct secret)
            → returns original data: 
                decoded = {
                    id: "123",
                    iat: 1710000000,
                    exp: 1710086400
                }

        - If they don’t match:
            → token is invalid (tampered or wrong secret)
            → throws error:
                JsonWebTokenError: invalid signature
                TokenExpiredError: jwt expired
    */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    /*
      Attach logged-in user info into the request user parameter for the next function to process
      → data attached: 
      decoded = {
        id: "123",
        iat: 1710000000,
        exp: 1710086400
      }

    */
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};
