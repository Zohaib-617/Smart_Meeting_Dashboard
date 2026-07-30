import { useMemo } from "react";
import { useMeetingsContext } from '../context/MeetingContext';

const useActionItems = ({ meetingId, assigneeId } = {}) => {
    const { actionItems } = useMeetingsContext();

    const filteredActionItems = useMemo(() => {
        return actionItems.filter((item) => {
            const matchesMeeting =
                !meetingId || item.meetingId === meetingId;

            const matchesAssignee =
                !assigneeId || item.assigneeId === assigneeId;

            return matchesMeeting && matchesAssignee;
        });
    }, [actionItems, meetingId, assigneeId]);

    return filteredActionItems;
};

export default useActionItems;