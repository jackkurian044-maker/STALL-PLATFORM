import "package:flutter/material.dart";
import "../models/business.dart";
import "../models/category.dart";
import "../services/api_service.dart";
import "../theme/stall_theme.dart";
import "../widgets/business_card.dart";
import "../widgets/category_chip.dart";
import "business_detail_screen.dart";
import "explore_screen.dart";

class HomeScreen extends StatefulWidget {
  final ApiService api;
  const HomeScreen({super.key, required this.api});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late Future<List<Category>> _categoriesFuture;
  late Future<List<Business>> _businessesFuture;
  final _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _categoriesFuture = widget.api.getCategories();
    _businessesFuture = widget.api.getBusinesses();
  }

  void _openExplore({String? search, String? category}) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => ExploreScreen(
          api: widget.api,
          initialSearch: search,
          initialCategory: category,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: () async {
            setState(() {
              _categoriesFuture = widget.api.getCategories();
              _businessesFuture = widget.api.getBusinesses();
            });
          },
          child: ListView(
            padding: const EdgeInsets.all(20),
            children: [
              const Text(
                "STall",
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w800,
                  color: StallColors.navy,
                ),
              ),
              const SizedBox(height: 4),
              const Text(
                "Every neighbourhood business, one search away.",
                style: TextStyle(color: Colors.grey),
              ),
              const SizedBox(height: 20),
              _SearchBar(
                controller: _searchController,
                onSubmit: (value) => _openExplore(search: value),
              ),
              const SizedBox(height: 28),
              const Text(
                "Popular categories",
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w700,
                  color: StallColors.navy,
                ),
              ),
              const SizedBox(height: 12),
              SizedBox(
                height: 44,
                child: FutureBuilder<List<Category>>(
                  future: _categoriesFuture,
                  builder: (context, snapshot) {
                    if (!snapshot.hasData) {
                      return const Center(
                        child: CircularProgressIndicator(strokeWidth: 2),
                      );
                    }
                    final categories = snapshot.data!;
                    return ListView.builder(
                      scrollDirection: Axis.horizontal,
                      itemCount: categories.length,
                      itemBuilder: (context, i) => CategoryChip(
                        category: categories[i],
                        selected: false,
                        onTap: () => _openExplore(category: categories[i].slug),
                      ),
                    );
                  },
                ),
              ),
              const SizedBox(height: 28),
              const Text(
                "Featured near you",
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w700,
                  color: StallColors.navy,
                ),
              ),
              const SizedBox(height: 12),
              FutureBuilder<List<Business>>(
                future: _businessesFuture,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Padding(
                      padding: EdgeInsets.symmetric(vertical: 40),
                      child: Center(child: CircularProgressIndicator()),
                    );
                  }
                  if (snapshot.hasError) {
                    return _ApiErrorNotice(error: snapshot.error.toString());
                  }
                  final businesses = snapshot.data ?? [];
                  if (businesses.isEmpty) {
                    return const Text("No businesses listed yet.");
                  }
                  return Column(
                    children: businesses
                        .map(
                          (b) => BusinessCard(
                            business: b,
                            onTap: () => Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (_) => BusinessDetailScreen(
                                  api: widget.api,
                                  slug: b.slug,
                                ),
                              ),
                            ),
                          ),
                        )
                        .toList(),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _SearchBar extends StatelessWidget {
  final TextEditingController controller;
  final ValueChanged<String> onSubmit;

  const _SearchBar({required this.controller, required this.onSubmit});

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      onSubmitted: onSubmit,
      decoration: InputDecoration(
        hintText: "Search for a salon, tailor, grocer...",
        prefixIcon: const Icon(Icons.search, color: StallColors.navy),
        suffixIcon: IconButton(
          icon: const Icon(Icons.arrow_forward, color: StallColors.navy),
          onPressed: () => onSubmit(controller.text),
        ),
      ),
    );
  }
}

class _ApiErrorNotice extends StatelessWidget {
  final String error;
  const _ApiErrorNotice({required this.error});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.red.shade50,
        borderRadius: BorderRadius.circular(14),
      ),
      child: Text(
        "Couldn't reach the STall API. Make sure it's running and "
        "ApiService's baseUrl points to it.\n\n$error",
        style: TextStyle(color: Colors.red.shade800, fontSize: 12),
      ),
    );
  }
}
