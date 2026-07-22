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

interface User {
  id: string;
  email: string;
  username: string;
  avatarUpdatedAt: Date;
}

interface Post {
  id: string;
  author: User;
  body: string;
  timestamp: Date;
}

interface Thread {
  id: string;
  heading: string;
  body: string;
  author: User;
  timestamp: Date;
}


export type { Timetype, SessionType, Thread, Post, User };


export type formStates = "idle" | "submitting" | "loading";
