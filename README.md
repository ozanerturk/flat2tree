# flat2tree


Tree structures are data structures that are easy to use intuitively by users, but difficult to model.

There are many models used to store tree structures.
"MongoDB documentation" provides examples that can be used while working with the tree structure.
https://docs.mongodb.com/manual/applications/data-models-tree-structures/
- Parent References
- Child References
- Array of Ancestors
- Materialized Paths
- Nested Sets

Even if MongoDB allows nested models, it will be inefficient to store the tree data model in this way. Aside from storing data, it is necessary to be able to search and update it. 
One way or another, the tree structure will be stored as node records, similar to the one below.

id, parentid, data
id, parentid, data
id, parentid, data

keeping these structures flat in the database enables you to perform query and update operations very quickly and easily.

But users want to see the tree like a tree. Most of the frontend libraries provides tree UI expecting tree modeled data to work. 
At this point, it is achivable to convert flat node array to tree model. For this we just need simple recursive method to parse flat node array to tree model.

Simple algorith can be found in [Algorithm.md](./Algorithm.md)

|id      | parentid  |  data|
|-------|------------|--------|
| node1	| null	    | "data"|
| node2	| node1	    | "data"|
| node3	| node2	    | "data"|
| node4	| node2	    | "data"|
| node5	| null	    | "data"|
| node6	| node5	    | "data"|
| node7	| node5	    | "data"|



```JSON
[
    {
        "id": "node1",
        "parentid": null,
        "children": [
            {
                "id": "node2",      
                "parentid": "node1",
                "children": [       
                    {
                        "id": "node3",
                        "parentid": "node2",
                        "children": [],
                        "data": "data"
                    },
                    {
                        "id": "node4",
                        "parentid": "node2",
                        "children": [],
                        "data": "data"
                    }
                ],
                "data": "data"
            }
        ],
        "data": "data"
    },
    {
        "id": "node5",
        "parentid": null,
        "children": [
            {
                "id": "node6",
                "parentid": "node5",
                "children": [],
                "data": "data"
            },
            {
                "id": "node7",
                "parentid": "node5",
                "children": [],
                "data": "data"
            }
        ],
        "data": "data"
    }
]
```

```javascript
var {Tree} = require('./flat2tree')
let config =  { // this is default config
    dataProperty: 'data',
    idProperty: 'id',
    parentidProperty: 'parentid'
}
var tree = new Tree()

tree.parse(arr,config)
console.log(tree.data)              // Simple tree model which can be used for treeUI libraries.

let node = tree.getNode('node4')    // Directly access to node by unique Id
console.log(node)

let path = tree.getPath(node)       // path is the direct way of id array to root node 
console.log(path)               

tree.traverse((node) =>{            // Traverse tree Postorder 
    console.log(`${node.id} ${node.data}`)
})

console.log(tree.toJSON())          // tree as json 
```
