# fiatconnect-types
Types used in the FiatConnect specification. Offered as standalone module for payment providers and 
wallets to both use for FiatConnect APIs and integrations.

## Installation
From your project directory, run:
```bash
yarn add @fiatconnect/fiatconnect-types
```
or
```bash
npm i @fiatconnect/fiatconnect-types
```

## Example usage

```typescript
import {TransferStatus} from '@fiatconnect/fiatconnect-types'
import axios from 'axios'

export async function getTransferStatus(transferId: string): Promise<TransferStatus> {
  const response = await axios
    .create({url: 'https://MOCK-PROVIDER-URL.fake'})
    .get(`/transfer/${transferId}/status`)
  return response.data.status
}
```

## Contributing
- [Reporting issues](https://github.com/fiatconnect/fiatconnect-types/issues)
- [Submitting a pull request](https://github.com/fiatconnect/fiatconnect-types/pulls)
- Publishing updates
  - Request access to our [NPM organization](https://www.npmjs.com/org/fiatconnect) on [Valora Discord](https://discord.gg/rwxxsZjJbd)
  - Make sure you are on the latest version of branch `main`
  - Check out a release branch
  - Run `yarn prepublish && yarn release`
  - Add release notes to `CHANGELOG.md`
  - Once code review has taken place:
    - Merge your branch
    - Run `git push origin vX.Y.Z` to push your tag (where X.Y.Z is the version you are trying to publish)
    - Run `npm publish`

