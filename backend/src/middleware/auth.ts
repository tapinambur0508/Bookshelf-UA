import { Request, Response, NextFunction } from "express";
import { expressjwt } from "express-jwt";
import { expressJwtSecret } from "jwks-rsa";

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || "";
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE || "";

if (AUTH0_DOMAIN === "" || AUTH0_AUDIENCE === "") {
  console.warn("Auth0 configuration missing. Auth middleware will be disabled.");
}

export const authMiddleware =
  AUTH0_DOMAIN !== "" && AUTH0_AUDIENCE !== ""
    ? expressjwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
        }),
        audience: AUTH0_AUDIENCE,
        issuer: `https://${AUTH0_DOMAIN}/`,
        algorithms: ["RS256"],
      })
    : (_req: Request, _res: Response, next: NextFunction) => next();

export default authMiddleware;
