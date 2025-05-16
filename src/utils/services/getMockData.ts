import { mocksData } from "../types/types"

export const getMockData = async (): Promise<mocksData> => {
    const response = await fetch('http://localhost:3000/mocks/data.json')
    const datos: mocksData = await response.json()
    return datos
}