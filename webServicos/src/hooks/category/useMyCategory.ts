import { useEffect, useState } from "react";
import { Categoria } from "../../interface";
import { getCategorys } from "../../services/get";

export function useMyCategory() {
    const [categorys, setCategorys] = useState<Categoria[]>([])

    const fetchCategorys = async () => {
        try {
            const result = await getCategorys();

            setCategorys(result.getCategorys);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchCategorys();
    }, [])

    return {
        fetchCategorys,
        setCategorys,
        categorys
    }
}