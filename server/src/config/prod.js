export const config = {
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: Number(process.env.JWT_EXP)
  }
};