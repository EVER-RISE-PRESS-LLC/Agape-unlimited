import * as migration_20261019_205845 from './20261019_205845';
import * as migration_20261019_210146_add_author_type from './20261019_210146_add_author_type';

export const migrations = [
  {
    up: migration_20261019_205845.up,
    down: migration_20261019_205845.down,
    name: '20261019_205845',
  },
  {
    up: migration_20261019_210146_add_author_type.up,
    down: migration_20261019_210146_add_author_type.down,
    name: '20261019_210146_add_author_type'
  },
];
