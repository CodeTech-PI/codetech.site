import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Sidebar from "../../components/SideBar/SideBar";
import estoqueService from "../../services/estoqueService";
import "./estoque.css";
import BotaoFechar from "../../components/BotaoFechar/BotaoFechar";
import BotaoAlterar from "../../components/BotaoAlterar/BotaoAlterar";
import BotaoCliente from "../../components/BotaoCliente/BotaoCliente";

const Estoque = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false); // Controle do popup para produtos
  const [openCategoria, setOpenCategoria] = useState(false); // Controle do popup para categorias
  const [isEdit, setIsEdit] = useState(false); // Indica se é edição
  const [currentId, setCurrentId] = useState(null); // ID do item sendo editado
  const [categorias, setCategorias] = useState([]); // Adiciona estado para categorias
  const [newItem, setNewItem] = useState({
    quantidade: 0,
    nome: "",
    descricao: "",
    unidadeMedida: "",
    preco: 0,
    categoria: {
      id: 0,
      nome: "",
    },
  });
  const [newCategoria, setNewCategoria] = useState({ nome: "" });

  const fetchProdutos = async () => {
    try {
      const produtosData = await estoqueService.getProdutos();
      setRows(produtosData);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const categoriasData = await estoqueService.getCategorias();
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
    fetchCategorias();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewItem({
      quantidade: 0,
      nome: "",
      descricao: "",
      unidadeMedida: "",
      preco: 0,
      categoria: {
        id: 0,
        nome: "",
      },
    });
    setIsEdit(false);
    setCurrentId(null);
  };

  const handleOpenCategoria = () => {
    setOpenCategoria(true);
  };

  const handleCloseCategoria = () => {
    setOpenCategoria(false);
    setNewCategoria({ nome: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoriaId") {
      const selectedCategoria = categorias.find(
        (categoria) => categoria.id === parseInt(value)
      );
      setNewItem({
        ...newItem,
        categoria: { id: selectedCategoria.id, nome: selectedCategoria.nome },
      });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  const handleCategoriaInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategoria({ ...newCategoria, [name]: value });
  };

  const handleAddItem = async () => {
    try {
      if (isEdit) {
        // Chama a função de update
        const updatedData = await estoqueService.updateProduto(
          currentId,
          newItem
        );
        setRows(rows.map((row) => (row.id === currentId ? updatedData : row)));
      } else {
        // Chama a função de criação
        const produtoData = await estoqueService.postProduto(newItem);
        setRows([...rows, produtoData]);
      }
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  const handleAddCategoria = async () => {
    try {
      const categoriaData = await estoqueService.postCategoria(newCategoria);
      setCategorias([...categorias, categoriaData]);
      handleCloseCategoria();
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
    }
  };

  const handleEdit = (item) => {
    setNewItem({
      quantidade: item.quantidade,
      nome: item.nome,
      descricao: item.descricao,
      unidadeMedida: item.unidadeMedida,
      preco: item.preco,
      categoria: {
        id: item.categoria.id,
        nome: item.categoria.nome,
      },
    });
    setCurrentId(item.id);
    setIsEdit(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await estoqueService.deleteProduto(id);
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  return (
    <div className="estoque-container">
      <Sidebar />
      <h1>Estoque</h1>
      <Button
        variant="contained"
        color="success"
        className="incluir-btn"
        onClick={handleOpen}
      >
        Incluir Produto
      </Button>
      <Button
        variant="contained"
        color="primary"
        className="incluir-categoria-btn"
        onClick={handleOpenCategoria}
      >
        Incluir Categoria
      </Button>
      <TableContainer>
        <Table className="estoque-table">
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell>Qtd</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.nome}</TableCell>
                  <TableCell>{row.quantidade}</TableCell>
                  <TableCell>{row.preco}</TableCell>
                  <TableCell>
                    {row.categoria ? row.categoria.nome : "Sem Categoria"}
                  </TableCell>
                  <TableCell>
                    <div className="action-buttons">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(row)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDelete(row.id)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: "center" }}>
                  Nenhum item encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Popup para incluir ou editar produto */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="css-rvoa5x-MuiTypography-root-MuiDialogTitle-root">
          {isEdit ? "Editar Produto" : "Incluir Novo Produto"}
        </DialogTitle>
        <DialogContent className="css-dialog-content">
          <TextField
            autoFocus
            margin="dense"
            name="nome"
            className="css-text-field"
            value={newItem.nome}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Digite o nome do produto"
            InputLabelProps={{
              shrink: false,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />
          <TextField
            margin="dense"
            name="quantidade"
            className="css-text-field"
            type="number"
            value={newItem.quantidade}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Digite a quantidade"
            InputLabelProps={{
              shrink: false,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />
          <TextField
            margin="dense"
            name="descricao"
            className="css-text-field"
            value={newItem.descricao}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Digite a descrição"
            InputLabelProps={{
              shrink: false,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />
          <TextField
            margin="dense"
            name="unidadeMedida"
            className="css-text-field"
            value={newItem.unidadeMedida}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Digite a unidade de medida"
            InputLabelProps={{
              shrink: false,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />
          <TextField
            margin="dense"
            name="preco"
            className="css-text-field"
            type="number"
            value={newItem.preco}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Digite o preço"
            InputLabelProps={{
              shrink: false,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />
          <FormControl fullWidth margin="dense">
            <Select
              labelId="categoria-label"
              name="categoriaId"
              value={newItem.categoria.id || ""}
              onChange={handleInputChange}
              variant="outlined"
              displayEmpty
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSelect-select": {
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#d9d9d9",
                  textAlign: "center", // Centraliza o texto selecionado
                },
                "& .MuiInputBase-input": {
                  padding: "10px 14px",
                  backgroundColor: "#d9d9d9",
                  textAlign: "left", // Alinha o texto à esquerda
                },
                width: "100%", // Use 100% para melhor centralização
              }}
            >
              <MenuItem value="" disabled>
                Categoria
              </MenuItem>
              {categorias.length > 0 ? (
                categorias.map((categoria) => (
                  <MenuItem key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="" disabled>
                  Nenhuma categoria disponível
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "center", gap: 2 }}
        >
          {/* <Button onClick={handleClose}>Cancelar</Button> */}
          <BotaoCliente nomeBotao="Adicionar" onClick={handleAddItem} />

          <BotaoAlterar nomeBotao="Cancelar" onClick={handleClose} />
{/* 
          <Button onClick={handleAddItem}>
            {isEdit ? "Salvar" : "Adicionar"}
          </Button> */}
        </DialogActions>
      </Dialog>

      {/* Popup para incluir categoria */}
      <Dialog open={openCategoria} onClose={handleCloseCategoria}>
        <DialogTitle className="css-rvoa5x-MuiTypography-root-MuiDialogTitle-root">
          Nova Categoria
        </DialogTitle>
        <DialogContent className="css-dialog-content">
          <TextField
            autoFocus
            margin="dense"
            name="nome"
            className="css-text-field" // Use a classe CSS para aplicar estilos
            value={newCategoria.nome}
            onChange={handleCategoriaInputChange}
            variant="outlined"
            placeholder="Nome da categoria"
            InputLabelProps={{
              shrink: false,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "center", gap: 2 }}
        >
          <BotaoCliente
            nomeBotao="Adicionar categoria"
            onClick={handleAddCategoria}
          />

          {/* <Button onClick={handleCloseCategoria}>Cancelar</Button> */}
          <BotaoAlterar nomeBotao="Cancelar" onClick={handleCloseCategoria} />
          {/* <Button onClick={handleAddCategoria}>Adicionar</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Estoque;
