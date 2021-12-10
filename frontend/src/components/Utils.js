// DIFFERENT AFFICHAGE DE LA DATE ...

// ... AFFICHAGE MOI ET ANNEE
export const dateParser2 = (num) => {
  let options = {
    year: "numeric",
    month: "short",
  };

  let timestamp = Date.parse(num);

  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

  return date.toString();
};

//... FR
export const timestampParser = (num) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let date = new Date(num).toLocaleDateString("fr-FR", options);

  return date.toString();
};
