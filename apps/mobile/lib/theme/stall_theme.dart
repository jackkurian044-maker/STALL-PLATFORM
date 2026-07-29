import "package:flutter/material.dart";

/// Brand tokens shared with the STall website
/// (navy #0f1a24, gold #f3b73d, cream #fdf9ef, ink #17222c).
class StallColors {
  static const navy = Color(0xFF0F1A24);
  static const ink = Color(0xFF17222C);
  static const gold = Color(0xFFF3B73D);
  static const goldSoft = Color(0xFFF8D488);
  static const cream = Color(0xFFFDF9EF);
}

ThemeData buildStallTheme() {
  final base = ThemeData.light(useMaterial3: true);

  return base.copyWith(
    scaffoldBackgroundColor: StallColors.cream,
    colorScheme: base.colorScheme.copyWith(
      primary: StallColors.navy,
      secondary: StallColors.gold,
      surface: Colors.white,
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: StallColors.cream,
      foregroundColor: StallColors.navy,
      elevation: 0,
      centerTitle: false,
      titleTextStyle: TextStyle(
        color: StallColors.navy,
        fontSize: 22,
        fontWeight: FontWeight.w700,
      ),
    ),
    textTheme: base.textTheme.apply(
      bodyColor: StallColors.ink,
      displayColor: StallColors.navy,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: StallColors.navy,
        foregroundColor: StallColors.gold,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(14),
        ),
        textStyle: const TextStyle(fontWeight: FontWeight.w600),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: Colors.white,
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: BorderSide(color: StallColors.navy.withOpacity(0.1)),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: BorderSide(color: StallColors.navy.withOpacity(0.1)),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(color: StallColors.gold, width: 1.5),
      ),
    ),
    bottomNavigationBarTheme: const BottomNavigationBarThemeData(
      backgroundColor: Colors.white,
      selectedItemColor: StallColors.navy,
      unselectedItemColor: Colors.grey,
      type: BottomNavigationBarType.fixed,
    ),
  );
}
