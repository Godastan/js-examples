/**
 * Red-Black Tree
 * @returns {RBTree}
 * @constructor
 */
function RBTree() {
    if (!(this instanceof RBTree)) {
        return new RBTree();
    }

    this.nodes = [];
    this.nul = RBNode({
        key: null,
        left: null,
        right: null,
        parent: null,
        color: RBNode.constants.COLOR_BLACK
    });
    this.setRoot(this.nul);
}

RBTree.prototype.getRoot = function () {
    return this.root;
};

RBTree.prototype.setRoot = function (root) {
    root.setColor(RBNode.constants.COLOR_BLACK);
    this.root = root || this.nul;
};

RBTree.prototype.addNodeToList = function (node) {
    this.nodes.push(node);
};

RBTree.prototype.removeNodeFromList = function (node) {
    this.nodes.splice(this.nodes.indexOf(node), 1);
};

RBTree.prototype.rotateLeft = function (baseNode) {
    var child = baseNode.getRightChild();
    if (child === this.nul) {
        throw new Error('Unable to rotate left')
    }

    baseNode.setRightChild(child.getLeftChild());
    if (child.getLeftChild() !== this.nul) {
        child.getLeftChild().setParent(baseNode);
    }

    child.setParent(baseNode.getParent());

    if (baseNode.getParent() === this.nul) {
        this.setRoot(child);
    } else if (baseNode === baseNode.getParent().getLeftChild()) {
        baseNode.getParent().setLeftChild(child);
    } else {
        baseNode.getParent().setRightChild(child);
    }

    child.setLeftChild(baseNode);
    baseNode.setParent(child);
};

RBTree.prototype.rotateRight = function (baseNode) {
    var child = baseNode.getLeftChild();
    if (child === this.nul) {
        throw new Error('Unable to rotate right')
    }

    baseNode.setLeftChild(child.getRightChild());
    if (child.getRightChild() !== this.nul) {
        child.getRightChild().setParent(baseNode);
    }

    child.setParent(baseNode.getParent());

    if (baseNode.getParent() === this.nul) {
        this.setRoot(child);
    } else if (baseNode === baseNode.getParent().getLeftChild()) {
        baseNode.getParent().setLeftChild(child);
    } else {
        baseNode.getParent().setRightChild(child);
    }

    child.setRightChild(baseNode);
    baseNode.setParent(child);
};

RBTree.prototype.getOrdered = function () {
    var self = this;

    function inorderWalk(node, result) {
        if (node !== self.nul) {
            inorderWalk(node.getLeftChild(), result);
            result.push(node.getKey());
            inorderWalk(node.getRightChild(), result);
        }
    }

    var result = [];
    inorderWalk(this.getRoot(), result);

    return result;
};

RBTree.prototype.search = function (key) {
    var self = this;

    function recursiveSearch(root, key) {
        if (root === self.nul || root.getKey() === key) {
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
        while (root !== self.nul && root.getKey() !== key) {
            root = key < root.getKey()
                ? root.getLeftChild()
                : root.getRightChild();
        }

        return root;
    }

    return iterativeSearch(this.getRoot(), key);
};

RBTree.prototype.insert = function (element) {
    var newNode = RBNode({key: element});
    var parent = this.nul;
    var root = this.getRoot();
    this.addNodeToList(newNode);

    while (root !== this.nul) {
        parent = root;
        root = newNode.getKey() < root.getKey()
            ? root.getLeftChild()
            : root.getRightChild()
    }
    newNode.setParent(parent);

    if (parent === this.nul) {
        this.setRoot(newNode);
    } else if (newNode.getKey() < parent.getKey()) {
        parent.setLeftChild(newNode);
    } else {
        parent.setRightChild(newNode);
    }

    newNode
        .setLeftChild(this.nul)
        .setRightChild(this.nul)
        .setColor(RBNode.constants.COLOR_RED);

    //this.fixup(newNode);
};

RBTree.prototype.fixup = function (baseNode) {

};

RBTree.prototype.getMin = function (node) {
    while (node.getLeftChild() !== this.nul) {
        node = node.getLeftChild();
    }
    return node;
};

RBTree.prototype.getMax = function (node) {
    while (node.getRightChild() !== this.nul) {
        node = node.getRightChild();
    }
    return node;
};

RBTree.prototype.getNodeByIndex = function (index) {
    return this.nodes[index] || this.nul;
};

RBTree.prototype.transplant = function (dest, source) {
    if (dest.getParent() === this.nul) {
        this.setRoot(source);
    } else if (dest === dest.getParent().getLeftChild()) {
        dest.getParent().setLeftChild(source);
    } else {
        dest.getParent().setRightChild(source);
    }
    if (source !== this.nul) {
        source.setParent(dest.getParent());
    }
};

RBTree.prototype.delete = function (node) {
    if (node.getLeftChild() === this.nul) {
        this.transplant(node, node.getRightChild());
    } else if (node.getRightChild() === this.nul) {
        this.transplant(node, node.getLeftChild());
    } else {
        var min = this.getMin(node.getRightChild());
        if (min.getParent() !== node) {
            this.transplant(min, min.getRightChild());
            min.setRightChild(node.getRightChild());
            min.getLeftChild().setParent(min);
        }
        this.transplant(node, min);
        min.setLeftChild(node.getLeftChild());
        min.getLeftChild().setParent(min);
    }
    this.removeNodeFromList(node);
};

/**
 * Red-Black Node
 * @param key
 * @param parent
 * @param right
 * @param left
 * @param color
 * @returns {RBNode}
 * @constructor
 */
function RBNode({key, parent, right, left, color}) {
    if (!(this instanceof RBNode)) {
        return new RBNode({key, parent, right, left, color});
    }
    this.setKey(key);
    this.setParent(parent);
    this.setRightChild(right);
    this.setLeftChild(left);
    this.setColor(color);
}

RBNode.constants = {
    COLOR_RED: 'RED',
    COLOR_BLACK: 'BLACK'
};

RBNode.prototype.getKey = function () {
    return this.key;
};

RBNode.prototype.setKey = function (key) {
    this.key = key || null;
    return this;
};

RBNode.prototype.getLeftChild = function () {
    return this.left;
};

RBNode.prototype.setLeftChild = function (node) {
    this.left = node;
    return this;
};

RBNode.prototype.getRightChild = function () {
    return this.right;
};

RBNode.prototype.setRightChild = function (node) {
    this.right = node;
    return this;
};

RBNode.prototype.getParent = function () {
    return this.parent;
};

RBNode.prototype.setParent = function (node) {
    this.parent = node;
    return this;
};

RBNode.prototype.getColor = function () {
    return this.color;
};

RBNode.prototype.setColor = function (color) {
    this.color = color === RBNode.constants.COLOR_RED
        ? color
        : RBNode.constants.COLOR_BLACK;

    return this;
};