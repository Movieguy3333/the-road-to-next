import { MyBig } from "@/lib/big";

function toCent(amount: number) {
  // Note: must use new keyword because MyBig is a class.
  // Note: Every method (.plus, .minus, .mul/.times, .div, .mod, .pow, .sqrt, .round, .abs, comparisons like .eq/.gt/.lt) returns a new Big instance rather than mutating the original — so you can chain calls like new MyBig(amount).mul(100).round(2), and amount itself stays untouched.
  return new MyBig(amount).mul(100).round(2).toNumber();
}

function fromCent(amount: number) {
  return new MyBig(amount).div(100).round(2).toNumber();
}

function toCurrencyFromCents(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(fromCent(amount));
}

export { toCurrencyFromCents, toCent, fromCent };
