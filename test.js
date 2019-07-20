var request = require("supertest");
const app = require('./app');
const should = require('should');
const moment = require('moment');

describe('GET /', function() {
  it('it should connect', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('it should return correct message', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end((err,res)=>{
        res.body.message.should.equal("Welcome to test");
        done();
      });
  });

  it('it should return correct message when enter wrong address', function(done) {
    request(app)
      .get('/asv')
      .expect(200)
      .end((err,res)=>{
        res.body.message.should.equal("Welcome to test");
        done();
      });
  });
});

describe('Testing /api/members', function() {
  it('it should connect', function(done) {
    request(app)
      .get('/api/members')
      .expect(200,done);
  });

  it('it should return type json', function(done) {
    request(app)
      .get('/api/members')
      .expect(200)
      .expect("Content-type",/json/,done);
  });

  it('it should return correct number of members', function(done) {
    request(app)
      .get('/api/members')
      .expect(200)
      .expect("Content-type",/json/)
      .end((err,res)=>{
        let data = res.body.data.length;
        data.should.equal(3);
        done();
      })
  });

  const new_member = {
    name:"Test",
    dob:"1999-01-01",
    job:"unemployment",
    head:true,
    familyId:1,
    houseId:2,
    id:100
  }

  it('it should add a new member', function(done) {
    request(app)
      .post('/api/members')
      .send(new_member)
      .expect(201)
      .expect("Content-type",/json/,done)
  });

  it('it should show new added member', function(done) {
    request(app)
      .get('/api/members/100')
      .expect(200)
      .expect("Content-type",/json/)
      .end((err,res)=>{
        console.log(res.body);
        let data = res.body.data;
        let dob = moment(data.dob).format("YYYY-MM-DD");
        data.name.should.equal(new_member.name);
        dob.should.equal(new_member.dob);
        data.isHead.should.equal(new_member.head);
        data.FamilyId.should.equal(new_member.familyId);
        data.HouseId.should.equal(new_member.houseId);
        data.job.should.equal(new_member.job);
        done();
      })
    })

    const update_newMember ={
      name:"Test ABC",
      job:"CEO",
      head:false,
      familyId:2,
      houseId:3,
    }

    it('it should update new added member', function(done) {
      request(app)
        .put('/api/members/100')
        .send(update_newMember)
        .expect(200)
        .expect("Content-type",/json/)
        .end((err,res)=>{
          let data = res.body.data;
          console.log(data);
          let dob = moment(data.dob).format("YYYY-MM-DD");
          data.name.should.equal(update_newMember.name);
          dob.should.equal(new_member.dob);
          data.isHead.should.equal(update_newMember.head);
          data.FamilyId.should.equal(update_newMember.familyId);
          data.HouseId.should.equal(update_newMember.houseId);
          data.job.should.equal(update_newMember.job);
          done();
        });
      });


      it('it should delete new added member', function(done) {
        request(app)
          .delete('/api/members/100')
          .expect(204,done);
      })

      it('it should return correct number of members', function(done) {
        request(app)
          .get('/api/members')
          .expect(200)
          .expect("Content-type",/json/)
          .end((err,res)=>{
            let data = res.body.data.length;
            data.should.equal(3);
            done();
          })
      });
});


describe('Testing api/houses', function() {
  it('it should connect', function(done) {
    request(app)
      .get('/api/houses')
      .expect(200,done);
  });

  it('it should have correct number of elements', function(done) {
    request(app)
      .get('/api/houses')
      .expect(200)
      .expect("Content-type",/json/)
      .end((err,res)=>{
        let data = res.body.data.length;
        data.should.equal(11);
        done();
      })
  });

  let new_house ={
    size:100,
    room:3,
    familyId:1,
    address:'{"City":"BT","address":"12"}',
    id:100,
  }

  it('it should be able to add a new element', function(done) {
    request(app)
      .post('/api/houses')
      .send(new_house)
      .expect(201)
      .expect("Content-type",/json/)
      .end((err,res)=>{
        let data = res.body.data;
        data.room.should.equal(new_house.room);
        data.size.should.equal(new_house.size);
        data.FamilyId.should.equal(new_house.familyId);
        data.address.City.should.equal("BT");
        data.address.address.should.equal("12");
        done();
      })
  });

  it('it should find a house with City = BT', function(done) {
    request(app)
      .get('/api/houses/city?city=BT')
      .expect(200)
      .end((err,res)=>{
        res.body.data[0].id.should.equal(100);
        done();
      })
  })

  let faultHouse = {
    id:101,
    familyId:101,
  }

  it('it should be not able to add a faulty element', function(done) {
    request(app)
      .post('/api/houses')
      .send(faultHouse)
      .expect(400,done);
  });

  let update_newMember = {
    address:'{"City":"VT"}',
    size:250,
    room:10,
  }

  it('it should be able to update new element', function(done) {
    request(app)
      .put('/api/houses/100')
      .send(update_newMember)
      .expect(200)
      .expect("Content-type",/json/)
      .end((err,res)=>{
        let data = res.body.data;
        data.room.should.equal(update_newMember.room);
        data.size.should.equal(update_newMember.size);
        data.FamilyId.should.equal(new_house.familyId);
        data.address.City.should.equal("VT");
        data.address.address.should.equal("12");
        done();
      })
  });

  it('it should delete new added member', function(done) {
    request(app)
      .delete('/api/houses/100')
      .expect(204,done);
  })
});
