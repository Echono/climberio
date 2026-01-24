using { Excersises } from '../db/schema';

service ConsumerService {
    entity BoulderingSet as projection on Excersises.Bouldering;
}