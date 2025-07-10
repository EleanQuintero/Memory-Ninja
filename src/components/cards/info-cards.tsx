import { Card, CardContent } from "../ui/card"

export const InfoCards = () => { 
 return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mt-8 z-0">
    <Card className="flex items-center bg-[#07070a]/30 p-4 rounded-lg backdrop-blur-sm border border-[#4a525a]/20 w-full">
      <div className="bg-[#19324a] p-2 rounded-full mr-3">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c1d6ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
      </div>
      <CardContent className="p-0">
        <h3 className="text-white font-medium">Tarjetas generadas por IA</h3>
        <p className="text-[#b3bac1] text-sm">Crea flashcards al instante</p>
      </CardContent>
    </Card>
    <Card className="flex items-center bg-[#07070a]/30 p-4 rounded-lg backdrop-blur-sm border border-[#4a525a]/20 w-full">
      <div className="bg-[#19324a] p-2 rounded-full mr-3">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c1d6ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
      </div>
      <CardContent className="p-0">
        <h3 className="text-white font-medium">Aprendizaje inteligente</h3>
        <p className="text-[#b3bac1] text-sm">Optimizado para retención</p>
      </CardContent>
    </Card>
  </div>
 )
}