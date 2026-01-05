// export default function TimesProvider({ children }: { children: ReactNode }) {
//   const [state, dispatch] = useReducer(reducer, 
//     {
//       sessions: [{ id: "0", name: "3x3", timestamp: 0 }],
//       activeSession: "0",
//       times: []
//     }
//   )
//   const activeSessionName = state.sessions.find(s => s.id === state.activeSession)?.name ?? "3x3";
//
//
//
//   return (
//     <TimesContext value={{
//       state,
//       dispatch,
//       activeSessionName
//     }}>
//       {children}
//     </TimesContext>
//   )
// }
