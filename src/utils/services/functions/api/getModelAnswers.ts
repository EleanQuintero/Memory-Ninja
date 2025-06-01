

export const getMockData = async (tema: string, questions: string[], userLevel: string ) => {
    try {
        const response = await fetch('/api/generate-answer',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tema, questions, userLevel })
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
          }

        const datos = await response.json()
        return datos
        
    } catch (error) {
        console.error('Error al llamar al API:', error)
        return null
    }
}