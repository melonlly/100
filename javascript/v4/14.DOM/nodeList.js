/*
    NodeList、NamedNodeMap、HTMLCollection
        这三个集合类型都是 “实时的”
    
    一般来说，因为每次操作 NodeList 都会搜索整个文档，所以最好减少操作 NodeList，以减少搜索带来的额外开销
*/