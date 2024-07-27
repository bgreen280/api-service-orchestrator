import { Server } from 'http';
import express, { Request, Response } from 'express';
import open from 'open';
import { OAuth2Client, Credentials } from 'google-auth-library';
import { AuthStrategy } from '../AuthStrategy';
import type { IOAuthConfig } from '../types';
import { getFileContentAsJSON, isFilePresent, setFile } from '../../utils/fileSystem';
import { GOOGLE_CONSTANTS } from '../../api/constants';

export class OAuthStrategy extends AuthStrategy {
  private accessToken: string | null = null;
  private server: Server | null = null;

  constructor(private config: IOAuthConfig) {
    super();
  }

  async getAuthHeader(_options?: Record<string, any>): Promise<Record<string, string>> {
    if (!this.accessToken) {
      await this.authenticate();
    }
    return { Authorization: `Bearer ${this.accessToken}` };
  }

  private async authenticate(): Promise<void> {
    const loadedTokens = this.loadTokens();
    if (loadedTokens) {
      this.config.oAuth2Client.setCredentials(loadedTokens);
      this.accessToken = loadedTokens.access_token ?? null;
      return;
    }

    const app = express();

    return new Promise((resolve, reject) => {
      app.get('/oauth2callback', async (req: Request, res: Response) => {
        const { code } = req.query;
        try {
          const { tokens } = await this.config.oAuth2Client.getToken(code as string);
          this.config.oAuth2Client.setCredentials(tokens);

          if (!tokens.access_token) {
            throw new Error('Failed to obtain access token');
          }

          this.accessToken = tokens.access_token;
          this.saveTokens(tokens);

          res.send('Authentication successful! You can close this window.');
          resolve();

          if (this.server) {
            this.server.close(() => {
              console.log('Server closed after authentication.');
            });
          }
        } catch (error) {
          res.status(500).send('Authentication failed');
          console.error('Failed to get token:', error);
          reject(error);
        }
      });

      this.server = app.listen(this.config.callbackPort, () => {
        console.log(`OAuth callback server is running on http://localhost:${this.config.callbackPort}`);
        this.openAuthUrl();
      });
    });
  }

  private openAuthUrl(): void {
    const authUrl = this.config.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.config.scopes,
      include_granted_scopes: true,
    });

    console.log(
      `If the browser does not open automatically, please navigate to the following URL: ${authUrl}`
    );
    open(authUrl).catch(console.error);
  }

  private loadTokens(): Credentials | null {
    const tokenPath = GOOGLE_CONSTANTS.TOKENS_PATH;
    if (isFilePresent(tokenPath)) {
      const tokens = getFileContentAsJSON(tokenPath) as Credentials;
      this.config.oAuth2Client.setCredentials(tokens);
      return tokens;
    }
    return null;
  }

  private saveTokens(tokens: Credentials): void {
    setFile(GOOGLE_CONSTANTS.TOKENS_PATH, JSON.stringify(tokens));
  }
}
