const Sleep = function (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export { Sleep };
