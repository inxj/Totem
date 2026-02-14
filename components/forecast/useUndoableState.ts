import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';

const MAX_HISTORY = 50;

export function useUndoableState<T>(initialState: T) {
  const historyRef = useRef<T[]>([initialState]);
  const pointerRef = useRef(0);
  const listenersRef = useRef<Set<() => void>>(new Set());

  const notify = () => {
    listenersRef.current.forEach((l) => l());
  };

  const subscribe = useCallback((listener: () => void) => {
    listenersRef.current.add(listener);
    return () => { listenersRef.current.delete(listener); };
  }, []);

  const getSnapshot = useCallback(() => {
    return historyRef.current[pointerRef.current];
  }, []);

  const state = useSyncExternalStore(subscribe, getSnapshot);

  const setState = useCallback((updater: T | ((prev: T) => T)) => {
    const current = historyRef.current[pointerRef.current];
    const next = typeof updater === 'function' ? (updater as (prev: T) => T)(current) : updater;
    // Truncate any future states beyond the current pointer
    const truncated = historyRef.current.slice(0, pointerRef.current + 1);
    truncated.push(next);
    // Cap history length
    if (truncated.length > MAX_HISTORY) {
      truncated.splice(0, truncated.length - MAX_HISTORY);
      pointerRef.current = MAX_HISTORY - 1;
    } else {
      pointerRef.current = truncated.length - 1;
    }
    historyRef.current = truncated;
    notify();
  }, []);

  const undo = useCallback(() => {
    if (pointerRef.current > 0) {
      pointerRef.current -= 1;
      notify();
    }
  }, []);

  const redo = useCallback(() => {
    if (pointerRef.current < historyRef.current.length - 1) {
      pointerRef.current += 1;
      notify();
    }
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (mod && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (mod && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo]);

  return [state, setState, { undo, redo, canUndo: pointerRef.current > 0, canRedo: pointerRef.current < historyRef.current.length - 1 }] as const;
}
