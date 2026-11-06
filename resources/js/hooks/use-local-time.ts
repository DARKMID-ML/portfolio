import { useEffect, useState } from 'react';

export function useLocalTime(timeZone = 'Africa/Bamako') {
    const [time, setTime] = useState('--:--');

    useEffect(() => {
        const format = () =>
            new Intl.DateTimeFormat('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone,
            }).format(new Date());

        setTime(format());

        const interval = window.setInterval(() => setTime(format()), 30000);

        return () => window.clearInterval(interval);
    }, [timeZone]);

    return time;
}
