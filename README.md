# simpleFamily
Simple Family model:
Families
  familyId: int FK to Families id
  id: int PK
  name: string
  
Houses
  address:jsonb {city,address}
  size:int
  room:int
  
Members
  dob:date
  job:string
  isHead:boolean
  name:string
  name:string
  FamilyId: int FK to Families id
  HousesId: int FK to Houses id
  

api:
/api/houses/
/api/families/
/api/members/

env: port 8000

please change database config and migrate to run

to run: npm run start
to test: npm run test
