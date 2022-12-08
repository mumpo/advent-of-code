export type File = {
  name: string;
  size: number;
};

export type Directory = {
  name: string;
  parent?: Directory;
  children: Record<string, Node>;
};

export type Node = File | Directory;

export type State = {
  tree: Directory;
  current: Directory;
};

export const isDirectory = (node: Node): node is Directory =>
  "children" in node;

const changeDirectory = (state: State, arg: string) => {
  switch (arg) {
    case "..":
      state.current = state.current.parent || state.current;
      return;
    case "/":
      state.current = state.tree;
      return;
    default: {
      state.current = state.current.children[arg] as Directory;
      return;
    }
  }
};

const listFile = (state: State, line: string) => {
  const [info, name] = line.split(" ");

  if (info === "dir") {
    state.current.children[name] = {
      name,
      parent: state.current,
      children: {},
    };

    return;
  }

  state.current.children[name] = { name, size: parseInt(info) };
};

export const parseInputLine = (state: State) => (line: string) => {
  if (line.startsWith("$")) {
    const [command, arg] = line.split(" ").slice(1);

    if (command === "cd") {
      changeDirectory(state, arg);
    }

    return;
  }

  listFile(state, line);
};

export const printTree = (node: Node) => {
  let indent = 0;

  const _printTree = (node: Node) => {
    console.log(
      Array(indent).fill(" ").join(""),
      "-",
      node.name,
      isDirectory(node) ? "(dir)" : `(file, ${node.size})`,
    );

    if (isDirectory(node)) {
      indent++;
      Object.values(node.children).forEach(_printTree);
      indent--;
    }
  };

  _printTree(node);
};

export type DirectorySize = { directory: Directory; size: number };

export type FindSizesResult = { total: number; directories: DirectorySize[] };

export const findDirectorySizes = (
  directory: Directory,
): FindSizesResult => {
  return Object.values(directory.children).reduce((accum, child) => {
    if (!isDirectory(child)) {
      return {
        ...accum,
        total: accum.total + child.size,
      };
    }

    const childResult = findDirectorySizes(child);

    return {
      total: accum.total + childResult.total,
      directories: [...accum.directories, {
        size: childResult.total,
        directory: child,
      }, ...childResult.directories],
    };
  }, { total: 0, directories: [] } as FindSizesResult);
};
