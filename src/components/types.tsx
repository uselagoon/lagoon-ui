export type Task = {
  id: number;
  name: string;
  taskName: string;
  status: 'running' | 'complete' | 'failed' | 'error' | 'queued' | 'new' | 'cancelled';
  created: string;
  started: string | null;
  completed: string | null;
  service: string;
  logs: string | null;
  adminOnlyView: boolean;
  files: {
    id: number;
    filename: string;
    download: string;
    created: string;
  }[];
};
