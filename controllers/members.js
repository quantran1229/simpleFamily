const Member = require('../models').Member;

module.exports = {
  create(req, res) {
    return Member
      .create({
        name:req.body.name,
        dob:req.body.dob,
        job:req.body.job,
        isHead:req.body.head || false,
        FamilyId:req.body.familyId,
        HouseId:req.body.houseId,
        id:req.body.id,
      })
      .then(house => res.status(201).send({data:house}))
      .catch(error => res.status(400).send({message:error}));
  },
  list(req,res) {
    return Member
    .findAll()
    .then(member => res.status(200).send({data:member}))
    .catch(error => res.status(400).send({message:error}));
  },
  retrieve(req,res) {
    return Member
    .findByPk(req.params.id)
    .then(member => {
      if (!member)
      {
        return res.status(404).send({message:"No member found in database"});
      }
      return res.status(200).send({data:member});
    })
    .catch(err => res.status(400).send({message:err}))
  },
  update(req,res) {
    return Member
    .findByPk(req.params.id)
    .then(member => {
      if (!member)
      {
        return res.status(404).send({message:"No member found in database"});
      }
      let head = member.isHead;
      if (req.body.head != null)
      {
        head = req.body.head;
      }
      member.update({
        name:req.body.name || member.name,
        dob:req.body.dob || member.dob,
        job:req.body.job || member.job,
        isHead:head,
        FamilyId:req.body.familyId || member.FamilyId,
        HouseId:req.body.houseId || member.HouseId,
      }).then(()=> res.status(200).send({data:member}))
      .catch((err) => {
        console.log(err)
        res.status(400).send({message:"Error when update member:"+err})
      });
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send({message:"Error when finding member:"+err})
    }
  );
  },
  delete(req,res){
    return Member
    .findByPk(req.params.id)
    .then(member => {
      if (!member)
      {
        return res.status(404).send({message:"No member found in database"});
      }
      return member.destroy()
      .then(()=> res.status(204).send())
      .catch((err) => res.status(400).send({message:"Error when remove member:"+err}));
    })
    .catch((err) => res.status(400).send({message:"Error when finding member:"+err}));
  },
}
