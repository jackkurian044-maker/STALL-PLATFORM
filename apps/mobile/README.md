# STall Mobile (Flutter)

Customer-facing mobile app for STall — browse categories, search nearby
businesses, view profiles, call/WhatsApp, and leave reviews.

> **Note:** This code was written in a sandboxed environment without
> the Flutter SDK or network access to pub.dev, so it has **not** been
> compiled or run yet. Please run it locally and fix any small
> version-mismatch issues that come up (Flutter/Dart version drift is
> the most likely source of problems, not logic errors).

## Setup

```bash
cd apps/mobile
flutter pub get
flutter run
```

## Connecting to the API

`lib/main.dart` creates the shared `ApiService` with a `baseUrl`. Update
it depending on where you're running:

| Environment | baseUrl |
|---|---|
| Android emulator | `http://10.0.2.2:4000` (default — emulator's alias for host localhost) |
| iOS simulator | `http://localhost:4000` |
| Physical device | `http://<your-machine-LAN-IP>:4000` (e.g. `http://192.168.1.10:4000`) |
| Production | your deployed API URL, e.g. `https://api.stallapp.cutncutestudio.in` |

Make sure `apps/api` is running (see the root README) before testing.

## Structure

```
lib/
  main.dart                 — app entrypoint, providers, theme
  theme/stall_theme.dart    — brand colors (navy/gold/cream/ink) + ThemeData
  models/                   — Business, Category, Review (JSON parsing)
  services/
    api_service.dart        — HTTP client for the NestJS API
    favorites_provider.dart — in-memory favorites (swap for persisted/API later)
  screens/
    root_screen.dart        — bottom nav shell (Home / Explore / Favorites)
    home_screen.dart         — hero search, categories, featured businesses
    explore_screen.dart      — search + category filter, full results list
    business_detail_screen.dart — profile, call/WhatsApp, reviews + submit form
    favorites_screen.dart    — saved businesses
  widgets/
    business_card.dart, category_chip.dart
```

## Known gaps / next steps

- **Favorites are in-memory only** — they reset on app restart. Either
  persist locally with `shared_preferences`, or add a `/favorites`
  endpoint on the API tied to a logged-in user.
- **No auth yet** — reviews post as "Anonymous" unless a name is typed
  in on the website; the mobile app doesn't yet collect a name. Add a
  simple text field or wire up real auth before shipping.
- **No location permission flow** — the API supports `lat`/`lng`/`radiusKm`
  for nearby sorting, but the app doesn't request device location yet.
  Add the `geolocator` package and pass real coordinates into
  `getBusinesses()` to enable "near me" sorting.
- **No image loading** — businesses show an emoji cover instead of real
  photos. Once `BusinessImage` records exist, swap the emoji container
  for `Image.network(...)`.
