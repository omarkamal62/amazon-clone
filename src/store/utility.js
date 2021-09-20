export const updateObject = (oldObject, updatedProps) => {
  return {
    ...oldObject,
    ...updatedProps,
  };
};

export const elementConfigHandler = (
  elementType,
  elementConfig,
  value,
  label
) => {
  return {
    elementType,
    elementConfig,
    value,
    label
  };
};
