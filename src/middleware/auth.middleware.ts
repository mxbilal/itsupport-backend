import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // Extract token from headers
      const token = req.headers['authorization']?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
      }

      // Call the SSO API to fetch user profile
      const userProfileResponse = await axios.get(
        'https://devapi-sso.lyca.sa/api/Account/GetUserProfile',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Attach userProfile to request
      req.userProfile = userProfileResponse.data;

      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
  }
}
