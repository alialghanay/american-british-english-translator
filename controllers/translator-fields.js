exports.requiredFields = function (req, res, next) {
  const { text, locale } = req.body;
  if (!("text" in req.body) || !("locale" in req.body)) {
    res.status(200).json({ error: "Required field(s) missing" });
  } else if (text.length === 0) {
    res.status(200).json({ error: "No text to translate" });
  } else if (
    locale !== "american-to-british" &&
    locale !== "british-to-american"
  ) {
    res.status(200).json({ error: "Invalid value for locale field" });
  } else next();
};
