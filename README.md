# MUNA

Muna monorepo for NPM packages and Sanity test-studio. Uses Lerna and Yarn. 

NPM packages are all scoped to `@seidhr`.

## Development

```bash
# Install
lerna bootstrap

# Build and Link all packages in packages/@seidhr and link plugins in studios
lerna run quick-start
```