import { useQuery } from "@tanstack/react-query"
import { ClassifiedData } from "./model.type"
import { fetchWeather, filterAndSortedWeather } from "./apis"
import store, { RootState } from "../../redux/store"

export function useWeather(){
    const currentState: RootState = store.getState()
    const coordinator = currentState.region.coordinator
    
    return useQuery<ClassifiedData>({
        queryKey: ['weatherData', coordinator],
        queryFn: async () => {
            const data = await fetchWeather()
            return filterAndSortedWeather(data)
        },
        enabled: !!coordinator,
    })
} 