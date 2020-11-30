var uid = 0;

// 用于管理观察者 Watcher
function Dep() {
    this.id = uid++;
    this.subs = []; // Watcher 集合
}
Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub);
    },
    depend: function () {
        Dep.target.addDep(this);
    },
    removeSub: function (sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },
    notify: function () {
        console.log(this.subs)
        this.subs.forEach((sub) => sub.update());
    },
};

Dep.target = null; // 临时存放 Watcher
