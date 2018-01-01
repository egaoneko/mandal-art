import { InMemoryDbService } from 'angular-in-memory-web-api';
import { mandalArts } from '../data';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {mandalArts}; // api url : api/mandalArts
  }
}