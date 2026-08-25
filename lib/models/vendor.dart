class Vendor {
  Vendor({
    this.id,
    required this.name,
    this.slug,
    this.email,
    this.phone,
    this.category,
    this.description,
    this.address,
    this.latitude,
    this.longitude,
    this.rating,
    this.createdAt,
    this.updatedAt,
  });

  final String? id;
  final String name;
  final String? slug;
  final String? email;
  final String? phone;
  final String? category;
  final String? description;
  final String? address;
  final double? latitude;
  final double? longitude;
  final double? rating;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  factory Vendor.fromJson(Map<String, dynamic> json) {
    return Vendor(
      id: json['id'] as String?,
      name: json['name'] as String? ?? '',
      slug: json['slug'] as String?,
      email: json['email'] as String?,
      phone: json['phone'] as String?,
      category: json['category'] as String?,
      description: json['description'] as String?,
      address: json['address'] as String?,
      latitude: (json['latitude'] as num?)?.toDouble(),
      longitude: (json['longitude'] as num?)?.toDouble(),
      rating: (json['rating'] as num?)?.toDouble(),
      createdAt: json['createdAt'] is DateTime
          ? json['createdAt'] as DateTime
          : null,
      updatedAt: json['updatedAt'] is DateTime
          ? json['updatedAt'] as DateTime
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'slug': slug,
      'email': email,
      'phone': phone,
      'category': category,
      'description': description,
      'address': address,
      'latitude': latitude,
      'longitude': longitude,
      'rating': rating,
      'createdAt': createdAt,
      'updatedAt': updatedAt,
    };
  }
}
