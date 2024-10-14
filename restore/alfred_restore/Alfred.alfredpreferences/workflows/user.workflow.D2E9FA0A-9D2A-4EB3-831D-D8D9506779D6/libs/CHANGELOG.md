# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [1.14.0] - 2023-02-21
### Added
* Add [example](examples/json) to translate JSON inputs. 
* Added platform and python version information to the user-agent string that is sent with API calls, along with an opt-out.
* Added method for applications that use this library to identify themselves in API requests they make.
* Added `verify_ssl` option to `Translator` to control underlying `requests` session.
  * Thanks to [andrefloriani](https://github.com/andrefloriani) for the 
    suggestion in [#60](https://github.com/DeepLcom/deepl-python/issues/60).


## [1.13.0] - 2023-01-26
### Added
* Add [example script](examples/mustache) to translate Mustache templates.
* Add support for storing your API Key in a keyring via the `keyring` module.
* Added a CI check for copyright headers.
* New languages available: Korean (`'ko'`) and Norwegian (bokmål) (`'nb'`). Add language code constants and tests.

  Note: older library versions also support the new languages, this update only adds new code constants.
### Changed
### Deprecated
### Removed
### Fixed
* Copyright headers are updated for 2023
### Security
* Update `certifi` to resolve security advisory.
  * `certifi` is a development-only dependency; library users are unaffected. 


## [1.12.0] - 2023-01-09
### Added
* State explicitly that this library supports Python 3.11.
* Added the `should_retry` and `http_status_code` properties to all exceptions
  thrown by the library.
### Fixed
* Fix `py` dependency by upgrading `pytest` version to 7.2.0 for Python 3.7+. 
  For Python 3.6 tests `pytest` needs to be added manually.
* Remove unused `tox` dependency.
* Update `coverage` dependency.
* Also send options in API requests even if they are default values.


## [1.11.0] - 2022-09-26
### Added
* Add formality options `PREFER_LESS` and `PREFER_MORE`.
### Changed
* Requests resulting in `503 Service Unavailable` errors are now retried.
  Attempting to download a document before translation is completed will now
  wait and retry (up to 5 times by default), rather than raising an exception.


## [1.10.0] - 2022-09-09
### Added
* New language available: Ukrainian (`'uk'`). Add language code constant and tests.

  Note: older library versions also support new languages, this update only adds new code constant.
### Changed
* Add note and workaround to README about Poetry error on Ubuntu 22.04.
  * Pull request [#48](https://github.com/DeepLcom/deepl-python/pull/48)
    thanks to [FOehlschlaeger](https://github.com/FOehlschlaeger).


## [1.9.0] - 2022-07-07
### Added
* Add `Translator.create_glossary_from_csv()` allowing glossaries downloaded
  from website to be easily uploaded to API.


## [1.8.0] - 2022-06-10
### Added
* Optional `filename` parameter added to `Translator.translate_document()`, only
  required if uploading string or bytes containing file content.
  * Pull request [#30](https://github.com/DeepLcom/deepl-python/pull/30)
    thanks to [seratch](https://github.com/seratch). 
### Changed
* Update contributing guidelines, we can now accept Pull Requests.
### Fixed
* Fix GitLab CI config.


## [1.7.0] - 2022-05-18
### Added
* New languages available: Indonesian (`'id'`) and Turkish (`'tr'`). Add language code constants and tests.

  Note: older library versions also support the new languages, this update only adds new code constants.
* Add `limit_reached` and `any_limit_reached` properties to `Usage` object
  returned by `get_usage()`.
* Add `Translator.translate_document_wait_until_done()` to poll translation
  status until translation is complete or fails.
* Add `auth_key_is_free_account()` utility function.
### Changed
* Improve readme usage examples.
### Deprecated
* Deprecate `limit_exceeded` and `any_limit_exceeded` properties of `Usage`
  object returned by `get_usage()`, use `limit_reached` and `any_limit_reached`
  instead.


## [1.6.0] - 2022-04-12
### Added
* Add `error_message` property to `DocumentStatus`, describing the error in case of document translation failure.
### Changed
* Improve error message if `translate_text_with_glossary` is called without an instance of `GlossaryInfo`.
* `translate_document` and `translate_document_from_filepath` return final `DocumentStatus`, allowing the number of
  billed characters to be queried.


## [1.5.1] - 2022-04-11
### Fixed
* Fix bug in CLI languages command causing some target languages to be omitted.
* Fix some tests that intermittently failed.


## [1.5.0] - 2022-02-28
### Added
* Add support for HTML tag handling in `translate_text()`.
### Deprecated
* `DocumentTranslationException.document_request` is deprecated, use `document_handle` instead.


## [1.4.1] - 2022-02-04
### Fixed
* Fix bug in `DocumentTranslationException` stringize function.


## [1.4.0] - 2022-01-19
### Added
* Add contribution guidelines -- currently we are unable to accept Pull Requests.
* Add `--glossary-id` argument for CLI document command.
### Changed
* Improve README.
* Raise `DocumentNotReadyException` when attempting to download a document before it has been translated. Previously the
  base class `DeepLException` was thrown.
### Fixed
* Add optional filename argument to `translate_document_upload()` to fix uploading file content as string or bytes.


## [1.3.1] - 2021-11-15
### Changed
* Limit document status update wait time to 60 seconds, and log wait times.


## [1.3.0] - 2021-11-15
Note: the PyPI package for 1.3.0 included changes from 1.3.1, so it has been yanked. 
### Added
* Add glossary support for document translation.
* Add proxy support.
### Fixed
* Fix issues with parallelized tests by changing how test glossaries are created and deleted.


## [1.2.1] - 2021-10-19
### Added
* Add support for Python 3.10.
### Fixed
* Fix bug that caused User-Agent header to be omitted from HTTP requests. 
* Fix glossary name prefix used in unit-tests to match git repository name.
* Add workaround for possible issue in datetime.strptime in Python 3.6.


## [1.2.0] - 2021-10-07
### Added
* Add `Translator.get_glossary_languages()` to query language pairs supported for glossaries.
* Add constants for all supported languages codes, for example: `Language.GERMAN`.
### Changed
* Internal language caching and client-side checking of language codes are removed. 
### Deprecated
* Some optional arguments related to language caching are now deprecated, and will be removed in a future version:
  * `Translator()`: the `skip_language_check` argument 
  * `Translator.get_source_languages()` and `Translator.get_target_languages()`: the `skip_cache` argument 
### Fixed
* Fix HTTP request retries for document uploads.


## [1.1.3] - 2021-09-27
### Changed
* Loosen requirement for requests to 2.0 or higher.


## [1.1.2] - 2021-09-21
### Changed
* Improve request exception messages and include exception stacktraces.
* Update unit tests for server error message changes.


## [1.1.1] - 2021-09-13
### Fixed
* Fix typing.List issue on Python 3.6.
* Add workaround for datetime.strptime bug in Python 3.6.


## [1.1.0] - 2021-09-13
### Added
* Add security policy.
* Add support for glossary API functions.
### Fixed
* README and comments improvements, type hints and other minor fixes.  


## [1.0.1] - 2021-08-13
### Added
* Add explicit copyright notice to all source files.
### Fixed
* Force response encoding to UTF-8 to avoid issues with older versions of requests package.


## [1.0.0] - 2021-08-12
### Changed
* All API calls use Authorization header instead of auth_key parameter.


## [0.4.1] - 2021-08-10
### Changed
* Minor updates to pyproject.toml and README.md.


## [0.4.0] - 2021-08-05
Version increased to avoid conflicts with old packages on PyPI. 


## [0.3.0] - 2021-08-05
### Added
* Package uploaded to PyPI. Thanks to [Adrian Freund](mailto:mail@freundtech.com) for transferring the deepl package
  name.
* Clarify minimum version of requests module to 2.18.


## [0.2.0] - 2021-07-28
### Changed
* Improve exception hierarchy.
* Translator() server_url argument works with and without trailing slash.
* Translator.translate_text() accepts a single text argument, which may be a list or other iterable.
### Fixed
* Fix examples in readme to match function interface changes.


## [0.1.0] - 2021-07-26
Initial version.


[1.14.0]: https://github.com/DeepLcom/deepl-python/compare/v1.13.0...v1.14.0
[1.13.0]: https://github.com/DeepLcom/deepl-python/compare/v1.12.0...v1.13.0
[1.12.0]: https://github.com/DeepLcom/deepl-python/compare/v1.11.0...v1.12.0
[1.11.0]: https://github.com/DeepLcom/deepl-python/compare/v1.10.0...v1.11.0
[1.10.0]: https://github.com/DeepLcom/deepl-python/compare/v1.9.0...v1.10.0
[1.9.0]: https://github.com/DeepLcom/deepl-python/compare/v1.8.0...v1.9.0
[1.8.0]: https://github.com/DeepLcom/deepl-python/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/DeepLcom/deepl-python/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/DeepLcom/deepl-python/compare/v1.5.1...v1.6.0
[1.5.1]: https://github.com/DeepLcom/deepl-python/compare/v1.5.0...v1.5.1
[1.5.0]: https://github.com/DeepLcom/deepl-python/compare/v1.4.1...v1.5.0
[1.4.1]: https://github.com/DeepLcom/deepl-python/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/DeepLcom/deepl-python/compare/v1.3.1...v1.4.0
[1.3.1]: https://github.com/DeepLcom/deepl-python/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/DeepLcom/deepl-python/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/DeepLcom/deepl-python/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/DeepLcom/deepl-python/compare/v1.1.3...v1.2.0
[1.1.3]: https://github.com/DeepLcom/deepl-python/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/DeepLcom/deepl-python/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/DeepLcom/deepl-python/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/DeepLcom/deepl-python/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/DeepLcom/deepl-python/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/DeepLcom/deepl-python/compare/v0.4.1...v1.0.0
[0.4.1]: https://github.com/DeepLcom/deepl-python/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/DeepLcom/deepl-python/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/DeepLcom/deepl-python/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/DeepLcom/deepl-python/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/DeepLcom/deepl-python/releases/tag/v0.1.0
