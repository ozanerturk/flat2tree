import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class flat2tree {
    public static void main( String[] args) {
        List<TreeNode> flat = new ArrayList<TreeNode>() {
            {
                add(new TreeNode(1, null, "data"));
                add(new TreeNode(2, null, "data"));
                add(new TreeNode(3, 1, "data"));
                add(new TreeNode(4, 1, "data"));
                add(new TreeNode(5, 3, "data"));
                add(new TreeNode(6, 2, "data"));
            }
        };

        List<TreeNode> tree = parse(flat);
    }

    public static List<TreeNode> parse(List<TreeNode> flat) {
        return parse(flat, null, new ArrayList<TreeNode>());
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

}

class TreeNode {

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
