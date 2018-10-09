import { EthqlContext } from '../../context';
import { EthqlAccount, EthqlTransaction } from '../../core/model';
import { createAbiDecoder, DecoderDefinition, extractParamValue } from '../../core/services/decoder';

import {
  ERC721TokenContract,
  ERC721TokenHolder,
  ERC721Transfer,
  ERC721Approve,
  ERC721setApprovalForAll,
  ERC721TransferEvent,
  ERC721ApprovalEvent,
  ERC721ApprovalForAllEvent,
  ERC721TxBindings,
  ERC721LogBindings
} from '../model';


class ERC721TokenDecoder implements DecoderDefinition<ERC721TxBindings, ERC721LogBindings> {
  public readonly entity = 'token';
  public readonly standard = 'ERC721';
  public readonly abiDecoder = createAbiDecoder(__dirname + '../../../abi/erc721.json');

  public readonly txTransformers = {
    safeTransferFrom: (decoded: any, tx: EthqlTransaction, context: EthqlContext) => {
      const tokenContract = new ERC721TokenContract(tx.to, context);
      const from = new EthqlAccount(extractParamValue(decoded.params, '_from'));
      const to = new EthqlAccount(extractParamValue(decoded.params, '_to'));

      return {
        tokenContract,
        sender: tx.from,
        from: new ERC721TokenHolder(from, tokenContract),
        to: new ERC721TokenHolder(to, tokenContract),
        tokenID: extractParamValue(decoded.params, '_tokenId'),
      };
    },

    transferFrom: (decoded: any, tx: EthqlTransaction, context: EthqlContext) => {
      const tokenContract = new ERC721TokenContract(tx.to, context);
      const from = new EthqlAccount(extractParamValue(decoded.params, '_from'));
      const to = new EthqlAccount(extractParamValue(decoded.params, '_to'));

      return {
        tokenContract,
        sender: tx.from,
        from: new ERC721TokenHolder(from, tokenContract),
        to: new ERC721TokenHolder(to, tokenContract),
        tokenID: extractParamValue(decoded.params, '_tokenId'),
      };
    },

    approve: (decoded: any, tx: EthqlTransaction, context: EthqlContext) => {
      const tokenContract = new ERC721TokenContract(tx.to, context);
      const approved = new EthqlAccount(extractParamValue(decoded.params, '_approved'));
      return {
        tokenContract,
        sender: tx.from,
        approved: new ERC721TokenHolder(approved, tokenContract),
        tokenID: extractParamValue(decoded.params, '_tokenId'),
      };
    },

    setApprovalForAll: (decoded: any, tx: EthqlTransaction, context: EthqlContext) => {
      const tokenContract = new ERC721TokenContract(tx.to, context);
      const operator = extractParamValue(decoded.params, '_operator');
      return {
        tokenContract,
        sender: tx.from,
        operator: new ERC721TokenHolder(operator, tokenContract),
        approved: extractParamValue(decoded.params, '_approved'),
      };
    },
  };

  public readonly logTransformers = {
    transfer: (decoded: any, tx: EthqlTransaction, context: EthqlContext): ERC721TransferEvent => {
      const tokenContract = new ERC721TokenContract(tx.to, context);
      const from = new EthqlAccount(extractParamValue(decoded.events, '_from'));
      const to = new EthqlAccount(extractParamValue(decoded.events, '_to'));

      return {
        from: new ERC721TokenHolder(from, tokenContract),
        to: new ERC721TokenHolder(to, tokenContract),
        tokenID: extractParamValue(decoded.events, '_tokenId'),
      };
    },

    approval: (decoded: any, tx: EthqlTransaction, context: EthqlContext): ERC721ApprovalEvent => {
      const tokenContract = new ERC721TokenContract(tx.to, context);
      const owner = new EthqlAccount(extractParamValue(decoded.events, '_owner'));
      const approved = new EthqlAccount(extractParamValue(decoded.events, '_approved'));

      return {
        owner: new ERC721TokenHolder(owner, tokenContract),
        approved: new ERC721TokenHolder(approved, tokenContract),
        tokenID: extractParamValue(decoded.events, '_tokenId'),
      };
    },

    approvalForAll: (decoded: any, tx: EthqlTransaction, context: EthqlContext): ERC721ApprovalForAllEvent => {
      const tokenContract = new ERC721TokenContract(tx.to, context);
      const owner = new EthqlAccount(extractParamValue(decoded.events, '_owner'));
      const operator = new EthqlAccount(extractParamValue(decoded.events, '_operator'));

      return {
        owner: new ERC721TokenHolder(owner, tokenContract),
        operator: new ERC721TokenHolder(operator, tokenContract),
        approved: extractParamValue(decoded.events, '_tokenId'),
      };
    },
  };
}

export default ERC721TokenDecoder;
