class Service {
  Service({
    this.id,
    required this.vendorId,
    required this.title,
    this.description,
    this.price,
    this.duration,
    this.isActive = true,
  });

  final String? id;
  final String vendorId;
  final String title;
  final String? description;
  final double? price;
  final String? duration;
  final bool isActive;

  factory Service.fromJson(Map<String, dynamic> json) {
    return Service(
      id: json['id'] as String?,
      vendorId: json['vendorId'] as String? ?? '',
      title: json['title'] as String? ?? '',
      description: json['description'] as String?,
      price: (json['price'] as num?)?.toDouble(),
      duration: json['duration'] as String?,
      isActive: json['isActive'] as bool? ?? true,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'vendorId': vendorId,
      'title': title,
      'description': description,
      'price': price,
      'duration': duration,
      'isActive': isActive,
    };
  }
}
