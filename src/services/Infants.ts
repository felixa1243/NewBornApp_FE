import {api} from "../config/api";

export const InfantsService = {
    getAll: async (page: number) => {
        const {data} = await api.get("infants?page=" + page)
        return data
    },
    findById: async (id: string) => {
        const {data} = await api.get("infants/" + id);
        return data
    },
    addInfants: async (data) => await api.post("/infants", data),
    deleteInfants: async (id: string) => {
        const {data} = await api.delete("infants/" + id)
        return {data}
    },
    getAnalytics: async (year: string) => {
        const {data} = await api.get("infants/analytics?year=" + year)
        return data
    }
}