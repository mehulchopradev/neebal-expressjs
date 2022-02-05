export function logit(req, res, next) {
  console.log(new Date());
  console.log(`Method is : ${req.method}`);
  console.log(`Url is : ${req.url}`);

  next(); // basically tells express to call the next middleware (if any) in the chain
}