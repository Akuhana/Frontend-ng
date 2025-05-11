export interface TodoItem {
  id: number;
  name: string;
  isComplete: boolean;
  priority: number;    // 0 = backlog, 1..3 = priorities
}