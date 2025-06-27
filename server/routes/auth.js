const express = require("express");
const { CLIENT_URL } = require("../config.js");
const {
  getAuthorizationUrl,
  authCallbackMiddleware,
  authRefreshMiddleware,
  getUserProfile,
} = require("../services/aps.js");

let router = express.Router();

router.get("/api/auth/login", function (req, res) {
  res.redirect(getAuthorizationUrl());
});

router.get("/api/auth/logout", function (req, res) {
  req.session = null;
  res.redirect(CLIENT_URL);
});

router.get("/api/auth/callback", authCallbackMiddleware, function (req, res) {
  res.redirect(CLIENT_URL);
});

router.get("/api/auth/token", authRefreshMiddleware, function (req, res) {
  res.json(req.publicOAuthToken);
});

router.get(
  "/api/auth/profile",
  authRefreshMiddleware,
  async function (req, res, next) {
    try {
      const profile = await getUserProfile(req.internalOAuthToken.access_token);
      res.json({ name: `${profile.name}` });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
