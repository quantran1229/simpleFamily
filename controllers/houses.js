const House = require('../models').House;
const Member = require('../models').Member;
const Family = require('../models').Family;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = {
  create(req, res) {
    let address = req.body.address||"{}";
    return House
      .create({
        address:JSON.parse(address),
        size:req.body.size,
        room:req.body.room,
        FamilyId:req.body.familyId,
        id:req.body.id
      })
      .then(house => res.status(201).send({data:house}))
      .catch(error => res.status(400).send({message:error}));
  },
  list(req,res) {
    return House
    .findAll({
      include: [
        {
          model: Family,
          //as: 'family',
          attributes:[["name","family_name"]],
        },
        {
          model:Member,
          as:'members',
          attributes:["name"],
          required:false,
        }
        ,
      ],
      attributes:['address','size','room'],
    })
    .then(houses => res.status(200).send({data:houses}))
    .catch(error => res.status(400).send({message:error}));
  },
  retrieve(req,res)
  {
    return House
    .findByPk(req.params.id,{
      include: [
        {
          model: Family,
          //as: 'family',
          attributes:[["name","family_name"]],
        },
        {
          model:Member,
          as:'members',
          attributes:["name"],
          required:false,
        }
        ,
      ],
      attributes:['address','size','room'],
    })
    .then(house => {
      if (!house)
      {
        return res.status(404).send({message:"No house found in database"});
      }
      return res.status(200).send({data:house});
    })
    .catch(err => res.status(400).send({message:"Error when find house "+err}))
  },
  retrieveCity(req,res)
  {
    var city = {"City":req.query.city};
    return House
    .findAll({
      include: [
        {
          model: Family,
          attributes:[["name","family_name"]],
        },
      ],
      attributes:['address','size','room','id'],
      where:{
        address:
        {
          [Op.contains]:city,
        }
      }
    })
    .then(houses => res.status(200).send({data:houses}))
    .catch(error => res.status(400).send({message:error}));
  },
  update(req,res){
    return House
    .findByPk(req.params.id)
    .then(house => {
      if (!house)
      {
        return res.status(404).send({message:"No house found in database"});
      }
      requestJSON = JSON.parse(req.body.address);
      let address = {};
      address.City = requestJSON.City || house.address.City;
      address.address = requestJSON.address || house.address.address;
      return house.update({
        address:address,
        size:req.body.size || house.size,
        room:req.body.room || house.room,
        FamilyId:req.body.familyId || house.FamilyId
      })
      .then(()=>res.status(200).send({data:house}))
      .catch((err) => res.status(400).send({message:"error when update house "+err}))
    })
    .catch(err => res.status(400).send({message:"Error when find house "+err}))
  },
  delete(req,res){
    return House
    .findByPk(req.params.id)
    .then(house => {
      if (!house)
      {
        return res.status(404).send({message:"No house found in database"});
      }
      return house.destroy()
      .then(()=> res.status(204).send())
      .catch((err) => res.status(400).send({message:"Error when remove house:"+err}));
    })
    .catch((err) => res.status(400).send({message:"Error when finding house:"+err}));
  },
}
