import { useMemo } from "react";
import { actionItems } from '../data/mockMeeting';

const useActionItems = ({ meetingId, assigneeId } = {}) => {
    const filteredActionItems = useMemo(() => {
        return actionItems.filter((item) => {
            const matchesMeeting =
                !meetingId || item.meetingId === meetingId;

            const matchesAssignee =
                !assigneeId || item.assigneeId === assigneeId;

            return matchesMeeting && matchesAssignee;
        });
    }, [meetingId, assigneeId]);

    return filteredActionItems;
};

export default useActionItems;