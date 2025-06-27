import { useEffect, useRef } from "react";
import { initViewer, loadModel } from "../lib/viewer";

export function Viewer({ urn }) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    async function init() {
      viewerRef.current = await initViewer(containerRef.current);
      if (urn) {
        loadModel(viewerRef.current, urn);
      }
    }
    init();

    // Cleanup opcional
    return () => {
      if (viewerRef.current) {
        viewerRef.current.finish();
        viewerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (viewerRef.current && urn) {
      loadModel(viewerRef.current, urn);
    }
  }, [urn]);

  return <div ref={containerRef} className="w-full h-full bg-gray-100" />;
}
