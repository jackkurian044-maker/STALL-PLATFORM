class Offer {
  Offer({
    this.id,
    required this.title,
    this.description,
    this.discountPercent,
    this.validUntil,
    this.isActive = true,
  });

  final String? id;
  final String title;
  final String? description;
  final double? discountPercent;
  final DateTime? validUntil;
  final bool isActive;

  factory Offer.fromJson(Map<String, dynamic> json) {
    return Offer(
      id: json['id'] as String?,
      title: json['title'] as String? ?? '',
      description: json['description'] as String?,
      discountPercent: (json['discountPercent'] as num?)?.toDouble(),
      validUntil: json['validUntil'] is DateTime
          ? json['validUntil'] as DateTime
          : null,
      isActive: json['isActive'] as bool? ?? true,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'discountPercent': discountPercent,
      'validUntil': validUntil,
      'isActive': isActive,
    };
  }
}
