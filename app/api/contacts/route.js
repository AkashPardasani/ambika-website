import { NextResponse } from 'next/server';
import axios from 'axios';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URI || 'http://localhost:1337';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, query } = body;

    // Validate required fields
    if (!name || !phone || !email || !query) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Send data to Strapi
    const strapiResponse = await axios.post(`${process.env.STRAPI_URI}/api/contacts`, {
      data: {
        name: name,
        phone: phone,
        mail: email, // Note: Strapi schema uses 'mail' not 'email'
        Query: query // Note: Strapi schema uses 'Query' with capital Q
      }
    });

    return NextResponse.json(
      { message: 'Contact form submitted successfully', data: strapiResponse.data },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error submitting contact form:', error);
    
    if (error.response) {
      // Strapi returned an error
      return NextResponse.json(
        { error: 'Failed to submit form', details: error.response.data },
        { status: error.response.status }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 