import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { google } from 'googleapis';
import { Server } from 'http';
import path from 'path';
import {
  getFileContentAsJSON,
  isFilePresent,
  setFile,
} from './fileSystem';
import {
  CONFIG,
  CONSTANTS,
} from './statics';

// config env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app: Express = express();
let server: Server | null = null;

const oAuth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  `http://localhost:${CONFIG.PORT}/oauth2callback`
);

// Validate environment variables
if (!process.env.YOUTUBE_CLIENT_ID || !process.env.YOUTUBE_CLIENT_SECRET) {
  throw new Error(
    'Missing required environment variables: YOUTUBE_CLIENT_ID and YOUTUBE_CLIENT_SECRET'
  );
}

/**
 * Saves OAuth2 tokens to the file system.
 * @param tokens - The tokens to save.
 */
function saveTokens(tokens: any): void {
  setFile(CONSTANTS.GOOGLE.TOKENS_PATH, JSON.stringify(tokens));
}

/**
 * Loads OAuth2 tokens from the file system and sets them to the OAuth2 client.
 * @returns True if tokens are loaded, false otherwise.
 */
function loadTokens(): boolean {
  const tokenPath = CONSTANTS.GOOGLE.TOKENS_PATH;
  return (
    isFilePresent(tokenPath) &&
    (oAuth2Client.setCredentials(getFileContentAsJSON(tokenPath) as any), true)
  );
}

/**
 * Handles the OAuth2 authentication process.
 * @returns A promise that resolves when authentication is complete.
 */
async function authenticate(): Promise<void> {
  const open = (await import('open')).default;

  return new Promise((resolve, reject) => {
    app.get('/oauth2callback', async (req: Request, res: Response) => {
      const { code } = req.query;
      try {
        const { tokens } = await oAuth2Client.getToken(code as string);
        oAuth2Client.setCredentials(tokens);
        saveTokens(tokens);
        res.send('Authentication successful! You can close this window.');
        resolve();
        server?.close(() => {
          console.log('Server closed after authentication.');
        });
      } catch (error) {
        res.status(500).send('Authentication failed');
        console.error('Failed to get token:', error);
        reject(error);
      }
    });

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: CONSTANTS.GOOGLE.SCOPES,
      include_granted_scopes: true,
    });

    console.log(
      `If the browser does not open automatically, please navigate to the following URL: ${authUrl}`
    );
    open(authUrl).catch(reject);
  });
}

/**
 * Initializes the authentication process.
 */
async function initAuth(): Promise<void> {
  if (!loadTokens()) {
    server = app.listen(CONFIG.PORT, () => {
      console.log(`Server is running on http://localhost:${CONFIG.PORT}`);
    });

    try {
      await authenticate();
    } catch (error) {
      console.error('Authentication process failed:', error);
    } finally {
      if (server) {
        server.close(() => {
          console.log('Server closed.');
        });
      }
    }
  }
}

const YoutubeAuthModule = {
  initAuth,
  oAuth2Client,
};

export {
  initAuth,
  oAuth2Client,
  YoutubeAuthModule
};
