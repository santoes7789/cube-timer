interface SessionType {
  id: number;
  name: string;
  timestamp: number;
}

interface Timetype {
  id: number;
  time: number;
  timestamp: number;
  modifier: string;
  comment: string;
  session: number;
  scramble: string;
}

export type { Timetype, SessionType };
