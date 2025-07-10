import { useRef } from "react";
import debounce from "debounce";
import { useUIState } from "@/store/uiState/uiState";


export const useErrorMessage = () => {
    const setError = useUIState((state) => state.setError)


    const debouncedSetError = useRef(
        debounce((errorMessage: string | null) => {
          setError(errorMessage);
        }, 500)
      ).current;

      const showError = (errorMessage: string, timeout = 2000) => {
        setError(errorMessage);
      setTimeout(() => setError(null), timeout); 
      } 

      const clearError = () => setError(null)

      return { setError, debouncedSetError, showError, clearError}

}