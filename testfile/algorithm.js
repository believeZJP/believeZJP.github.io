// 单链表结构

function List() {
    // 节点
    let Node = function (element) {
        this.element = element;
        this.next = null;
    };

    //   初始头结点
    let head = null

    // 链表长度
    let length = 0

    // 操作
    this.getList = function() {return head}
    this.search = function(list, element) {}
    this.append = function(element) {}
    this.insert = function(position, element) {}
    this.remove = function(element){}
    this.isEmpty = function(){}
    this.size = function(){}
}

// 1. 追加节点：
// 确定解题思路： 初始化一个节点（待追加节点），遍历到链尾，在尾节点后插入该节点
// 确定边界条件： 当链表为 null ，直接将 head 指向待插入节点，不需要遍历

function apppend(element) {
    let node = new Node(element)
    let p = head
    if (!head) {
        head = node
    } else {
        while(p.next) {
            p = p.next
        }
        p.next = node
    }
    length += 1
}