import PagePadrao from "components/PagePadrao";
import Carrinho from "pages/Carrinho";
import Categoria from "pages/Categoria";
import Home from "pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PagePadrao />}>
          <Route index element={<Home />} />
          <Route path="categoria/:nomeCategoria" element={<Categoria />} />
          <Route path="carrinho" element={<Carrinho />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
