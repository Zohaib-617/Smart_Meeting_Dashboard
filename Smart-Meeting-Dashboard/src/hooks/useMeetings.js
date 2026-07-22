import { useMeetingsContext } from '../context/MeetingContext';

const useMeetings = () => {
    const { meetings } = useMeetingsContext();

    return meetings;
};

export default useMeetings;