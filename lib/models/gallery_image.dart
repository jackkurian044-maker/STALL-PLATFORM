class GalleryImage {
  GalleryImage({
    this.id,
    required this.url,
    this.caption,
    this.order = 0,
    this.createdAt,
  });

  final String? id;
  final String url;
  final String? caption;
  final int order;
  final DateTime? createdAt;

  factory GalleryImage.fromJson(Map<String, dynamic> json) {
    return GalleryImage(
      id: json['id'] as String?,
      url: json['url'] as String? ?? '',
      caption: json['caption'] as String?,
      order: json['order'] as int? ?? 0,
      createdAt: json['createdAt'] is DateTime
          ? json['createdAt'] as DateTime
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'url': url,
      'caption': caption,
      'order': order,
      'createdAt': createdAt,
    };
  }
}
