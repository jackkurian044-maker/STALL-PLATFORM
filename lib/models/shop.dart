import 'business_hours.dart';
import 'gallery_image.dart';
import 'offer.dart';

class Shop {
  Shop({
    this.id,
    required this.vendorId,
    required this.name,
    this.address,
    this.city,
    this.state,
    this.country,
    this.postalCode,
    this.phone,
    this.website,
    this.description,
    this.businessHours = const [],
    this.galleryImages = const [],
    this.offers = const [],
  });

  final String? id;
  final String vendorId;
  final String name;
  final String? address;
  final String? city;
  final String? state;
  final String? country;
  final String? postalCode;
  final String? phone;
  final String? website;
  final String? description;
  final List<BusinessHours> businessHours;
  final List<GalleryImage> galleryImages;
  final List<Offer> offers;

  factory Shop.fromJson(Map<String, dynamic> json) {
    return Shop(
      id: json['id'] as String?,
      vendorId: json['vendorId'] as String? ?? '',
      name: json['name'] as String? ?? '',
      address: json['address'] as String?,
      city: json['city'] as String?,
      state: json['state'] as String?,
      country: json['country'] as String?,
      postalCode: json['postalCode'] as String?,
      phone: json['phone'] as String?,
      website: json['website'] as String?,
      description: json['description'] as String?,
      businessHours: (json['businessHours'] as List<dynamic>?)
              ?.map((item) => BusinessHours.fromJson(item as Map<String, dynamic>))
              .toList() ??
          const [],
      galleryImages: (json['galleryImages'] as List<dynamic>?)
              ?.map((item) => GalleryImage.fromJson(item as Map<String, dynamic>))
              .toList() ??
          const [],
      offers: (json['offers'] as List<dynamic>?)
              ?.map((item) => Offer.fromJson(item as Map<String, dynamic>))
              .toList() ??
          const [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'vendorId': vendorId,
      'name': name,
      'address': address,
      'city': city,
      'state': state,
      'country': country,
      'postalCode': postalCode,
      'phone': phone,
      'website': website,
      'description': description,
      'businessHours': businessHours.map((item) => item.toJson()).toList(),
      'galleryImages': galleryImages.map((item) => item.toJson()).toList(),
      'offers': offers.map((item) => item.toJson()).toList(),
    };
  }
}
