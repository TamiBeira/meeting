import React,  { ReactNode, createContext, useEffect, useState } from "react";

export interface MeetingContextDataProps {

}
interface MeetingContextProviderProps{
    children: ReactNode;
}


export const MeetingContext = createContext({} as MeetingContextDataProps);
export const AuthContextProvider = ({children}: MeetingContextProviderProps   )=>{

    return(
        <MeetingContext.Provider value={{

        }}>
        {children}
        </MeetingContext.Provider>
    )
}