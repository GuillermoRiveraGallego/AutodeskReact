import { useEffect, useRef } from "react";
import InspireTree from "inspire-tree";
import InspireTreeDOM from "inspire-tree-dom";
import {
  getHubs,
  getProjects,
  getContents,
  getVersions,
} from "../lib/treeData";
// import "inspire-tree-dom/dist/inspire-tree.css";

export function Sidebar({ onVersionSelected }) {
  const treeRef = useRef(null);

  useEffect(() => {
    const tree = new InspireTree({
      data: function (node) {
        if (!node || !node.id) {
          return getHubs();
        } else {
          const tokens = node.id.split("|");
          switch (tokens[0]) {
            case "hub":
              return getProjects(tokens[1]);
            case "project":
              return getContents(tokens[1], tokens[2]);
            case "folder":
              return getContents(tokens[1], tokens[2], tokens[3]);
            case "item":
              return getVersions(tokens[1], tokens[2], tokens[3]);
            default:
              return [];
          }
        }
      },
    });

    tree.on("node.click", function (event, node) {
      event.preventTreeDefault();
      const tokens = node.id.split("|");
      if (tokens[0] === "version") {
        onVersionSelected(tokens[1]);
      }
    });

    new InspireTreeDOM(tree, { target: treeRef.current });

    return () => {
      tree.removeAll(); // cleanup
    };
  }, [onVersionSelected]);

  return (
    <div
      ref={treeRef}
      className="overflow-y-auto h-full w-full bg-white border-r p-2"
    >
      aaaa
    </div>
  );
}
