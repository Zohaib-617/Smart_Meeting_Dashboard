import { createContext, useContext, useState, useEffect } from "react";

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
    const [meetingsState, setMeetings] = useState(() => loadFromStorage('meetings', []));
    const [peopleState, setPeople] = useState(() => loadFromStorage('people', []));
    const [actionItemsState, setActionItems] = useState(() => loadFromStorage('actionItems', []));
    const [deletedLog, setDeletedLog] = useState(() => loadFromStorage('deletedLog', []));
    const [statusLog, setStatusLog] = useState(() => loadFromStorage('statusLog', []));

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

    useEffect(() => {
    localStorage.setItem('statusLog', JSON.stringify(statusLog));
}, [statusLog]);


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

    const updateActionItemStatus = (itemId, newStatus) => {
    const item = actionItemsState.find((i) => i.id === itemId);
    const meeting = item ? meetingsState.find((m) => m.id === item.meetingId) : null;

    setActionItems(
        actionItemsState.map((i) =>
            i.id === itemId ? { ...i, status: newStatus } : i
        )
    );

    setStatusLog([
        ...statusLog,
        {
            task: item ? item.task : 'Unknown task',
            meetingTitle: meeting ? meeting.title : 'Unknown meeting',
            newStatus,
            changedAt: new Date().toISOString(),
        },
        ]);
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

                statusLog,
                updateActionItemStatus,
            }}
        >
            {children}
        </MeetingsContext.Provider>
    );
};

export const useMeetingsContext = () => {
    return useContext(MeetingsContext);
};