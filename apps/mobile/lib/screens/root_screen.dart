import "package:flutter/material.dart";
import "../services/api_service.dart";
import "explore_screen.dart";
import "favorites_screen.dart";
import "home_screen.dart";

class RootScreen extends StatefulWidget {
  final ApiService api;
  const RootScreen({super.key, required this.api});

  @override
  State<RootScreen> createState() => _RootScreenState();
}

class _RootScreenState extends State<RootScreen> {
  int _index = 0;

  @override
  Widget build(BuildContext context) {
    final screens = [
      HomeScreen(api: widget.api),
      ExploreScreen(api: widget.api),
      FavoritesScreen(api: widget.api),
    ];

    return Scaffold(
      body: IndexedStack(index: _index, children: screens),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _index,
        onTap: (i) => setState(() => _index = i),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home_outlined),
            activeIcon: Icon(Icons.home),
            label: "Home",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search),
            label: "Explore",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.favorite_border),
            activeIcon: Icon(Icons.favorite),
            label: "Favorites",
          ),
        ],
      ),
    );
  }
}
