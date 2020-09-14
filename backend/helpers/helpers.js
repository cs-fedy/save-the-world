const isValidBody = (name, latitude, longitude, password) => {
  if (!name.trim())
    return {
      validBody: false,
      msg: "place name is required",
    };

  if (!password)
    return {
      validBody: false,
      msg: "password is required",
    };

  if (!latitude)
    return {
      validBody: false,
      msg: "place latitude is required",
    };

  if (latitude <= -80)
    return {
      validBody: false,
      msg: "latitude must be greeter than -80",
    };

  if (latitude >= 80)
    return {
      validBody: false,
      msg: "latitude must be lower than 80",
    };

  if (!longitude)
    return {
      validBody: false,
      msg: "place longitude is required",
    };

  if (longitude <= -180)
    return {
      validBody: false,
      msg: "longitude must be greeter than -180",
    };

  if (longitude >= 180)
    return {
      validBody: false,
      msg: "longitude must be lower than 180",
    };

  return { validBody: true };
};

module.exports = {
  isValidBody,
};
