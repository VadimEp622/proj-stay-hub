import { bool, cleanEnv, str } from "envalid";

function config() {
  return cleanEnv(process.env, {
    PORT: str(),
    DB_URL: str(),
    DB_NAME: str(),
    NODE_ENV: str({ choices: ["development", "production"] }),
    GOOGLE_MAPS_API_KEY: str(),
    isGuestMode: bool(),
    SECRET1: str(),
  });
}

export const appConfig = config();
