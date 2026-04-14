import { createDirectus, rest } from '@directus/sdk';
import type { Schema } from './types';

const client = createDirectus<Schema>('http://localhost:8055').with(rest());

export default client;
