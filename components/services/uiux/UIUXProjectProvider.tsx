"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import { UIUX_PROJECTS } from "./UIUXProjects";
import UIUXProjectViewer from "./UIUXProjectViewer";

type UIUXProjectActions = {
  openProject: (projectId: string) => void;
};

const ProjectActionsContext = createContext<UIUXProjectActions>({
  openProject: () => undefined,
});

export function useUIUXProjectActions() {
  return useContext(ProjectActionsContext);
}

export default function UIUXProjectProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openProject = useCallback((projectId: string) => {
    const index = UIUX_PROJECTS.findIndex((project) => project.id === projectId);
    if (index >= 0) setActiveIndex(index);
  }, []);

  const closeProject = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const navigateProject = useCallback((nextIndex: number) => {
    setActiveIndex(nextIndex);
  }, []);

  return (
    <ProjectActionsContext.Provider value={{ openProject }}>
      {children}
      {activeIndex !== null && (
        <UIUXProjectViewer
          projectIndex={activeIndex}
          onClose={closeProject}
          onNavigate={navigateProject}
        />
      )}
    </ProjectActionsContext.Provider>
  );
}
