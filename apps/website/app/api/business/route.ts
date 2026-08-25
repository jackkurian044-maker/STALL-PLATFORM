import { NextResponse } from 'next/server';
import { BusinessService } from '@/lib/business';

const businessService = new BusinessService();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const category = searchParams.get('category');
  const city = searchParams.get('city');
  const query = searchParams.get('query') ?? '';
  const featured = searchParams.get('featured') === 'true';
  const recent = searchParams.get('recent') === 'true';
  const incrementViews = searchParams.get('incrementViews') === 'true' || searchParams.get('view') === 'true';
  const toggleStatus = searchParams.get('toggleStatus') === 'true' || searchParams.get('toggle') === 'true';

  if (id && incrementViews) {
    await businessService.incrementViews(id);
    const business = await businessService.getBusinessById(id);
    return NextResponse.json({ success: true, business });
  }

  if (id && toggleStatus) {
    const toggled = await businessService.toggleBusinessStatus(id);
    const business = toggled ? await businessService.getBusinessById(id) : null;
    return NextResponse.json({ success: toggled, business });
  }

  if (id) {
    const business = await businessService.getBusinessById(id);
    return NextResponse.json(business);
  }

  if (featured) {
    const businesses = await businessService.getFeaturedBusinesses();
    return NextResponse.json(businesses);
  }

  if (recent) {
    const businesses = await businessService.getRecentBusinesses();
    return NextResponse.json(businesses);
  }

  if (category) {
    const businesses = await businessService.getBusinessesByCategory(category);
    return NextResponse.json(businesses);
  }

  if (city) {
    const businesses = await businessService.getBusinessesByCity(city);
    return NextResponse.json(businesses);
  }

  if (query) {
    const businesses = await businessService.searchBusinesses(query);
    return NextResponse.json(businesses);
  }

  const businesses = await businessService.getBusinesses();
  return NextResponse.json(businesses);
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const business = await businessService.saveBusiness(payload);
    return NextResponse.json(business, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create business' },
      { status: 400 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const payload = await request.json();
    const business = await businessService.saveBusiness(payload);
    return NextResponse.json(business);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update business' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Business id is required' }, { status: 400 });
  }

  const removed = await businessService.removeBusiness(id);
  return NextResponse.json({ removed }, { status: removed ? 200 : 404 });
}
