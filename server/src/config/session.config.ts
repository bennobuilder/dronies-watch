export default {
  discord: {
    name: 'DISCORD_OAUTH_SESSION_ID',
    secret: process.env.SESSION_SECRET || 'AveryNotOpenSourceSecret!',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    maxActiveSessions: 3,
    domain: process.env.SESSION_DOMAIN,
  },
};
