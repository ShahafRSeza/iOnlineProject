module.exports = (req, res, next) => {
  let method = req.method;
  let url = req.url;
  let status = res.statusCode;
  let log = `METHOD:${method} | URL:${url} | STATUS:${status}`;
  console.log(log);
  next();
};
