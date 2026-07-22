import { useMeetingsContext } from "../context/meetingContext";
import useMeetings  from '../hooks/useMeetings';
import { useMemo } from "react";

const useFilteredMeetings = ()=>{

     const meetings = useMeetings();
     

 const { searchQuery } = useMeetingsContext();
 const { activeFilters } = useMeetingsContext();

    const filteredMeetings = useMemo(() => {
        return meetings.filter((meeting) =>{
           const matchesSearch =
            meeting.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase());


        const matchesTeam =
            !activeFilters.team ||
            meeting.team === activeFilters.team;

        return matchesSearch && matchesTeam;
    });
    }, [meetings, searchQuery, activeFilters]);

    return filteredMeetings;
};

export default useFilteredMeetings;