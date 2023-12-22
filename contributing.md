## Publishing

We really should automate publishing, but to document how it's done manually:

1. Update the version in `package.json` and `package-lock.json` to the new version and merge that to main.
2. run `yarn install && yarn build && npm publish`
3. run `git tag v<version> && git push --tags`
4. create a release on github with the same tag.

steps 3 and 4 are not strictly necessary, but it's nice to have the github in sync with npm.

