import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import api from '../services/api';

const Listagem = () => {
  const [listDev, setListDev] = useState([]);
  const [query, setQuery] = useState("");

  const findDeveloper = async () => {
    const response = await api.get('/developers');

    setListDev(response.data)
  }

  const handleInputChange = (e) => {
    const { value } = e.target;
    setQuery(value.toUpperCase());
  };

  const deleteDeveloper = async (id) => {
    const response = await api.delete(`/developers/${id}`);

    if (response.status === 204) {
      window.alert("Removido com Sucesso!");
      findDeveloper(query)
    }
  }

  useEffect(() => {
    findDeveloper(query)
  }, [query])

  // const formateDate = (data) => new Date(data).toLocaleDateString();

  return (
    <Container>
      <Form>
        <Row>
          <Form.Group as={Col}>
            <h1 className="text-dark my-4">Listagem Developers</h1>{" "}
          </Form.Group>
          
        </Row>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sexo</th>
            <th>Idade</th>
            <th>Hobby</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listDev.length > 0 &&
            listDev.map((dev) => {
              return (
                <tr key={dev._id}>
                  <td>{dev.name}</td>
                  <td>{dev.sex}</td>
                  <td>{dev.age}</td>
                  <td>{dev.hobby}</td>
                  <td>{dev.birthDate.split("T")[0]}</td>
                  <td className="d-flex justify-content-center gap-2">
                    <Link
                      to={`/cadastrar/${dev._id}`}
                      style={{ textDecoration: "none", color: "#08f" }}
                    >
                      <Button
                        variant="success"
                        size="sm"
                        type="button">
                        <BsPencilSquare />
                      </Button>
                    </Link>

                    <Button
                      variant="danger"
                      type="button"
                      size="sm"
                      onClick={() => {
                        if (window.confirm(`Deseja Excluir o Desenvolvedor ${dev.name} ?`)) {
                          deleteDeveloper(dev._id)
                        }
                      }}
                    >
                      <BsFillTrashFill />
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Listagem;