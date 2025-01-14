import styles from "./Item.module.scss";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { mudarCarrinho, mudarQuantidade } from "store/reducers/carrinho";
import { mudarFavorito } from "store/reducers/itens";
import classNames from "classnames";

const iconeProps = {
  color: "#041833",
  size: 24,
};

const quantidadeProps = {
  color: "#1875e8",
  size: 32,
};

export default function Item(props) {
  const { titulo, descricao, foto, preco, favorito, id, carrinho, quantidade } =
    props;
  const dispatch = useDispatch();
  const estaNoCarrinho = useSelector((state) =>
    state.carrinho.some((itemNoCarrinho) => itemNoCarrinho.id === id)
  );
  function resolverFavorito() {
    dispatch(mudarFavorito(id));
  }
  function resolverCarrinho() {
    dispatch(mudarCarrinho(id));
  }
  return (
    <div
      className={classNames(styles.item, { [styles.itemNoCarrinho]: carrinho })}
    >
      <div className={styles["item-imagem"]}>
        <img src={foto} alt={titulo} />
      </div>
      <div className={styles["item-descricao"]}>
        <div className={styles["item-titulo"]}>
          <h2>{titulo}</h2>
          <p>{descricao}</p>
        </div>
        <div className={styles["item-info"]}>
          <div className={styles["item-preco"]}>R$ {preco.toFixed(2)}</div>
          <div className={styles["item-acoes"]}>
            {favorito ? (
              <AiFillHeart
                {...iconeProps}
                color="#f00"
                className={styles["item-acao"]}
                onClick={resolverFavorito}
              />
            ) : (
              <AiOutlineHeart
                {...iconeProps}
                className={styles["item-acao"]}
                onClick={resolverFavorito}
              />
            )}
            {carrinho ? (
              <div className={styles.quantidade}>
                Quantidade:{" "}
                <AiFillMinusCircle
                  {...quantidadeProps}
                  onClick={() => {
                    if (quantidade >= 1) {
                      dispatch(mudarQuantidade({ id, quantidade: -1 }));
                    }
                  }}
                />
                <span>{String(quantidade || 0).padStart(2, "0")}</span>
                <AiFillPlusCircle
                  {...quantidadeProps}
                  onClick={() =>
                    dispatch(mudarQuantidade({ id, quantidade: +1 }))
                  }
                />
              </div>
            ) : (
              <FaCartPlus
                {...iconeProps}
                color={estaNoCarrinho ? "#1875e8" : iconeProps.color}
                className={styles["item-acao"]}
                onClick={resolverCarrinho}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
