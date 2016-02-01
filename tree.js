function Tree(nodes) {
    if (!(this instanceof Tree)) {
        return new Tree(nodes);
    }

    this.root = null;
    this.nodes = [];
}

Tree.prototype.getRoot = function () {
    return this.root;
};

Tree.prototype.getOrdered = function () {

    function inorderWalk(node) {
        if (node !== null) {
            inorderWalk(node.getLeftChild());
            result.push(node.getKey());
            inorderWalk(node.getRightChild());
        }
    }

    var result = [];
    inorderWalk(this.root);

    return result;
};

Tree.prototype.search = function (key) {

    function recursiveSearch(root, key) {
        if (root === null || root.getKey() === key) {
            return root;
        }

        return recursiveSearch(
            key < root.getKey()
                ? root.getLeftChild()
                : root.getRightChild(),
            key
        );
    }

    function iterativeSearch(root, key) {
        while (root !== null && root.getKey() !== key) {
            root = key < root.getKey()
                ? root.getLeftChild()
                : root.getRightChild();
        }

        return root;
    }

    return iterativeSearch(this.root, key);
};

Tree.prototype.insert = function (element) {
    var newNode = Node(element);
    var parent = null;
    var root = this.root;
    this.nodes.push(newNode);

    while (root !== null) {
        parent = root;
        root = newNode.getKey() < root.getKey() ? root.getLeftChild() : root.getRightChild()
    }
    newNode.setParent(parent);

    if (parent === null) {
        this.root = newNode;
    } else if (newNode.getKey() < parent.getKey()) {
        parent.setLeftChild(newNode);
    } else {
        parent.setRightChild(newNode);
    }
};

Tree.prototype.getMin = function (node) {
    while (node.getLeftChild() !== null) {
        node = node.getLeftChild();
    }
    return node;
};

Tree.prototype.getMax = function (node) {
    while (node.getRightChild() !== null) {
        node = node.getRightChild();
    }
    return node;
};

Tree.prototype.getNodeByIndex = function (index) {
    return this.nodes[index] || null;
};

Tree.prototype.transplant = function (dest, source) {
    if(dest.getParent() === null){
        this.root = source;
    }else if(dest === dest.getParent().getLeftChild()){
        dest.getParent().setLeftChild(source);
    }else{
        dest.getParent().setRightChild(source);
    }
    if(source !== null){
        source.setParent(dest.getParent());
    }
};

Tree.prototype.delete = function (node) {
    if(node.getLeftChild() === null){
        this.transplant(node, node.getRightChild());
    }else if(node.getRightChild() === null){
        this.transplant(node, node.getLeftChild());
    }else{
        var min = this.getMin(node.getRightChild());
        if(min.getParent() !== node){
            this.transplant(min, min.getRightChild());
            min.setRightChild(node.getRightChild());
            min.getLeftChild().setParent(min);
        }
        this.transplant(node, min);
        min.setLeftChild(node.getLeftChild());
        min.getLeftChild().setParent(min);
    }
    this.nodes.splice(this.nodes.indexOf(node), 1);
    
};

function Node(key, parent, right, left) {
    if (!(this instanceof Node)) {
        return new Node(key, parent, right, left);
    }
    this.key = key || null;
    this.parent = parent || null;
    this.right = right || null;
    this.left = left || null;
}

Node.prototype.getKey = function () {
    return this.key;
};

Node.prototype.setKey = function (key) {
    this.key = key || null;
};

Node.prototype.getLeftChild = function () {
    return this.left;
};

Node.prototype.setLeftChild = function (node) {
    this.left = node || null;
};

Node.prototype.getRightChild = function () {
    return this.right;
};

Node.prototype.setRightChild = function (node) {
    this.right = node || null;
};

Node.prototype.getParent = function () {
    return this.parent;
};

Node.prototype.setParent = function (node) {
    this.parent = node || null;
};
