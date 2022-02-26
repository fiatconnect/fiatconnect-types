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
