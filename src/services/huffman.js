/* eslint-disable eqeqeq */
import { usuarios } from "../mocks";

export const secureKey =
  "cNvtB2ebgJQF9mbh85yoAwhjBXxAwqac5Mifr0TfmlFj1LzJjTs9KROtZe29Gd12tnh9k2qGNwQpY7S3V0xzLY4BJGg6IVg30QGrVuXN3d0DunGIfyLKD4kEOjpjIOHpOrq7qN25kBA17DtvTzYZpQgqm5hJhvyy5j4BuVePVoDNkRchpsL9gReQYlxipfVu3uoNTysJS5Q96CkA4XvfHwmaQq5evk8iSnfwcSawXkBTtNsBV9nVfRxAkD0OH1LfySp5ows2SHUqH40yXc6lrSKcOnfFT6Z61sN1ABPTAxxsoOEA8v28fMLIs7pIzVsjPvwc9zbM9fVWJT8hvC1PEpWpmhHuI2Osbizz7mhq5CJx7ERp6pe8cauozydBtSHm75TVPueywvg3nGxFJLde2EICoU7652fIdpmlxQuKS8aubj64F6arcHTzDWNaCmqg2MnRgBJ8qTlOGigKuOcclakJRDF0LzsV29hvyfli2lKmlhAfcWjrJoZtPA6CdsQniwNdr0mzSTs4eJ6TDnt94NzONed9q0OvWJs3zmC1377REmypSeTPQ0JOlRhaXzGmgnlNcxjJSxQfpO2pibSqBOHzShpkpqoPlSns79ACIki0GvWPTZHWmmd7dtKrS7IfqMs5phY1cZNuwrp79gixiMKe6BLxHkemPw6ZvVMcPvxue8w84CxN3FZESmhuWyhiNuiWzVR0uhIjS3yQAoCENXewZEdvTb7S4uygO4WfouquwZA0jWLZnzVRdqUkCxGw8Ww3aao2dNixxl24eNCcGcmhX0UvjXPKvqQKJ1bCeAxnzxFf6WiNLbbVRyOIOLA6oy7xgjxgtbs8MMJia6LUxRTtho7IEpSLW6vDuDIvulpUji2Pt2Y8XfKZxhJ2uRxCFAxdrEQGiCec0MUB0lGCr3tCereI0iiRd8BOBAsBsiaEfXOTdxtIXJUzG59zk4AKT2iTxSyj0hRAmfgdrhlzKOu6d8At1em4LVmEEWFUQlCDLRFANB6wXbHlPbHy5itBjmrGlVWmRWAfniM6wL84q1bPXgQ4qHSfEf8uA70ZfBI7k5TAo4fc7ALDWcx4cHPbKRUffEKndpovmErOwrGeoi7PekL4vmaGk0b6Ou5LV6Vsrfnsm9FEnBf87nKu2p3njsdFpeSQtAHQmOUSjXtXDKitkilUZi4FugEOPziHHE4k7hSlp8h6cnayPgvHpbLBCmnrjvVYsJnPdoGdlJeRcKEonqBtdvYnFT81kH0iGYqsijkGEzvwAbh3yg8piuNHqMdonoi5ZzUHcfpI6QAo3ArZfev5S0cofi8qnCqKhSVyb5OWTtYxuK4Aod3T5kj7RZRXRBhDTV0aoCqmhp0mNZKkFQ3dhkPEcMdMhysjgV4DvgXL7Hap";

/* DATA STRUCTURE TO EACH TREE NODE */
class Node {
  constructor(char, weight, left, right) {
    this.char = char;
    this.weight = weight;
    this.left = left;
    this.right = right;
  }
}
/* SORTED FREQUENCY */
const sortfreq = (str) => {
  let dict = {};
  let freqs = [];
  for (var i in str) {
    if (str[i] in dict) dict[str[i]] += 1;
    else dict[str[i]] = 1;
  }
  for (var key in dict) {
    freqs.push([key, dict[key]]);
  }
  return freqs.sort((a, b) => b[1] - a[1]);
};

/* MAKE TREE NODES */
const makenodes = (freqs) => {
  let nodes = [];
  for (let i = 0; i < freqs.length; i++) {
    nodes.push(new Node(freqs[i][0], freqs[i][1]));
  }
  return nodes;
};

/* BUILD A TREE NODE */
const makenode = (left, right) => {
  return new Node(
    left.char + right.char,
    left.weight + right.weight,
    left,
    right
  );
};

/* BUILD A CODE TREE */
const buildtree = (nodes) => {
  while (nodes.length > 1) {
    nodes.push(makenode(nodes.pop(), nodes.pop()));
    nodes.sort((a, b) => b.weight - a.weight);
  }

  return nodes;
};

/* ENCODE EACH CHARACTER */
const encodeeach = (s, tree) => {
  var encoded = [],
    curr_branch = tree[0];
  while (curr_branch.left && curr_branch.right) {
    if (curr_branch.left.char.indexOf(s) !== -1) {
      encoded.push(0);
      curr_branch = curr_branch.left;
    } else if (curr_branch.right.char.indexOf(s) !== -1) {
      encoded.push(1);
      curr_branch = curr_branch.right;
    }
  }
  return encoded;
};

const encode = (str, tree) => {
  let encoded = [];
  for (var c in str) encoded = encoded.concat(encodeeach(str[c], tree));
  return encoded;
};

/* ======================= GLOBAL VARIABLES ======================== */
let tree;
let output;

/* COMPRESS A TEXT STRING */
const compress = () => {
  const input = secureKey;

  // Calculate character frequency
  let sorted = sortfreq(input);
  // Build a huffman code tree using sorted frequencies
  tree = buildtree(makenodes(sorted));

  output = encode(input, tree);
  output = output.join("");
};

export function login(credenciais) {
  compress();

  let user = usuarios.find((usuario) => usuario.email === credenciais.email);

  if (!user) return 404;

  let encodedPass = "";
  let encodedInput = "";
  for (let i = 0; i < credenciais.senha.length; i++) {
    encodedInput += encodeeach(credenciais.senha.charAt(i), tree).join("");
  }

  for (let i = 0; i < user.password.length; i++) {
    encodedPass += encodeeach(user.password.charAt(i), tree).join("");
  }

  if (encodedInput === encodedPass) return 200;
  else return 404;
}

/* DECODE EACH CHARACTER OF A STRING OF BYTES */
const decodeeach = (tree, bits) => {
  if (tree.left && tree.right && bits.length != 0) {
    if (bits[0] == 1) {
      bits.shift();
      return decodeeach(tree.right, bits);
    } else {
      bits.shift();
      return decodeeach(tree.left, bits);
    }
  } else if (!tree.left && !tree.right) return tree.char;
};

const decode = (bits, tree) => {
  var decoded = [];
  while (bits.length !== 0) decoded.push(decodeeach(tree[0], bits));

  return decoded.join("");
};

export const getEncodedPass = (email) => {
  compress();

  let user = usuarios.find((usuario) => usuario.email === email);

  if (!user) return 404;
  let encodedPass = "";
  for (let i = 0; i < user.password.length; i++) {
    encodedPass += encodeeach(user.password.charAt(i), tree).join("");
  }
  return encodedPass;
};

export const decompress = (encodedPass) => {
  compress();
  const decodedPass = decode(encodedPass.split(""), tree);
  return decodedPass;
};
