import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ProgressBar, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import agendamentoService from '../../services/agendamentoService';
import clienteService from '../../services/clienteService';

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

    useEffect(() => {
        clienteService.getClientes() // Fazendo a chamada para a API
            .then((response) => {
                console.log(response, "Estrutura de dados da API"); // Verifique a estrutura
                // Verifique se a resposta é um array
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
                    console.log(usuariosDados, "Usuários mapeados");
                } else {
                    console.log("Resposta não contém um array de usuários.");
                    setError("Resposta não contém um array de usuários.");
                }
            })
            .catch((error) => {
                console.error("Erro ao carregar usuários:", error);
                setError("Erro ao buscar usuários.");
            });
    }, []);
    
    
    const handleClose = () => setShow(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleNestedInputChange = (e, category, field) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            [category]: {
                ...formData[category],
                [field]: value
            }
        });
    };

    const handleUserSelect = (e) => {
        debugger
        const selectedId = e.target.value;  // Pegando o id do usuário selecionado
        console.log('ID Selecionado:', selectedId);  // Verifique no console se o id está correto

        // Encontrando o usuário no array 'usuarios'
        const usuario = usuarios.find(user => user.id === parseInt(selectedId));

        if (usuario) {
            console.log('Usuário Selecionado:', usuario);  // Verifique se o usuário foi encontrado
        } else {
            console.log('Usuário não encontrado!');
        }

        // Atualizando o estado com o usuário selecionado
        setSelectedUsuario(usuario);
        setFormData({
            ...formData,
            usuario: usuario ? usuario : formData.usuario
        });
    };

    const handlePostAgendamento = async () => {
        const { dt, cancelado } = formData;
    
        // Separando data e hora
        const [date, time] = dt.split('T');
        const [hour, minute] = time ? time.split(':') : ['00', '00'];
    
        // Concatenando a hora e minuto para enviar como uma string
        const horario = `${hour}:${minute}:00`; // Se precisar do formato 'HH:mm:ss'
    
        console.log("Data e Hora Enviada:", { dt: date, horario }); // Verificando os dados
    
        // Estrutura do agendamento
        const agendamentoData = {
            ...formData,
            dt: date, // Apenas a data
            horario: horario // Enviar o horário como string
        };
    
        // Se não estiver cancelado, incluir os dados do usuário
        if (!cancelado && selectedUsuario) {
            agendamentoData.usuario = {
                ...selectedUsuario,
                cpf: formData.usuario.cpf, // Adicionando o CPF informado
            };
        }
    
        try {
            debugger
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
    
    
    

    const nextStep = () => {
        handlePostAgendamento(); // Chama o POST para o primeiro passo
    };

    const prevStep = () => {
        setStep(1); // Retorna ao primeiro passo
    };

    return (
        <>
            <StyledModal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Atendimento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProgressBar now={25} label={`Step ${step} of 4`} />

                    {error && <Alert variant="danger">{error}</Alert>} {/* Exibir erro, se houver */}

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

                        <Form.Group>
                            <Form.Label>Selecionar Usuário</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={handleUserSelect}  // Chamando a função de seleção
                                value={formData.usuario.id || ''}  // Valor do id do usuário selecionado
                            >
                                <option value="">Selecione um usuário</option>
                                {Array.isArray(usuarios) && usuarios.length > 0 ? (
                                    usuarios.map(usuario => (
                                        <option key={usuario.id} value={usuario.id}>
                                            {usuario.nome}  {/* Exibindo o nome do usuário */}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">Nenhum usuário disponível</option>
                                )}
                            </Form.Control>
                        </Form.Group>

                        {/* <Form.Group>
                            <Form.Label>CPF</Form.Label>
                            <Form.Control
                                type="text"
                                name="cpf"
                                value={formData.usuario.cpf}
                                onChange={(e) => handleNestedInputChange(e, 'usuario', 'cpf')}
                                placeholder="Informe o CPF"
                            />
                        </Form.Group> */}
                    </StepContainer>
                </Modal.Body>
                <Modal.Footer>
                    <CustomButton variant="secondary" onClick={handleClose}>
                        Fechar
                    </CustomButton>
                    <CustomButton variant="primary" onClick={nextStep}>
                        Confirmar
                    </CustomButton>
                </Modal.Footer>
            </StyledModal>
        </>
    );
};

export default Atendimento;
