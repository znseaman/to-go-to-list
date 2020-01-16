export const config = {
  secrets: {
    jwt: 'movebetweenabstractions',
    jwtExp: 60
  },
  dbUrl: process.env.DATABASE_URL
};