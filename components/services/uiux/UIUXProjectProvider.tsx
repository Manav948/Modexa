"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import { UIUX_PROJECTS } from "./UIUXProjects";
import UIUXProjectViewer from "./UIUXProjectViewer";

type UIUXProjectContextType = {
  activeProjectId: string | null;
  openProject: (projectId: string) => void;
  closeProject: () => void;
  registerViewer: () => void;
  unregisterViewer: () => void;
};

const ProjectContext = createContext<UIUXProjectContextType>({
  activeProjectId: null,
  openProject: () => undefined,
  closeProject: () => undefined,
  registerViewer: () => undefined,
  unregisterViewer: () => undefined,
});

export function useUIUXProjectActions() {
  const ctx = useContext(ProjectContext);
  return {
    openProject: ctx.openProject,
    closeProject: ctx.closeProject,
    activeProjectId: ctx.activeProjectId,
  };
}

export function useUIUXProjectRegistration() {
  return useContext(ProjectContext);
}

export default function UIUXProjectProvider({ children }: { children: ReactNode }) {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [hasRegisteredViewer, setHasRegisteredViewer] = useState(false);

  const openProject = useCallback((projectId: string) => {
    setActiveProjectId(projectId);
  }, []);

  const closeProject = useCallback(() => {
    setActiveProjectId(null);
  }, []);

  const registerViewer = useCallback(() => {
    setHasRegisteredViewer(true);
  }, []);

  const unregisterViewer = useCallback(() => {
    setHasRegisteredViewer(false);
  }, []);

  const projectIndex =
    activeProjectId !== null
      ? UIUX_PROJECTS.findIndex((p) => p.id === activeProjectId)
      : -1;

  return (
    <ProjectContext.Provider
      value={{
        activeProjectId,
        openProject,
        closeProject,
        registerViewer,
        unregisterViewer,
      }}
    >
      {children}
      {/* Only render fallback viewer if UIUXDesignCarousel isn't present to consume it */}
      {!hasRegisteredViewer && activeProjectId !== null && projectIndex >= 0 && (
        <UIUXProjectViewer
          projectIndex={projectIndex}
          onClose={closeProject}
          onNavigate={(nextIdx) => {
            if (UIUX_PROJECTS[nextIdx]) {
              setActiveProjectId(UIUX_PROJECTS[nextIdx].id);
            }
          }}
        />
      )}
    </ProjectContext.Provider>
  );
}
