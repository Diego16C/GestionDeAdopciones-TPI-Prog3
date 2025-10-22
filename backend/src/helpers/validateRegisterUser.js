export const validateRegisterUser = ({ name, surname, email, password }) => {
  const errors = [];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRegex = /^.{6,}$/;


  if (!name || name.length > 50)
    errors.push("El nombre es obligatorio y debe tener menos de 50 caracteres");

  if (!surname || surname.length > 50)
    errors.push("El apellido es obligatorio y debe tener menos de 50 caracteres");

  if (!emailRegex.test(email))
    errors.push("El email debe tener un formato válido");

  if (!passRegex.test(password))
    errors.push(
      "La contraseña debe tener al menos 6 caracteres, una mayúscula y un número"
    );

  return errors;
};
