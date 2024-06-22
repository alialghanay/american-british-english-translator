const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  constructor() {
    // Initialize translation dictionaries
    this.americanOnly = americanOnly;
    this.americanToBritishSpelling = americanToBritishSpelling;
    this.americanToBritishTitles = americanToBritishTitles;
    this.britishOnly = britishOnly;

    // Invert britishOnly object for reverse translation
    this.britishToAmericanOnly = {};
    Object.entries(britishOnly).forEach(([britishTerm, americanEquivalent]) => {
      this.britishToAmericanOnly[americanEquivalent] = britishTerm;
    });
  }

  // Method to translate from American English to British English
  americanToBritish(text) {
    let translatedText = text;

    // Translate words that have direct equivalents in British English
    translatedText = this.translateDirectMatches(
      translatedText,
      this.americanToBritishSpelling
    );

    // Translate American-only terms to their British equivalents
    translatedText = this.translateDirectMatches(
      translatedText,
      this.americanOnly
    );

    // Translate titles
    translatedText = this.translateTitles(
      translatedText,
      this.americanToBritishTitles
    );

    return translatedText;
  }

  // Method to translate from British English to American English
  britishToAmerican(text) {
    let translatedText = text;

    // Translate words that have direct equivalents in American English
    translatedText = this.translateDirectMatches(
      translatedText,
      this.britishToAmericanOnly
    );

    return translatedText;
  }

  // Helper method to perform direct word replacements based on a dictionary
  translateDirectMatches(text, dictionary) {
    const regex = new RegExp(
      `\\b(${Object.keys(dictionary).join("|")})\\b`,
      "gi"
    );
    return text.replace(regex, (match) => dictionary[match.toLowerCase()]);
  }

  // Helper method to translate titles
  translateTitles(text, titlesDictionary) {
    let translatedText = text;

    Object.entries(titlesDictionary).forEach(
      ([americanTitle, britishTitle]) => {
        const regex = new RegExp(`\\b${americanTitle}\\b`, "gi");
        translatedText = translatedText.replace(regex, (match) => {
          // Preserve the case of the matched title
          if (match === americanTitle) return britishTitle;
          else if (match === americanTitle.toUpperCase())
            return britishTitle.toUpperCase();
          else if (
            match ===
            americanTitle.charAt(0).toUpperCase() + americanTitle.slice(1)
          )
            return britishTitle.charAt(0).toUpperCase() + britishTitle.slice(1);
          else return britishTitle.toLowerCase();
        });
      }
    );

    return translatedText;
  }
}

module.exports = Translator;
