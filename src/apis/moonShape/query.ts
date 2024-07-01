import { useQueries, useQuery } from "@tanstack/react-query"
import store, { RootState } from "../../redux/store"
import { MoonRiseInfo, MoonShapeItem } from "./model.type"
import { fetchMoonRise, fetchMoonShape } from "./apis"

export function useMoonShape(){
    
    const currentState: RootState = store.getState()
    const year = currentState.calendar.year
    const month = currentState.calendar.month
    const key = `${year}${month}`
    
    return useQuery<MoonShapeItem[]>({
        queryKey: ['moonShape', key ],
        queryFn: async () => {
            const response = await fetchMoonShape()
            const items: MoonShapeItem[] = response.response.body.items.item || []
            return items
        },
        enabled: !!month,
    })
} 

export function useMoonData() {
    const currentState: RootState = store.getState()
    const year = currentState.calendar.year
    const month = (currentState.calendar.month + 1)
    // const month = (currentState.calendar.month + 1).toString().padStart(2, '0') // 월을 2자리 문자열로 변환
    const key = `${year}${month}`
    
    console.log(key)

    const [moonShapeQuery, moonRiseQuery] = useQueries({
        queries: [
            {
                queryKey: ['moonShape', key],
                queryFn: async () => {
                    const response = await fetchMoonShape()
                    const items: MoonShapeItem[] = response.response.body.items.item || []
                    return items
                },
                enabled: !!month,
            },
            {
                queryKey: ['moonRise', key],
                queryFn: async () => {
                    const response = await fetchMoonRise()
                    const items: MoonRiseInfo[] = response.response.body.items.item || []
                    return items
                },
                enabled: !!month,
            }
        ]
    })

    const isLoading = moonShapeQuery.isLoading || moonRiseQuery.isLoading
    const isError = moonShapeQuery.isError || moonRiseQuery.isError
    const moonShape = moonShapeQuery.data
    const moonRise = moonRiseQuery.data

    return {
        isLoading,
        isError,
        moonShape,
        moonRise,
    }
}