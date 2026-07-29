import "package:flutter/material.dart";
import "package:url_launcher/url_launcher.dart";
import "../models/business.dart";
import "../services/api_service.dart";
import "../theme/stall_theme.dart";

class BusinessDetailScreen extends StatefulWidget {
  final ApiService api;
  final String slug;

  const BusinessDetailScreen({
    super.key,
    required this.api,
    required this.slug,
  });

  @override
  State<BusinessDetailScreen> createState() => _BusinessDetailScreenState();
}

class _BusinessDetailScreenState extends State<BusinessDetailScreen> {
  late Future<Business> _businessFuture;
  int _rating = 5;
  final _commentController = TextEditingController();
  bool _submitting = false;

  @override
  void initState() {
    super.initState();
    _businessFuture = widget.api.getBusiness(widget.slug);
  }

  Future<void> _launch(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  Future<void> _submitReview(Business business) async {
    if (_commentController.text.trim().length < 3) return;
    setState(() => _submitting = true);
    try {
      await widget.api.submitReview(
        businessId: business.id,
        rating: _rating,
        comment: _commentController.text.trim(),
      );
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Review posted, thank you!")),
      );
      setState(() {
        _commentController.clear();
        _rating = 5;
        _businessFuture = widget.api.getBusiness(widget.slug);
      });
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Couldn't post review: $e")),
      );
    } finally {
      if (mounted) setState(() => _submitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder<Business>(
        future: _businessFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError) {
            return Center(child: Text("${snapshot.error}"));
          }
          final business = snapshot.data!;
          return SafeArea(
            child: ListView(
              padding: const EdgeInsets.all(20),
              children: [
                Row(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.arrow_back, color: StallColors.navy),
                      onPressed: () => Navigator.pop(context),
                    ),
                  ],
                ),
                Container(
                  height: 180,
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [StallColors.navy, StallColors.ink],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    borderRadius: BorderRadius.circular(24),
                  ),
                  padding: const EdgeInsets.all(20),
                  alignment: Alignment.bottomLeft,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        business.category?.name.toUpperCase() ?? "",
                        style: const TextStyle(
                          color: StallColors.gold,
                          fontSize: 12,
                          letterSpacing: 1.2,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      Text(
                        business.name,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 26,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        "⭐ ${business.rating.toStringAsFixed(1)} (${business.reviewCount} reviews) · 📍 ${business.neighbourhood}",
                        style: const TextStyle(color: Colors.white70, fontSize: 12),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(18),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        "About",
                        style: TextStyle(
                          fontWeight: FontWeight.w700,
                          color: StallColors.navy,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(business.description),
                      const SizedBox(height: 12),
                      Text("📍 ${business.address}"),
                      if (business.phone.isNotEmpty)
                        Text("📞 ${business.phone}"),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    if (business.phone.isNotEmpty)
                      Expanded(
                        child: ElevatedButton.icon(
                          onPressed: () => _launch("tel:${business.phone}"),
                          icon: const Icon(Icons.call, size: 18),
                          label: const Text("Call"),
                        ),
                      ),
                    if (business.whatsapp.isNotEmpty) ...[
                      const SizedBox(width: 10),
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: () => _launch(
                            "https://wa.me/${business.whatsapp.replaceAll(RegExp(r"[^0-9]"), "")}",
                          ),
                          icon: const Icon(Icons.chat, size: 18),
                          label: const Text("WhatsApp"),
                        ),
                      ),
                    ],
                  ],
                ),
                const SizedBox(height: 24),
                const Text(
                  "Reviews",
                  style: TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 16,
                    color: StallColors.navy,
                  ),
                ),
                const SizedBox(height: 10),
                Row(
                  children: List.generate(5, (i) {
                    final n = i + 1;
                    return IconButton(
                      onPressed: () => setState(() => _rating = n),
                      icon: Icon(
                        n <= _rating ? Icons.star : Icons.star_border,
                        color: StallColors.gold,
                      ),
                    );
                  }),
                ),
                TextField(
                  controller: _commentController,
                  maxLines: 3,
                  decoration: const InputDecoration(
                    hintText: "Share your experience...",
                  ),
                ),
                const SizedBox(height: 10),
                ElevatedButton(
                  onPressed: _submitting ? null : () => _submitReview(business),
                  child: Text(_submitting ? "Submitting..." : "Post review"),
                ),
                const SizedBox(height: 20),
                ...business.reviews.map(
                  (r) => Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            ...List.generate(
                              r.rating,
                              (_) => const Icon(
                                Icons.star,
                                size: 12,
                                color: StallColors.gold,
                              ),
                            ),
                            const SizedBox(width: 6),
                            Text(
                              r.authorName,
                              style: const TextStyle(fontWeight: FontWeight.w600),
                            ),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Text(r.comment),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
