# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

- [bugfix]
- [feature]

## [1.2.0-beta.2] - 2018-08-21

- [bugfix] Pass original props to component we are decorating when using one of the decorators

## [1.2.0-beta.1] - 2018-08-21

- [feature] Use rollup to bundle up the code

## [1.1.0] - 2018-07-31

> There's two major bugs in 1.1.0, it is highly recommended to update to 1.2.0 or downgrade to 1.0.1

- [feature] Add flow support by [@gforge](https://github.com/gforge)
- [bugfix] Fallback from `event.keyCode` to `event.which` for browsers such as FireFox when using the `keypress` event name. [@gforge](https://github.com/gforge)

## [1.0.1] - 2017-10-26

- [feature] Loosen react dependency to support React 16

## [1.0.0] - 2017-08-28

- [breaking] Drop keyName support
- [bugfix] Get rid of deprecation warnings

## [0.3.0] - 2016-09-13

- [feature] Treat content editable elements as inputs by [@jamesfzhang](https://github.com/jamesfzhang). This means the key handle
  will be ignored for events triggered from these elements. (Draft.js support)

## [0.2.0] - 2016-04-17

- [feature] Loosen react dependency for future react versions
- [deprecate] `keyName` prop in favour of `keyValue`
- [feature] Added prop types
- [feature] Add support for W3C `KeyboardEvent.key` by [@leocavalcante](https://github.com/leocavalcante)

## [0.1.0] - 2016-03-02

- [feature] Add decorators
- [feature] Ignore key events from form elements
- [feature] Key names

## [0.0.4] - 2016-02-27

- [bugfix] Use right function to remove the event listener

## [0.0.2] & [0.0.3] - 2016-02-27

- [bugfix] Protect from server side rendering errors

## [0.0.1] - 2016-02-27

- Initial implementation

[unreleased]: https://github.com/ayrton/react-key-handler/compare/v1.1.0...HEAD
[1.2.0-beta.2]: https://github.com/ayrton/react-key-handler/compare/v1.2.0-beta.1...v1.2.0-beta.2
[1.2.0-beta.1]: https://github.com/ayrton/react-key-handler/compare/v1.1.0...v1.2.0-beta.1
[1.1.0]: https://github.com/ayrton/react-key-handler/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/ayrton/react-key-handler/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/ayrton/react-key-handler/compare/v0.3.0...v1.0.0
[0.3.0]: https://github.com/ayrton/react-key-handler/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/ayrton/react-key-handler/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/ayrton/react-key-handler/compare/v0.0.4...v0.1.0
[0.0.4]: https://github.com/ayrton/react-key-handler/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/ayrton/react-key-handler/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/ayrton/react-key-handler/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/ayrton/react-key-handler/commit/8267e3dc7357bb7fb106f5148e6f9cb9f69ed3b5
