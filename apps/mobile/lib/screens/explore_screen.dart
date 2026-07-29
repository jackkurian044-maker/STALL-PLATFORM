import "package:flutter/material.dart";
import "../models/business.dart";
import "../models/category.dart";
import "../services/api_service.dart";
import "../theme/stall_theme.dart";
import "../widgets/business_card.dart";
import "../widgets/category_chip.dart";
import "business_detail_screen.dart";

class ExploreScreen extends StatefulWidget {
  final ApiService api;
  final String? initialSearch;
  final String? initialCategory;

  const ExploreScreen({
    super.key,
    required this.api,
    this.initialSearch,
    this.initialCategory,
  });

  @override
  State<ExploreScreen> createState() => _ExploreScreenState();
}

class _ExploreScreenState extends State<ExploreScreen> {
  String? _search;
  String? _category;
  late Future<List<Category>> _categoriesFuture;
  late Future<List<Business>> _resultsFuture;
  late TextEditingController _searchController;

  @override
  void initState() {
    super.initState();
    _search = widget.initialSearch;
    _category = widget.initialCategory;
    _searchController = TextEditingController(text: _search ?? "");
    _categoriesFuture = widget.api.getCategories();
    _reload();
  }

  void _reload() {
    setState(() {
      _resultsFuture = widget.api.getBusinesses(
        search: _search,
        category: _category,
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Explore")),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextField(
                controller: _searchController,
                decoration: const InputDecoration(
                  hintText: "Search businesses...",
                  prefixIcon: Icon(Icons.search, color: StallColors.navy),
                ),
                onSubmitted: (value) {
                  _search = value;
                  _reload();
                },
              ),
              const SizedBox(height: 16),
              SizedBox(
                height: 44,
                child: FutureBuilder<List<Category>>(
                  future: _categoriesFuture,
                  builder: (context, snapshot) {
                    if (!snapshot.hasData) return const SizedBox.shrink();
                    final categories = snapshot.data!;
                    return ListView(
                      scrollDirection: Axis.horizontal,
                      children: [
                        CategoryChip(
                          category: Category(
                            id: "all",
                            name: "All",
                            slug: "",
                            icon: "🔎",
                          ),
                          selected: _category == null,
                          onTap: () {
                            _category = null;
                            _reload();
                          },
                        ),
                        ...categories.map(
                          (c) => CategoryChip(
                            category: c,
                            selected: _category == c.slug,
                            onTap: () {
                              _category = c.slug;
                              _reload();
                            },
                          ),
                        ),
                      ],
                    );
                  },
                ),
              ),
              const SizedBox(height: 16),
              Expanded(
                child: FutureBuilder<List<Business>>(
                  future: _resultsFuture,
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return const Center(child: CircularProgressIndicator());
                    }
                    if (snapshot.hasError) {
                      return Center(child: Text("${snapshot.error}"));
                    }
                    final businesses = snapshot.data ?? [];
                    if (businesses.isEmpty) {
                      return const Center(
                        child: Text("No businesses match yet."),
                      );
                    }
                    return ListView(
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
              ),
            ],
          ),
        ),
      ),
    );
  }
}
