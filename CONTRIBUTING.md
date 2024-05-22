## Publishing

This package essentially "pulls through" changes to `modeling-api/modeling-cmds`.
In order to do this, it derives code from an OpenAPI specification JSON file.
This specification is generated only after `api-deux` gets those changes first.
It triggers a bot to commit the new specification to this repository.

We really should automate publishing, but for now, it's this process:

1. Update the version in `package.json` to the new version and merge that to main.
2. run `yarn install && yarn build && npm publish`
3. run `git tag v<version> && git push --tags`
4. create a release on github with the same tag.

Steps 3 and 4 are not strictly necessary, but it's nice to have the github in
sync with npm. So you know what, it pretty much is necessary :).


