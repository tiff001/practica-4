import {AmountDisplay} from "./AmountDisplay"
import { useContext } from "react"
import { BudgetStateContext } from "../context/BudgetContext"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const BudgetTracker = () =>{

    const state = useContext(BudgetStateContext);
    const totalExpenses = state.expenses.reduce((total, expense) => expense.amount + total, 0)
    const remainingBudget = state.budget - totalExpenses

    const percentage = ((totalExpenses / state.budget) * 100).toFixed(2)


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar 
                    value={percentage} //valor del progreso
                    text={`${percentage}%`}  //texto dentro del círculo
                    styles={buildStyles({
                        pathColor: (percentage < 100) ? '#3b82f6' : '#dc2626', //color del progreso, azul si es menor a 100%
                        trailColor: '#f5f5f5', //color del fondo del círculo
                    })}
                />
            </div>
            <div className="flex flex-col justify-center items-center gap-8">
                <button
                className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg">
                    Resetear App
                </button>

                <AmountDisplay amount={state.budget} label = "Presupuesto" />
                <AmountDisplay amount={remainingBudget} label = "Disponible" />
                <AmountDisplay amount={totalExpenses} label = "Gastado" />
            </div>
        </div>
    )
}