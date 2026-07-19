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

interface Post {
  id: string;
  author: string;
  body: string;
  timestamp: Date;
}

interface Thread {
  id: string;
  heading: string;
  body: string;
  author: string;
  timestamp: Date;
}


export type { Timetype, SessionType, Thread, Post };


export type formStates = "idle" | "submitting" | "loading";
