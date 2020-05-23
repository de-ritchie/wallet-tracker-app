const base62 = [];
const build = (start, len) => {
  for (let i = 0; i < len; i++) {
    base62.push(String.fromCharCode(start + i));
  }
};

build(65, 26);
build(48, 10);
build(97, 26);

const encode = n => {
  if (n === 0) return base62[n];

  let arr = [];
  while (n > 0) {
    arr.unshift(base62[n % 62]);
    n = Math.floor(n / 62);
  }
  return arr.join("");
};

module.exports = {
  encode
};
