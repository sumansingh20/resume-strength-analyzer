import { NextRequest, NextResponse } from 'next/server'
import { signAccessToken, verifyAccessToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Testing JWT round-trip...')
    
    // Get the exact token from query parameter to test
    const url = new URL(request.url)
    const testToken = url.searchParams.get('token')
    
    if (testToken) {
      console.log('🔍 Testing provided token...')
      console.log('🔍 Token length:', testToken.length)
      console.log('🔍 Token (first 50):', testToken.substring(0, 50))
      
      try {
        const payload = await verifyAccessToken(testToken)
        console.log('✅ External token verified:', payload)
        return NextResponse.json({
          success: true,
          message: 'External token verification successful',
          payload
        })
      } catch (error) {
        console.log('❌ External token failed:', error)
        return NextResponse.json({
          success: false,
          error: 'External token verification failed',
          details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 400 })
      }
    }
    
    // Create a test user
    const testUser = {
      id: 'test-id-123',
      email: 'test@test.com',
      name: 'Test User',
      role: 'admin' as const
    }
    
    // Sign a token
    console.log('🔐 Signing token...')
    const token = await signAccessToken(testUser)
    console.log('✅ Token signed:', token.substring(0, 50) + '...')
    
    // Immediately verify the same token
    console.log('🔓 Verifying token...')
    const payload = await verifyAccessToken(token)
    console.log('✅ Token verified:', payload)
    
    return NextResponse.json({
      success: true,
      message: 'JWT round-trip test successful',
      tokenLength: token.length,
      payload,
      fullToken: token
    })
    
  } catch (error) {
    console.error('❌ JWT test failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
