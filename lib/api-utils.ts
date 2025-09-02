import { NextResponse } from 'next/server'

export class APIError extends Error {
  statusCode: number
  
  constructor(message: string, statusCode: number = 500) {
    super(message)
    this.statusCode = statusCode
    this.name = 'APIError'
  }
}

export function handleAPIError(error: unknown) {
  console.error('API Error:', error)
  
  if (error instanceof APIError) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: error.statusCode }
    )
  }
  
  if (error instanceof Error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    )
  }
  
  return NextResponse.json(
    { error: 'Internal server error', success: false },
    { status: 500 }
  )
}

export function createAPIResponse(data: any, status: number = 200) {
  return NextResponse.json(
    { ...data, success: true },
    { 
      status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    }
  )
}
