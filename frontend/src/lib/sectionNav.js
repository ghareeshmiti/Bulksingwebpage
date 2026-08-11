let handler = null;

export const registerSectionNav = (fn) => {
  handler = fn;
};

export const goToSection = (id) => {
  if (handler) handler(id);
};
