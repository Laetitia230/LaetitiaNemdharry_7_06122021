const joi = require("joi");

//SCHEMA JOI QUI PERMET DE VERIFIER L'EMAIL, LE PASSWORD ET LE PSEUDO DE L'UTILISATEUR
module.exports = joi
  .object()
  .keys({
    email: joi
      .string()
      .email()
      .required()
      .messages({
        "string.email": `email doit être un email valide`,
        "string.empty": `email est requis`,
      })
      .label("Email"),
    password: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .required()
      .messages({
        "string.empty": `le mot de passe est requis`,
        "string.pattern.base": `mot de passe doit contenir 8 caractères minimum et au moins 1 majuscule, 1 minuscule, 1 caractère spécial et 1 chiffre`,
      })
      .label("Mot de passe"),
    pseudo: joi
      .string()
      .required()
      .regex(/^[A-Z-a-z-0-9-zàâçéèêëîïôûùüÿñæœ\s]{3,20}$/)
      .messages({
        "string.empty": `le pseudo est requis`,
        "string.pattern.base": `pseudo entre 3 et 20 caractères`,
      })
      .label("Pseudo"),
  })
  .options({ abortEarly: false });
