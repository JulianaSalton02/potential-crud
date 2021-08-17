import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import api from "../services/api";

function Cadastrar() {
  const [values, setValues] = useState({});
  const history = useHistory();
  const { id } = useParams();

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  useEffect(() => {
    if (id) {
      api.get(`/developers/${id}`).then(({ data }) => {
        const { response } = data
        setValues({
          name: response.name,
          age: response.age,
          sex: response.sex,
          birthDate: response.birthDate,
          hobby: response.hobby
        })
      })
    }
  }, [id])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)

    if (!id) {
      const response = await api.post(`/developers`, data);
      if (response.status !== 201) {
        window.alert("Erro ao Cadastrar!");
        return
      }
      window.alert(response.data.mensagem);
    } else {
      const response = await api.put(`/developers/${id}`, data);
      if (response.status !== 200) {
        window.alert("Erro ao Cadastrar!");
        return
      }
      window.alert(response.data.mensagem);
    }
    historyPush();
  };

  const historyPush = () => {
    history.push("/dashboard");
  };

  return (
    <Container>
      <h1 className="text-dark my-4">
        {id ? "Alterar" : "Cadastrar"}  Developers
      </h1>
      <Form onSubmit={handleSubmit} >
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              name="name"
              type="text"
              value={values.name || ''}
              onChange={handleInputChange}
              placeholder="Digite seu nome"
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridAge">
            <Form.Label>Idade</Form.Label>
            <Form.Control
              name="idade"
              type="number"
              min="0"
              value={values.idade || ''}
              onChange={handleInputChange}
              placeholder="Digite sua idade"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridBirthDate">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control
              name="birthDate"
              value={values.birthDate|| ''}
              onChange={handleInputChange}
              type="date"
              placeholder="Digite sua data de nascimento"
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridRadio">
            <Form.Label>Sexo</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                inline
                name="sex"
                label="Feminino"
                value="F"
                onChange={handleInputChange}
                checked={values.sex === "F"}
              />
              <Form.Check
                type="radio"
                inline
                name="sex"
                label="Masculino"
                value="M"
                onChange={handleInputChange}
                checked={values.sex === "M"}
              />
            </Col>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridHobby">
          <Form.Label>Hobby</Form.Label>
          <Form.Control
            as="textarea"
            name="hobby"
            required
            value={values.hobby || ''}
            onChange={handleInputChange}
            placeholder="Descreva seu Hobby..."
          />
        </Form.Group>

        <Col className="d-flex justify-content-end ">
          <Button
            variant="outline-danger"
            type="button"
            className="me-3"
            onClick={() => historyPush()}>
            Cancelar
          </Button>
          <Button variant="outline-success" type="submit">
            Salvar Dados
          </Button>
        </Col>
      </Form>
    </Container>
  );
};

export default Cadastrar;