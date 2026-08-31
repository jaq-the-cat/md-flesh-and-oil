import { env } from "$env/dynamic/public";

const deploy = env.PUBLIC_DEPLOY_ID;

if (!deploy) {
  throw new Error("PUBLIC_DEPLOY_ID is not set. Sheets are namespaced per deployment; see .env.example.");
}

/** Every sheet lives under its deployment, so two deploys never share data. */
export const SHEETS_PATH = `deploys/${deploy}/sheets`;
