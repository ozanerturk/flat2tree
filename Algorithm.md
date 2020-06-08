

# Javascript
```javascript
function parse(array,parent = null,tree = null) {
        tree = tree || []
        let parentid = parent ? parent.id : null
        var children = array.filter(child => child.parentid == parentid);
        if (children.length) {
            if (parentid) {
                parent.children = children;
            } else {
                tree = children
            }
            children.forEach(child => parse(array,child,tree))
        }
        return tree;
    }
parse(array)
```


