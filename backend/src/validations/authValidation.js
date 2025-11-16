const Joi = require("joi");

exports.loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "El email debe ser válido.",
    "string.empty": "El email es obligatorio."
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "La contraseña es obligatoria.",
    "string.min": "La contraseña debe tener al menos 6 caracteres."
  })
});
