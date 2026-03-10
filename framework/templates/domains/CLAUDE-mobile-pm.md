# [Team Name] — Mobile PM Workspace

## What This Is

Mobile PM workspace for [app/feature area]. Focused on native mobile experiences across iOS and Android, app store performance, and platform-specific considerations.

## Current Focus

- **Primary metric:** [e.g., DAU, session length, crash-free rate, app store rating]
- **This quarter:** [e.g., Reduce cold start time by 40%, launch widget support on iOS, improve Android ANR rate]
- **Current app versions:** iOS [X.Y.Z], Android [X.Y.Z]

## Key Context

### Team
- **Team name:** [Your Team]
- **Mission:** [e.g., "Deliver the fastest, most reliable [product] experience on mobile"]
- **Key stakeholders:** [e.g., iOS eng, Android eng, Design, QA, Release management]

### App Health

| Metric | iOS | Android | Target |
|--------|-----|---------|--------|
| Crash-free rate | [e.g., 99.7%] | [e.g., 99.4%] | 99.5%+ |
| ANR rate | N/A | [e.g., 0.8%] | <0.47% |
| Cold start (P50) | [e.g., 1.2s] | [e.g., 1.8s] | <1.5s |
| App Store rating | [e.g., 4.6] | [e.g., 4.3] | 4.5+ |
| App size | [e.g., 85MB] | [e.g., 62MB] | <100MB |

### Platform Differences

| Area | iOS | Android |
|------|-----|---------|
| Min supported version | [e.g., iOS 16] | [e.g., API 26 / Android 8] |
| Build system | [e.g., Xcode, Swift] | [e.g., Gradle, Kotlin] |
| Distribution | App Store | Play Store + sideload |
| Push notifications | APNs | FCM |
| Background processing | [e.g., BGTaskScheduler] | [e.g., WorkManager] |
| Feature flags | [e.g., LaunchDarkly] | [e.g., LaunchDarkly] |

### Release Process

- **Release cadence:** [e.g., Every 2 weeks, train model]
- **Code freeze:** [e.g., Wednesday before release]
- **Staged rollout:** [e.g., 1% → 5% → 25% → 100% over 4 days]
- **Hotfix process:** [e.g., Cherry-pick to release branch, expedited review]
- **Feature flags:** [e.g., All new features behind flags, gradual rollout]

### Systems We Own

- [Core feature module] — [e.g., Player, messaging, feed, notifications]
- [Shared libraries] — [e.g., Networking layer, analytics SDK, design system]
- [Backend services] — [e.g., APIs that power the feature, config service]

## How to Help

When I ask about:
- **Performance issues** → Use `/technical-analyst`. Always check both platforms separately. A "slow" report might be Android-only. Get specific: cold start vs warm start, P50 vs P99, which OS versions.
- **Feature specs** → Use `/product-brief`. Include platform-specific sections. Don't assume feature parity — some features may be iOS-first or Android-first based on API availability.
- **App store issues** → Use `/data-analyst`. Segment reviews by version, country, and device. A rating drop after a release is different from a gradual decline.
- **Release decisions** → Use `/devil-advocate`. Challenge: is this worth a hotfix, or can it wait for the next train? What's the blast radius of the bug vs the risk of the fix?

## Mobile-Specific Rules

- **Platform parity is a goal, not a rule** — iOS and Android have different capabilities, user expectations, and engineering constraints. "Ship on both simultaneously" often means shipping a worse experience on one. Decide per feature: simultaneous, iOS-first, or Android-first.
- **Performance is a feature** — Users don't file bugs for "slow." They just leave. Track cold start, ANR rate, and memory usage as first-class metrics, not afterthoughts.
- **Test on real devices, not just simulators** — Performance, permissions, and push notifications behave differently on real hardware. Include low-end Android devices in your test matrix.
- **App size matters more than you think** — Every MB added to the app costs installs, especially in markets with limited storage or slow connections. Track app size per release and flag regressions.
- **Review app store reviews weekly** — Not for individual complaints, but for patterns. Three reviews mentioning "crash after update" in the same country is signal, not noise. Segment by version, device, and country.
- **Staged rollouts are your safety net** — Never go 0% → 100%. Monitor crash rates and ANR at each stage. Have explicit rollback criteria defined before you start.

## Constraints

- **Use Mermaid diagrams rather than ASCII art** for user flows, architecture diagrams, and release timelines
- [Add company-specific constraints: app review timelines, accessibility requirements, data privacy (ATT, GDPR), etc.]

## Links

- [App Store Connect / Play Console]
- [Crash reporting: Firebase Crashlytics / Sentry]
- [Performance dashboard]
- [Feature flag dashboard]
- [Release calendar]
- [Design system / Figma]
