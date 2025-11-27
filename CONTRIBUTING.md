## Publishing

This package essentially "pulls through" changes to `modeling-api/modeling-cmds`.
In order to do this, it derives code from an OpenAPI specification JSON file.
This specification is generated only after `api-deux` gets those changes first.
It triggers a bot to commit the new specification to this repository.

**Every commit to main is published to NPM. Make sure to bump the version before merging any PR!**
