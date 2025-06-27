export async function getJSON(url) {
  const resp = await fetch(url);
  if (!resp.ok) {
    console.error(await resp.text());
    return [];
  }
  return resp.json();
}

function createTreeNode(id, text, icon, children = false) {
  return { id, text, children, itree: { icon } };
}

export async function getHubs() {
  const hubs = await getJSON("/api/hubs");
  return hubs.map((hub) =>
    createTreeNode(`hub|${hub.id}`, hub.name, "icon-hub", true)
  );
}

export async function getProjects(hubId) {
  const projects = await getJSON(`/api/hubs/${hubId}/projects`);
  return projects.map((project) =>
    createTreeNode(
      `project|${hubId}|${project.id}`,
      project.name,
      "icon-project",
      true
    )
  );
}

export async function getContents(hubId, projectId, folderId = null) {
  const contents = await getJSON(
    `/api/hubs/${hubId}/projects/${projectId}/contents` +
      (folderId ? `?folder_id=${folderId}` : "")
  );
  return contents.map((item) => {
    if (item.folder) {
      return createTreeNode(
        `folder|${hubId}|${projectId}|${item.id}`,
        item.name,
        "icon-my-folder",
        true
      );
    } else {
      return createTreeNode(
        `item|${hubId}|${projectId}|${item.id}`,
        item.name,
        "icon-item",
        true
      );
    }
  });
}

export async function getVersions(hubId, projectId, itemId) {
  const versions = await getJSON(
    `/api/hubs/${hubId}/projects/${projectId}/contents/${itemId}/versions`
  );
  return versions.map((version) =>
    createTreeNode(`version|${version.id}`, version.name, "icon-version")
  );
}
