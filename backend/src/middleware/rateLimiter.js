import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // In case of authentication, replace my-limit-key with a value so that
    // If one person is rate limitted, another person must not be affected/ rate limitted by it
    // And , so on
    const { success } = await ratelimit.limit("my-limit-key");

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests ! Try again later" });
    }

    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
