import { Server } from 'http';
import open from 'open';
import { Credentials } from 'google-auth-library';
import express, { Request, Response } from 'express';
import { AuthStrategy, OAuthConfig } from '../types';
import { getFileContentAsJSON, isFilePresent, setFile } from '../utils/fileSystem';
import { GOOGLE } from '../utils/constants';

export class OAuthStrategy implements AuthStrategy {
  private accessToken: string | null = null;
  private server: Server | null = null;

  constructor(private config: OAuthConfig) {}

  async getAuthHeader(): Promise<Record<string, string>> {
    if (!this.accessToken) {
      await this.authenticate();
    }
    return { Authorization: `Bearer ${this.accessToken}` };
  }

  private async authenticate(): Promise<void> {
    const loadedTokens = this.loadTokens();
    if (loadedTokens) {
      this.config?.oAuth2Client?.setCredentials(loadedTokens);
      this.accessToken = loadedTokens.access_token || null;
      return;
    }

    const app = express();
    const port = this.config.callbackPort || 3000;

    return new Promise((resolve, reject) => {
      app.get('/oauth2callback', async (req: Request, res: Response) => {
        const { code } = req.query;
        try {
          const { tokens } = await this.config.oAuth2Client.getToken(code as string);
          this.config?.oAuth2Client?.setCredentials(tokens);
          this.accessToken = tokens.access_token;
          this.saveTokens(tokens);

          res.send('Authentication successful! You can close this window.');
          resolve();
          this.server?.close(() => {
            console.log('Server closed after authentication.');
          });
        } catch (error) {
          res.status(500).send('Authentication failed');
          console.error('Failed to get token:', error);
          reject(error);
        }
      });

      this.server = app.listen(port, () => {
        console.log(`OAuth callback server is running on http://localhost:${port}`);
        this.openAuthUrl();
      });
    });
  }

  private openAuthUrl(): void {
    const authUrl = this.config?.oAuth2Client?.generateAuthUrl({
      access_type: 'offline',
      scope: this.config.scopes,
      include_granted_scopes: true,
    });

    console.log(
      `If the browser does not open automatically, please navigate to the following URL: ${authUrl}`
    );
    if (authUrl) {
      open(authUrl).catch(console.error);
    }
  }

  private loadTokens(): Credentials | null {
    const tokenPath = GOOGLE.TOKENS_PATH;
    if (isFilePresent(tokenPath)) {
      const tokens = getFileContentAsJSON(tokenPath) as Credentials;
      this.config?.oAuth2Client?.setCredentials(tokens);
      return tokens;
    }
    return null;
  }

  private saveTokens(tokens: Credentials): void {
    setFile(GOOGLE.TOKENS_PATH, JSON.stringify(tokens));
  }
}
