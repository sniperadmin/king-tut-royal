import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from "@/lib/supabase";

// Simple admin authentication composable
// In production, this would integrate with Supabase Auth
const isAuthenticated = ref(false)
const adminUser = ref<any>(null)

export function useAdminAuth() {
  const router = useRouter()

  // Check if user is authenticated on composable initialization
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      isAuthenticated.value = true
      adminUser.value = session.user
    } else {
      isAuthenticated.value = false
      adminUser.value = null
    }
  }

  // Simple login (in production, this would call Supabase Auth)
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        isAuthenticated.value = true;
        adminUser.value = data.user;
        router.push('/admin');
        return { success: true };
      } else {
        throw new Error('No session returned after login.');
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Login failed',
      };
    }
  };

  // Logout
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      isAuthenticated.value = false;
      adminUser.value = null;
      router.push('/admin/login');
    }
  };

  // Initialize auth check
  checkAuth();

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    adminUser: computed(() => adminUser.value),
    login,
    logout,
    checkAuth,
  };
}