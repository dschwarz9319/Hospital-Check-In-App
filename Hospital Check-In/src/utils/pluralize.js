const pluralize = string => {
  const lastChar = string[string.length - 1];

  if (lastChar === "e") {
    return string;
  }

  if (lastChar === "s") {
    return `${string}es`;
  }

  if (lastChar === "y") {
    const chars = string.split("");
    chars[chars.length - 1] = "ies";
    return chars.join("");
  }

  return string + "s";
};

export default pluralize;
