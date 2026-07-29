import "category.dart";
import "review.dart";

class Business {
  final String id;
  final String name;
  final String slug;
  final String description;
  final String address;
  final String neighbourhood;
  final double latitude;
  final double longitude;
  final String phone;
  final String whatsapp;
  final double rating;
  final int reviewCount;
  final bool isPremium;
  final String coverEmoji;
  final Category? category;
  final double? distanceKm;
  final List<Review> reviews;

  Business({
    required this.id,
    required this.name,
    required this.slug,
    required this.description,
    required this.address,
    required this.neighbourhood,
    required this.latitude,
    required this.longitude,
    required this.phone,
    required this.whatsapp,
    required this.rating,
    required this.reviewCount,
    required this.isPremium,
    required this.coverEmoji,
    this.category,
    this.distanceKm,
    this.reviews = const [],
  });

  factory Business.fromJson(Map<String, dynamic> json) {
    return Business(
      id: json["id"] as String,
      name: json["name"] as String,
      slug: json["slug"] as String,
      description: json["description"] as String? ?? "",
      address: json["address"] as String? ?? "",
      neighbourhood: json["neighbourhood"] as String? ?? "",
      latitude: (json["latitude"] as num?)?.toDouble() ?? 0,
      longitude: (json["longitude"] as num?)?.toDouble() ?? 0,
      phone: json["phone"] as String? ?? "",
      whatsapp: json["whatsapp"] as String? ?? "",
      rating: (json["rating"] as num?)?.toDouble() ?? 0,
      reviewCount: (json["reviewCount"] as num?)?.toInt() ?? 0,
      isPremium: json["isPremium"] as bool? ?? false,
      coverEmoji: json["coverEmoji"] as String? ?? "🏪",
      category: json["category"] != null
          ? Category.fromJson(json["category"] as Map<String, dynamic>)
          : null,
      distanceKm: (json["distanceKm"] as num?)?.toDouble(),
      reviews: (json["reviews"] as List<dynamic>? ?? [])
          .map((r) => Review.fromJson(r as Map<String, dynamic>))
          .toList(),
    );
  }
}
