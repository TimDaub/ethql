export default `
type ERC721TokenHolder {
  account: Account!
  tokenBalance: Long
}

type ERC721TokenContract {
  account: Account
  symbol: String
  totalSupply: Long
}
`;
