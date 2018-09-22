# Contributing

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
- `ci`: Changes to the CI files.
- `doc`: Changes to the documentation.
- `feat`: Add new behaviour to the code.
- `fix`: Fix malfunctioning code.
- `perf`: Changes that improve code performance.
- `refactor`: Restructure code without changing the behaviour.
- `style`: Changes based on project conventions and linting rules.
- `test`: Add or edit tests.

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
