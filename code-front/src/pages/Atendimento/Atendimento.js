import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ProgressBar, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import agendamentoService from '../../services/agendamentoService';
import clienteService from '../../services/clienteService';
import listaProdutosService from "../../services/listaProdutosService";

// Estilizando o Modal usando styled-components
const StyledModal = styled(Modal)`
  .modal-content {
    background-color: #333;
    color: #fff;
  }
`;

const StepContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const CustomButton = styled(Button)`
  margin: 0 5px;
`;
const ProductBox = styled.div`
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  display: inline-block;
  width: 45%;
  text-align: left;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;



const Atendimento = () => {
    const [show, setShow] = useState(true); // Modal aparecerá ao carregar a página
    const [formData, setFormData] = useState({
        dt: "2024-11-18T00:00", // Formato inicial para datetime-local
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
    const [selectedProdutos, setSelectedProdutos] = useState([]); // Estado para armazenar os produtos selecionados

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
            const produtosData = await listaProdutosService.getListaProdutos();
            setListaProdutos(produtosData);
        } catch (error) {
            console.error('Erro ao buscar lista de produtos', error);
        }
    };

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
        const { dt, cancelado } = formData;
        const [date, time] = dt.split('T');
        const [hour, minute] = time ? time.split(':') : ['00', '00'];
        const horario = `${hour}:${minute}:00`;

        const agendamentoData = {
            ...formData,
            dt: date,
            horario: horario
        };

        if (!cancelado && selectedUsuario) {
            agendamentoData.usuario = {
                ...selectedUsuario,
                cpf: formData.usuario.cpf,
            };
        }

        try {
            const response = await agendamentoService.postAgendamento(agendamentoData);
            if (response) {
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

    const handleProductSelect = (e) => {
        const { value, checked } = e.target;
        setSelectedProdutos((prevSelected) => {
            if (checked) {
                return [...prevSelected, value]; // Adiciona o produto ao array de selecionados
            } else {
                return prevSelected.filter((id) => id !== value); // Remove o produto do array de selecionados
            }
        });
    };

    const nextStep = () => {
        if (step === 1) {
            handlePostAgendamento(); // Chama o POST apenas no primeiro passo
        } else if (step === 2) {
            // No Step 2, apenas avança para o próximo passo sem chamar o POST
            setStep(3); // Exemplo: Avançando para um próximo passo
        }
    };

    const prevStep = () => {
        setStep(1); // Retorna ao primeiro passo
    };

    return (
        <StyledModal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Atendimento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ProgressBar now={(step / 4) * 100} label={`Step ${step} of 4`} />
                {error && <Alert variant="danger">{error}</Alert>} {/* Exibir erro, se houver */}

                {step === 1 && (
                    <StepContainer>
                        <h5>Data e Horário</h5>
                        <Form.Group>
                            <Form.Label>Data e Hora</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="dt"
                                value={formData.dt}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="cancelado">
                            <Form.Check
                                type="checkbox"
                                label="Cancelado"
                                name="cancelado"
                                checked={formData.cancelado}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <h5>Cliente</h5>
                        <Form.Group>
                            <Form.Label>Selecione o Cliente</Form.Label>
                            <Form.Control as="select" onChange={handleUserSelect}>
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
                                <Form.Group>
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control type="text" value={selectedUsuario.nome} readOnly />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Telefone</Form.Label>
                                    <Form.Control type="text" value={selectedUsuario.telefone} readOnly />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={selectedUsuario.email} readOnly />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>CPF</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.usuario.cpf}
                                        onChange={(e) => handleInputChange(e, "usuario", "cpf")}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Data de Nascimento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={selectedUsuario.dataNascimento}
                                        readOnly
                                    />
                                </Form.Group>
                            </>
                        )}
                        <CustomButton variant="primary" onClick={nextStep}>
                            Avançar
                        </CustomButton>
                    </StepContainer>
                )}

                {step === 2 && (
                    <StepContainer>
                        <h5>Selecione o Produto</h5>
                        <Form.Group>
                            <Form.Label>Buscar Produto</Form.Label>
                            <Form.Control
                                type="text"
                                value={busca}
                                onChange={handleBusca}
                                placeholder="Digite o nome do produto"
                            />
                        </Form.Group>

                        <div className="product-list">
    {listaProdutos
        .filter((item) =>
            item.produto.nome &&
            item.produto.nome.toLowerCase().includes(busca.toLowerCase())
        )
        .map((item) => (
            <div key={item.produto.id} className="product-box">
                <Form.Check
                    type="checkbox"
                    value={item.produto.id}
                    label={item.produto.nome} // Corrigido para item.produto.nome
                    checked={selectedProdutos.includes(item.produto.id)}
                    onChange={() => handleProductSelect(item.produto.id)}
                />
            </div>
        ))}
</div>


                        <CustomButton variant="primary" onClick={prevStep}>
                            Voltar
                        </CustomButton>
                        <CustomButton variant="success" onClick={nextStep}>
                            Próximo
                        </CustomButton>
                    </StepContainer>
                )}


            </Modal.Body>
        </StyledModal>
    );
};

export default Atendimento;
