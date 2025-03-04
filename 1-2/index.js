class Promise2 {
  constructor(fn) {
    function afterDone() {
      this.resolve();
    }
    fn(afterDone);
  }
  then(callback) {
    this.resolve = callback;
  }
}
function promiseFn(resolve) {
  resolve("Hi there this is atharv");
}
const p = new Promise(promiseFn);

function callback(str) {
  console.log(str);
}
p.then(callback);

function setTimeoutPromisified(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function solve() {
  await setTimeoutPromisified(1000);
  console.log("hi");
  await setTimeoutPromisified(3000);
  console.log("hello");
  await setTimeoutPromisified(5000);
  console.log("hi there");
}

solve();
