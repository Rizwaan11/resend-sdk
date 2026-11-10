# Trying the Voxgig SDK generator on the Resend API

I picked Resend because it has a free tier, uses a plain bearer API key, and publishes an OpenAPI spec (`resend/resend-openapi`, 142 operations). Before starting I listed the repos in the `voxgig-sdk` org through the GitHub API (963 SDKs at the time) and found no Resend one.

Setup: `@voxgig/create-sdkgen` 0.31.5, `@voxgig/sdkgen` 4.41.0, Node 24, Windows 10. I generated the TypeScript target with the `test` feature. I used Claude Code to run the commands and debug, as the brief allowed. The Resend account, API key and GitHub repo were mine.

## What went well
- The flow is short: scaffold, `target add ts`, `feature add test`, `npm run generate`. Generation took about 20 seconds.
- The generated SDK compiled on the first try. The offline test suite ran 767 tests: 678 passed, 0 failed, 89 skipped.
- Live check with a real key: `GET /domains` returned 200, and `client.Email().create(...)` sent an email and returned an id (`examples/send-email.mjs`). With a bad key I got a clear 401 `ResendError`, with the response body attached.

## What went wrong
**1. A clean install doesn't work (the big one).**
`npm create @voxgig/sdkgen@latest` crashes with `TypeError: (0, shape_1.One) is not a function`. `jostraca` asks for `shape >=11`, npm picks `shape@12.0.0`, and 12 dropped `One`.

Pinning `shape` isn't enough. Inside the generated `.sdk` project, `@voxgig/sdkgen` 4.41.0 still imports `One` (shape 11 only), while its `jostraca@0.42.0` needs `Nof` (shape 12 only). They can't share a version, so `voxgig-sdkgen target add` fails right after scaffolding.

What worked for me: set `jostraca` to `0.41.0` in `.sdk/package.json` and add `"overrides": { "shape": "11.4.1" }`, then reinstall. I also ran the scaffolder from a local install with the same override. Capping `shape` below 12 in the packages (plus a clean-cache install test in CI) would likely fix it. This cost me most of the time.

**2. Warnings that are hard to act on.**
The build ends with `PARTIAL BUILD! 2 warnings`: `GET /emails/metrics` needs a hint in `guide.aontu`, and two inbox thread routes share one selector, so only one is reachable. Separately, 20 test flow steps are switched off as unreachable, in one very long line.

**3. The README isn't a good first read.**
The tutorial's first call is `AutomationRun.load`, it jumps from step 1 to step 3, and it never shows sending an email, which is what people use Resend for. I added a short "Send your first email" section to the root README.

**4. Naming.**
Many entities are named after response schemas (`CreateBatchEmail`, `RemoveInboxThreadResponseSuccess`), which makes the 84-entity surface harder to browse than resource names would.

**5. Small things.**
The generated LICENSE and package author say Voxgig (I changed them to my name). `npm install` in `.sdk` reports 3 vulnerabilities (1 high), and Node 24 prints an `fs.F_OK` deprecation warning. The full test run takes about 160 seconds.

## Time and timeline


The generate-and-test run took about 16 minutes of machine time, and roughly 10 of that went on working around problem 1. My own hands-on time was about 25 minutes, inside the 30-minute limit: creating the Resend account and API key, creating the repo, and reviewing the output and this report.

## What I'd change first
Fix the `shape`/`jostraca` versions, let the model say which entity the README quickstart should use, and group the warnings into a short list of things to do.
