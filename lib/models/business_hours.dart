class BusinessHours {
  BusinessHours({
    this.id,
    required this.dayOfWeek,
    this.opensAt,
    this.closesAt,
    this.isClosed = false,
  });

  final String? id;
  final String dayOfWeek;
  final String? opensAt;
  final String? closesAt;
  final bool isClosed;

  factory BusinessHours.fromJson(Map<String, dynamic> json) {
    return BusinessHours(
      id: json['id'] as String?,
      dayOfWeek: json['dayOfWeek'] as String? ?? '',
      opensAt: json['opensAt'] as String?,
      closesAt: json['closesAt'] as String?,
      isClosed: json['isClosed'] as bool? ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'dayOfWeek': dayOfWeek,
      'opensAt': opensAt,
      'closesAt': closesAt,
      'isClosed': isClosed,
    };
  }
}
