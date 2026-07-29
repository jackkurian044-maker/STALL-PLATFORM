import "package:flutter/foundation.dart";

/// Simple in-memory favorites store for this pass.
/// Swap for persisted storage (shared_preferences or a `/favorites`
/// API endpoint tied to a logged-in user) once auth is wired up.
class FavoritesProvider extends ChangeNotifier {
  final Set<String> _favoriteIds = {};

  bool isFavorite(String businessId) => _favoriteIds.contains(businessId);

  void toggle(String businessId) {
    if (_favoriteIds.contains(businessId)) {
      _favoriteIds.remove(businessId);
    } else {
      _favoriteIds.add(businessId);
    }
    notifyListeners();
  }

  Set<String> get favoriteIds => _favoriteIds;
}
