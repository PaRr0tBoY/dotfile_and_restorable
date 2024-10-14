# Define Word Change Log

__v1.2.0__
- Fixes for macOS 15 Sequoia
- Added configuration option to revert back to sans-serif font (relevant for macOS 15+)
- Added autocomplete for the selected term
- Removed configuration option that overrides the dictionary selection to check all available dictionaries (which should be enabled only for debugging purposes anyway). Moved to the environment variables: `checkAll`.
- Updated documentation

__v1.1.1__
- Improved dictionary retrieval
	- Dictionaries previously not found are now found
	- Incomplete representations are now recognized*
	- The Short Name is now matched (e.g. `Russian - English`)
- Added (hidden) environment variable `log_available_dicts` to log available dicts if set to `1`
- Added internal configuration option to open the workflow's cache (default: `def :`)
- Fixed raising the workflow configuration (default: `:def`)

 * e.g. `Oxford Russian Dictionary` instead of the full name

__v1.1.0__
- Changed behavior: By default, all defined dictionaries are used. The previous "Main Dictionary" becomes the default fallback dictionary against which possible misspellings are checked.
- Added indicators for the dictionary associated with an entry.
	- They are visible using the `ctrl` modifier and in the title of the Quicklook preview.
- Added duplication of dictionary entries.
- Removed `Wikipedia` as an option as it is not functional.
- The workflow now doubles as a multilingual spell checker: Use the `cmd` modifier to paste the word into the frontmost application.