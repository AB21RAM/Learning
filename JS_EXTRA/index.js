// arrow function
const sum = (a, b) => {
  return a + b;
};

// map
const arr = [1, 2, 3, 4, 5];
const ans = arr.map((val) => {
  return val * 2;
});
console.log(ans);

// filter
// returning the even value from the array only
// filter takes bool output as the input
console.log(
  arr.filter((val) => {
    return val % 2 === 0;
  })
);

// case sensitive
console.log("Atharv".startsWith("a"));
