import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserCartView } from "@/components/UserCartView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Accueil from "./pages/Accueil";
import Animalerie from "./pages/Animalerie";
import Annonces from "./pages/Annonces";
import NosServices from "./pages/NosServices";
import Members from "./pages/Members";
import Avis from "./pages/Avis";
import About from "./pages/About";
import InvoicePage from "./pages/InvoicePage";
import { CartProvider } from './components/CartContext'; 
import Logout from '@/components/Logout'; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider> 
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/invoice" element={<InvoicePage />} />
            <Route path="/logout" element={<Logout  />} />
            <Route path="/user-cart" element={<UserCartView />} />
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/animalerie" element={<Animalerie />} />
            <Route path="/annonces" element={<Annonces />} />
            <Route path="/nos-services" element={<NosServices />} exact />
            <Route path="/members" element={<Members />} />
            <Route path="/avis" element={<Avis />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;