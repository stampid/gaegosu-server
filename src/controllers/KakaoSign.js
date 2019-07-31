export const kakaoSignUp = (req, res) => {
  console.log(req.user);
  res.send(req.user);
};

export const kakaoSignIn = (req, res) => {
  console.log(req.user);
  res.send(req.user);
};
