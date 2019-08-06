# Contributing

## Licensing

All code contributions will be accepted under the [MIT Software License](https://raw.githubusercontent.com/abbotto/elemint/master/LICENSE.md)

## Bug Reports

A good bug report should contain some or all of the following information:

- Overview
- Steps to reproduce
- Example code
- Screenshots
- Notes

## Pull Requests

### Write useful descriptions and titles
- Overview: Synopsis of why the PR exists.
- Review: The steps to test the PR if functional changes were made.

### Keep the code lean and clean
- A PR should be focused on one subject and not contain unrelated changes.
- Use the project style guide so your code is conformant.

### All tests should pass
- Fix any issues that cause existing tests to fail.
- When adding a feature make sure you add unit tests for it.

### Manage the commit history
- A clean commit history makes it easier to debug issues.
- We can keep the history clean with one commit per merge.
	- Squash every commit that was made in a PR after review.

### Use semantic commit messages

- `build`: Changes to the build system and external dependencies.
- `deploy`: Changes to the deployment files.
- `doc`: Changes to the documentation.
- `feat`: Introduce new behaviour in the code.
- `fix`: Fix malfunctioning code.
- `perf`: Changes that improve code performance.
- `refactor`: Change code without altering the external behaviour.
- `style`: Changes based on project conventions and linting rules.
- `test`: Changes to the testing files and environemnt.

```
feat: do all the things
^--^  ^---------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: build, ci, doc, feat, fix, perf, refactor, style, or test.
```

### Keep the documentation up-to-date
- Create documentation for new features.
- Update documentation for existing features.

## Development platforms
- Linux
- Mac OS
- Windows (via [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10))

##### Thank you for reading this document - please feel free to contribute