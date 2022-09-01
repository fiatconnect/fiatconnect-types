# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [7.0.3](https://github.com/fiatconnect/fiatconnect-types/compare/v7.0.2...v7.0.3) (2022-08-30)


### Bug Fixes

* **fees:** updated fee fields' location in quote request/response ([#65](https://github.com/fiatconnect/fiatconnect-types/issues/65)) ([51f5583](https://github.com/fiatconnect/fiatconnect-types/commit/51f55832d1d295f4500fae09e19c834ff7e46024)), closes [fiatconnect/specification#78](https://github.com/fiatconnect/specification/issues/78)
* **lint:** add missing deps for linting ([#66](https://github.com/fiatconnect/fiatconnect-types/issues/66)) ([030f375](https://github.com/fiatconnect/fiatconnect-types/commit/030f37575fabc53196153a650d4f9aa61288d717))

### [7.0.2](https://github.com/fiatconnect/fiatconnect-types/compare/v7.0.1...v7.0.2) (2022-08-22)


### Bug Fixes

* **webhook:** add timestamp ([#61](https://github.com/fiatconnect/fiatconnect-types/issues/61)) ([482e205](https://github.com/fiatconnect/fiatconnect-types/commit/482e2058210ca6e2311ace84581d034c50e2f62f))

### [7.0.1](https://github.com/fiatconnect/fiatconnect-types/compare/v7.0.0...v7.0.1) (2022-08-18)


### Bug Fixes

* **webhook:** accountAddress => address ([#58](https://github.com/fiatconnect/fiatconnect-types/issues/58)) ([9999edb](https://github.com/fiatconnect/fiatconnect-types/commit/9999edbd3eec3314687c6aabf0eebd1907c30ac7))

## [7.0.0](https://github.com/fiatconnect/fiatconnect-types/compare/v6.1.0...v7.0.0) (2022-08-03)


### ⚠ BREAKING CHANGES

* **updates:** Add required fields to POST /quote and GET /accounts endpoints ([6f77bd5](https://github.com/fiatconnect/fiatconnect-types/commit/6f77bd55520df9f5c1d6135d9b9bbe7192af14f1))

## [6.1.0](https://github.com/fiatconnect/fiatconnect-types/compare/v6.0.2...v6.1.0) (2022-07-25)


### Features

* **FiatType:** add new currencies ([#44](https://github.com/fiatconnect/fiatconnect-types/issues/44)) ([77bc1c5](https://github.com/fiatconnect/fiatconnect-types/commit/77bc1c54a094e0219f8d82f66ae1e2df70e797ba))

### [6.0.2](https://github.com/fiatconnect/fiatconnect-types/compare/v6.0.1...v6.0.2) (2022-07-21)


### Bug Fixes

* **webhook:** ensure webhook and payload types match ([#42](https://github.com/fiatconnect/fiatconnect-types/issues/42)) ([0a0b394](https://github.com/fiatconnect/fiatconnect-types/commit/0a0b394ba6da4645cbd0150dd877be38504d0fc8))

### [6.0.1](https://github.com/fiatconnect/fiatconnect-types/compare/v6.0.0...v6.0.1) (2022-07-07)


### Bug Fixes

* prefix KYC statuses ([#39](https://github.com/fiatconnect/fiatconnect-types/issues/39)) ([f17d2ae](https://github.com/fiatconnect/fiatconnect-types/commit/f17d2ae78c559842ebfead30839ed5cbbee07472))

### [6.0.0](https://github.com/fiatconnect/fiatconnect-types/compare/v5.0.0...v6.0.0) (2022-06-25)

### ⚠ BREAKING CHANGES

* **quote:** renamed QuoteRequestQuery to QuoteRequestBody ([#36](https://github.com/fiatconnect/fiatconnect-types/issues/37)) ([65f55f9](https://github.com/fiatconnect/specification/commit/65f55f96398b8dbd4b14597ff9fdbb8710243391))

## [5.0.0](https://github.com/fiatconnect/fiatconnect-types/compare/v4.1.0...v5.0.0) (2022-06-17)


### ⚠ BREAKING CHANGES

* **accounts:** update params for fiat accounts endpoint ([#33](https://github.com/fiatconnect/fiatconnect-types/issues/33)) ([7466a20](https://github.com/fiatconnect/fiatconnect-types/commit/7466a204fb687b0f7109844268a5517e41f23f09))
* **kyc:** expose map type of kyc schemas ([#34](https://github.com/fiatconnect/fiatconnect-types/issues/34)) ([5a1aee0](https://github.com/fiatconnect/fiatconnect-types/commit/5a1aee007f822d8c15fa7ab2f4072f1d0f6c903b))

## [4.1.0](https://github.com/fiatconnect/fiatconnect-types/compare/v4.0.0...v4.1.0) (2022-06-06)


### Features

* add new fiat account schemas ([#31](https://github.com/fiatconnect/fiatconnect-types/issues/31)) ([1ed5cff](https://github.com/fiatconnect/fiatconnect-types/commit/1ed5cffba2056d5db800086bc5689bf0ac78cee2))


### Bug Fixes

* **FiatType:** match with specification ([#30](https://github.com/fiatconnect/fiatconnect-types/issues/30)) ([5d47e22](https://github.com/fiatconnect/fiatconnect-types/commit/5d47e22e6a2c15b24d34a48cf5f00217f61ce9f7))

## [4.0.0](https://github.com/fiatconnect/fiatconnect-types/compare/v3.3.0...v4.0.0) (2022-05-25)
### ⚠ BREAKING CHANGES
* **transfer request body:** Removed unused TransferRequestBody fields ([#34]((https://github.com/fiatconnect/fiatconnect-types/issues/34))) ([e175ee9](https://github.com/fiatconnect/specification/commit/e175ee9acd92a462d8f3669278992ac10b40ac99))

## [3.3.0](https://github.com/fiatconnect/fiatconnect-types/compare/v3.2.0...v3.3.0) (2022-05-23)
### Features

* **batch updates:** Updated types for TransferStatusResponse, TransferStatus. Added new FiatAccountSchema types ([#26]((https://github.com/fiatconnect/fiatconnect-types/issues/26))) ([dcdf20c](https://github.com/fiatconnect/fiatconnect-types/commit/dcdf20c649817fd7301f999ee1af8de769851bae))

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
