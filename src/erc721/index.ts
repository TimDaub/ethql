import { EthqlPluginFactory } from '../plugin';
import Erc721TokenDecoder from './decoders';
import erc721Schema from './schema/erc721';
import tokenSchema from './schema/token';

const plugin: EthqlPluginFactory = config => ({
  name: 'erc721',
  priority: 10,
  schema: [erc721Schema, tokenSchema],
  serviceDefinitions: {
    decoder: {
      config: {
        decoders: [new Erc721TokenDecoder()],
      },
    },
  },
  dependsOn: {
    services: ['web3', 'ethService', 'decoder'],
  },
  order: {
    after: ['core'],
  },
});

export default plugin;
