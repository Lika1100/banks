import Container from "./components/Container";
import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import { Update } from "./components/Update";
import { Preferences } from "./components/Preferences";
import { AllBanks } from "./components/AllBanks";



// Фильтры
// срок: от __ до __
// проценты: ✓ в конце  ✓ ежемесячно

// ✓ пенсионер
// ✓ финуслуги

// ✓ только пополняемые

// разделить на 4 отдельных файла events.ts
// написать тесты на редьюсеры


export function App() {
    return (
        <Container>
            <Routes>
                <Route index element={<Main />}/>
                <Route path="/blacklist" element={<Preferences />}/>
                <Route path="/banks" element={<AllBanks />}/>
                <Route path="/edit/:bankId" element={<Update />}/>
                <Route path="*" element={<Main />}/>
            </Routes>
        </Container>
    );
}
