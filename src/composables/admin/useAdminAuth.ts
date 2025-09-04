import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Simple admin authentication composable
// In production, this would integrate with Supabase Auth
const isAuthenticated = ref(false)
const adminUser = ref<any>(null)

export function useAdminAuth() {
  const router = useRouter()

  // Check if user is authenticated on composable initialization
  const checkAuth = () => {
    const token = localStorage.getItem('admin_token')
    const user = localStorage.getItem('admin_user')
    
    if (token && user) {
      isAuthenticated.value = true
      adminUser.value = JSON.parse(user)
    }
  }

  // Simple login (in production, this would call Supabase Auth)
  const login = async (email: string, password: string) => {
    try {
      // For demo purposes, accept any email/password combination
      // In production, this would validate against Supabase Auth
      if (email && password) {
        const mockUser = {
          id: '1',
          email,
          name: 'Admin User',
          role: 'admin'
        }
        
        const mockToken = 'admin_token_' + Date.now()
        
        localStorage.setItem('admin_token', mockToken)
        localStorage.setItem('admin_user', JSON.stringify(mockUser))
        
        isAuthenticated.value = true
        adminUser.value = mockUser
        
        router.push('/admin')
        return { success: true }
      }
      
      throw new Error('Invalid credentials')
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      }
    }
  }

  // Logout
  const logout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    isAuthenticated.value = false
    adminUser.value = null
    router.push('/admin/login')
  }

  // Initialize auth check
  checkAuth()

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    adminUser: computed(() => adminUser.value),
    login,
    logout,
    checkAuth
  }
}