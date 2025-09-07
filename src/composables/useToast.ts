import { ref, reactive } from 'vue'

interface ToastProps {
  id?: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
  duration?: number
}

interface Toast extends Required<Pick<ToastProps, 'id' | 'variant'>> {
  title?: string
  description?: string
  duration: number
  open: boolean
}

const toasts = ref<Toast[]>([])
let toastIdCounter = 0

const generateId = () => {
  toastIdCounter += 1
  return toastIdCounter.toString()
}

const addToast = (props: ToastProps) => {
  const toast: Toast = {
    id: generateId(),
    open: true,
    title: props.title,
    description: props.description,
    variant: props.variant || 'default',
    duration: props.duration || 3000,
  };
  console.log('Adding toast:', toast); // Add this line
  toasts.value.push(toast);

  if (toast.duration > 0) {
    setTimeout(() => {
      dismissToast(toast.id);
    }, toast.duration);
  }

  return {
    id: toast.id,
    dismiss: () => dismissToast(toast.id),
    update: (newProps: Partial<ToastProps>) => updateToast(toast.id, newProps)
  }
}

const dismissToast = (toastId: string) => {
  const index = toasts.value.findIndex(t => t.id === toastId)
  if (index > -1) {
    toasts.value[index].open = false
    // Remove after animation
    setTimeout(() => {
      const removeIndex = toasts.value.findIndex(t => t.id === toastId)
      if (removeIndex > -1) {
        toasts.value.splice(removeIndex, 1)
      }
    }, 300)
  }
}

const updateToast = (toastId: string, props: Partial<ToastProps>) => {
  const index = toasts.value.findIndex(t => t.id === toastId)
  if (index > -1) {
    Object.assign(toasts.value[index], props)
  }
}

export const useToast = () => {
  return {
    toasts,
    toast: addToast,
    dismiss: dismissToast
  }
}

// Export a simple toast function for compatibility
export const toast = addToast