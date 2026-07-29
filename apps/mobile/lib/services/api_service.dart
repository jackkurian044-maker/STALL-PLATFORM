import "dart:convert";
import "package:http/http.dart" as http;
import "../models/business.dart";
import "../models/category.dart";

/// Client for the Stall NestJS API.
///
/// For a physical device or emulator, set [baseUrl] to your machine's
/// LAN IP (e.g. http://192.168.1.10:4000) or your deployed API URL —
/// `localhost` only works when the API runs on the same machine as an
/// iOS simulator. Android emulators should use 10.0.2.2 instead of
/// localhost.
class ApiService {
  final String baseUrl;

  ApiService({this.baseUrl = "http://10.0.2.2:4000"});

  Future<List<Category>> getCategories() async {
    final res = await http.get(Uri.parse("$baseUrl/categories"));
    if (res.statusCode != 200) {
      throw Exception("Failed to load categories (${res.statusCode})");
    }
    final List<dynamic> data = jsonDecode(res.body) as List<dynamic>;
    return data
        .map((e) => Category.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  Future<List<Business>> getBusinesses({
    String? search,
    String? category,
    double? lat,
    double? lng,
    double? radiusKm,
  }) async {
    final params = <String, String>{};
    if (search != null && search.isNotEmpty) params["search"] = search;
    if (category != null && category.isNotEmpty) params["category"] = category;
    if (lat != null) params["lat"] = lat.toString();
    if (lng != null) params["lng"] = lng.toString();
    if (radiusKm != null) params["radiusKm"] = radiusKm.toString();

    final uri = Uri.parse(
      "$baseUrl/businesses",
    ).replace(queryParameters: params.isEmpty ? null : params);

    final res = await http.get(uri);
    if (res.statusCode != 200) {
      throw Exception("Failed to load businesses (${res.statusCode})");
    }
    final List<dynamic> data = jsonDecode(res.body) as List<dynamic>;
    return data
        .map((e) => Business.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  Future<Business> getBusiness(String slug) async {
    final res = await http.get(Uri.parse("$baseUrl/businesses/$slug"));
    if (res.statusCode != 200) {
      throw Exception("Business not found ($slug)");
    }
    return Business.fromJson(jsonDecode(res.body) as Map<String, dynamic>);
  }

  Future<void> submitReview({
    required String businessId,
    required int rating,
    required String comment,
    String authorName = "Anonymous",
  }) async {
    final res = await http.post(
      Uri.parse("$baseUrl/businesses/$businessId/reviews"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({
        "rating": rating,
        "comment": comment,
        "authorName": authorName,
      }),
    );
    if (res.statusCode != 200 && res.statusCode != 201) {
      throw Exception("Failed to submit review (${res.statusCode})");
    }
  }
}
