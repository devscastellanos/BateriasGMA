"use client";
import { Bateria } from "../../components/pages/marca/bateria";
import { marcas } from "../../components/pages/marca/data";
export default function Baterias() {
    return (
        <div className="flex flex-col  p-6 ml-4">
            <h2 className="text-2xl font-bold text-gray-800">LAS MEJORES BATERÍAS DEL MERCADO</h2>
            <div className="flex flex-wrap gap-6 mt-6 max-w">
                {marcas.map((marca) => (
                <Bateria
                    key={marca.id}
                    logo={marca.logo}
                    name={marca.name}
                    description={marca.descripcion}
                />
            ))}
            </div>
            
        </div>
    )
}