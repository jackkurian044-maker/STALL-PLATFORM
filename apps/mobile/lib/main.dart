import "package:flutter/material.dart";
import "package:provider/provider.dart";
import "services/api_service.dart";
import "services/favorites_provider.dart";
import "screens/root_screen.dart";
import "theme/stall_theme.dart";

void main() {
  runApp(const StallApp());
}

class StallApp extends StatelessWidget {
  const StallApp({super.key});

  @override
  Widget build(BuildContext context) {
    // See ApiService's doc comment: 10.0.2.2 is the Android emulator's
    // alias for the host machine's localhost. Use your machine's LAN IP
    // for a physical device, or your deployed API URL in production.
    final api = ApiService(baseUrl: "http://10.0.2.2:4000");

    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => FavoritesProvider()),
      ],
      child: MaterialApp(
        title: "STall",
        debugShowCheckedModeBanner: false,
        theme: buildStallTheme(),
        home: RootScreen(api: api),
      ),
    );
  }
}
