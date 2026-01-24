using { Excersises } from '../db/schema';

service ConsumerService @(path: '/consumer') {
    entity BoulderingSet as projection on Excersises.Bouldering;
}