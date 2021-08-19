const request = require("supertest");
const {MongoClient} = require('mongodb');


describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(
      "mongodb://localhost/potential",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    db = await connection.db("potential");
  });


  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it("Acesso a Collection do Banco", async () => {
    const users = db.collection("developers");

    const mockUser = { _id: "test", name: "Juliana" };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: "test" });
    expect(insertedUser).toEqual(mockUser);
  });

  it("espera-se que o retorno seja status 404 pois não há desenvolvedores cadastrados", async (done) => {
    const res = await request(app).get("/developers");

    expect(res.status).toBe(404);
    done();
  }, 30000);


  it('Espera-se que há de retornar status 200 ao criar um dev no Banco de Dados', async () => {
    await Developer.create({
        name: "Juliana Salton",
        sex: "F",
        age: 20,
        birthdate: "2001-06-02",
        hobby: "Jogar."
    })

    const response = await request(app)
        .get("/developers")

    expect(response.status).toBe(200)
})   


});