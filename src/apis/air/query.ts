import { useQuery } from "@tanstack/react-query";
import { fetchAir, getCurrentDate } from "./apis";
import { AirDetail } from "./model.type";

export function useAir() {
    return useQuery({
        queryKey: ["air",getCurrentDate()],
        queryFn: async () => {
            const response = await fetchAir()
            const items: AirDetail[] = response.response.body.items
            return items
        }
    })
}