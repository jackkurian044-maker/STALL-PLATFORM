import "package:flutter/material.dart";
import "package:provider/provider.dart";
import "../models/business.dart";
import "../services/favorites_provider.dart";
import "../theme/stall_theme.dart";

class BusinessCard extends StatelessWidget {
  final Business business;
  final VoidCallback onTap;

  const BusinessCard({super.key, required this.business, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final favorites = context.watch<FavoritesProvider>();
    final isFav = favorites.isFavorite(business.id);

    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.only(bottom: 16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.06),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        clipBehavior: Clip.antiAlias,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Stack(
              children: [
                Container(
                  height: 140,
                  width: double.infinity,
                  decoration: const BoxDecoration(
                    gradient: LinearGradient(
                      colors: [StallColors.navy, StallColors.ink],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    business.coverEmoji,
                    style: const TextStyle(fontSize: 48),
                  ),
                ),
                if (business.isPremium)
                  Positioned(
                    top: 10,
                    right: 10,
                    child: _Badge(
                      label: "Premium",
                      background: StallColors.gold,
                      textColor: StallColors.navy,
                    ),
                  ),
                if (business.distanceKm != null)
                  Positioned(
                    top: 10,
                    left: 10,
                    child: _Badge(
                      label: business.distanceKm! < 1
                          ? "${(business.distanceKm! * 1000).round()} m"
                          : "${business.distanceKm!.toStringAsFixed(1)} km",
                      background: Colors.white.withOpacity(0.9),
                      textColor: StallColors.navy,
                    ),
                  ),
                Positioned(
                  bottom: 10,
                  right: 10,
                  child: GestureDetector(
                    onTap: () => favorites.toggle(business.id),
                    child: CircleAvatar(
                      backgroundColor: Colors.white,
                      radius: 16,
                      child: Icon(
                        isFav ? Icons.favorite : Icons.favorite_border,
                        size: 16,
                        color: isFav ? Colors.red : StallColors.navy,
                      ),
                    ),
                  ),
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.all(14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          business.name,
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w700,
                            color: StallColors.navy,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      const Icon(Icons.star, size: 14, color: StallColors.gold),
                      const SizedBox(width: 2),
                      Text(business.rating.toStringAsFixed(1)),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    business.category?.name ?? "",
                    style: const TextStyle(color: Colors.grey, fontSize: 13),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    "📍 ${business.neighbourhood} · ${business.reviewCount} reviews",
                    style: const TextStyle(fontSize: 12, color: Colors.grey),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _Badge extends StatelessWidget {
  final String label;
  final Color background;
  final Color textColor;

  const _Badge({
    required this.label,
    required this.background,
    required this.textColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: background,
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        label,
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w600,
          color: textColor,
        ),
      ),
    );
  }
}
