import { NextResponse } from 'next/server';
import axios from 'axios';

// const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URI || 'http://localhost:1337';

export async function POST(request) {
  try {
    const body = await request.json();
    let { name, phone, email, query } = body;

    // Trim inputs
    name = name?.trim() || '';
    phone = phone?.trim() || '';
    email = email?.trim() || '';
    query = query?.trim() || '';

    // Validate required fields and formats
    const errors = [];

    // Name validation
    if (!name) {
      errors.push('Name is required');
    } else if (name.length < 2 || name.length > 100) {
      errors.push('Name must be between 2 and 100 characters');
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      errors.push('Name can only contain letters and spaces');
    }

    // Phone validation
    if (!phone) {
      errors.push('Phone number is required');
    } else if (!/^\+?[0-9\s\-]{7,15}$/.test(phone)) {
      errors.push('Invalid phone number format (7-15 digits, optional +, spaces, or -)');
    }

    // Email validation
    if (!email) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Invalid email format');
    }

    // Query validation
    if (!query) {
      errors.push('Query is required');
    } else if (query.length < 10 || query.length > 1000) {
      errors.push('Query must be between 10 and 1000 characters');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: errors.join('. ') },
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