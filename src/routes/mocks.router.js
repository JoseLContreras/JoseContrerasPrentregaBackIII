import { Router } from 'express';
import { generateMockUsers, generateMockPets } from '../utils/mocking/mocks.js';
import UserService from '../services/users.service.js';
import PetService from '../services/pets.service.js';

const router = Router();

router.get('/mockingpets', (req, res) => {
  const pets = generateMockPets(50);
  res.sendSuccess(pets);
});

router.get('/mockingusers', (req, res) => {
  const users = generateMockUsers(50);
  res.sendSuccess(users);
});

router.post('/generateData', async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;
    
    const usersCreation = users > 0 
      ? UserService.createMany(generateMockUsers(users))
      : Promise.resolve([]);
    
    const petsCreation = pets > 0
      ? PetService.createMany(generateMockPets(pets))
      : Promise.resolve([]);

    const [createdUsers, createdPets] = await Promise.all([usersCreation, petsCreation]);
    
    res.sendSuccess({
      users: createdUsers.length,
      pets: createdPets.length
    });
    
  } catch (error) {
    res.sendServerError(error.message);
  }
});

export default router;