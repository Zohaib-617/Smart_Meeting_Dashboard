import { createContext, useContext, useState, useEffect } from "react";
import { meetings, people, actionItems } from '../data/mockMeeting';

const MeetingsContext = createContext();

const loadFromStorage = (key, fallback) => {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : fallback;
    } catch {
        return fallback;
    }
};

export const MeetingsProvider = ({ children }) => {
    const [meetingsState, setMeetings] = useState(() => loadFromStorage('meetings', meetings));
    const [peopleState, setPeople] = useState(() => loadFromStorage('people', people));
    const [actionItemsState, setActionItems] = useState(() => loadFromStorage('actionItems', actionItems));
    const [deletedLog, setDeletedLog] = useState(() => loadFromStorage('deletedLog', []));

    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilters, setActiveFilters] = useState({});
    const [selectedMeetingId, setSelectedMeetingId] = useState(null);

    useEffect(() => {
        localStorage.setItem('meetings', JSON.stringify(meetingsState));
    }, [meetingsState]);

    useEffect(() => {
        localStorage.setItem('people', JSON.stringify(peopleState));
    }, [peopleState]);

    useEffect(() => {
        localStorage.setItem('actionItems', JSON.stringify(actionItemsState));
    }, [actionItemsState]);

    useEffect(() => {
    localStorage.setItem('deletedLog', JSON.stringify(deletedLog));
    }, [deletedLog]);


    const deleteMeeting = (meetingId) => {
    const meetingToDelete = meetingsState.find((m) => m.id === meetingId);
    if (meetingToDelete) {
        setDeletedLog([...deletedLog, { title: meetingToDelete.title, deletedAt: new Date().toISOString() }]);
    }
    setMeetings(meetingsState.filter((m) => m.id !== meetingId));
    setActionItems(actionItemsState.filter((a) => a.meetingId !== meetingId));
};

    const updateMeeting = (updatedMeeting) => {
        setMeetings(
            meetingsState.map((m) =>
                m.id === updatedMeeting.id
                    ? { ...updatedMeeting, updatedAt: new Date().toISOString() }
                    : m
            )
        );
    };

    return (
        <MeetingsContext.Provider
            value={{
                meetings: meetingsState,
                setMeetings,

                people: peopleState,
                setPeople,

                actionItems: actionItemsState,
                setActionItems,

                searchQuery,
                setSearchQuery,

                activeFilters,
                setActiveFilters,

                selectedMeetingId,
                setSelectedMeetingId,

                deletedLog,

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