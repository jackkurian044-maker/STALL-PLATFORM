import '../models/vendor.dart';

class VendorRepository {
  Future<List<Vendor>> fetchVendors() async {
    return [];
  }

  Future<Vendor?> fetchVendorById(String id) async {
    return null;
  }

  Future<void> createVendor(Vendor vendor) async {
    // Implement Firestore/remote persistence here.
  }

  Future<void> updateVendor(String id, Map<String, dynamic> data) async {
    // Implement Firestore/remote persistence here.
  }

  Future<void> deleteVendor(String id) async {
    // Implement Firestore/remote persistence here.
  }
}
