import type { Access, FieldAccess } from 'payload';

export const signedIn: Access = ({ req }) => Boolean(req.user);
export const adminOnly: Access = ({ req }) => req.user?.role === 'admin';
export const adminField: FieldAccess = ({ req }) => req.user?.role === 'admin';
export const publishedOnly: Access = ({ req }) => req.user ? true : { _status: { equals: 'published' } };
