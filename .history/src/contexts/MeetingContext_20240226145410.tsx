import React,  { ReactNode, createContext, useEffect, useState } from "react";


export const MeetingContext = createContext({} as MeetingContextDataProps);
export const MeetingContextProvider = ({children}: AuthProviderProps   )=>{
    const [loading, setLoading] = useState(true);

    return(
        <MeetingContext.Provider value={{

        }}>
        {children}
        </MeetingContext.Provider>
    )
}