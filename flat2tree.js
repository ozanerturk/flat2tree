
"use strict"

class Node {
    constructor(id, parentid, data) {
        this.id = id
        this.parentid = parentid
        // this.parent = undefined
        this.children = []
        this.data = data
    }
    setParent(parent) {
        this.parent = parent
    }

    isLeaf() {
        return !!this.children.length
    }

}



class Tree {

    constructor() {
        this.data = []
        this.simple = []
        this.flat = []
    }
    getPath(node) {
        let path = []
        while (node != null) {
            path.push(node.id)
            node = this.flat.find(x => x.id == node.parentid)
        }
        return path
    }
    traverse(operation, node) {
        if (!node) {
            this.data.forEach(n => this.traverse(operation, n))
        } else if (node.children.length) {
            node.children.forEach(n => this.traverse(operation, n))
            operation(node)
        }
        else {
            operation(node)
        }
    }

    getNode(id) {
        return this.flat.find(x => x.id == id)
    }
    removeNode(node) {
        var index = this.flat.indexOf(x => x[this.config.idProperty] == node[this.config.idProperty])
        if (index != -1) {
            this.flat.splice(index, 1);
        }
    }

    toJSON() {
        return JSON.stringify(this.data, null, 4)
    }

    parse(array, { dataProperty = 'data', idProperty = 'id', parentidProperty = 'parentid' } = {}) {
        this.config = { dataProperty, idProperty, parentidProperty }
        this.data = []
        this.flat = array.map(x => new Node(x[idProperty], x[parentidProperty], x[dataProperty]))
        this.parseRecursive(null)
    }
    parseRecursive(parent) {
        let parentid = parent ? parent[this.config.idProperty] : null
        var children = this.flat.filter(child => child[this.config.parentidProperty] == parentid);

        if (children.length) {
            if (parentid) {
                // children.forEach(child => child.setParent(parent))
                parent.children = children;
            } else {
                this.data = children
            }
            children.forEach(child => this.parseRecursive(child))
        }
        return this;
    }
}

module.exports = { Tree,Node }