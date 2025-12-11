import { FaNewspaper, FaEye, FaFileContract, FaRegPenToSquare } from "react-icons/fa6";
import CreateNews from "../../components/admin/CreateNews";
import NewsList from "../../components/admin/NewsList";
import CreateDespesas from "../../components/admin/CreateDespesas";
import { useState } from "react";
import EditDespesas from "../../components/admin/EditDespesas";

const AdminPainel = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showNewsListModal, setShowNewsListModal] = useState(false);
    const [showCreateDespesasModal, setCreateDespesasModal] = useState(false);
    const [showEditDespesasModal, setEditDespesasModal] = useState(false);

    const openCreateModal = () => setShowCreateModal(true);
    const closeCreateModal = () => setShowCreateModal(false);

    const openNewsListModal = () => setShowNewsListModal(true);
    const closeNewsListModal = () => setShowNewsListModal(false);

    const openCreateDespesasModal = () => setCreateDespesasModal(true);
    const closeCreateDespesasModal = () => setCreateDespesasModal(false);

    const openEditDespesasModal = () => setEditDespesasModal(true);
    const closeEditDespesasModal = () => setEditDespesasModal(false);


    return (
        <main className="bg-gray-50 w-screen h-screen flex items-center justify-center relative">
            <section className="p-8 bg-white rounded-2xl shadow-md border border-gray-300 flex flex-row items-center gap-4 justify-between">
                <div className="flex flex-col items-center text-slate-700">
                    <button
                        onClick={openCreateModal}
                        className="flex flex-col items-center p-4 justify-center cursor-pointer hover:scale-105 transition-all"
                    >
                        <FaNewspaper className="text-6xl" />
                        <p className="text-xl">Nova notícia</p>
                    </button>
                </div>

                <div className="flex flex-col items-center text-slate-700">
                    <button
                        onClick={openNewsListModal}
                        className="flex flex-col items-center p-4 justify-center cursor-pointer hover:scale-105 transition-all"
                    >
                        <FaEye className="text-6xl" />
                        <p className="text-xl">Ver notícias</p>
                    </button>
                </div>

                <div className="flex flex-col items-center text-slate-700">
                    <button
                        onClick={openCreateDespesasModal}
                        className="flex flex-col items-center p-4 justify-center cursor-pointer hover:scale-105 transition-all"
                    >
                        <FaFileContract className="text-6xl" />
                        <p className="text-xl">Nova Despesa</p>
                    </button>
                </div>

                <div className="flex flex-col items-center text-slate-700">
                    <button
                        onClick={openEditDespesasModal}
                        className="flex flex-col items-center p-4 justify-center cursor-pointer hover:scale-105 transition-all"
                    >
                        <FaRegPenToSquare className="text-6xl" />
                        <p className="text-xl">Editar despesas</p>
                    </button>
                </div>
            </section>

            <aside className={`${showCreateModal ? "flex" : "hidden"} w-full h-full absolute bg-black/30 justify-center items-center`}>
                <CreateNews onClose={closeCreateModal} />
            </aside>

            <aside className={`${showNewsListModal ? "flex" : "hidden"} w-full h-full absolute bg-black/30 justify-center items-center`}>
                <NewsList onClose={closeNewsListModal} />
            </aside>

            <aside className={`${showCreateDespesasModal ? "flex" : "hidden"} w-full h-full absolute bg-black/30 justify-center items-center`}>
                <CreateDespesas onClose={closeCreateDespesasModal} />
            </aside>

            <aside className={`${showEditDespesasModal ? "flex" : "hidden"} w-full h-full absolute bg-black/30 justify-center items-center`}>
                <EditDespesas onClose={closeEditDespesasModal} />
            </aside>
        </main>
    );
};

export default AdminPainel;
