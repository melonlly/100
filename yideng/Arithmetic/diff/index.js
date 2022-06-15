import { createElement } from "./element";

let vm1 = createElement("ul", { class: "list" }, [
  createElement("li", { class: "item" }, ["1"]),
  createElement("li", { class: "item" }, ["2"]),
  createElement("li", { class: "item" }, ["3"]),
]);
console.log(vm1);
let vm2 = createElement("ul", { class: "list-new" }, [
  createElement("li", { class: "item" }, ["a"]),
  createElement("li", { class: "item" }, ["2"]),
  createElement("li", { class: "item" }, ["c"]),
]);
console.log(vm2);