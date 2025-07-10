import { useState, useRef } from "react";
import debounce from "debounce";


export const useErrorMessage = () => {
    const [error, setError] = useState<string |null> (null)


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

      return {error, setError, debouncedSetError, showError, clearError}

}