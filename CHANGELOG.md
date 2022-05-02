# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.2.0](https://github.com/fiatconnect/fiatconnect-types/compare/v3.1.0...v3.2.0) (2022-05-02)


### Features

* **clock:** Add ClockResponse type ([#23](https://github.com/fiatconnect/fiatconnect-types/issues/23)) ([0fa549a](https://github.com/fiatconnect/fiatconnect-types/commit/0fa549a6f56f0a0a1273e0bf5c3f6ec21200070c))
* **network:** add enum for network ([#24](https://github.com/fiatconnect/fiatconnect-types/issues/24)) ([1c25452](https://github.com/fiatconnect/fiatconnect-types/commit/1c254524e39928da76cde903d4ca1aea0792e6f3))

## [3.1.0](https://github.com/fiatconnect/fiatconnect-types/compare/v3.0.0...v3.1.0) (2022-04-26)


### Features

* **auth:** add types and errors ([#19](https://github.com/fiatconnect/fiatconnect-types/issues/19)) ([6a169ee](https://github.com/fiatconnect/fiatconnect-types/commit/6a169eebae7bacb08f7fd6a284ae4f6d29e62fd4))
* **FiatType:** added fiat types ([#20](https://github.com/fiatconnect/fiatconnect-types/issues/20)) ([27ece36](https://github.com/fiatconnect/fiatconnect-types/commit/27ece36faabf65dc817b35135fc57d51728b4070)), closes [fiatconnect/specification#26](https://github.com/fiatconnect/specification/issues/26)

## [3.0.0](https://github.com/fiatconnect/fiatconnect-types/compare/v2.1.1...v3.0.0) (2022-04-25)

### ⚠ BREAKING CHANGES

* quoteId added as required parameter for transfer requests
* guaranteedUntil made required in quote response
* quoteId added to quote response

### Features
* added REAL/cREAL ([#17](https://github.com/fiatconnect/fiatconnect-types/issues/17)) ([d0114ab](https://github.com/fiatconnect/fiatconnect-types/commit/d0114ab3869e7f2a061da950d43a731e0f5af8ef))
* **errors:** add InvalidParameters error ([#14](https://github.com/fiatconnect/fiatconnect-types/issues/14)) ([2ceaefd](https://github.com/fiatconnect/fiatconnect-types/commit/2ceaefd3810913399ea84902226ae1f10c26e06e))

## [2.1.1](https://github.com/fiatconnect/fiatconnect-types/compare/v2.1.0...v2.1.1) (2022-03-15)
### Bug Fixes

* **fiat-account:** record should be partial ([#11](https://github.com/fiatconnect/fiatconnect-types/issues/11)) ([88346f8](https://github.com/fiatconnect/fiatconnect-types/commit/88346f859b5b1b5107e46c872db1a3f1a556ba26))
* **quote:** amounts should be type string ([#10](https://github.com/fiatconnect/fiatconnect-types/issues/10)) ([ec1e60f](https://github.com/fiatconnect/fiatconnect-types/commit/ec1e60fe8da159b8d1d57dff411aadd3580287f7))

## [2.1.0](https://github.com/fiatconnect/fiatconnect-types/compare/v1.0.0...v2.1.0) (2022-03-14)

### Features

* **kyc:** Add support for PersonalDataAndDocuments KYC schema ([#5](https://github.com/fiatconnect/fiatconnect-types/issues/5)) ([5d529f0](https://github.com/fiatconnect/fiatconnect-types/commit/5d529f07769ef643ff265a7cfb4849d7d71e61fd))
* **quote:** Add type for quote error response ([#7](https://github.com/fiatconnect/fiatconnect-types/issues/7)) ([8d8a7ff](https://github.com/fiatconnect/fiatconnect-types/commit/8d8a7ff6fe7b24b474551a869ef9ef1b58517888))

### 2.0.0 (2022-03-11)

Adds support for `PersonalDataAndDocumentsKyc` KYC schema, and removes the mock KYC schema `MockNameAndAddressKyc`.

### 1.0.0 (2022-03-01)

Initial version of type definitions for the FiatConnect SDK and FiatConnect API implementations.
