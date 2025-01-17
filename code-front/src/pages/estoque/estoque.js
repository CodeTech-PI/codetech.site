import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import estoqueService from "../../services/estoqueService";
import "./estoque.css";
import BotaoRosa from "../../components/BotaoRosa/BotaoRosa";
import BotaoRosaMaior from "../../components/BotaoRosaMaior/BotaoRosaMaior";
import Sidebar from "../../components/SideBar/SideBar";
import BotaoAlterarIcon from "../../components/BotaoAlterarIcon/BotaoAlterarIcon";
import BotaoExcluirIcon from "../../components/BotaoExcluirIcon/BotaoExcluirIcon";

const Estoque = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCategoria, setOpenCategoria] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [openManageCategoria, setOpenManageCategoria] = useState(false);






  const [newItem, setNewItem] = useState({
    quantidade: "",
    nome: "",
    descricao: "",
    unidadeMedida: "",
    preco: "",
    categoria: {
      id: 0,
      nome: "",
    },
  });
  const [newCategoria, setNewCategoria] = useState({ nome: "" });
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [produtoFiltro, setProdutoFiltro] = useState(""); // Estado para filtro de produto
  const [categoriaFiltro, setCategoriaFiltro] = useState(""); // Estado para filtro de categoria
  const [openEditCategoria, setOpenEditCategoria] = useState(false);
  const [editCategoria, setEditCategoria] = useState({
    nome: '', // Add more fields if needed
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };


  const handleOpenManageCategoria = () => {
    setOpenManageCategoria(true);
  };

  const handleCloseManageCategoria = () => {
    setOpenManageCategoria(false);
  };

  const handleOpenEditCategoria = () => {
    setOpenEditCategoria(true);
  };

  const handleCloseEditCategoria = () => {
    setOpenEditCategoria(false);
  };

  const fetchProdutos = async () => {
    try {
      debugger;
      const produtosData = await estoqueService.getProdutos();
      setRows(produtosData);
      setFilteredRows(produtosData); // Inicializa o estado de produtos filtrados
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

  const handleFilterChange = () => {
    const filtered = rows.filter((row) => {
      const matchesProduto = row.nome
        .toLowerCase()
        .includes(produtoFiltro.toLowerCase());
      const matchesCategoria =
        categoriaFiltro === "" ||
        (row.categoria && row.categoria.nome === categoriaFiltro);
      return matchesProduto && matchesCategoria;
    });
    setFilteredRows(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [produtoFiltro, categoriaFiltro, rows]);

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
    if (name === "quantidade" || name === "preco") {
      // Para garantir que não seja 0 quando o campo for vazio
      setNewItem({
        ...newItem,
        [name]: value === "" ? "" : value, // Se o campo for vazio, mantemos vazio
      });
    } else if (name === "categoriaId") {
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
      if (newItem.nome === "" || newItem.preco === "" || newItem.quantidade === "" || newItem.unidadeMedida === "" 
        || newItem.descricao === "" || newItem.categoria.id === 0) {
        setSnackbarMessage("Erro: Nenhum campo pode estar vazio!");
        setSnackbarOpen(true);
        setTimeout(() => setSnackbarOpen(false), 3000); // Mantém a mensagem por 3 segundos
        return;
      } 
      
      if (isEdit) {
        const updatedData = await estoqueService.updateProduto(
          currentId,
          newItem
        );
        setRows(rows.map((row) => (row.id === currentId ? updatedData : row)));
        setSnackbarMessage("Produto atualizado com sucesso!");
      } else {
        const produtoData = await estoqueService.postProduto(newItem);
        setRows([...rows, produtoData]);
        setSnackbarMessage("Produto adicionado com sucesso!");
      }
      setSnackbarOpen(true);
      setTimeout(() => setSnackbarOpen(false), 3000); // Mantém a mensagem por 3 segundos
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  const handleAddItemCategoria = async () => {
    try {
      if (isEdit) {
        const updatedData = await estoqueService.updateCategoria(
          currentId,
          newItem
        );
        setRows(rows.map((row) => (row.id === currentId ? updatedData : row)));
        setSnackbarMessage("Produto atualizado com sucesso!");
      } else {
        const categoriaData = await estoqueService.postCategoria(newItem);
        setRows([...rows, categoriaData]);
        setSnackbarMessage("Categoria adicionado com sucesso!");
      }
      setSnackbarOpen(true);
      setTimeout(() => setSnackbarOpen(false), 3000); // Mantém a mensagem por 3 segundos
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar Categoria:", error);
    }
  };

  const handleAddCategoria = async () => {
    if (newCategoria.nome === "") {
      setSnackbarMessage("Erro: Nome da categoria não pode ser vazio!");
      setSnackbarOpen(true);
      setTimeout(() => setSnackbarOpen(false), 3000); // Mantém a mensagem por 3 segundos
      return;
    }

    try {
      const categoriaData = await estoqueService.postCategoria(newCategoria);
      setCategorias([...categorias, categoriaData]);
      setSnackbarMessage("Categoria adicionada com sucesso!");
      setSnackbarOpen(true);
      setTimeout(() => setSnackbarOpen(false), 3000); // Mantém a mensagem por 3 segundos
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
      setSnackbarMessage("Produto deletado com sucesso!");
      setSnackbarOpen(true);
      setTimeout(() => setSnackbarOpen(false), 3000); // Mantém a mensagem por 3 segundos
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  return (
    <div className="estoque-container">
      <Sidebar />
      <h1>Estoque</h1>
      <div className="botoes-incluir">
        <BotaoRosaMaior onClick={handleOpen} nomeBotao="Adicionar Produto"/>
        <BotaoRosa
          onClick={handleOpenCategoria}
          nomeBotao="Categorias"
        />
      </div>

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
            {filteredRows.length > 0 ? (
              filteredRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.nome}</TableCell>
                  <TableCell>{row.quantidade}</TableCell>
                  <TableCell>{row.preco}</TableCell>
                  <TableCell>
                    {row.categoria ? row.categoria.nome : "Sem Categoria"}
                  </TableCell>
                  <TableCell>
                    <div classname="icons-bonitos">
                    <div className="action-buttons">
                      <BotaoAlterarIcon
                        nomeBotao="Editar"
                        onClick={() => handleEdit(row)}
                        altText='Ícone de alteração' 
                      />
                      <BotaoExcluirIcon
                        nomeBotao="Excluir"
                        onClick={() => handleDelete(row.id)}
                        altText='Ícone de excluir'
                      />
                    </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>Nenhum produto encontrado</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Snackbar para mensagens de sucesso */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {/* Dialog para adicionar/editar produto */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {isEdit ? "Editar Produto" : "Adicionar Produto"}
        </DialogTitle>
        <div className="div-adc-prod">
        <DialogContent >
          <div className="input-container-adc-prod">
            <label className="label-adc-prd" htmlFor="nome">Nome do Produto</label>
            <input
              className="input-adc-prod"
              id="nome"
              name="nome"
              type="text"
              value={newItem.nome}
              onChange={handleInputChange}
             
            />
          </div>
          <div className="input-container-adc-prod">
            <label className="label-adc-prd" htmlFor="descricao">Descrição</label>
            <input
              className="input-adc-prod"
              id="descricao"
              name="descricao"
              type="text"
              value={newItem.descricao}
              onChange={handleInputChange}
              
            />
          </div>

          <div className="input-container-adc-prod">
            <label className="label-adc-prd" htmlFor="unidadeMedida">Unidade de Medida</label>
            <input
              className="input-adc-prod"
              id="unidadeMedida"
              name="unidadeMedida"
              type="text"
              value={newItem.unidadeMedida}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-container-adc-prod">
            <label className="label-adc-prd" htmlFor="quantidade">Quantidade</label>
            <input
              className="input-adc-prod"
              id="quantidade"
              name="quantidade"
              type="number"
              value={newItem.quantidade}
              onChange={handleInputChange}
              min="0"
              
            />
          </div>

          <div className="input-container-adc-prod">
            <label className="label-adc-prd" htmlFor="preco">Preço</label>
            <input
              className="input-adc-prod"
              id="preco"
              name="preco"
              type="number"
              value={newItem.preco}
              onChange={handleInputChange}
              min="0" 
             
            />
          </div>

          <FormControl fullWidth margin="dense">
            <Select
              name="categoriaId"
              value={newItem.categoria.id || ""}
              onChange={handleInputChange}
              displayEmpty
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
                  textAlign: "center",
                },
                "& .MuiInputBase-input": {
                  padding: "10px 14px",
                  backgroundColor: "#d9d9d9",
                  textAlign: "left", // Alinha o texto à esquerda
                },
                width: "100%", 
              }}
            >
              <MenuItem value="">
                <em>Selecione uma Categoria</em>
              </MenuItem>
              {categorias.map((categoria) => (
                <MenuItem key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        </div>
        <DialogActions className="botoes-cadast-produto">
          <button onClick={handleAddItem} className="botao-salvar">
            Salvar
          </button>
          <button onClick={handleClose} className="botao-cancelar">
            Cancelar
          </button>
        </DialogActions>
      </Dialog>

      {/* Dialog para adicionar categoria */}
      <Dialog
        open={openCategoria}
        onClose={handleCloseCategoria}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "20px",
            border: "none",
            padding: "24px",
            maxWidth: "500px",
            backgroundColor: "#1B1B1B",
            color: "#ffffff",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "25px",
            color: "white",
            marginBottom: "16px",
          }}
        >
          Adicionar Categoria
        </DialogTitle>
        <DialogContent>

          <input className="input-filter"
            autoFocus
            margin="dense"
            name="nome"
            label="Nome da Categoria"
            type="text"
            fullWidth
            value={newCategoria.nome}
            onChange={handleCategoriaInputChange}

          />


          <div style={{ marginTop: "16px", textAlign: "center" }}>
            <a
              href="#"
              onClick={handleOpenManageCategoria}
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: "500",
              }}
              onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              Deseja alterar ou excluir categoria?
            </a>
          </div>
        </DialogContent>


        <DialogActions sx={{ justifyContent: "center", marginTop: "24px" }}>
          <button
            onClick={handleAddCategoria}
            style={{
              backgroundColor: "#2E8B57",
              color: "#ffffff",
              height: "30px",
              width: "70px",
              borderRadius: "5px",
              fontSize: "14px",
              border: "none",
              cursor: "pointer",
              marginRight: "10px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
              transition: "all 0.3s",
            }}
          >
            Salvar
          </button>
          <button
            onClick={handleCloseCategoria}
            style={{
              backgroundColor: "#8d0c0c",
              color: "#ffffff",
              height: "30px",
              width: "70px",
              borderRadius: "5px",
              fontSize: "14px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            Cancelar
          </button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openManageCategoria}
        onClose={handleCloseManageCategoria}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "12px",
            padding: "24px",
            backgroundColor: "#1C1C1C",
            color: "#FFFFFF",
            boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.4)",
            width: "70%",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "700",
            fontSize: "1.6rem",
            color: "white",
            paddingBottom: "16px",
            marginBottom: "20px",
          }}
        >
          Gerenciar Categorias
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: "16px" }}>
          <TableContainer
            sx={{
              backgroundColor: "#2D2D2D",
              borderRadius: "10px",
              padding: "16px",
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
              // Remover o maxHeight para evitar o scroll
              "&::-webkit-scrollbar": {
                width: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#DF0050",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#444444",
                borderRadius: "10px",
              },
            }}
          >
            <Table sx={{ minWidth: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "500",
                      fontSize: "1.1rem",
                      borderBottom: "2px solid white",
                      paddingBottom: "12px",
                    }}
                  >
                    Categoria
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "500",
                      fontSize: "1.1rem",
                      borderBottom: "2px solid white",
                      paddingBottom: "12px",
                      textAlign: "center"
                    }}
                  >
                    Ações
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categorias.length > 0 ? (
                  categorias.map((categoria) => (
                    <TableRow
                      key={categoria.id}
                      sx={{
                        "&:hover": { backgroundColor: "#333333" },
                      }}
                    >
                      <TableCell
                        sx={{
                          color: "#FFFFFF",
                          fontSize: "1rem",
                          padding: "16px",
                          borderBottom: "1px solid #444444"
                        }}
                      >
                        {categoria.nome}
                      </TableCell>
                      <TableCell
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          padding: "16px",
                        }}
                      >
                          <BotaoAlterarIcon
                           onClick={() => {
                            setNewCategoria({ nome: categoria.nome });
                            setCurrentId(categoria.id);
                            handleOpenEditCategoria();
                          }}
                          />
                        <BotaoExcluirIcon
                          onClick={async () => {
                            try {
                              await estoqueService.deleteCategoria(categoria.id);
                              setCategorias(
                                categorias.filter((c) => c.id !== categoria.id)
                              );
                              setSnackbarMessage(
                                "Categoria excluída com sucesso!"
                              );
                              setSnackbarOpen(true);
                            } catch (error) {
                              console.error("Erro ao excluir categoria:", error);
                            }
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      sx={{
                        textAlign: "center",
                        color: "#BDBDBD",
                        fontSize: "1.1rem",
                        padding: "20px",
                      }}
                    >
                      Nenhuma categoria encontrada
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", paddingTop: "20px" }}>
          <button
            onClick={handleCloseManageCategoria}
            style={{
              backgroundColor: "#8d0c0c",
              color: "#FFFFFF",
              height: "30px",
              width: "70px",
              borderRadius: "5px",
              fontSize: "14px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Fechar
          </button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={openEditCategoria}
        onClose={handleCloseEditCategoria}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "20px",
            padding: "24px",
            maxWidth: "500px",
            backgroundColor: "#1B1B1B",
            color: "#ffffff",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.75rem",
            color: "white",
            marginBottom: "16px",
          }}
        >
          Editar Categoria
        </DialogTitle>
        <DialogContent>
          <input className="input-filter"
            autoFocus
            margin="dense"
            name="nome"
            label="Nome da Categoria"
            type="text"
            fullWidth
            value={newCategoria.nome}
            onChange={(e) => setNewCategoria({ ...newCategoria, nome: e.target.value })}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", marginTop: "24px" }}>
          <button
            onClick={async () => {
              try {
                if (newCategoria.nome === "") {
                  setSnackbarMessage("Erro: Nome da categoria não pode ser vazio!");
                  setSnackbarOpen(true);
                  setTimeout(() => setSnackbarOpen(false), 3000);
                  return;
                }
                await estoqueService.updateCategoria(currentId, newCategoria);
                setCategorias((prevCategorias) =>
                  prevCategorias.map((categoria) =>
                    categoria.id === currentId ? { ...categoria, nome: newCategoria.nome } : categoria
                  )
                );

                setSnackbarMessage("Categoria atualizada com sucesso!");
                setSnackbarOpen(true);
                handleCloseEditCategoria();
                handleCloseManageCategoria();
                handleCloseCategoria();

              } catch (error) {
                console.error("Erro ao atualizar categoria:", error);
              }
            }}
            style={{
              backgroundColor: "#2E8B57",
              color: "#ffffff",
              height: "30px",
              width: "70px",
              borderRadius: "5px",
              fontSize: "14px",
              border: "none",
              cursor: "pointer",
              marginRight: "10px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
              transition: "all 0.3s",
            }}
          >
            Salvar
          </button>
          <button
            onClick={handleCloseEditCategoria}
            style={{
              backgroundColor: "#8d0c0c",
              color: "#ffffff",
              height: "30px",
              width: "70px",
              borderRadius: "5px",
              fontSize: "14px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            Cancelar
          </button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarMessage.includes("Erro") ? "error" : "success"} // Define o tipo de alerta dinamicamente
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </div>



  );
};

export default Estoque;
