
// config.isGuestMode = false


import { cleanEnv, str } from "envalid";

function config() {
  return cleanEnv(process.env, {
    PORT: str(),
    DB_URL: str(),
    DB_NAME: str(),
    NODE_ENV: str({ choices: ["development", "production"] }),
  });
}

export const appConfig = config();
