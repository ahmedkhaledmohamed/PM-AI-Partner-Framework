# Technical Analyst — Detailed Examples

These examples demonstrate the output format and depth expected from the technical-analyst skill.

## Example 1: Understanding a Service

**User:** I need to understand how the in-app messaging service works for my PM work.

**Good Response:**
Let me search the codebase and explain what I find.

**One-sentence summary:** The messaging service is the in-app message delivery layer — it decides which messages to show users when they open the app.

**How it works:**
1. Client app calls the messaging service on startup
2. The service checks which messages are eligible for this user
3. Messages are filtered by targeting rules, frequency caps, and priority
4. Selected messages are returned to the client for display

Key components:
- **Message Store**: Where message definitions live
- **Eligibility Engine**: Checks targeting rules
- **Frequency Capping**: Prevents message fatigue

**Product implications:**
- Message latency affects app startup time
- Targeting accuracy depends on user data freshness
- Priority rules determine which messages "win" when multiple are eligible

**Questions for engineering:**
- What's the P99 latency for message selection?
- How are targeting rules updated — real-time or batch?
- What happens when the service is down?

## Example 2: Explaining a Concept

**User:** What's the difference between push notifications and in-app messages from a technical perspective?

**Good Response:**
**One-sentence summary:** Push notifications are delivered by Apple/Google when the app is closed; in-app messages are delivered by your backend when the app is open.

**How they differ:**

| Aspect | Push Notifications | In-App Messages |
|--------|-------------------|-----------------|
| **Delivery** | APNs/FCM (external) | Your backend (internal) |
| **App state** | Works when app is closed | Requires app to be open |
| **Reliability** | Best-effort, can be dropped | More reliable, direct connection |
| **Rich content** | Limited (text, small image) | Full control (modals, banners, etc.) |
| **User permission** | Requires opt-in | No permission needed |

**Product implications:**
- Push is for re-engagement (bring users back)
- In-app is for engagement (guide users already in the app)
- Push delivery rates vary by platform (~70-90%)
- In-app has near 100% delivery for active users

**Questions for engineering:**
- What's our current push delivery rate by platform?
- How do we handle users who have push disabled?

## Example 3: Codebase Investigation for Product Decision

**User:** Our Android opt-in flows have lower conversion than iOS. Can you figure out why from the code?

**Good Response:**

Let me trace the user flow through both platforms.

**One-sentence summary:** Android contextual opt-in flows redirect users to the OS Settings app instead of showing a native permission prompt — this is a fundamentally different (and worse) UX than iOS.

**How it works — iOS:**

The iOS code calls `requestAuthorization` when the user taps "Enable":
```swift
UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .badge, .sound]) { granted, error in
    // System shows native popup: "Allow Notifications?"
    // User taps Allow → done in 1 tap
}
```

**How it works — Android:**

Most Android contextual flows share a single permission handler that does this:
```kotlin
val intent = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
intent.data = Uri.parse("package:${context.packageName}")
context.startActivity(intent)
// User leaves app → navigates Settings → finds Notifications → toggles on
// Minimum 4 taps, app context lost
```

Only the Onboarding flow uses the native API:
```kotlin
requestPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
// System shows native popup: "Allow notifications?"
// User taps Allow → done in 1 tap
```

**Product implications:**
- iOS: 1 tap, stays in app, ~50% CTR on contextual education flow
- Android: 4+ taps, leaves app, ~24% CTR on same flow
- The gap isn't user willingness (Android users DO tap "Enable") — it's completion friction after the tap
- Onboarding is the only Android flow with a native prompt, and it has the highest conversion

**Questions for engineering:**
- Why do contextual flows use Settings redirect instead of native prompt? Is it a legacy decision or intentional?
- Can we switch contextual flows to use `requestPermissionLauncher` without re-triggering Android's "don't ask again" behavior?
- What happens if the user previously denied the native prompt — does Android block future prompts?

**Recommendation:** Switch Android contextual opt-in flows from Settings redirect to native OS prompt. This is likely a 1-file change in the shared permission handler with potential for 2x CTR improvement based on the iOS vs Android data.
