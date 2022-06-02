let idGen = () => {
  let string =
    "01-2345678_9abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJ_KLMNOP+QRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += string[Math.floor(Math.random() * (string.length - 1))];
  }
  return code;
};

module.exports = idGen