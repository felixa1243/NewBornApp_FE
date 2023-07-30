import {api} from "../config/api";

export const MotherService = {
    getAll: async (page: number) => {
        const {data} = await api.get("mothers?page=" + page)
        return data
    },
    findById: async (id: string) => {
        const {data} = await api.get("mothers/" + id)
        return data
    },
    updateMother: async (id: string|undefined, data) => await api.put("mothers/" + id, data),
    addMother: async (data) => await api.post("mothers", data),
    delete: async (id: string) => await api.delete("mothers/" + id)
}