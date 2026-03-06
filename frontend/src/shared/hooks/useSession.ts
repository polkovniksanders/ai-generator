import { useCallback, useEffect, useState } from 'react';

export interface SessionInfo {
    count: number;
    limit: number;
    cooldownUntil: number | null;
    canGenerate: boolean;
    remaining: number;
}

const STORAGE_KEY = 'aigen_session';

const defaultSession: SessionInfo = {
    count: 0,
    limit: 3,
    cooldownUntil: null,
    canGenerate: true,
    remaining: 3,
};

export const useSession = () => {
    const [session, setSession] = useState<SessionInfo>(defaultSession);
    const [loading, setLoading] = useState(true);

    const fetchSession = useCallback(async () => {
        try {
            const res = await fetch('/api/session');
            if (!res.ok) throw new Error('Session fetch failed');
            const data: SessionInfo = await res.json();
            setSession(data);
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch {
            const cached = sessionStorage.getItem(STORAGE_KEY);
            if (cached) {
                setSession(JSON.parse(cached) as SessionInfo);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchSession();
    }, [fetchSession]);

    const refresh = useCallback(() => {
        void fetchSession();
    }, [fetchSession]);

    return { session, loading, refresh };
};
