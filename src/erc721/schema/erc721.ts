export default `interface ERC721Transaction {
  tokenContract: TokenContract
}

type ERC721SafeTransferFrom implements DecodedTransaction & ERC721Transaction {
  entity: Entity
  standard: String
  operation: String
  sender: Account
  from: TokenHolder
  to: TokenHolder
  tokenID: Int
  tokenContract: TokenContract
}

type ERC721TransferFrom implements DecodedTransaction & ERC721Transaction {
  entity: Entity
  standard: String
  operation: String
  sender: Account
  from: TokenHolder
  to: TokenHolder
  tokenID: Int
  tokenContract: TokenContract
}

type ERC721Approve implements DecodedTransaction & ERC721Transaction {
  entity: Entity
  standard: String
  operation: String
  sender: Account
  approved: TokenHolder
  tokenID: Int
  tokenContract: TokenContract
}
`;