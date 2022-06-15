/*
    1.属性发生了变化 {type:"ATTRS",attrs:{class:"list-new"}}
    2.文本节点发生了变化 {type:"TEXT",text:1}
    3.节点被删除了 {type:"REMOVE",index:1}
    4.节点不一致 {type:"replace",newNode:newNode}
*/
import _ from "./utils";

let globalIndex = 0; // 深度遍历指针
let patchs = {}; // 补丁包

function diff(oldTree, newTree) {
  dfsWalk(oldTree, newTree, globalIndex);
  return patchs;
}

// 深度优先遍历
function dfsWalk(oldTree, newTree, index) {
  let currentPatchs = []; // 当前变动
  if (!newTree) {
    currentPatchs.push({
      type: "REMOVE",
      index,
    });
  } else if (newTree && _.isString(oldTree)) {
    if (_.isString(newTree) && oldTree !== newTree) {
      currentPatchs.push({
        type: "TEXT",
        text: newTree,
      });
    }
  } else if (oldTree.type == newTree.type) {
    diffProps();
    diffChildren(oldTree.children, newTree.children);
  }
  if (currentPatchs.length > 0) {
    patchs[index] = currentPatchs;
  }
}

// 属性比对
function diffProps() {}

// 子节点比对
function diffChildren(oldChildrens, newChildrens) {
    oldChildrens.forEach((child, index) => {
        dfsWalk(child, newChildrens[index], ++globalIndex)
    });
}

export { diff };
