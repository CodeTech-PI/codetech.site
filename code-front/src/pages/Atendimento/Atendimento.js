import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ProgressBar, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import agendamentoService from '../../services/agendamentoService';
import clienteService from '../../services/clienteService';
import listaProdutosService from '../../services/listaProdutosService';
import estoqueService from '../../services/estoqueService';
import Sidebar from '../../components/SideBar/SideBar';
import './Atendimento.css';

// Estilizando o Modal usando styled-components
const StyledModal = styled(Modal)`
  .modal-content {
    background-color: #1B1B1B;
    color: #fff;
  }
`;

const StepContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const CustomButton = styled(Button)`
  margin: 0 5px;
  color: white;
    background-color: #4169E1;
    height: 30px;
    font-size: 14px;
    width: 70px;
    border: none;
    border-radius: 5px;
    padding: 0;
`;

const Atendimento = () => {

  const [isConfirming, setIsConfirming] = useState(false);
  const [show, setShow] = useState(true); // Modal aparecerá ao carregar a página
  const [formData, setFormData] = useState({
    dt: "2024-12-04", // Formato inicial para datetime-local
    horario: "00:00",
    cancelado: false,
    usuario: {
      id: 0,
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
      dataNascimento: "2024-11-18"
    }
  });
  const [usuarios, setUsuarios] = useState([]); // Lista de usuários
  const [selectedUsuario, setSelectedUsuario] = useState(null); // Usuário selecionado
  const [error, setError] = useState(null); // Para exibir mensagens de erro
  const [step, setStep] = useState(1); // Adicionado o estado para controlar o passo do formulário
  const [listaProdutos, setListaProdutos] = useState([]);
  const [busca, setBusca] = useState('');
  const [filteredProdutos, setFilteredProdutos] = useState([]); // Estado para armazenar os produtos filtrados
  const [selectedProdutos, setSelectedProdutos] = useState([]); // Estado para armazenar os produtos selecionados
  const [agendamentoId, setAgendamentoId] = useState(null); // Estado para armazenar o ID do agendamento
  const [faturamento, setFaturamento] = useState(null);


  useEffect(() => {
    clienteService.getClientes()
      .then((response) => {
        if (Array.isArray(response)) {
          const usuariosDados = response.map(usuario => ({
            id: usuario.id,
            nome: usuario.nome,
            cpf: usuario.cpf,
            telefone: usuario.telefone,
            email: usuario.email,
            dataNascimento: usuario.dataNascimento
          }));
          setUsuarios(usuariosDados);
        } else {
          setError("Resposta não contém um array de usuários.");
        }
      })
      .catch((error) => {
        setError("Erro ao buscar usuários.");
      });
  }, []);

  useEffect(() => {
    fetchListaProdutos(); // Buscar lista de produtos ao carregar o componente
  }, []);

  const fetchListaProdutos = async () => {
    try {
      const produtosData = await estoqueService.getProdutos();
      setListaProdutos(produtosData);
    } catch (error) {
      console.error('Erro ao buscar produtos', error);
    }
  };

  useEffect(() => {
    // Filtrar produtos sempre que a busca mudar
    const filtered = listaProdutos.filter(produto => produto.nome && produto.nome.toLowerCase().includes(busca.toLowerCase()));
    setFilteredProdutos(filtered);
  }, [busca, listaProdutos]);

  const handleClose = () => setShow(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleUserSelect = (e) => {
    const selectedId = e.target.value;
    const usuario = usuarios.find(user => user.id === parseInt(selectedId));
    setSelectedUsuario(usuario);
    setFormData({
      ...formData,
      usuario: usuario ? usuario : formData.usuario
    });
  };

  const handlePostAgendamento = async () => {
    const { dt, horario, cancelado } = formData;
    const [date, time] = dt.split('T');
    const [hour, minute] = horario.split(':');

    const agendamentoData = {
      dt: date,
      horario: `${hour}:${minute}:00`,
      cancelado: cancelado,
      usuario: selectedUsuario ? { ...selectedUsuario, cpf: formData.usuario.cpf } : null
    };

    try {
      const response = await agendamentoService.postAgendamento(agendamentoData);
      if (response && response.id) {
        setAgendamentoId(response.id); // Salvar o ID do agendamento
        setStep(2); // Avançar para o próximo passo
      } else {
        setError("Já existe um agendamento para a data e horário especificados.");
      }
    } catch (error) {
      setError("Ocorreu um erro ao tentar agendar. Tente novamente.");
    }
  };

  const handleBusca = (e) => {
    const query = e.target.value;
    setBusca(query);
  };

  const handleProductSelect = (id) => {
    setSelectedProdutos((prevSelected) => {
      if (prevSelected.find((prod) => prod.id === id)) {
        return prevSelected.filter((prod) => prod.id !== id); // Remove o produto do array de selecionados
      } else {
        return [...prevSelected, { id, quantidade: 1 }]; // Adiciona o produto ao array de selecionados com quantidade inicial 1
      }
    });
  };

  const handleQuantidadeChange = (id, quantidade) => {
    setSelectedProdutos((prevSelected) =>
      prevSelected.map((prod) =>
        prod.id === id ? { ...prod, quantidade: parseInt(quantidade, 10) } : prod
      )
    );
  };

  const handleSalvarProdutos = async () => {
    if (selectedProdutos.length === 0) {
      setError("Nenhum produto selecionado.");
      return;
    }

    const listaProdutosRequest = {
      produtos: selectedProdutos.map((produto) => ({
        quantidade: produto.quantidade,
        agendamento: {
          id: agendamentoId, // Usar o ID do agendamento salvo
        },
        produto: {
          id: produto.id,
        },
      })),
    };

    try {
      const response = await listaProdutosService.postListaProdutos(listaProdutosRequest);
      if (response) {
        setStep(3); // Avançar para o próximo passo
      } else {
        setError("Erro ao salvar produtos.");
      }
    } catch (error) {
      setError("Ocorreu um erro ao tentar salvar os produtos. Tente novamente.");
    }
  };

  const nextStep = () => {
    if (step === 1) {
      handlePostAgendamento(); // Chama o POST apenas no primeiro passo
    } else if (step === 2) {
      handleSalvarProdutos(); // Chama o POST dos produtos no segundo passo
    }
  };

  const prevStep = () => {
    setStep(step - 1); // Retorna ao passo anterior
  };

  const handlePostOrdemServico = async () => {
    const { valorTatuagem, dt, horario, cancelado } = formData;

    // Verificando se o campo 'horario' tem um valor válido
    if (!horario || !dt) {
      setError("Horário ou data inválidos.");
      return;
    }

    // Separando a data e o horário
    const [date, time] = dt.split('T');
    const [hour, minute] = time.split(':');

    // Verificando se 'hour' e 'minute' são válidos
    const parsedHour = hour ? parseInt(hour, 10) : 0;
    const parsedMinute = minute ? parseInt(minute, 10) : 0;

    const ordemServicoData = {
      valorTatuagem: valorTatuagem || 0,
      agendamento: {
        id: agendamentoId, // ID do agendamento gerado anteriormente
        dt: date,
        horario: `${parsedHour.toString().padStart(2, '0')}:${parsedMinute.toString().padStart(2, '0')}`, // Formato HH:mm
        cancelado: cancelado,
        usuario: selectedUsuario ? { ...selectedUsuario } : null,
      },
    };

    try {
      debugger
      const response = await agendamentoService.postOrdemServico(ordemServicoData);
      if (response) {
        const ordemServicoId = response.id;
        const faturamento = await agendamentoService.getFaturamentoPorId(ordemServicoId);
        setFaturamento(faturamento);
      }
      if (response) {
        setStep(4); // Avançar para o próximo passo
      } else {
        setError("Erro ao salvar a ordem de serviço.");
      }
    } catch (error) {
      setError("Ocorreu um erro ao tentar salvar a ordem de serviço. Tente novamente.");
    }
  };

  {
    step === 3 && (
      <StepContainer>
        <CustomButton variant="primary" onClick={handlePostOrdemServico}>
          Salvar Ordem de Serviço
        </CustomButton>
      </StepContainer>
    )
  }

  const handleCloseFechar = () => {
    setStep(1); // Voltar para o step 1
  };


  return (
    <section>
      <Sidebar />
      <StyledModal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='atendimento'>
          <Modal.Title>Atendimento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProgressBar className='progresso' now={(step / 4) * 100} label={`Parte ${step} de 4`} />
          {error && <Alert variant="danger">{error}</Alert>} {/* Exibir erro, se houver */}

          {step === 1 && (
            <StepContainer>
              {/* <h5>Data e Horário</h5> */}
              <div className='parte-1'>
                <Form.Group className='input-label'>


                  <Form.Label>Data e Hora</Form.Label>
                  <input
                    className='input-form'
                    type="datetime-local"
                    name="dt"
                    value={formData.dt}
                    onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="horario" className='input-label'>
                  <Form.Label>Horário</Form.Label>
                  <input
                    className='input-form'
                    type="time"
                    name="horario"
                    value={formData.horario}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="cancelado" className='checkbox-cancelado'>
                  <Form.Label >Cancelado</Form.Label>
                  <input
                    type="checkbox"
                    label="Cancelado"
                    name="cancelado"
                    checked={formData.cancelado}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                {/* <h5>Cliente</h5> */}
                <Form.Group className='input-label'>
                  <Form.Label>Selecione o Cliente</Form.Label>
                  <Form.Control className='input-form' as="select" onChange={handleUserSelect}>
                    <option value="">Selecione</option>
                    {usuarios.map((usuario) => (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.nome}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>


                {selectedUsuario && (
                  <>

                    <Form.Group className='input-label'>
                      <Form.Label>Nome</Form.Label>
                      <Form.Control className='input-form' type="text" value={selectedUsuario.nome} readOnly />
                    </Form.Group>
                    <Form.Group className='input-label'>
                      <Form.Label>Telefone</Form.Label>
                      <Form.Control className='input-form' type="text" value={selectedUsuario.telefone} readOnly />
                    </Form.Group>
                    <Form.Group className='input-label'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control className='input-form' type="email" value={selectedUsuario.email} readOnly />
                    </Form.Group>
                    <Form.Group className='input-label'>
                      <Form.Label>Data de Nascimento</Form.Label>
                      <Form.Control
                        className='input-form'
                        type="date"
                        value={selectedUsuario.dataNascimento}
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group className='input-label'>
                      <Form.Label>CPF</Form.Label>
                      <Form.Control
                        className='input-form'
                        type="text"
                        value={formData.usuario.cpf}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            usuario: { ...formData.usuario, cpf: e.target.value },
                          })
                        }
                        name="usuario.cpf"
                      />
                    </Form.Group>

                  </>
                )}
              </div>
            </StepContainer>
          )}

          {step === 2 && (
            <StepContainer>
              <div className='parte-1'>
                <h5>Produtos utilizados</h5>

                <Form.Group className='input-label'>

                  <Form.Control
                    className='input-form'
                    type="text"
                    placeholder="Digite para buscar produtos..."
                    value={busca}
                    onChange={handleBusca}
                  />
                </Form.Group>
                <div className='product-list'>
                  {filteredProdutos.map((produto) => (
                    <div key={produto.id} className='product-item'>
                      <Form.Check
                        type="checkbox"
                        label={produto.nome}
                        checked={selectedProdutos.some((prod) => prod.id === produto.id)}
                        onChange={() => handleProductSelect(produto.id)}
                      />
                      {selectedProdutos.some((prod) => prod.id === produto.id) && (
                        <Form.Control

                          type="number"
                          value={selectedProdutos.find((prod) => prod.id === produto.id).quantidade}
                          onChange={(e) => handleQuantidadeChange(produto.id, e.target.value)}
                          min="1"
                          className='quantity-input'
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </StepContainer>
          )}

          {step === 3 && (
            <StepContainer>
              <div className='parte-1'>
                <h5>Confirmar Atendimento</h5>
                <Form.Group className='input-label'>
                  <Form.Label>Valor da Tatuagem</Form.Label>
                  <Form.Control
                    className='input-form'
                    type="number"
                    name="valorTatuagem"
                    value={formData.valorTatuagem || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className='input-label'>
                  <Form.Label>Data do Atendimento</Form.Label>
                  <Form.Control
                    className='input-form'
                    type="text"
                    value={formData.dt}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className='input-label'>
                  <Form.Label>Hora do Atendimento</Form.Label>
                  <Form.Control
                    className='input-form'
                    type="text"
                    value={formData.horario}
                    readOnly
                  />
                </Form.Group>
                <StepContainer>
                  {/* Exibe o botão "Gerar ordem" somente quando o modal não está sendo exibido */}
                  {!isConfirming && (
                    <CustomButton
                      className='botao-gerar-ordem'
                      variant="primary"
                      onClick={() => setIsConfirming(true)} // Abre o modal de confirmação
                    >
                      Gerar ordem
                    </CustomButton>
                  )}

                  {/* Exibe o botão "Voltar" somente quando o modal não está sendo exibido */}
                  {!isConfirming && (
                    <CustomButton
                      className='botao-voltar'
                      variant="secondary"
                      onClick={prevStep}
                    >
                      Voltar
                    </CustomButton>
                  )}

                  {/* Modal de Confirmação */}
                  {isConfirming && (
                    <div className="modal-overlay">
                      <div className="modal-content">
                        <h3>Tem certeza que deseja Gerar Ordem de Serviço?</h3>
                        <div className="modal-buttons">
                          <CustomButton
                          className='botao-salvar-proximo'
                            variant="success"
                            onClick={() => {
                              handlePostOrdemServico();
                              setIsConfirming(false);
                            }}
                          >
                            Confirmar
                          </CustomButton>
                          <CustomButton
                            className='botao-voltar'
                            variant="danger"
                            onClick={() => setIsConfirming(false)}
                          >
                            Cancelar
                          </CustomButton>
                        </div>
                      </div>
                    </div>
                  )}
                </StepContainer>


              </div>
            </StepContainer>
          )}

          {step === 4 && faturamento && (
            <StepContainer>
              <div className='faturamento'>
              <h5>Ordem de serviço</h5>
              <p>Atendimento realizado com sucesso!</p>
              <h6>Detalhes do Faturamento</h6>
              <p className='lucro'>
                Lucro: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(faturamento.lucro)}
              </p> {/* Formatação de R$ */}
              {/* <CustomButton variant="success" onClick={handleCloseFechar}>
                Fechar
              </CustomButton> */}
              </div>
            </StepContainer>
          )}


          {/* Adicione mais etapas conforme necessário */}
        </Modal.Body>
        {step < 3 && (
          <Modal.Footer>
            <CustomButton className='botao-voltar' variant="secondary" onClick={prevStep} disabled={step === 1}>
              Voltar
            </CustomButton>
            <CustomButton className='botao-salvar-proximo' variant="primary" onClick={nextStep}>
              {step === 2 ? 'Salvar' : 'Próximo'}
            </CustomButton>
          </Modal.Footer>
        )}
      </StyledModal>
    </section>
  );
};

export default Atendimento;
