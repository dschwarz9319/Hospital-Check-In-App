exports.titlecase = string => {
  string = string.replace(/_/g, " ");
  const words = string.split(" ").map(word => {
    word = word.toLowerCase();
    word = word.charAt(0).toUpperCase() + word.slice(1);
    word = word.replace("Id", "ID");

    return word;
  });
  return words.join(" ");
};
