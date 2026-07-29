import "package:flutter/material.dart";
import "../models/category.dart";
import "../theme/stall_theme.dart";

class CategoryChip extends StatelessWidget {
  final Category category;
  final bool selected;
  final VoidCallback onTap;

  const CategoryChip({
    super.key,
    required this.category,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.only(right: 8),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        decoration: BoxDecoration(
          color: selected ? StallColors.navy : Colors.white,
          borderRadius: BorderRadius.circular(999),
        ),
        child: Text(
          "${category.icon}  ${category.name}",
          style: TextStyle(
            color: selected ? StallColors.gold : StallColors.ink,
            fontWeight: FontWeight.w600,
            fontSize: 13,
          ),
        ),
      ),
    );
  }
}
