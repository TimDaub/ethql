import Contract from 'web3/eth/contract';
import { EthqlContext } from '../../context';
import { EthqlAccount, EthqlTransaction } from '../../core/model';

export class ERC721TokenContract {
  private static ABI = require(__dirname + '../../../abi/erc721.json');
  private _contract: Contract;

  constructor(public readonly account: EthqlAccount, readonly context: EthqlContext) {
    this._contract = new context.services.web3.eth.Contract(ERC721TokenContract.ABI, account.address);
  }

  public async symbol() {
    return this._contract.methods
      .symbol()
      .call()
      .catch(() => undefined);
  }

  public async totalSupply() {
    return this._contract.methods
      .totalSupply()
      .call()
      .catch(() => undefined);
  }

  public async balanceOf({ address }: { address: string }) {
    return this._contract.methods
      .balanceOf(address)
      .call()
      .catch(() => undefined);
  }
}

export class ERC721TokenHolder {
  constructor(public readonly account: EthqlAccount, private readonly contract: ERC721TokenContract) {}
}

export interface ERC721Transaction {
  tokenContract: ERC721TokenContract;
  sender: EthqlAccount;
}

export interface ERC721Transfer extends ERC721Transaction {
  from: ERC721TokenHolder;
  to: ERC721TokenHolder;
  tokenID: number;
}

export interface ERC721Approve extends ERC721Transaction {
  approved: ERC721TokenHolder;
  tokenID: number;
}

export interface ERC721setApprovalForAll extends ERC721Transaction {
  operator: ERC721TokenHolder;
  approved: boolean;
}

export type ERC721TransferEvent = {
  from: ERC721TokenHolder;
  to: ERC721TokenHolder;
  tokenID: number;
};

export type ERC721ApprovalEvent = {
  owner: ERC721TokenHolder;
  approved: ERC721TokenHolder;
  tokenID: number;
};

export type ERC721ApprovalForAllEvent = {
  owner: ERC721TokenHolder;
  operator: ERC721TokenHolder;
  approved: boolean;
};

export type ERC721TxBindings = {
  safeTransferFrom: ERC721Transfer;
  transferFrom: ERC721Transfer;
  approve: ERC721Approve;
  setApprovalForAll: ERC721setApprovalForAll;
};

export type ERC721LogBindings = {
  transfer: ERC721TransferEvent;
  approval: ERC721ApprovalEvent;
  approvalForAll: ERC721ApprovalForAllEvent;
};
