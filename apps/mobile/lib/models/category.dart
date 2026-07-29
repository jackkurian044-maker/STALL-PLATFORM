class Category {
  final String id;
  final String name;
  final String slug;
  final String icon;

  Category({
    required this.id,
    required this.name,
    required this.slug,
    required this.icon,
  });

  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(
      id: json["id"] as String,
      name: json["name"] as String,
      slug: json["slug"] as String,
      icon: json["icon"] as String? ?? "🏪",
    );
  }
}
