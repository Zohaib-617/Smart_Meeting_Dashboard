import { createContext, useContext, useState } from "react";
import { meetings, people, actionItems } from '../data/mockMeeting'

const MeetingsContext = createContext();

export const MeetingsProvider = ({ children }) => {
    const [meetingsState, setMeetings] = useState(meetings);

    const [peopleState, setPeople] = useState(people);

    const [searchQuery, setSearchQuery] = useState("");

     const [actionItemsState, setActionItems] = useState(actionItems);

    const [activeFilters, setActiveFilters] = useState({});

    const [selectedMeetingId, setSelectedMeetingId] = useState(null);

    const deleteMeeting = (meetingId) => {
    setMeetings(meetingsState.filter((m) => m.id !== meetingId));
    setActionItems(actionItemsState.filter((a) => a.meetingId !== meetingId));

};
const updateMeeting = (updatedMeeting) => {
    setMeetings(
        meetingsState.map((m) => (m.id === updatedMeeting.id ? updatedMeeting : m))
    );
};

    return (
        <MeetingsContext.Provider
            value={{
                meetings: meetingsState,
                setMeetings,

                people: peopleState,
                setPeople,

                searchQuery,
                setSearchQuery,

                actionItems: actionItemsState,
                setActionItems,

                activeFilters,
                setActiveFilters,

                selectedMeetingId,
                setSelectedMeetingId,

                deleteMeeting,
                updateMeeting,
               
            }}
        >
            {children}
        </MeetingsContext.Provider>
    );
};

export const useMeetingsContext = () => {
    return useContext(MeetingsContext);
};