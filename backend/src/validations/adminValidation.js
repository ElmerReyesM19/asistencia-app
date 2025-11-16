const Joi = require("joi");

const rolesPermitidos = ["admin", "trabajador", "supervisor"];

exports.usuarioCrearSchema = Joi.object({
  nombre: Joi.string().min(3).required().messages({
    "string.empty": "El nombre es obligatorio.",
    "string.min": "El nombre debe tener al menos 3 caracteres."
  }),
  email: Joi.string().email().required().messages({
    "string.email": "El email debe ser válido.",
    "string.empty": "El email es obligatorio."
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "La contraseña es obligatoria.",
    "string.min": "La contraseña debe tener al menos 6 caracteres."
  }),
  rol: Joi.string().valid(...rolesPermitidos).required().messages({
    "any.only": `El rol debe ser uno de: ${rolesPermitidos.join(", ")}.`
  })
});

exports.usuarioActualizarSchema = Joi.object({
  nombre: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  rol: Joi.string().valid(...rolesPermitidos).required()
});
