// Defines environment config and secrets

interface Config {
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: string;
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_NAME: string;
}

const envConfig: Config = {
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_NAME:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_NAME!,
};

export default envConfig;
