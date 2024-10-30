import { registerAs } from '@nestjs/config';

const mapEnvValues = {
  bool: (envValue: string) => envValue === 'true',
  number: (envValue: string, defaultValue: number) => {
    const value = Number(envValue);

    return !envValue || Number.isNaN(value) ? defaultValue : value;
  },
  array: (envValue: string, delimiter = ',') => {
    const values = envValue.split(delimiter).filter(Boolean);

    return values;
  },
};

const defaultDbPort = 5432;
const defaultAppPort = 3000;

const envConfig = registerAs('env', () => ({
  port: mapEnvValues.number(process.env.PORT || '', defaultAppPort),
  appName: process.env.APP_NAME || '',
  frontendHostUrl: process.env.FRONTEND_HOST_URL || '',
  enableSwagger: mapEnvValues.bool(process.env.ENABLE_SWAGGER || ''),
  database: {
    host: process.env.DATABASE_HOST || '',
    port: mapEnvValues.number(process.env.DATABASE_PORT || '', defaultDbPort),
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_DATABASE || '',
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || '',
    authTokenDuration: process.env.AUTH_TOKEN_EXPIRATION || '',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || '',
    refreshTokenDuration: process.env.REFRESH_TOKEN_EXPIRATION || '',
  },
  mailhog: {
    host: process.env.MAILHOG_HOST || '',
    port: mapEnvValues.number(process.env.MAILHOG_PORT || '', 0),
  },
  mailChimp: {
    host: process.env.MAIL_CHIMP_HOST || '',
    apiKey: process.env.MAIL_CHIMP_API_KEY || '',
  },
  aws: {
    bucketName: process.env.AWS_BUCKET_NAME || '',
    region: process.env.AWS_REGION || '',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    cdnDomain: process.env.NEXT_PUBLIC_AWS_CDN_DOMAIN || '',
  },
}));

export default envConfig;
