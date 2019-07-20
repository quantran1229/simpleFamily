const Family = require('../models').Family;
const House = require('../models').House;
const Member = require('../models').Member;
const Sequelize = require('sequelize');
const _ = require('lodash');
const Op = Sequelize.Op;

module.exports = {
  create(req, res) {
    console.log(req.body.root);
    return Family
      .create({
        name: req.body.name,
        FamilyId:req.body.root,
      })
      .then(family => res.status(201).send({data:family}))
      .catch(error => res.status(400).send({message:error}));
  },
  list(req,res) {
    return Family
    .findAll({
      include: [
        {
          model: House,
          as: 'houses',
          attributes:["address"],
          include:[{
            model:Member,
            as:'members',
            attributes:[["name","fullname"],"isHead"],
            required: false,
          }]
          ,
          required:false,
        },
        {
          model:Family,
          as:'families',
          attributes:['name'],
        },
      ]
    })
    .then(families => {
      res.status(200).send({data:families})
    })
    .catch(error => res.status(400).send({message:error}));
  },
  retrieve(req,res) {
    return Family
    .findByPk(req.params.id,{
      include:[
        {
          model:House,
          as:'houses',
          attributes:["address"],
        }
      ]
    })
    .then(family => {
      if (!family)
      {
        return res.status(404).send({message:"No family found in database"});
      }
      return res.status(200).send({data:family});
    })
    .catch(err => res.status(400).send({message:err}))
  },
}
