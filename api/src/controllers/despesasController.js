import { getAllDespesas, createDespesas, deleteDespesas, updateDespesas } from "../models/despesasModel.js";

export async function getAllDespesasController(req, res) {
    try {
        const despesas = await getAllDespesas();
        res.json(despesas);
    } catch (error) {
        console.log("Erro ao buscar despesas", error);
        res.status(500).json({ error: "Erro ao buscar despesas" })
    }
};

export async function createDespesasController(req, res) {
    try {
        const { num, title, address } = req.body;

        const newId = await createDespesas(num, title, address);

        res.status(201).json({
            message: "Despesa criada com sucesso",
            news: { id: newId, num: parseFloat(num).toFixed(1), title, address },
        });
    } catch (error) {
        console.error("Erro ao criar despesa", error);
        res.status(500).json({ error: "Erro ao criar despesa" });
    }
};

export async function deleteDespesasController(req, res) {
    const id = req.params.id;
    try {

        const affectedRows = await deleteDespesas(id);

        if (affectedRows === 0) {
            res.status(404).json({ error: "Despesa não encontrada" });
        }

        return res.status(200).json({ message: "Despesa deletada com sucesso" });

    } catch (error) {
        console.error("Erro ao deletar despesa", error);
        res.status(500).json({ error: "Erro ao deletar despesa" });
    };
};

export async function updateDespesasController(req, res) {
    const id = req.params.id;
    const { num, title, address } = req.body;

    try {
        const affectedRows = await updateDespesas(id, num, title, address);

        if (affectedRows === 0) {
            return res.status(404).json({ error: "Despesa não encontrada." });
        }

        res.status(200).json({ message: "Despesa atualizada com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar despesa:", error);
        res.status(500).json({ error: "Erro ao atualizar despesa" });
    }
};