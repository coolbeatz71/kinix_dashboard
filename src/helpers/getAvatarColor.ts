import ColorHash from 'color-hash';

export const getAvatarColor = (name: string): string => new ColorHash().hex(name || '');
