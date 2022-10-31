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
import { TransferStatus } from '@fiatconnect/fiatconnect-types'
import axios from 'axios'

export async function getTransferStatus(
  transferId: string,
): Promise<TransferStatus> {
  const response = await axios
    .create({ url: 'https://MOCK-PROVIDER-URL.fake' })
    .get(`/transfer/${transferId}/status`)
  return response.data.status
}
```

## Zod Schemas

For each type exported from this package there is also a corresponding [zod schema](https://www.npmjs.com/package/zod) with the name `{typeWithFirstCharLowercase}Schema`. So for example `TransferStatus` has `transferStatusSchema`.

```typescript
import {
  TransferStatus,
  transferStatusSchema,
} from '@fiatconnect/fiatconnect-types'
import axios from 'axios'
import { z } from 'zod'

export async function getTransferStatus(
  transferId: string,
): Promise<TransferStatus> {
  const response = await axios
    .create({ url: 'https://MOCK-PROVIDER-URL.fake' })
    .get(`/transfer/${transferId}/status`)

  // Will throw an error if the status does not match the schema
  transferStatusSchema.parse(response.data.status)
  return response.data.status
}
```

## Contributing

- [Reporting issues](https://github.com/fiatconnect/fiatconnect-types/issues)
- [Submitting a pull request](https://github.com/fiatconnect/fiatconnect-types/pulls)
- Publishing updates is done automatically via [semantic-release](https://github.com/semantic-release/semantic-release).
  Remember to use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) or your PR will be rejected (since
  merging it would mess up the changelog and version numbers).
