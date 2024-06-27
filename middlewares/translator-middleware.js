const Translator = require("../components/translator.js");

function translator(text, locale, done) {
  const translator = new Translator();
  const result = translator.translation(text, locale);
  console.log(result);
  try {
    return done(null, { text: text, translation: result });
  } catch (e) {
    return done({ error: e });
  }
}

exports.translator = translator;
