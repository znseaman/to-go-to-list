export const config = {
  secrets: {
    jwt: 'movebetweenabstractions',
    jwtExp: 3600
  },
  dbUrl: process.env.DATABASE_URL
};