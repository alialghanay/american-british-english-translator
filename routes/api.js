"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    const { text, locale } = req.body;
    let result = undefined;
    if (locale === "american-to-british")
      result = translator.americanToBritish(text);
    else if (locale === "british-to-american")
      result = translator.britishToAmerican(text);
    console.log(locale, text);
    console.log(result);
    res.json(result);
  });
};
