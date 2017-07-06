const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'development';
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/wildside1-${env}`;
const secret = process.env.SECRET || '2136$%$£^vrwd!244dSCD';

module.exports = {
  port,
  env,
  dbURI,
  secret
};
