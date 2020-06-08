

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
```

# Java
```java
public class TreeNode {

    public List<TreeNode> children;

    public Integer id;
    public Integer parentid;
    public String data;

    public TreeNode(Integer id, Integer parentid, String data) {
        this.id = id;
        this.parentid = parentid;
        this.data = data;

    }
}

public static List<TreeNode> parse(List<TreeNode> flat, TreeNode parent , List<TreeNode> tree  ){
    Integer parentid = parent != null ? parent.id : null;
    List<TreeNode> children = flat.stream().filter(child -> child.parentid == parentid).collect(Collectors.toList());
    if (children.size() != 0) {
        if (parentid != null) {
            parent.children = children;
        } else {
            tree.addAll(children);
        }
        children.forEach(child -> parse(flat,child,tree));
    }
    return tree;
}
```