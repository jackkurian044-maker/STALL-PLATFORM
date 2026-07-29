class Review {
  final String id;
  final int rating;
  final String comment;
  final String authorName;
  final String? reply;

  Review({
    required this.id,
    required this.rating,
    required this.comment,
    required this.authorName,
    this.reply,
  });

  factory Review.fromJson(Map<String, dynamic> json) {
    return Review(
      id: json["id"] as String,
      rating: (json["rating"] as num).toInt(),
      comment: json["comment"] as String,
      authorName: json["authorName"] as String? ?? "Anonymous",
      reply: json["reply"] as String?,
    );
  }
}
