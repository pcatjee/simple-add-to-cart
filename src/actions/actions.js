export const add = (product) => {
  return {
    type: "ADDTOCART",
    payload: product,
  };
};

export const removeOne = (product) => {
  return {
    type: "REMOVEONE",
    payload: product,
  };
};

// For delete button
export const remove = (product) => {
  return {
    type: "REMOVE",
    payload: product,
  };
};
