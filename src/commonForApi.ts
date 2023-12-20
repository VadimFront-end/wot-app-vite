import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const dataWithAccountId = (data: Record<string, string | number>) => ({ application_id: '38c031f69a335515bf7693436c3a1427', language: 'ru',...data });

export const baseQuery = fetchBaseQuery({
    baseUrl: 'https://api.worldoftanks.eu/wot/',
});
