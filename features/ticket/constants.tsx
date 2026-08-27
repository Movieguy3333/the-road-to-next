import { LucideCheck, LucideFile, LucidePencil } from "lucide-react";

// Note: must change this file into a tsx file to use React components in the constants file. This is because the Lucide icons are React components and cannot be used in a ts file.
export const TICKET_ICONS = {
  OPEN: <LucideFile />,
  DONE: <LucideCheck />,
  IN_PROGRESS: <LucidePencil />,
};
