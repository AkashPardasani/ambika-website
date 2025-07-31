import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: 'Property ID is required' }, { status: 400 });
  }

  try {
    const strapiUrl = `${process.env.STRAPI_URI || 'https://admin.houseofambika.com'}/api/properties/${id}`;

    const response = await fetch(strapiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'Property not found' }, { status: 404 });
      }
      throw new Error(`Strapi API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch property', message: error.message },
      { status: 500 }
    );
  }
}