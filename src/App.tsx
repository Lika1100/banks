
import { TermFilters } from "./components/TermFilters";
import { Table } from "./components/Table";


// Фильтры
// срок: от __ до __
// проценты: ✓ в конце  ✓ ежемесячно

// ✓ пенсионер
// ✓ финуслуги

// ✓ только пополняемые


export function App() {
    return (
        <div>
            <TermFilters />
            <Table /> 
        </div>
    );
}
