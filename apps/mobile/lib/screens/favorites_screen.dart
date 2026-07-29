import "package:flutter/material.dart";
import "package:provider/provider.dart";
import "../models/business.dart";
import "../services/api_service.dart";
import "../services/favorites_provider.dart";
import "../theme/stall_theme.dart";
import "../widgets/business_card.dart";
import "business_detail_screen.dart";

class FavoritesScreen extends StatefulWidget {
  final ApiService api;
  const FavoritesScreen({super.key, required this.api});

  @override
  State<FavoritesScreen> createState() => _FavoritesScreenState();
}

class _FavoritesScreenState extends State<FavoritesScreen> {
  late Future<List<Business>> _allBusinessesFuture;

  @override
  void initState() {
    super.initState();
    // Favorites are currently id-only (see FavoritesProvider), so we
    // fetch the full list and filter client-side. Once there's a
    // `/favorites` endpoint tied to a logged-in user, swap this for a
    // direct call to that instead.
    _allBusinessesFuture = widget.api.getBusinesses();
  }

  @override
  Widget build(BuildContext context) {
    final favorites = context.watch<FavoritesProvider>();

    return Scaffold(
      appBar: AppBar(title: const Text("Favorites")),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: FutureBuilder<List<Business>>(
            future: _allBusinessesFuture,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(child: CircularProgressIndicator());
              }
              if (snapshot.hasError) {
                return Center(child: Text("${snapshot.error}"));
              }
              final saved = (snapshot.data ?? [])
                  .where((b) => favorites.isFavorite(b.id))
                  .toList();

              if (saved.isEmpty) {
                return const Center(
                  child: Padding(
                    padding: EdgeInsets.only(top: 60),
                    child: Column(
                      children: [
                        Icon(Icons.favorite_border,
                            size: 48, color: StallColors.navy),
                        SizedBox(height: 12),
                        Text(
                          "No favorites yet — tap the heart on a\nbusiness card to save it here.",
                          textAlign: TextAlign.center,
                          style: TextStyle(color: Colors.grey),
                        ),
                      ],
                    ),
                  ),
                );
              }

              return ListView(
                children: saved
                    .map(
                      (b) => BusinessCard(
                        business: b,
                        onTap: () => Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => BusinessDetailScreen(
                              api: widget.api,
                              slug: b.slug,
                            ),
                          ),
                        ),
                      ),
                    )
                    .toList(),
              );
            },
          ),
        ),
      ),
    );
  }
}
