var {Tree} = require('./flat2tree')


var arr = [{
    'id': 'node1',
    'data': "data",
    'parentid': null
},
{
    'id': 'node2',
    'data': "data",
    'parentid': 'node1'
},
{
    'id': 'node3',
    'data': "data",
    'parentid': 'node2'
},
{
    'id': 'node4',
    'data': "data",
    'parentid': 'node2'
},
{
    'id': 'node5',
    'data': "data",
    'parentid': null
},
{
    'id': 'node6',
    'data': "data",
    'parentid': 'node5'
},
{
    'id': 'node7',
    'data': "data",
    'parentid': 'node5'
},
];

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
