import '../models/vendor.dart';
import '../repositories/vendor_repository.dart';

class VendorService {
  VendorService({VendorRepository? repository}) : _repository = repository ?? VendorRepository();

  final VendorRepository _repository;

  Future<List<Vendor>> getVendors() async {
    return _repository.fetchVendors();
  }

  Future<Vendor?> getVendorById(String id) async {
    return _repository.fetchVendorById(id);
  }

  Future<void> saveVendor(Vendor vendor) async {
    if (vendor.id == null || vendor.id!.isEmpty) {
      await _repository.createVendor(vendor);
      return;
    }

    await _repository.updateVendor(vendor.id!, vendor.toJson());
  }

  Future<void> removeVendor(String id) async {
    await _repository.deleteVendor(id);
  }
}
