import { createContext, useContext, useState } from "react";
import { meetings, people } from '../data/mockMeeting'

const MeetingsContext = createContext();

export const MeetingsProvider = ({ children }) => {
    const [meetingsState, setMeetings] = useState(meetings);

    const [peopleState, setPeople] = useState(people);

    const [searchQuery, setSearchQuery] = useState("");

    const [activeFilters, setActiveFilters] = useState({});

    const [selectedMeetingId, setSelectedMeetingId] = useState(null);

    return (
        <MeetingsContext.Provider
            value={{
                meetings: meetingsState,
                setMeetings,

                people: peopleState,
                setPeople,

                searchQuery,
                setSearchQuery,

                activeFilters,
                setActiveFilters,

                selectedMeetingId,
                setSelectedMeetingId,
            }}
        >
            {children}
        </MeetingsContext.Provider>
    );
};

export const useMeetingsContext = () => {
    return useContext(MeetingsContext);
};