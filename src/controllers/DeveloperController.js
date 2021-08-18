import Developer from "../models/developer";

class DeveloperController{
 
    async index (req, res) {
        const developers = await Developer.find({});

        return res.json(developers)
    }

    async show(req, res) {
        const {id} = req.params;
        
        const developer = await Developer.findById(id);

        if (!id) {
            return res.status(400).json({error:'Developer does not found'})
        }

        if(!developer) {
            return res.status(400).json({error:'Developer does not found'});
        }

        return res.json(developer);
    }

    async update(req, res) {
        const {id} = req.params;
        const {name, sex, age, birthDate, hobby} = req.body;
       

        const developer = await Developer.findById(id);

        if (!id) {
            return res.status(400).json({error:'Developer does not found'})
        }

        if(!developer) {
            return res.status(400).json({error:'Developer does not found'});
        }

        developer.name = name;
        developer.sex = sex;
        developer.age = age;
        developer.birthDate = birthDate;
        developer.hobby = hobby;
        
        await developer.save()

        return res.json(developer)
    }


    async store(req, res) {
        const {name, sex, age, birthDate, hobby} = req.body;

        const developerExists = await Developer.findOne({name});

        if(developerExists) {
            return res.status(400).json({error:'Developer already exists'})
        }

        const developer = await Developer.create({
            name, sex, age, birthDate, hobby
        });

        return res.status(201).json(developer)
    }

    async delete(req, res) {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({error:'Developer does not found'})
        }
        const developer = await Developer.findById(id);

        if(!developer) {
            return res.status(400).json({error:'Developer does not found'});
        }

        await developer.remove()

        return res.status(204).send();
    }
}

export default new DeveloperController();